"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { TOPIC_BY_ID, isTopicId, resolveWord, type TopicId } from "@/lib/atelier/topics";
import { getRelation } from "@/lib/atelier/relations";
import { recognize } from "@/lib/atelier/handwriting";
import { clearState, loadState, saveState } from "@/lib/atelier/storage";
import { downloadBlob, exportPng } from "@/lib/atelier/export";
import { fill } from "@/lib/atelier/text";
import {
  bbox,
  bboxExpand,
  bboxPolygon,
  bboxIntersects,
  bboxUnion,
  insideFraction,
  isEnclosure,
  joinStrokes,
  pointInBBox,
  pointInPolygon,
  resample,
  smoothPath,
  strokeHit,
  wobblyRect,
} from "@/lib/atelier/geometry";
import {
  EMPTY_DOC,
  uid,
  type BBox,
  type Doc,
  type PanelState,
  type Pt,
  type Shape,
  type View,
} from "@/lib/atelier/types";
import InkLayer from "./InkLayer";
import ShapeOverlay, { type EditState, type GuessState, type SuggestState } from "./ShapeOverlay";
import Panel from "./Panel";
import ConnectionNote from "./ConnectionNote";
import Toolbar from "./Toolbar";
import Corners, { HelpPopover, IndexSheet } from "./Corners";
import Onboarding from "./Onboarding";
import type { PostSummary } from "./panels/TopicContent";

const MIN_K = 0.3;
const MAX_K = 3;
const PANEL_W = 360;
const PANEL_GAP = 28;
const TAP_SLOP = 5;

type Gesture =
  | { type: "draw"; id: number; start: Pt; pts: Pt[]; moved: boolean; startShape: Shape | null }
  | { type: "pan"; id: number; last: Pt }
  | { type: "pinch"; ids: [number, number]; startDist: number; startView: View; startCenter: Pt }
  | { type: "erase"; id: number; last: Pt; snapped: boolean };

interface Api {
  openTopicDirect: (topic: TopicId) => void;
  undo: () => void;
  redo: () => void;
  fitAll: () => void;
  closeTop: () => void;
  startHints: () => void;
}

function clampK(k: number) {
  return Math.min(MAX_K, Math.max(MIN_K, k));
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * The atelier: a white canvas where writing is the interface.
 * Write a word straight onto the paper — the strokes are read, and they become
 * the button that unfolds that part of the portfolio. Drawing an enclosure and
 * typing inside it still works for anyone who would rather not write.
 */
export default function Atelier({ posts }: { posts: PostSummary[] }) {
  const { t, locale, toggleLocale } = useLanguage();
  const at = t.atelier;
  const atRef = useRef(at);

  // ------------------------------------------------------------ document
  const [doc, setDocState] = useState<Doc>(EMPTY_DOC);
  const docRef = useRef<Doc>(EMPTY_DOC);
  const undoStack = useRef<Doc[]>([]);
  const redoStack = useRef<Doc[]>([]);
  const [hist, setHist] = useState({ undo: 0, redo: 0 });

  const applyDoc = useCallback((next: Doc) => {
    docRef.current = next;
    setDocState(next);
  }, []);
  const syncHist = useCallback(() => {
    setHist({ undo: undoStack.current.length, redo: redoStack.current.length });
  }, []);
  const commit = useCallback(
    (updater: (d: Doc) => Doc) => {
      const cur = docRef.current;
      const next = updater(cur);
      if (next === cur) return;
      undoStack.current.push(cur);
      if (undoStack.current.length > 80) undoStack.current.shift();
      redoStack.current = [];
      applyDoc(next);
      syncHist();
    },
    [applyDoc, syncHist]
  );
  const mutate = useCallback(
    (updater: (d: Doc) => Doc) => {
      const cur = docRef.current;
      const next = updater(cur);
      if (next !== cur) applyDoc(next);
    },
    [applyDoc]
  );
  const snapshot = useCallback(() => {
    undoStack.current.push(docRef.current);
    if (undoStack.current.length > 80) undoStack.current.shift();
    redoStack.current = [];
    syncHist();
  }, [syncHist]);

  // ---------------------------------------------------------------- view
  const [view, setViewState] = useState<View>({ x: 0, y: 0, k: 1 });
  const viewRef = useRef<View>({ x: 0, y: 0, k: 1 });
  const [animating, setAnimating] = useState(false);
  const animTimer = useRef<number | null>(null);
  const applyView = useCallback((v: View, animate = false) => {
    const nv = { x: v.x, y: v.y, k: clampK(v.k) };
    viewRef.current = nv;
    setViewState(nv);
    if (animate) {
      setAnimating(true);
      if (animTimer.current) window.clearTimeout(animTimer.current);
      animTimer.current = window.setTimeout(() => setAnimating(false), 340);
    }
  }, []);

  // ------------------------------------------------------- transient ui
  const [hydrated, setHydrated] = useState(false);
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  const [tool, setTool] = useState<"draw" | "erase">("draw");
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [editing, setEditing] = useState<({ shapeId: string } & EditState) | null>(null);
  const editingRef = useRef<string | null>(null);
  const [suggest, setSuggest] = useState<({ shapeId: string } & SuggestState) | null>(null);
  const [pillShape, setPillShape] = useState<string | null>(null);
  const [guess, setGuess] = useState<({ shapeId: string } & GuessState) | null>(null);
  const [thinking, setThinking] = useState<string | null>(null);
  const [hintPhase, setHintPhase] = useState<"none" | "ask" | "demo">("none");
  const [helpOpen, setHelpOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [focusShape, setFocusShape] = useState<string | null>(null);
  const [focusReq, setFocusReq] = useState<{ shapeId: string; n: number } | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const rootRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<SVGPathElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const pointers = useRef(new Map<number, Pt & { type: string }>());
  const zTop = useRef(1);
  const hintTimers = useRef<number[]>([]);
  const writeTimers = useRef(new Map<string, number>());
  const recogAborts = useRef(new Map<string, AbortController>());
  const api = useRef<Api | null>(null);

  const narrow = vp.w < 640;
  const maxPanelH = Math.max(160, (vp.h * (narrow ? 0.58 : 0.72)) / view.k);

  // ------------------------------------------------------------ helpers
  const say = (msg: string) => {
    setAnnounce("");
    window.setTimeout(() => setAnnounce(msg), 30);
  };
  const topicName = (id: TopicId) => TOPIC_BY_ID[id].name[locale];
  const toWorld = (s: Pt): Pt => {
    const v = viewRef.current;
    return { x: (s.x - v.x) / v.k, y: (s.y - v.y) / v.k };
  };
  const localPoint = (e: { clientX: number; clientY: number }): Pt => {
    const r = rootRef.current?.getBoundingClientRect();
    return { x: e.clientX - (r?.left ?? 0), y: e.clientY - (r?.top ?? 0) };
  };
  const rootSize = () => {
    const el = rootRef.current;
    return { w: el?.clientWidth || vp.w, h: el?.clientHeight || vp.h };
  };
  const shapeAt = (p: Pt): Shape | null => {
    const shapes = docRef.current.shapes;
    for (let i = shapes.length - 1; i >= 0; i--) {
      const s = shapes[i];
      if (pointInBBox(p, s.bbox) && pointInPolygon(p, s.polygon)) return s;
    }
    return null;
  };
  // header (~56) + scrollable body; a panel is rarely shorter than this once opened
  const panelRect = (p: PanelState): BBox => ({
    minX: p.x,
    minY: p.y,
    maxX: p.x + p.w,
    maxY: p.y + (p.collapsed ? 56 : 56 + Math.min(maxPanelH, 520)),
  });

  const clearHintTimers = () => {
    for (const id of hintTimers.current) window.clearTimeout(id);
    hintTimers.current = [];
  };
  const startHints = () => {
    clearHintTimers();
    hintTimers.current.push(
      window.setTimeout(() => setHintPhase("ask"), 1400),
      window.setTimeout(() => setHintPhase("demo"), 4200)
    );
  };
  const stopHints = () => {
    clearHintTimers();
    setHintPhase("none");
  };

  const ensureVisible = (r: BBox, pad = 20) => {
    const { w: vw, h: vh } = rootSize();
    const v = viewRef.current;
    const sx0 = r.minX * v.k + v.x;
    const sy0 = r.minY * v.k + v.y;
    const sx1 = r.maxX * v.k + v.x;
    const sy1 = r.maxY * v.k + v.y;
    let dx = 0;
    let dy = 0;
    if (sx0 < pad) dx = pad - sx0;
    else if (sx1 > vw - pad) dx = Math.max(vw - pad - sx1, pad - sx0);
    if (sy0 < pad) dy = pad - sy0;
    else if (sy1 > vh - pad) dy = Math.max(vh - pad - sy1, pad - sy0);
    if (dx || dy) applyView({ x: v.x + dx, y: v.y + dy, k: v.k }, true);
  };

  const placePanel = (shape: Shape): Pick<PanelState, "x" | "y" | "w" | "side"> => {
    const { w: vw } = rootSize();
    const v = viewRef.current;
    const k = v.k;
    const w = Math.min(PANEL_W, (vw - 24) / k);
    const b = shape.bbox;
    const fits = (x: number) => {
      const sx = x * k + v.x;
      return sx >= 8 && sx + w * k <= vw - 8;
    };
    const openRects = docRef.current.panels.filter((p) => p.open && p.shapeId !== shape.id).map(panelRect);
    const overlaps = (x: number, y: number) =>
      openRects.filter((r) => bboxIntersects(r, { minX: x, minY: y, maxX: x + w, maxY: y + 56 + Math.min(maxPanelH, 520) }));
    const candidates: Array<Pick<PanelState, "x" | "y" | "w" | "side">> = [];
    if (vw >= 640) {
      const rx = b.maxX + PANEL_GAP;
      if (fits(rx)) candidates.push({ x: rx, y: b.minY, w, side: "right" });
      const lx = b.minX - PANEL_GAP - w;
      if (fits(lx)) candidates.push({ x: lx, y: b.minY, w, side: "left" });
    }
    const sx = Math.min(Math.max(b.minX * k + v.x, 12), vw - w * k - 12);
    // a written word carries its reading underneath, so leave that line clear
    const below = b.maxY + PANEL_GAP + (shape.mode === "written" ? 26 / k : 0);
    candidates.push({ x: (sx - v.x) / k, y: below, w, side: "below" });

    // prefer a spot that does not sit on another open sheet
    const clear = candidates.find((c) => overlaps(c.x, c.y).length === 0);
    if (clear) return clear;
    const first = candidates[0];
    const lowest = Math.max(...overlaps(first.x, first.y).map((r) => r.maxY));
    return { ...first, y: lowest + 16 };
  };

  // ------------------------------------------------------------- panels
  const openPanel = (shapeId: string, topic: TopicId, focus = true, anchor?: string) => {
    const shape = docRef.current.shapes.find((s) => s.id === shapeId);
    if (!shape) return;
    const z = ++zTop.current;
    let placed: PanelState | null = null;
    mutate((d) => {
      const existing = d.panels.find((p) => p.shapeId === shapeId);
      if (existing) {
        const next: PanelState = { ...existing, topic, anchor: anchor ?? existing.anchor, open: true, collapsed: false, z };
        placed = next;
        return { ...d, panels: d.panels.map((p) => (p.shapeId === shapeId ? next : p)) };
      }
      const next: PanelState = { shapeId, topic, anchor, ...placePanel(shape), open: true, collapsed: false, z };
      placed = next;
      return { ...d, panels: [...d.panels, next] };
    });
    if (placed) ensureVisible(panelRect(placed));
    if (focus) setFocusReq((prev) => ({ shapeId, n: (prev?.n ?? 0) + 1 }));
    say(fill(at.a11y.opened, { topic: topicName(topic) }));
  };
  const closePanel = (shapeId: string) => {
    const p = docRef.current.panels.find((x) => x.shapeId === shapeId);
    mutate((d) => ({ ...d, panels: d.panels.map((x) => (x.shapeId === shapeId ? { ...x, open: false } : x)) }));
    if (p) say(fill(at.a11y.closed, { topic: topicName(p.topic) }));
  };
  const togglePanel = (shape: Shape) => {
    if (!shape.topic) return;
    const p = docRef.current.panels.find((x) => x.shapeId === shape.id);
    if (p?.open) closePanel(shape.id);
    else openPanel(shape.id, shape.topic);
  };
  const toggleCollapse = (shapeId: string) =>
    mutate((d) => ({
      ...d,
      panels: d.panels.map((x) => (x.shapeId === shapeId ? { ...x, collapsed: !x.collapsed } : x)),
    }));
  const movePanel = (shapeId: string, x: number, y: number) =>
    mutate((d) => ({ ...d, panels: d.panels.map((p) => (p.shapeId === shapeId ? { ...p, x, y } : p)) }));
  const bringFront = (shapeId: string) => {
    const p = docRef.current.panels.find((x) => x.shapeId === shapeId);
    if (!p || p.z === zTop.current) return;
    const z = ++zTop.current;
    mutate((d) => ({ ...d, panels: d.panels.map((x) => (x.shapeId === shapeId ? { ...x, z } : x)) }));
  };

  // -------------------------------------------------------------- words
  const beginEdit = (shapeId: string, prefill: string, note: EditState["note"]) => {
    setSuggest(null);
    setPillShape(null);
    setGuess(null);
    editingRef.current = shapeId;
    setEditing({ shapeId, prefill, note });
    const shape = docRef.current.shapes.find((s) => s.id === shapeId);
    if (shape) ensureVisible(bboxExpand(shape.bbox, 48));
  };
  const cancelEdit = (shapeId: string) => {
    if (editingRef.current !== shapeId) return;
    editingRef.current = null;
    setEditing(null);
  };
  const commitLabel = (shapeId: string, word: string) => {
    if (editingRef.current !== shapeId) return;
    editingRef.current = null;
    setEditing(null);
    const trimmed = word.trim();
    if (!trimmed) return;
    const res = resolveWord(trimmed);
    commit((d) => ({
      ...d,
      shapes: d.shapes.map((s) => (s.id === shapeId ? { ...s, label: trimmed, topic: res.topic, fromRecognition: false } : s)),
    }));
    if (res.topic) {
      openPanel(shapeId, res.topic, true, res.anchor);
      say(fill(at.a11y.became, { label: trimmed, topic: topicName(res.topic) }));
    } else {
      setSuggest({ shapeId, word: trimmed, options: res.suggestions });
      say(fill(at.a11y.unknownWord, { word: trimmed }));
    }
  };
  const pickTopic = (shapeId: string, topic: TopicId) => {
    setSuggest(null);
    const shape = docRef.current.shapes.find((s) => s.id === shapeId);
    commit((d) => ({ ...d, shapes: d.shapes.map((s) => (s.id === shapeId ? { ...s, topic } : s)) }));
    openPanel(shapeId, topic);
    if (shape?.label) say(fill(at.a11y.became, { label: shape.label, topic: topicName(topic) }));
  };
  const keepWord = () => setSuggest(null);
  const onPill = (shapeId: string) => beginEdit(shapeId, "", pillShape === shapeId ? "noRecognition" : null);
  /** The visitor disagrees with what we read; hand them the word to edit. */
  const correctLabel = (shapeId: string) => {
    const shape = docRef.current.shapes.find((s) => s.id === shapeId);
    beginEdit(shapeId, shape?.label ?? "", "recognized");
  };
  /** One of the recogniser's alternatives was chosen. */
  const pickCandidate = (shapeId: string, word: string) => {
    setGuess(null);
    const res = resolveWord(word);
    commit((d) => ({
      ...d,
      shapes: d.shapes.map((s) => (s.id === shapeId ? { ...s, label: word, topic: res.topic, fromRecognition: true } : s)),
    }));
    if (res.topic) {
      openPanel(shapeId, res.topic, true, res.anchor);
      say(fill(at.a11y.became, { label: word, topic: topicName(res.topic) }));
    } else {
      setSuggest({ shapeId, word, options: res.suggestions });
      say(fill(at.a11y.unknownWord, { word }));
    }
  };
  /** Keyboard focus landing on a word off-screen pans the canvas to it instead of scrolling the root. */
  const focusShapeById = (id: string | null) => {
    setFocusShape(id);
    if (!id) return;
    const shape = docRef.current.shapes.find((s) => s.id === id);
    if (shape) ensureVisible(bboxExpand(shape.bbox, 24));
  };
  const activateShape = (shape: Shape) => {
    if (shape.topic) togglePanel(shape);
    else if (shape.label) setSuggest({ shapeId: shape.id, word: shape.label, options: resolveWord(shape.label).suggestions });
    else beginEdit(shape.id, "", null);
  };

  const cancelReadings = () => {
    for (const id of writeTimers.current.values()) window.clearTimeout(id);
    writeTimers.current.clear();
    for (const ac of recogAborts.current.values()) ac.abort();
    recogAborts.current.clear();
  };

  /**
   * Wait for the pen to settle, then read that word. Timers are per mark, so
   * a word written earlier is still read even while another one is in progress.
   */
  const scheduleRecognition = (shapeId: string) => {
    const timers = writeTimers.current;
    const prev = timers.get(shapeId);
    if (prev) window.clearTimeout(prev);
    recogAborts.current.get(shapeId)?.abort();
    setGuess((g) => (g?.shapeId === shapeId ? null : g));
    setPillShape((x) => (x === shapeId ? null : x));
    timers.set(
      shapeId,
      window.setTimeout(() => {
        timers.delete(shapeId);
        void runRecognition(shapeId);
      }, 850)
    );
  };

  const applyRecognized = (shapeId: string, word: string, topic: TopicId, anchor?: string) => {
    setGuess(null);
    setPillShape(null);
    commit((d) => ({
      ...d,
      shapes: d.shapes.map((s) => (s.id === shapeId ? { ...s, label: word, topic, fromRecognition: true } : s)),
    }));
    openPanel(shapeId, topic, true, anchor);
    say(fill(at.a11y.read, { label: word, topic: topicName(topic) }));
  };

  /**
   * Read the strokes of one mark. The recogniser returns several candidates;
   * we take the first that means something here, so a near-miss on one glyph
   * still lands. Nothing matching leaves the candidates on screen to choose
   * from, and a failed read falls back to typing.
   */
  const runRecognition = async (shapeId: string) => {
    const d0 = docRef.current;
    const shape = d0.shapes.find((s) => s.id === shapeId);
    if (!shape || shape.topic || shape.label || editingRef.current === shapeId) return;
    const written = d0.strokes.filter((s) => s.kind === "writing" && s.shapeId === shapeId);
    if (!written.length) return;

    const b = bbox(written.flatMap((s) => s.points));
    const local = written.map((s) => s.points.map((p) => ({ x: p.x - b.minX, y: p.y - b.minY })));
    const ac = new AbortController();
    recogAborts.current.set(shapeId, ac);
    setThinking(shapeId);
    const res = await recognize(local, Math.max(1, b.maxX - b.minX), Math.max(1, b.maxY - b.minY), ac.signal);
    recogAborts.current.delete(shapeId);
    if (ac.signal.aborted) return;
    setThinking((cur) => (cur === shapeId ? null : cur));

    // the mark may have been erased, labelled or edited while we waited
    const still = docRef.current.shapes.find((s) => s.id === shapeId);
    if (!still || still.topic || still.label || editingRef.current === shapeId) return;

    if (!res || !res.candidates.length) {
      setPillShape(shapeId);
      say(at.a11y.notRead);
      return;
    }
    for (const c of res.candidates) {
      const r = resolveWord(c);
      if (r.topic) {
        applyRecognized(shapeId, c, r.topic, r.anchor);
        return;
      }
    }
    setGuess({ shapeId, options: res.candidates.slice(0, 5) });
    say(fill(at.a11y.guessing, { word: res.candidates[0] }));
  };

  // ------------------------------------------------------------ strokes
  const now = () => Date.now();
  /** How long a pause still counts as writing the same word, and how far apart. */
  const WRITE_JOIN_MS = 5000;
  const writePad = () => 8 / viewRef.current.k;

  /** An unnamed word still being written that this stroke probably belongs to. */
  const openMarkNear = (b: BBox): Shape | null => {
    const k = viewRef.current.k;
    const t = now();
    let best: { shape: Shape; d: number } | null = null;
    for (const s of docRef.current.shapes) {
      if (s.mode !== "written" || s.label || s.topic) continue;
      if (t - (s.updatedAt ?? s.createdAt) > WRITE_JOIN_MS) continue;
      // Size the reach on the glyphs already written, not on this one stroke:
      // a single short stroke (キ's top bar, ー) must still reach its neighbours.
      const glyph = Math.max(s.bbox.maxY - s.bbox.minY, b.maxY - b.minY, 30 / k);
      const gapX = Math.max(80 / k, glyph * 1.2);
      const gapY = Math.max(44 / k, glyph * 0.6);
      const reach: BBox = {
        minX: s.bbox.minX - gapX,
        maxX: s.bbox.maxX + gapX,
        minY: s.bbox.minY - gapY,
        maxY: s.bbox.maxY + gapY,
      };
      if (!bboxIntersects(reach, b)) continue;
      const d = Math.abs((s.bbox.minX + s.bbox.maxX) / 2 - (b.minX + b.maxX) / 2);
      if (!best || d < best.d) best = { shape: s, d };
    }
    return best?.shape ?? null;
  };

  /** Turn a mark whose strokes closed into a proper enclosure. */
  const convertMarkToEnclosure = (shapeId: string, poly: Pt[], usedIds: string[]) => {
    const polygon = resample(poly, 3);
    mutate((d) => ({
      ...d,
      strokes: d.strokes.map((s) => (usedIds.includes(s.id) ? { ...s, kind: "shape" as const, shapeId } : s)),
      shapes: d.shapes.map((s) =>
        s.id === shapeId
          ? { ...s, mode: "enclosure" as const, strokeIds: usedIds, polygon, bbox: bbox(polygon) }
          : s
      ),
    }));
    say(at.a11y.shapeMade);
  };

  /**
   * Someone drawing a box in two or three strokes looks exactly like someone
   * writing, until the strokes meet. After each stroke, see whether the mark
   * has closed into an enclosure; if it has, it stops being a word.
   */
  const tryCloseMark = (shapeId: string): boolean => {
    const k = viewRef.current.k;
    const minSize = 40 / k;
    const d = docRef.current;
    const shape = d.shapes.find((s) => s.id === shapeId);
    if (!shape || shape.mode !== "written" || shape.label || shape.topic) return false;
    const strokes = d.strokes.filter((s) => s.kind === "writing" && s.shapeId === shapeId);
    if (strokes.length < 2 || strokes.length > 4) return false;

    const ordered = [...strokes].reverse(); // newest first
    let cur = ordered[0].points;
    const used = [ordered[0].id];
    for (const c of ordered.slice(1)) {
      const b = bbox([...cur, ...c.points]);
      const tol = Math.max(26 / k, Math.hypot(b.maxX - b.minX, b.maxY - b.minY) * 0.18);
      const joined = joinStrokes(cur, c.points, tol);
      if (!joined) break;
      cur = joined;
      used.push(c.id);
      if (isEnclosure(cur, minSize)) {
        convertMarkToEnclosure(shapeId, cur, used);
        return true;
      }
    }
    return false;
  };

  /**
   * A line drawn on bare paper is treated as writing: it joins the word being
   * written next to it, or starts a new one. The strokes themselves become the
   * button — there is no box to draw first.
   */
  const addWrittenStroke = (pts: Pt[]) => {
    const b = bbox(pts);
    const pad = writePad();
    const t = now();
    const strokeId = uid("s");
    const target = openMarkNear(b);

    if (target) {
      commit((d) => {
        const strokes = [
          ...d.strokes,
          { id: strokeId, points: pts, kind: "writing" as const, shapeId: target.id, createdAt: t },
        ];
        const all = strokes.filter((s) => s.kind === "writing" && s.shapeId === target.id).flatMap((s) => s.points);
        const nb = bbox(all);
        return {
          ...d,
          strokes,
          shapes: d.shapes.map((s) =>
            s.id === target.id
              ? { ...s, strokeIds: [...s.strokeIds, strokeId], bbox: nb, polygon: bboxPolygon(nb, pad), updatedAt: t }
              : s
          ),
        };
      });
      if (tryCloseMark(target.id)) return;
      scheduleRecognition(target.id);
      return;
    }

    const shapeId = uid("shape");
    commit((d) => ({
      ...d,
      strokes: [...d.strokes, { id: strokeId, points: pts, kind: "writing" as const, shapeId, createdAt: t }],
      shapes: [
        ...d.shapes,
        {
          id: shapeId,
          mode: "written" as const,
          strokeIds: [strokeId],
          polygon: bboxPolygon(b, pad),
          bbox: b,
          label: null,
          topic: null,
          createdAt: t,
          updatedAt: t,
        },
      ],
    }));
    scheduleRecognition(shapeId);
  };

  const createShape = (poly: Pt[], newPts: Pt[], usedIds: string[]) => {
    const strokeId = uid("s");
    const shapeId = uid("shape");
    const polygon = resample(poly, 3);
    commit((d) => {
      const strokes = d.strokes
        .map((s) => (usedIds.includes(s.id) ? { ...s, kind: "shape" as const, shapeId } : s))
        .concat({ id: strokeId, points: newPts, kind: "shape", shapeId, createdAt: now() });
      const shape: Shape = {
        id: shapeId,
        mode: "enclosure",
        strokeIds: [...usedIds, strokeId],
        polygon,
        bbox: bbox(polygon),
        label: null,
        topic: null,
        createdAt: now(),
      };
      return { ...d, strokes, shapes: [...d.shapes, shape] };
    });
    say(at.a11y.shapeMade);
  };

  const addWriting = (shape: Shape, pts: Pt[]) => {
    commit((d) => ({
      ...d,
      strokes: [...d.strokes, { id: uid("s"), points: pts, kind: "writing", shapeId: shape.id, createdAt: now() }],
    }));
    if (!shape.topic && !shape.label) scheduleRecognition(shape.id);
  };

  const addConnection = (a: Shape, b: Shape, pts: Pt[]) => {
    const exists = docRef.current.connections.some(
      (c) => (c.a === a.id && c.b === b.id) || (c.a === b.id && c.b === a.id)
    );
    const strokeId = uid("s");
    commit((d) => ({
      ...d,
      strokes: [...d.strokes, { id: strokeId, points: pts, kind: exists ? "ink" : "link", createdAt: now() }],
      connections: exists ? d.connections : [...d.connections, { id: uid("c"), a: a.id, b: b.id, strokeId }],
    }));
    if (!exists && a.topic && b.topic) say(fill(at.a11y.connected, { a: topicName(a.topic), b: topicName(b.topic) }));
  };

  const finishStroke = (pts: Pt[], startShape: Shape | null) => {
    if (pts.length < 2) return;
    const k = viewRef.current.k;
    const endShape = shapeAt(pts[pts.length - 1]);

    if (startShape && endShape && startShape.id !== endShape.id && startShape.topic && endShape.topic) {
      if (insideFraction(pts, startShape.polygon) < 0.8) {
        addConnection(startShape, endShape, pts);
        return;
      }
    }

    if (startShape && startShape.mode === "enclosure" && insideFraction(pts, startShape.polygon) >= 0.7) {
      addWriting(startShape, pts);
      return;
    }

    // A single closed stroke on empty paper is a box. A closed stroke beside a
    // word being written is a glyph (口, 回…). Anything else is writing, and
    // tryCloseMark promotes it later if the strokes turn out to meet.
    const minSize = 40 / k;
    if (isEnclosure(pts, minSize) && !openMarkNear(bbox(pts))) {
      createShape(pts, pts, []);
      return;
    }
    addWrittenStroke(pts);
  };

  const eraseAt = (w: Pt, g: { snapped: boolean }) => {
    const d = docRef.current;
    const radius = 14 / viewRef.current.k; // generous: fingers are wider than a 1.7px line
    const hit = d.strokes.filter((s) => strokeHit(s.points, w, radius));
    if (!hit.length) return;
    if (!g.snapped) {
      snapshot();
      g.snapped = true;
    }
    const shapeIds = new Set(hit.map((s) => s.shapeId).filter((x): x is string => !!x));
    const strokeIds = new Set(hit.map((s) => s.id));
    for (const s of d.strokes) if (s.shapeId && shapeIds.has(s.shapeId)) strokeIds.add(s.id);
    const connections = d.connections.filter(
      (c) => !strokeIds.has(c.strokeId) && !shapeIds.has(c.a) && !shapeIds.has(c.b)
    );
    for (const c of d.connections) if (!connections.includes(c)) strokeIds.add(c.strokeId);
    mutate((cur) => ({
      ...cur,
      strokes: cur.strokes.filter((s) => !strokeIds.has(s.id)),
      shapes: cur.shapes.filter((s) => !shapeIds.has(s.id)),
      panels: cur.panels.filter((p) => !shapeIds.has(p.shapeId)),
      connections,
    }));
  };

  const pruneTransient = () => {
    const ids = new Set(docRef.current.shapes.map((s) => s.id));
    if (editingRef.current && !ids.has(editingRef.current)) {
      editingRef.current = null;
      setEditing(null);
    }
    setSuggest((s) => (s && ids.has(s.shapeId) ? s : null));
    setPillShape((p) => (p && ids.has(p) ? p : null));
    setGuess((g) => (g && ids.has(g.shapeId) ? g : null));
    setThinking((x) => (x && ids.has(x) ? x : null));
  };
  const resetTransient = () => {
    editingRef.current = null;
    setEditing(null);
    setSuggest(null);
    setPillShape(null);
    setGuess(null);
    setThinking(null);
    cancelReadings();
  };

  // ------------------------------------------------------------ actions
  const undo = () => {
    const prev = undoStack.current.pop();
    if (!prev) return;
    redoStack.current.push(docRef.current);
    applyDoc(prev);
    syncHist();
    resetTransient();
    say(at.a11y.undone);
  };
  const redo = () => {
    const next = redoStack.current.pop();
    if (!next) return;
    undoStack.current.push(docRef.current);
    applyDoc(next);
    syncHist();
    resetTransient();
    say(at.a11y.redone);
  };
  const fitAll = () => {
    const d = docRef.current;
    const pts = d.strokes.flatMap((s) => s.points);
    if (!pts.length) {
      applyView({ x: 0, y: 0, k: 1 }, true);
      return;
    }
    let b = bbox(pts);
    for (const p of d.panels) if (p.open) b = bboxUnion(b, panelRect(p));
    const { w: vw, h: vh } = rootSize();
    const bw = b.maxX - b.minX || 1;
    const bh = b.maxY - b.minY || 1;
    const k = clampK(Math.min(1.5, Math.min((vw - 96) / bw, (vh - 150) / bh)));
    applyView({ x: (vw - bw * k) / 2 - b.minX * k, y: (vh - bh * k) / 2 - b.minY * k, k }, true);
  };
  const reset = () => {
    if (!window.confirm(at.resetConfirm)) return;
    undoStack.current = [];
    redoStack.current = [];
    applyDoc(EMPTY_DOC);
    syncHist();
    clearState();
    applyView({ x: 0, y: 0, k: 1 });
    resetTransient();
    setTool("draw");
    startHints();
    say(at.a11y.resetDone);
  };
  const saveImage = async () => {
    const d = docRef.current;
    const blob = await exportPng(d, {
      labelFont: '"Klee One", "Noto Sans JP", sans-serif',
      footer: "koyatani.com",
      noteFor: (id) => {
        const c = d.connections.find((x) => x.id === id);
        const a = d.shapes.find((s) => s.id === c?.a);
        const b = d.shapes.find((s) => s.id === c?.b);
        if (!a?.topic || !b?.topic) return null;
        return getRelation(a.topic, b.topic, locale) ?? at.relationUnknown;
      },
    });
    if (blob) downloadBlob(blob, `koyatani-canvas-${new Date().toISOString().slice(0, 10)}.png`);
  };

  const findFreeSpot = (c: Pt, W: number, H: number): Pt => {
    const d = docRef.current;
    const blocks: BBox[] = [
      ...d.shapes.map((s) => bboxExpand(s.bbox, 24)),
      ...d.panels.filter((p) => p.open).map((p) => bboxExpand(panelRect(p), 16)),
    ];
    const free = (p: Pt) => {
      const b = { minX: p.x - W / 2, minY: p.y - H / 2, maxX: p.x + W / 2, maxY: p.y + H / 2 };
      return !blocks.some((x) => bboxIntersects(x, b));
    };
    if (free(c)) return c;
    const stepX = W + 48;
    const stepY = H + 48;
    for (let ring = 1; ring <= 6; ring++) {
      for (let i = -ring; i <= ring; i++) {
        for (let j = -ring; j <= ring; j++) {
          if (Math.max(Math.abs(i), Math.abs(j)) !== ring) continue;
          const p = { x: c.x + i * stepX, y: c.y + j * stepY };
          if (free(p)) return p;
        }
      }
    }
    return c;
  };

  /** Open a topic without drawing (index, corner link, ⌘K, ?open=). */
  const openTopicDirect = (topic: TopicId) => {
    setIndexOpen(false);
    setHelpOpen(false);
    stopHints();
    const existing = docRef.current.shapes.find((s) => s.topic === topic);
    if (existing) {
      openPanel(existing.id, topic);
      return;
    }
    const { w: vw, h: vh } = rootSize();
    const W = 176;
    const H = 68;
    const spot = findFreeSpot(toWorld({ x: vw * 0.5, y: vh * 0.36 }), W, H);
    const seed = docRef.current.shapes.length * 1.7 + 0.3;
    const poly = wobblyRect(spot.x, spot.y, W, H, seed);
    const shapeId = uid("shape");
    const strokeId = uid("s");
    const label = topicName(topic);
    commit((d) => ({
      ...d,
      strokes: [...d.strokes, { id: strokeId, points: [...poly, poly[0]], kind: "generated", createdAt: now() }],
      shapes: [
        ...d.shapes,
        {
          id: shapeId,
          mode: "enclosure",
          strokeIds: [strokeId],
          polygon: poly,
          bbox: bbox(poly),
          label,
          topic,
          generated: true,
          createdAt: now(),
        },
      ],
    }));
    openPanel(shapeId, topic);
  };

  const closeTop = () => {
    if (helpOpen) return setHelpOpen(false);
    if (indexOpen) return setIndexOpen(false);
    if (suggest) return setSuggest(null);
    if (guess) return setGuess(null);
    const open = docRef.current.panels.filter((p) => p.open).sort((a, b) => b.z - a.z)[0];
    if (open) closePanel(open.shapeId);
  };

  // ----------------------------------------------------------- pointers
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-ui]")) return;
    if (e.pointerType === "mouse" && e.button !== 0 && e.button !== 1) return;
    const root = rootRef.current;
    if (!root) return;
    try {
      root.setPointerCapture(e.pointerId);
    } catch {
      // synthetic or already-released pointer — drawing still works without capture
    }
    const s = localPoint(e);
    if (e.isPrimary) {
      // A primary pointer means no other pointer of this type is down (Pointer Events spec).
      // Anything still in the map is a ghost from a lost pointerup — drop it, or every
      // later single touch would be read as a pinch.
      for (const [id, p] of pointers.current) if (p.type === e.pointerType) pointers.current.delete(id);
      if (gesture.current && gesture.current.type !== "pinch") gesture.current = null;
      if (gesture.current?.type === "pinch" && pointers.current.size === 0) gesture.current = null;
      liveRef.current?.setAttribute("d", "");
    }
    pointers.current.set(e.pointerId, { ...s, type: e.pointerType });
    stopHints();
    setHelpOpen(false);
    setIndexOpen(false);

    if (pointers.current.size >= 2) {
      if (gesture.current?.type === "draw") liveRef.current?.setAttribute("d", "");
      const entries = Array.from(pointers.current.entries()).slice(-2);
      const [a, b] = entries;
      gesture.current = {
        type: "pinch",
        ids: [a[0], b[0]],
        startDist: Math.max(1, Math.hypot(a[1].x - b[1].x, a[1].y - b[1].y)),
        startView: { ...viewRef.current },
        startCenter: { x: (a[1].x + b[1].x) / 2, y: (a[1].y + b[1].y) / 2 },
      };
      return;
    }

    if (spaceHeld || e.button === 1) {
      gesture.current = { type: "pan", id: e.pointerId, last: s };
      return;
    }
    if (tool === "erase") {
      const g: Gesture = { type: "erase", id: e.pointerId, last: s, snapped: false };
      gesture.current = g;
      eraseAt(toWorld(s), g);
      return;
    }
    const w = toWorld(s);
    gesture.current = { type: "draw", id: e.pointerId, start: s, pts: [w], moved: false, startShape: shapeAt(w) };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g) return;
    const s = localPoint(e);
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { ...s, type: e.pointerType });

    if (g.type === "pinch") {
      const a = pointers.current.get(g.ids[0]);
      const b = pointers.current.get(g.ids[1]);
      if (!a || !b) return;
      const d = Math.max(1, Math.hypot(a.x - b.x, a.y - b.y));
      const k = clampK(g.startView.k * (d / g.startDist));
      const c = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const wx = (g.startCenter.x - g.startView.x) / g.startView.k;
      const wy = (g.startCenter.y - g.startView.y) / g.startView.k;
      applyView({ x: c.x - wx * k, y: c.y - wy * k, k });
      return;
    }
    if (g.id !== e.pointerId) return;

    if (g.type === "pan") {
      const v = viewRef.current;
      applyView({ x: v.x + s.x - g.last.x, y: v.y + s.y - g.last.y, k: v.k });
      g.last = s;
      return;
    }
    if (g.type === "erase") {
      const steps = Math.max(1, Math.ceil(Math.hypot(s.x - g.last.x, s.y - g.last.y) / 6));
      for (let i = 1; i <= steps; i++) {
        const u = i / steps;
        eraseAt(toWorld({ x: g.last.x + (s.x - g.last.x) * u, y: g.last.y + (s.y - g.last.y) * u }), g);
      }
      g.last = s;
      return;
    }

    // draw — use coalesced events for a faithful pen line when available
    const native = e.nativeEvent as PointerEvent & { getCoalescedEvents?: () => PointerEvent[] };
    const events = native.getCoalescedEvents?.() ?? [native];
    const k = viewRef.current.k;
    for (const ev of events.length ? events : [native]) {
      const sp = localPoint(ev);
      if (!g.moved && Math.hypot(sp.x - g.start.x, sp.y - g.start.y) > TAP_SLOP) g.moved = true;
      const w = toWorld(sp);
      const last = g.pts[g.pts.length - 1];
      if (Math.hypot(w.x - last.x, w.y - last.y) * k >= 1.2) g.pts.push(w);
    }
    if (g.moved) liveRef.current?.setAttribute("d", smoothPath(g.pts));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    pointers.current.delete(e.pointerId);
    try {
      rootRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }
    if (!g) return;
    if (g.type === "pinch") {
      if (pointers.current.size < 2) gesture.current = null;
      return;
    }
    if (g.id !== e.pointerId) return;
    gesture.current = null;
    if (g.type === "pan") return;
    if (g.type === "erase") {
      pruneTransient();
      if (g.snapped) say(at.a11y.erased);
      return;
    }
    liveRef.current?.setAttribute("d", "");
    if (e.type === "pointercancel") return;
    if (!g.moved) {
      const shape = shapeAt(g.pts[0]);
      if (shape) activateShape(shape);
      else setSuggest(null);
      return;
    }
    finishStroke(g.pts, g.startShape);
  };

  // ------------------------------------------------------------ effects
  useEffect(() => {
    atRef.current = at;
    api.current = { openTopicDirect, undo, redo, fitAll, closeTop, startHints };
  });

  // hydrate from storage (client only) and honour ?open=
  useEffect(() => {
    const id = window.setTimeout(() => {
      const saved = loadState();
      const params = new URLSearchParams(window.location.search);
      const open = params.get("open");
      if (saved && saved.doc.strokes.length > 0) {
        undoStack.current = [];
        redoStack.current = [];
        applyDoc(saved.doc);
        zTop.current = Math.max(1, ...saved.doc.panels.map((p) => p.z));
        applyView(saved.view);
        setAnnounce(atRef.current.restored);
      } else if (!isTopicId(open)) {
        api.current?.startHints();
      }
      if (isTopicId(open)) {
        api.current?.openTopicDirect(open);
        window.history.replaceState(null, "", window.location.pathname);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, [applyDoc, applyView]);

  // persist (never includes form fields — those live only in the form)
  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => saveState(doc, view), 250);
    return () => window.clearTimeout(id);
  }, [doc, view, hydrated]);

  // viewport size
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setVp({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // body scroll lock
  useEffect(() => {
    document.body.classList.add("atelier-body");
    return () => {
      document.body.classList.remove("atelier-body");
      cancelReadings();
    };
  }, []);

  // keyboard
  useEffect(() => {
    const isTyping = (el: EventTarget | null) => {
      const t = el as HTMLElement | null;
      return !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    };
    const onDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!isTyping(e.target)) api.current?.closeTop();
        return;
      }
      if (isTyping(e.target)) return;
      const mod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();
      if (mod && key === "z") {
        e.preventDefault();
        if (e.shiftKey) api.current?.redo();
        else api.current?.undo();
        return;
      }
      if (mod && key === "y") {
        e.preventDefault();
        api.current?.redo();
        return;
      }
      if (!mod && e.key === "0") {
        api.current?.fitAll();
        return;
      }
      if (e.key === " " && !e.repeat) {
        const t = e.target as HTMLElement | null;
        if (t && t.closest("button, a, [role='dialog'], section")) return;
        e.preventDefault();
        setSpaceHeld(true);
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key === " ") setSpaceHeld(false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  // wheel: pan, ctrl/⌘+wheel: zoom; never fight a scrolling panel
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-scroll]")) return;
      e.preventDefault();
      if (target?.closest("[data-ui]")) return;
      const v = viewRef.current;
      if (e.ctrlKey || e.metaKey) {
        const k = clampK(v.k * Math.exp(-e.deltaY * 0.0022));
        const r = el.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        applyView({ x: px - (px - v.x) * (k / v.k), y: py - (py - v.y) * (k / v.k), k });
      } else {
        applyView({ x: v.x - e.deltaX, y: v.y - e.deltaY, k: v.k });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [applyView]);

  // ⌘K palette and other pages ask the canvas to open a topic
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (isTopicId(detail)) api.current?.openTopicDirect(detail);
    };
    window.addEventListener("atelier:open", onOpen);
    return () => window.removeEventListener("atelier:open", onOpen);
  }, []);

  // ------------------------------------------------------------- render
  const openPanels = doc.panels.filter((p) => p.open);

  return (
    <div
      ref={rootRef}
      className={`atelier ${tool === "erase" ? "is-erase" : ""} ${spaceHeld ? "is-pan" : ""} ${animating ? "is-animating" : ""} ${hydrated ? "is-ready" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onContextMenu={(e) => {
        if (!(e.target as HTMLElement).closest("[data-ui]")) e.preventDefault();
      }}
    >
      <InkLayer doc={doc} view={view} liveRef={liveRef} focusShapeId={focusShape} />

      <div className="atelier-world" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})` }}>
        {doc.shapes.map((shape) => (
          <ShapeOverlay
            key={shape.id}
            shape={shape}
            locale={locale}
            at={at}
            panelOpen={openPanels.some((p) => p.shapeId === shape.id)}
            hasWriting={doc.strokes.some((s) => s.kind === "writing" && s.shapeId === shape.id)}
            editing={editing?.shapeId === shape.id ? editing : null}
            suggest={suggest?.shapeId === shape.id ? suggest : null}
            guess={guess?.shapeId === shape.id ? guess : null}
            thinking={thinking === shape.id}
            pill={pillShape === shape.id}
            onActivate={activateShape}
            onCommitLabel={commitLabel}
            onCancelEdit={cancelEdit}
            onPickTopic={pickTopic}
            onPickCandidate={pickCandidate}
            onCorrect={correctLabel}
            onKeepWord={keepWord}
            onPill={onPill}
            onFocusShape={focusShapeById}
          />
        ))}

        {doc.connections.map((c) => (
          <ConnectionNote key={c.id} connection={c} doc={doc} locale={locale} at={at} />
        ))}

        {openPanels.map((p) => {
          const shape = doc.shapes.find((s) => s.id === p.shapeId);
          if (!shape) return null;
          return (
            <Panel
              key={p.shapeId}
              panel={p}
              shape={shape}
              maxHeight={maxPanelH}
              scale={view.k}
              locale={locale}
              at={at}
              posts={posts}
              focusToken={focusReq?.shapeId === p.shapeId ? focusReq.n : 0}
              onClose={closePanel}
              onToggleCollapse={toggleCollapse}
              onMove={movePanel}
              onFront={bringFront}
              onOpenTopic={openTopicDirect}
            />
          );
        })}
      </div>

      <Onboarding phase={hintPhase} reducedMotion={reducedMotion} at={at} />

      <Corners
        at={at}
        locale={locale}
        name={t.hero.name}
        nameEn={t.hero.nameEn}
        helpOpen={helpOpen}
        indexOpen={indexOpen}
        onToggleHelp={() => {
          setHelpOpen((v) => !v);
          setIndexOpen(false);
        }}
        onToggleIndex={() => {
          setIndexOpen((v) => !v);
          setHelpOpen(false);
        }}
        onContact={() => openTopicDirect("contact")}
        onToggleLocale={toggleLocale}
      />
      {helpOpen && <HelpPopover at={at} onClose={() => setHelpOpen(false)} />}
      {indexOpen && <IndexSheet at={at} locale={locale} onPick={openTopicDirect} onClose={() => setIndexOpen(false)} />}

      <Toolbar
        at={at}
        canUndo={hist.undo > 0}
        canRedo={hist.redo > 0}
        erasing={tool === "erase"}
        hasContent={doc.strokes.length > 0}
        onUndo={undo}
        onRedo={redo}
        onToggleErase={() => setTool((cur) => (cur === "erase" ? "draw" : "erase"))}
        onFit={fitAll}
        onSave={() => void saveImage()}
        onReset={reset}
      />

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </div>
    </div>
  );
}

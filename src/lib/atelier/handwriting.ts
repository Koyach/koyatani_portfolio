import type { Pt } from "./types";

/**
 * Reading what the visitor wrote.
 *
 * Two sources, tried in order:
 *   1. the browser's own Web Handwriting Recognition API, when it exists
 *      (ChromeOS only in practice) — nothing leaves the device;
 *   2. /api/handwriting, which relays the strokes to Google's handwriting
 *      endpoint and returns candidates.
 *
 * When both fail we return null. We never invent a word: the caller falls
 * back to asking the visitor to type.
 */

interface HwPoint {
  x: number;
  y: number;
  t?: number;
}
interface HwStroke {
  addPoint(p: HwPoint): void;
}
interface HwDrawing {
  addStroke(s: HwStroke): void;
  getPrediction(): Promise<Array<{ text: string }>>;
  clear(): void;
}
interface HwRecognizer {
  startDrawing(hints?: Record<string, unknown>): HwDrawing;
  finish(): void;
}
interface HwNavigator {
  queryHandwritingRecognizer?: (c: { languages: string[] }) => Promise<unknown | null>;
  createHandwritingRecognizer?: (c: { languages: string[] }) => Promise<HwRecognizer>;
}

declare global {
  interface Window {
    HandwritingStroke?: new () => HwStroke;
  }
}

export type RecognitionSource = "browser" | "relay";

export interface Recognition {
  candidates: string[];
  source: RecognitionSource;
}

let nativeCached: Promise<boolean> | null = null;

/** True when the browser can recognise handwriting without any network call. */
export function isNativeHandwritingAvailable(): Promise<boolean> {
  if (nativeCached) return nativeCached;
  nativeCached = (async () => {
    if (typeof navigator === "undefined" || typeof window === "undefined") return false;
    const nav = navigator as unknown as HwNavigator;
    if (!nav.createHandwritingRecognizer || typeof window.HandwritingStroke !== "function") return false;
    try {
      if (nav.queryHandwritingRecognizer) {
        const q = await nav.queryHandwritingRecognizer({ languages: ["ja", "en"] });
        return q !== null && q !== undefined;
      }
      return true;
    } catch {
      return false;
    }
  })();
  return nativeCached;
}

async function recognizeNatively(strokes: Pt[][]): Promise<string[] | null> {
  if (!(await isNativeHandwritingAvailable())) return null;
  const nav = navigator as unknown as HwNavigator;
  const StrokeCtor = window.HandwritingStroke;
  if (!nav.createHandwritingRecognizer || !StrokeCtor) return null;
  try {
    const recognizer = await nav.createHandwritingRecognizer({ languages: ["ja", "en"] });
    const drawing = recognizer.startDrawing({ recognitionType: "text", inputType: "mouse", alternatives: 6 });
    let t = 0;
    for (const pts of strokes) {
      const s = new StrokeCtor();
      for (const p of pts) s.addPoint({ x: p.x, y: p.y, t: (t += 10) });
      drawing.addStroke(s);
      t += 120;
    }
    const predictions = await drawing.getPrediction();
    recognizer.finish();
    const texts = predictions.map((p) => p.text?.trim()).filter((s): s is string => !!s);
    return texts.length ? texts : null;
  } catch {
    return null;
  }
}

async function recognizeViaRelay(strokes: Pt[][], width: number, height: number, signal?: AbortSignal): Promise<string[] | null> {
  try {
    const res = await fetch("/api/handwriting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        strokes: strokes.map((s) => s.map((p) => ({ x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 }))),
        width: Math.round(width),
        height: Math.round(height),
      }),
      signal,
    });
    if (!res.ok) return null;
    const data: { candidates?: unknown } = await res.json();
    if (!Array.isArray(data.candidates)) return null;
    const list = data.candidates.filter((c): c is string => typeof c === "string" && c.trim().length > 0);
    return list.length ? list : null;
  } catch {
    return null;
  }
}

/**
 * Strokes are given in the mark's own pixel space (origin at its top-left).
 * `width` / `height` describe that box so the recogniser knows the scale.
 */
export async function recognize(
  strokes: Pt[][],
  width: number,
  height: number,
  signal?: AbortSignal
): Promise<Recognition | null> {
  if (!strokes.length) return null;

  const native = await recognizeNatively(strokes);
  if (native) return { candidates: native, source: "browser" };

  if (signal?.aborted) return null;
  const relayed = await recognizeViaRelay(strokes, width, height, signal);
  if (relayed) return { candidates: relayed, source: "relay" };

  return null;
}

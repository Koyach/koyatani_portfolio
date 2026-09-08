import { bbox, bboxUnion, centroid } from "./geometry";
import type { Doc, Pt } from "./types";

interface ExportOptions {
  labelFont: string;
  noteFor: (connectionId: string) => string | null;
  footer: string;
}

/** Draw the visitor's canvas — strokes, words, connection notes — to a PNG. */
export async function exportPng(doc: Doc, opts: ExportOptions): Promise<Blob | null> {
  if (typeof document === "undefined") return null;
  const all: Pt[] = doc.strokes.flatMap((s) => s.points);
  if (!all.length) return null;

  let b = bbox(all);
  for (const s of doc.shapes) b = bboxUnion(b, s.bbox);
  const pad = 80;
  const w = Math.ceil(b.maxX - b.minX + pad * 2);
  const h = Math.ceil(b.maxY - b.minY + pad * 2 + 40);
  const scale = Math.min(2, Math.max(1, 2400 / Math.max(w, h)));

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fbfaf7";
  ctx.fillRect(0, 0, w, h);
  ctx.translate(pad - b.minX, pad - b.minY);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  try {
    await document.fonts?.load(`16px ${opts.labelFont}`);
  } catch {
    // fall back to whatever font is available
  }

  for (const s of doc.strokes) {
    if (s.points.length < 1) continue;
    ctx.beginPath();
    ctx.setLineDash(s.kind === "generated" ? [4, 5] : []);
    ctx.strokeStyle = s.kind === "link" ? "#8b8983" : s.kind === "writing" ? "#3a3835" : "#1c1b19";
    ctx.lineWidth = s.kind === "link" ? 1.2 : s.kind === "shape" ? 1.8 : 1.6;
    drawSmooth(ctx, s.points);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  ctx.fillStyle = "#1c1b19";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const s of doc.shapes) {
    if (!s.label) continue;
    const c = centroid(s.polygon);
    const bw = s.bbox.maxX - s.bbox.minX;
    const bh = s.bbox.maxY - s.bbox.minY;
    const size = Math.max(13, Math.min(28, (bw / Math.max(2, s.label.length)) * 0.85, bh * 0.45));
    ctx.font = `${size}px ${opts.labelFont}`;
    ctx.fillText(s.label, c.x, c.y);
  }

  ctx.fillStyle = "#55534e";
  ctx.font = `12px ${opts.labelFont}`;
  ctx.textAlign = "left";
  for (const c of doc.connections) {
    const note = opts.noteFor(c.id);
    const stroke = doc.strokes.find((s) => s.id === c.strokeId);
    if (!note || !stroke) continue;
    const mid = stroke.points[Math.floor(stroke.points.length / 2)];
    wrapText(ctx, note, mid.x + 8, mid.y - 4, 260, 16);
  }

  ctx.fillStyle = "#8b8983";
  ctx.font = `11px ui-monospace, Menlo, monospace`;
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(opts.footer, b.maxX + pad - 8, b.maxY + pad + 24);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
}

function drawSmooth(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  ctx.moveTo(pts[0].x, pts[0].y);
  if (pts.length === 1) {
    ctx.lineTo(pts[0].x + 0.01, pts[0].y);
    return;
  }
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const n = pts[i + 1];
    ctx.quadraticCurveTo(p.x, p.y, (p.x + n.x) / 2, (p.y + n.y) / 2);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last.x, last.y);
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number) {
  const chars = Array.from(text);
  let line = "";
  let yy = y;
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, yy);
      line = ch;
      yy += lh;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

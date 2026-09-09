import type { BBox, Pt } from "./types";

export function dist(a: Pt, b: Pt): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function bbox(points: Pt[]): BBox {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  if (!points.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  return { minX, minY, maxX, maxY };
}

export function bboxUnion(a: BBox, b: BBox): BBox {
  return {
    minX: Math.min(a.minX, b.minX),
    minY: Math.min(a.minY, b.minY),
    maxX: Math.max(a.maxX, b.maxX),
    maxY: Math.max(a.maxY, b.maxY),
  };
}

export function bboxExpand(b: BBox, pad: number): BBox {
  return { minX: b.minX - pad, minY: b.minY - pad, maxX: b.maxX + pad, maxY: b.maxY + pad };
}

export function bboxIntersects(a: BBox, b: BBox): boolean {
  return a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY;
}

export function pathLength(points: Pt[]): number {
  let l = 0;
  for (let i = 1; i < points.length; i++) l += dist(points[i - 1], points[i]);
  return l;
}

/** Resample a polyline to roughly uniform spacing. Keeps first and last point. */
export function resample(points: Pt[], step: number): Pt[] {
  if (points.length < 2) return points.slice();
  const out: Pt[] = [points[0]];
  let carry = 0;
  for (let i = 1; i < points.length; i++) {
    let a = points[i - 1];
    const b = points[i];
    let seg = dist(a, b);
    while (carry + seg >= step) {
      const t = (step - carry) / seg;
      const p = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      out.push(p);
      a = p;
      seg = dist(a, b);
      carry = 0;
    }
    carry += seg;
  }
  const last = points[points.length - 1];
  if (dist(out[out.length - 1], last) > step * 0.25) out.push(last);
  return out;
}

/** SVG path with quadratic curves through midpoints — soft, pen-like. */
export function smoothPath(points: Pt[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const p = points[0];
    return `M${r(p.x)} ${r(p.y)} l0.01 0`;
  }
  if (points.length === 2) {
    return `M${r(points[0].x)} ${r(points[0].y)} L${r(points[1].x)} ${r(points[1].y)}`;
  }
  let d = `M${r(points[0].x)} ${r(points[0].y)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    const n = points[i + 1];
    const mx = (p.x + n.x) / 2;
    const my = (p.y + n.y) / 2;
    d += ` Q${r(p.x)} ${r(p.y)} ${r(mx)} ${r(my)}`;
  }
  const last = points[points.length - 1];
  d += ` L${r(last.x)} ${r(last.y)}`;
  return d;
}

export function polygonPath(points: Pt[]): string {
  if (!points.length) return "";
  return smoothPath([...points, points[0]]) + " Z";
}

function r(n: number): string {
  return (Math.round(n * 10) / 10).toString();
}

export function polygonArea(poly: Pt[]): number {
  let a = 0;
  for (let i = 0, n = poly.length; i < n; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % n];
    a += p.x * q.y - q.x * p.y;
  }
  return Math.abs(a) / 2;
}

export function centroid(poly: Pt[]): Pt {
  // Area-weighted centroid; falls back to bbox center for degenerate polygons.
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, n = poly.length; i < n; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % n];
    const f = p.x * q.y - q.x * p.y;
    a += f;
    cx += (p.x + q.x) * f;
    cy += (p.y + q.y) * f;
  }
  if (Math.abs(a) < 1e-6) {
    const b = bbox(poly);
    return { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
  }
  a *= 0.5;
  return { x: cx / (6 * a), y: cy / (6 * a) };
}

export function pointInPolygon(p: Pt, poly: Pt[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const pi = poly[i];
    const pj = poly[j];
    const intersect =
      pi.y > p.y !== pj.y > p.y &&
      p.x < ((pj.x - pi.x) * (p.y - pi.y)) / (pj.y - pi.y + 1e-12) + pi.x;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function pointInBBox(p: Pt, b: BBox): boolean {
  return p.x >= b.minX && p.x <= b.maxX && p.y >= b.minY && p.y <= b.maxY;
}

export function distPointToSegment(p: Pt, a: Pt, b: Pt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) return dist(p, a);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist(p, { x: a.x + t * dx, y: a.y + t * dy });
}

export function strokeHit(points: Pt[], p: Pt, radius: number): boolean {
  if (points.length === 1) return dist(points[0], p) <= radius;
  for (let i = 1; i < points.length; i++) {
    if (distPointToSegment(p, points[i - 1], points[i]) <= radius) return true;
  }
  return false;
}

export function nearestPointOnPolyline(p: Pt, poly: Pt[]): Pt {
  let best = poly[0] ?? p;
  let bestD = Infinity;
  for (let i = 0, n = poly.length; i < n; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    let t = l2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    const q = { x: a.x + t * dx, y: a.y + t * dy };
    const d = dist(p, q);
    if (d < bestD) {
      bestD = d;
      best = q;
    }
  }
  return best;
}

/**
 * Is this polyline a closed-ish enclosure?
 * Tolerant of a gap between start and end, of wobble, and of odd proportions,
 * but rejects lines, arcs, zig-zags and back-and-forth scribbles.
 */
export function isEnclosure(points: Pt[], minSize: number): boolean {
  if (points.length < 8) return false;
  const b = bbox(points);
  const w = b.maxX - b.minX;
  const h = b.maxY - b.minY;
  if (w < minSize || h < minSize) return false;
  const diag = Math.hypot(w, h);
  const gap = dist(points[0], points[points.length - 1]);
  const perimeter = pathLength(points);
  if (gap > Math.max(diag * 0.32, minSize * 0.6)) return false;
  if (perimeter < diag * 2.1) return false;
  const area = polygonArea(points);
  if (area < w * h * 0.32) return false;
  return true;
}

/**
 * Try to join two open strokes end-to-end when their endpoints are near.
 * Returns the joined polyline (a first, then b in the right direction), or null.
 */
export function joinStrokes(a: Pt[], b: Pt[], tol: number): Pt[] | null {
  if (a.length < 2 || b.length < 2) return null;
  const a0 = a[0];
  const a1 = a[a.length - 1];
  const b0 = b[0];
  const b1 = b[b.length - 1];
  if (dist(a1, b0) <= tol) return a.concat(b);
  if (dist(a1, b1) <= tol) return a.concat(b.slice().reverse());
  if (dist(a0, b1) <= tol) return b.concat(a);
  if (dist(a0, b0) <= tol) return b.slice().reverse().concat(a);
  return null;
}

/** Fraction of points that fall inside a polygon. */
export function insideFraction(points: Pt[], poly: Pt[]): number {
  if (!points.length) return 0;
  let n = 0;
  for (const p of points) if (pointInPolygon(p, poly)) n++;
  return n / points.length;
}

/**
 * A rounded rectangle with a slight, deterministic hand wobble.
 * Used for enclosures created from the index (rendered dashed, so they stay honest).
 */
export function wobblyRect(cx: number, cy: number, w: number, h: number, seed: number): Pt[] {
  const pts: Pt[] = [];
  const rx = w / 2;
  const ry = h / 2;
  const rad = Math.min(14, rx * 0.35, ry * 0.5);
  const corners = [
    { x: cx - rx + rad, y: cy - ry + rad },
    { x: cx + rx - rad, y: cy - ry + rad },
    { x: cx + rx - rad, y: cy + ry - rad },
    { x: cx - rx + rad, y: cy + ry - rad },
  ];
  const steps = 64;
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const p = roundedRectPoint(t, corners, rad);
    const wob = Math.sin(t * Math.PI * 7 + seed) * 1.1 + Math.cos(t * Math.PI * 11 + seed * 1.7) * 0.7;
    pts.push({ x: p.x + wob, y: p.y + wob * 0.6 });
  }
  return pts;
}

function roundedRectPoint(t: number, c: Pt[], rad: number): Pt {
  // 4 straight sides and 4 arcs, parameterized 0..1 by rough perimeter share.
  const w = c[1].x - c[0].x;
  const h = c[2].y - c[1].y;
  const arc = (Math.PI / 2) * rad;
  const total = 2 * w + 2 * h + 4 * arc;
  let d = t * total;
  const segs: Array<{ len: number; f: (u: number) => Pt }> = [
    { len: w, f: (u) => ({ x: c[0].x + w * u, y: c[0].y - rad }) },
    { len: arc, f: (u) => arcPt(c[1], rad, -Math.PI / 2, u) },
    { len: h, f: (u) => ({ x: c[1].x + rad, y: c[1].y + h * u }) },
    { len: arc, f: (u) => arcPt(c[2], rad, 0, u) },
    { len: w, f: (u) => ({ x: c[2].x - w * u, y: c[2].y + rad }) },
    { len: arc, f: (u) => arcPt(c[3], rad, Math.PI / 2, u) },
    { len: h, f: (u) => ({ x: c[3].x - rad, y: c[3].y - h * u }) },
    { len: arc, f: (u) => arcPt(c[0], rad, Math.PI, u) },
  ];
  for (const s of segs) {
    if (d <= s.len) return s.f(s.len === 0 ? 0 : d / s.len);
    d -= s.len;
  }
  return segs[0].f(0);
}

function arcPt(center: Pt, rad: number, start: number, u: number): Pt {
  const a = start + (Math.PI / 2) * u;
  return { x: center.x + Math.cos(a) * rad, y: center.y + Math.sin(a) * rad };
}

/** A rectangle around a box, as a polygon — the hit area of a written word. */
export function bboxPolygon(b: BBox, pad: number): Pt[] {
  const x0 = b.minX - pad;
  const y0 = b.minY - pad;
  const x1 = b.maxX + pad;
  const y1 = b.maxY + pad;
  return [
    { x: x0, y: y0 },
    { x: x1, y: y0 },
    { x: x1, y: y1 },
    { x: x0, y: y1 },
  ];
}

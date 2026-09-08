import type { Pt } from "./types";

/**
 * Handwriting recognition — only through the browser's own
 * Web Handwriting Recognition API (navigator.createHandwritingRecognizer).
 * No external service, no credentials. When the API is missing the caller
 * must fall back to typed input; we never invent a "recognized" word.
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

let cached: Promise<boolean> | null = null;

export function isHandwritingAvailable(): Promise<boolean> {
  if (cached) return cached;
  cached = (async () => {
    if (typeof navigator === "undefined") return false;
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
  return cached;
}

/**
 * Returns candidate strings (best first), or null when recognition is not
 * available or fails. Strokes are given in the enclosure's local pixel space.
 */
export async function recognizeStrokes(strokes: Pt[][], languages: string[] = ["ja", "en"]): Promise<string[] | null> {
  if (!(await isHandwritingAvailable())) return null;
  const nav = navigator as unknown as HwNavigator;
  const StrokeCtor = window.HandwritingStroke;
  if (!nav.createHandwritingRecognizer || !StrokeCtor) return null;
  try {
    const recognizer = await nav.createHandwritingRecognizer({ languages });
    const drawing = recognizer.startDrawing({ recognitionType: "text", inputType: "mouse", alternatives: 3 });
    let t = 0;
    for (const pts of strokes) {
      const s = new StrokeCtor();
      for (const p of pts) s.addPoint({ x: p.x, y: p.y, t: (t += 8) });
      drawing.addStroke(s);
    }
    const predictions = await drawing.getPrediction();
    recognizer.finish();
    const texts = predictions.map((p) => p.text?.trim()).filter((s): s is string => !!s);
    return texts.length ? texts : null;
  } catch {
    return null;
  }
}

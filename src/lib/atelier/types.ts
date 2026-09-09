import type { TopicId } from "./topics";

export type Pt = { x: number; y: number };

export type BBox = { minX: number; minY: number; maxX: number; maxY: number };

/**
 * ink       — free line, not part of anything
 * shape     — belongs to a closed enclosure (a future / current button)
 * writing   — drawn inside an enclosure (handwriting or annotation)
 * link      — drawn from one labelled enclosure to another
 * generated — enclosure created from the index / corner links (dashed)
 */
export type StrokeKind = "ink" | "shape" | "writing" | "link" | "generated";

/**
 * enclosure — a closed outline the visitor drew; the word goes inside it
 * written   — a word written straight onto the paper; the strokes are the button
 */
export type ShapeMode = "enclosure" | "written";

export interface Stroke {
  id: string;
  points: Pt[];
  kind: StrokeKind;
  shapeId?: string;
  createdAt: number;
}

export interface Shape {
  id: string;
  mode: ShapeMode;
  strokeIds: string[];
  polygon: Pt[];
  bbox: BBox;
  label: string | null;
  topic: TopicId | null;
  generated?: boolean;
  /** the label came from handwriting recognition, so offer a way to correct it */
  fromRecognition?: boolean;
  createdAt: number;
  /** last time a stroke joined this shape — used to group a word being written */
  updatedAt?: number;
}

export interface PanelState {
  shapeId: string;
  topic: TopicId;
  x: number;
  y: number;
  w: number;
  side: "right" | "left" | "below";
  /** a question id to open first (questions topic) */
  anchor?: string;
  open: boolean;
  collapsed: boolean;
  z: number;
}

export interface Connection {
  id: string;
  a: string;
  b: string;
  strokeId: string;
}

export interface Doc {
  v: 1;
  strokes: Stroke[];
  shapes: Shape[];
  panels: PanelState[];
  connections: Connection[];
}

export interface View {
  x: number;
  y: number;
  k: number;
}

export const EMPTY_DOC: Doc = {
  v: 1,
  strokes: [],
  shapes: [],
  panels: [],
  connections: [],
};

export function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

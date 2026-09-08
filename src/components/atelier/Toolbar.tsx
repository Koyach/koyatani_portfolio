"use client";

import type { AtelierText } from "@/lib/atelier/text";

interface Props {
  at: AtelierText;
  canUndo: boolean;
  canRedo: boolean;
  erasing: boolean;
  hasContent: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onToggleErase: () => void;
  onFit: () => void;
  onSave: () => void;
  onReset: () => void;
}

/** Quiet tools in the corner: undo, redo, erase, see everything, save, start over. */
export default function Toolbar(props: Props) {
  const { at } = props;
  return (
    <div className="atelier-tools" data-ui role="toolbar" aria-label={at.draw}>
      <ToolButton label={at.undo} onClick={props.onUndo} disabled={!props.canUndo} shortcut="⌘Z">
        <path d="M6 4.5 2.5 8 6 11.5" />
        <path d="M2.8 8h7.4a3.3 3.3 0 0 1 0 6.6H8" />
      </ToolButton>
      <ToolButton label={at.redo} onClick={props.onRedo} disabled={!props.canRedo} shortcut="⇧⌘Z">
        <path d="M11 4.5 14.5 8 11 11.5" />
        <path d="M14.2 8H6.8a3.3 3.3 0 0 0 0 6.6H9" />
      </ToolButton>
      <span className="atelier-tools-sep" aria-hidden="true" />
      <ToolButton label={props.erasing ? at.draw : at.erase} onClick={props.onToggleErase} pressed={props.erasing}>
        {props.erasing ? (
          <path d="M3.5 13.5 12.5 4.5l1.5 1.5-9 9H3.5v-1.5Z" />
        ) : (
          <>
            <path d="m4 13.5 8.6-8.6a1.4 1.4 0 0 1 2 0l0 0a1.4 1.4 0 0 1 0 2L9.5 12" />
            <path d="M3 14h9" />
          </>
        )}
      </ToolButton>
      <ToolButton label={at.fit} onClick={props.onFit} shortcut="0">
        <path d="M3 6V3h3M14 6V3h-3M3 11v3h3M14 11v3h-3" />
      </ToolButton>
      <span className="atelier-tools-sep" aria-hidden="true" />
      <ToolButton label={at.saveImage} onClick={props.onSave} disabled={!props.hasContent}>
        <path d="M8.5 3v8M5.5 8l3 3 3-3" />
        <path d="M3 13.5h11" />
      </ToolButton>
      <ToolButton label={at.reset} onClick={props.onReset} disabled={!props.hasContent}>
        <path d="M13.5 8.5A5 5 0 1 1 12 4.9" />
        <path d="M12.2 2.5v2.8H9.4" />
      </ToolButton>
    </div>
  );
}

function ToolButton({
  label,
  shortcut,
  onClick,
  disabled,
  pressed,
  children,
}: {
  label: string;
  shortcut?: string;
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`atelier-tool ${pressed ? "is-pressed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      aria-label={label}
      title={shortcut ? `${label}  ${shortcut}` : label}
    >
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
      <span className="atelier-tool-label">{label}</span>
    </button>
  );
}

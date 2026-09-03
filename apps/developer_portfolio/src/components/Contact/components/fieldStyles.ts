import type { CSSProperties } from "react";

export const labelStyle: CSSProperties = {
  fontFamily: "var(--font-core)",
  fontSize: "var(--text-xs)",
  fontWeight: "var(--weight-medium)",
  color: "var(--text-body)",
};

export function fieldStyle(focused: boolean, invalid: boolean, multiline: boolean): CSSProperties {
  return {
    width: "100%",
    padding: multiline ? "var(--space-3) var(--space-4)" : "0 var(--space-4)",
    height: multiline ? undefined : 44,
    background: "var(--surface-inset)",
    color: "var(--text-heading)",
    border: `1px solid ${invalid ? "var(--status-danger)" : focused ? "var(--border-accent)" : "var(--border-default)"}`,
    borderRadius: "var(--radius-control)",
    fontFamily: "var(--font-core)",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--leading-relaxed)",
    boxShadow: focused ? "var(--ring-focus)" : "none",
    outline: "none",
    transition: "var(--transition-control)",
    resize: multiline ? "vertical" : undefined,
  };
}

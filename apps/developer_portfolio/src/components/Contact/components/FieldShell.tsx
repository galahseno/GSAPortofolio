import type { ReactNode } from "react";
import { labelStyle } from "./fieldStyles";

export function FieldShell({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      {children}
      {error ? (
        <span style={{ fontSize: "var(--text-xs)", color: "var(--status-danger)" }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>{hint}</span>
      ) : null}
    </div>
  );
}

import { SPRITE_URL } from "../../constants/paths";

interface ToastPillProps {
  message: string | null;
  tone?: "success" | "danger";
}

export function ToastPill({ message, tone = "success" }: ToastPillProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      style={{
        position: "fixed",
        left: "50%",
        bottom: "var(--space-8)",
        transform: "translateX(-50%)",
        zIndex: 70,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-5)",
        border: "1px solid var(--glass-border)",
        borderRadius: "var(--radius-pill)",
        background: "var(--glass-tint-strong)",
        backdropFilter: "var(--glass-filter)",
        WebkitBackdropFilter: "var(--glass-filter)",
        boxShadow: "var(--glass-shadow), var(--glass-sheen)",
        color: "var(--text-heading)",
        fontFamily: "var(--font-core)",
        fontSize: "var(--text-sm)",
        maxWidth: "min(90vw, 480px)",
      }}
    >
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        style={{ flex: "none", color: tone === "success" ? "var(--status-success)" : "var(--status-danger)" }}
      >
        <use href={`${SPRITE_URL}#${tone === "success" ? "check-icon" : "close-icon"}`} />
      </svg>
      {message}
    </div>
  );
}

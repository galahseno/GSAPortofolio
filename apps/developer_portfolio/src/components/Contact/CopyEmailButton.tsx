import { useEffect, useRef, useState } from "react";
import { SPRITE_URL } from "../../constants/paths";
import { ICON_BUTTON_CLASS } from "../Navigation/iconButtonClass";

const RESET_MS = 2000;

interface CopyEmailButtonProps {
  email: string;
  copyLabel: string;
  copiedLabel: string;
}

export default function CopyEmailButton({ email, copyLabel, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), RESET_MS);
  };

  return (
    <span style={{ flex: "none", display: "inline-flex", alignItems: "center" }}>
      {/* Always mounted so screen readers announce the text change. */}
      <span
        role="status"
        style={{
          marginRight: copied ? "var(--space-2)" : 0,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text-accent)",
        }}
      >
        {copied ? copiedLabel : ""}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copyLabel}
        className={ICON_BUTTON_CLASS}
        style={copied ? { color: "var(--text-accent)" } : undefined}
      >
        <svg aria-hidden="true" width="16" height="16">
          <use href={`${SPRITE_URL}#${copied ? "check-icon" : "copy-icon"}`} />
        </svg>
      </button>
    </span>
  );
}

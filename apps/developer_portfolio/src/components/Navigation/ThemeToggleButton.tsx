import { SPRITE_URL } from "../../constants/paths";
import { ICON_BUTTON_CLASS } from "./iconButtonClass";

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("gsa-theme", next);
  } catch {
    // localStorage unavailable (private mode, etc.) — theme just won't persist.
  }
}

export default function ThemeToggleButton() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch theme"
      title="Switch theme"
      className={ICON_BUTTON_CLASS}
    >
      <svg width={16} height={16} aria-hidden="true" className="dark:hidden">
        <use href={`${SPRITE_URL}#sun-icon`} />
      </svg>
      <svg width={16} height={16} aria-hidden="true" className="hidden dark:block">
        <use href={`${SPRITE_URL}#moon-icon`} />
      </svg>
    </button>
  );
}

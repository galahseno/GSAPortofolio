import { useCallback, useEffect, useState } from "react";
import { NAV_ITEMS } from "./navItems";
import NavPill from "./NavPill";
import ThemeToggleButton from "./ThemeToggleButton";
import LanguageToggleStub from "./LanguageToggleStub";
import MobileMenuPanel from "./MobileMenuPanel";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { usePillMeasure } from "./hooks/usePillMeasure";
import { ICON_BUTTON_CLASS } from "./iconButtonClass";
import { SPRITE_URL } from "../../constants/paths";

const SCROLL_OFFSET = 96;

export default function Navigation() {
  const [activeId, setActiveId] = useScrollSpy();
  const { rowRef, registerLink, pill, squish } = usePillMeasure(activeId);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (
        !event.target.closest("[data-mobile-nav]") &&
        !event.target.closest("[data-mobile-trigger]")
      ) {
        setMobileOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  const go = useCallback((id: string) => {
    setActiveId(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, [setActiveId]);

  return (
    <div
      style={{
        position: "fixed",
        top: "var(--space-4)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        maxWidth: "calc(100vw - var(--space-6))",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "var(--space-2)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
        }}
        className="nav-glass"
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            go("home");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 var(--space-3)",
            height: 34,
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-sm)",
            letterSpacing: "var(--tracking-tight)",
          }}
          className="[color:var(--text-heading)] hover:[color:var(--text-heading)]"
        >
          GSA
          <span
            aria-hidden="true"
            style={{
              width: 5,
              height: 5,
              borderRadius: "var(--radius-circle)",
              background: "var(--accent)",
            }}
          />
        </a>

        <span
          aria-hidden="true"
          className="hidden md:inline-block"
          style={{ width: 1, height: 20, background: "var(--glass-border)" }}
        />

        {/* Desktop nav items */}
        <div
          ref={rowRef}
          className="hidden md:flex"
          style={{ position: "relative", alignItems: "center", gap: 2, overflow: "hidden" }}
        >
          <NavPill pill={pill} squish={squish} />
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-nav-id={item.id}
                ref={registerLink(item.id)}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  height: 34,
                  padding: "0 var(--space-4)",
                  borderRadius: "var(--radius-pill)",
                  fontFamily: "var(--font-core)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--weight-medium)",
                  letterSpacing: "var(--tracking-tight)",
                  whiteSpace: "nowrap",
                  transition: "color var(--dur-fast) var(--ease-out)",
                }}
                className={
                  isActive
                    ? "[color:var(--text-accent)] hover:[color:var(--text-heading)]"
                    : "[color:var(--text-body)] hover:[color:var(--text-heading)]"
                }
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <span
          aria-hidden="true"
          className="hidden md:inline-block"
          style={{ width: 1, height: 20, background: "var(--glass-border)" }}
        />

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ThemeToggleButton />
          <LanguageToggleStub />
          <button
            type="button"
            data-mobile-trigger
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className={`${ICON_BUTTON_CLASS} md:hidden`}
          >
            <svg width={16} height={16} aria-hidden="true">
              <use href={`${SPRITE_URL}#${mobileOpen ? "close-icon" : "menu-icon"}`} />
            </svg>
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <MobileMenuPanel items={NAV_ITEMS} activeId={activeId} open={mobileOpen} onNavigate={go} />
      </div>
    </div>
  );
}

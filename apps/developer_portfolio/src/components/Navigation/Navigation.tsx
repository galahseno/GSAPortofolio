import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { NAV_ITEMS } from "./navItems";
import NavPill, { type PillGeometry } from "./NavPill";
import ThemeToggleButton from "./ThemeToggleButton";
import LanguageToggleStub from "./LanguageToggleStub";
import MobileMenuPanel from "./MobileMenuPanel";
import { SPRITE_URL } from "../../constants/paths";

const ACTIVE_THRESHOLD = 160;
const SCROLL_OFFSET = 96;

const GLASS_LIGHT: CSSProperties = {
  background: "rgba(255, 255, 255, 0.62)",
  border: "1px solid rgba(26, 23, 22, 0.08)",
  boxShadow:
    "0 1px 1px rgba(26, 23, 22, 0.04), 0 8px 28px -8px rgba(26, 23, 22, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.75), inset 0 -1px 0 rgba(255, 255, 255, 0.25)",
};

export default function Navigation() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  const [pill, setPill] = useState<PillGeometry | null>(null);
  const [squish, setSquish] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const rowRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const pillRef = useRef<PillGeometry | null>(null);
  const squishTimeoutRef = useRef<number | undefined>(undefined);

  const registerLink = useCallback(
    (id: string) => (el: HTMLAnchorElement | null) => {
      if (el) linkRefs.current.set(id, el);
      else linkRefs.current.delete(id);
    },
    [],
  );

  const measure = useCallback(() => {
    const row = rowRef.current;
    const link = linkRefs.current.get(activeId);
    if (!row || !link) return;

    const rowRect = row.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const next: PillGeometry = {
      x: Math.round(linkRect.left - rowRect.left),
      width: Math.round(linkRect.width),
    };

    const prev = pillRef.current;
    if (prev && prev.x === next.x && prev.width === next.width) return;

    if (prev) {
      setSquish(true);
      window.clearTimeout(squishTimeoutRef.current);
      squishTimeoutRef.current = window.setTimeout(() => setSquish(false), 210);
    }

    pillRef.current = next;
    setPill(next);
  }, [activeId]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const row = rowRef.current;
    let observer: ResizeObserver | undefined;
    if (row && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => measure());
      observer.observe(row);
    }
    const settleTimer = window.setTimeout(measure, 320);
    document.fonts?.ready?.then(measure);
    return () => {
      observer?.disconnect();
      window.clearTimeout(settleTimer);
    };
  }, [measure]);

  useEffect(() => {
    const computeActive = () => {
      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_THRESHOLD) {
          current = item.id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };
    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    return () => window.removeEventListener("scroll", computeActive);
  }, []);

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
  }, []);

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
          ...GLASS_LIGHT,
          backdropFilter: "var(--glass-filter)",
          WebkitBackdropFilter: "var(--glass-filter)",
          borderRadius: "var(--radius-pill)",
          padding: "var(--space-2)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
        }}
        className="dark:!bg-[rgba(28,25,24,0.58)] dark:![border:1px_solid_rgba(255,255,255,0.1)] dark:![box-shadow:0_1px_1px_rgba(0,0,0,.4),0_10px_30px_-10px_rgba(0,0,0,.7),inset_0_1px_0_rgba(255,255,255,.09),inset_0_-1px_0_rgba(255,255,255,.03)]"
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
            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-transparent bg-transparent text-[var(--text-muted)] transition-[color,background-color] duration-150 ease-out hover:bg-[color-mix(in_oklch,var(--text-heading)_8%,transparent)] hover:text-[var(--text-accent)] md:hidden"
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

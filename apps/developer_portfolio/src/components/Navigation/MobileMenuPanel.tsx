import type { NavItem } from "./navItems";

interface MobileMenuPanelProps {
  items: NavItem[];
  activeId: string;
  open: boolean;
  onNavigate: (id: string) => void;
}

export default function MobileMenuPanel({
  items,
  activeId,
  open,
  onNavigate,
}: MobileMenuPanelProps) {
  return (
    <div
      data-mobile-nav
      role="menu"
      style={{
        position: "absolute",
        top: "calc(100% + var(--space-2))",
        right: 0,
        width: "min(260px, calc(100vw - 32px))",
        padding: "var(--space-2)",
        background: "var(--glass-tint-strong)",
        backdropFilter: "var(--glass-filter)",
        WebkitBackdropFilter: "var(--glass-filter)",
        border: "1px solid var(--glass-border)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--glass-shadow), var(--glass-sheen)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "var(--transition-surface)",
        transform: open ? "translateY(0)" : "translateY(-4px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            role="menuitem"
            onClick={(event) => {
              event.preventDefault();
              onNavigate(item.id);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              height: 44,
              padding: "0 var(--space-3)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-core)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-medium)",
              color: isActive ? "var(--text-accent)" : "var(--text-body)",
              background: isActive ? "var(--accent-soft)" : "transparent",
              transition: "var(--transition-control)",
            }}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}

import { LANGS, localeHref, type Lang } from "../../i18n/config";
import { UI } from "../../i18n/ui";

const ITEM_CLASS =
  "inline-flex h-[26px] items-center rounded-full px-[9px] transition-[color,background-color] duration-150 ease-out";
const ACTIVE_CLASS = `${ITEM_CLASS} bg-[var(--accent-soft)] text-[var(--text-accent)]`;
const LINK_CLASS = `${ITEM_CLASS} text-[var(--text-muted)] hover:bg-[color-mix(in_oklch,var(--text-heading)_8%,transparent)] hover:text-[var(--text-heading)]`;

interface LanguageToggleProps {
  lang: Lang;
}

export default function LanguageToggle({ lang }: LanguageToggleProps) {
  const ui = UI[lang];

  return (
    <div
      role="group"
      aria-label={ui.switchLanguage}
      className="inline-flex h-[34px] items-center gap-[2px] px-[2px] font-mono text-[11px] font-semibold tracking-[0.08em]"
    >
      {LANGS.map((code) =>
        code === lang ? (
          <span key={code} aria-current="true" title={ui.languageNames[code]} className={ACTIVE_CLASS}>
            {code.toUpperCase()}
          </span>
        ) : (
          <a
            key={code}
            href={localeHref(code)}
            lang={code}
            hrefLang={code}
            aria-label={ui.languageNames[code]}
            title={ui.languageNames[code]}
            className={LINK_CLASS}
          >
            {code.toUpperCase()}
          </a>
        ),
      )}
    </div>
  );
}

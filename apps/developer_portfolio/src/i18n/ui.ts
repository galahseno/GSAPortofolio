import type { Lang } from "./config";

export interface UiStrings {
  siteTitle: string;
  siteDescription: string;
  downloadCv: string;
  openMenu: string;
  closeMenu: string;
  switchTheme: string;
  switchLanguage: string;
  languageNames: Record<Lang, string>;
  footer: (year: number) => string;
  projectCoverAlt: (title: string) => string;
  projectCoverPlaceholder: (title: string) => string;
  projectLinkAria: (label: string, title: string) => string;
}

export const UI: Record<Lang, UiStrings> = {
  en: {
    siteTitle: "Galah Seno Adjie — Software Engineer",
    siteDescription:
      "Portfolio of Galah Seno Adjie, a mobile engineer building Android, iOS and cross-platform apps with Kotlin and Compose Multiplatform.",
    downloadCv: "Download CV",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchTheme: "Switch theme",
    switchLanguage: "Language",
    languageNames: { en: "English", id: "Bahasa Indonesia" },
    footer: (year) => `© ${year} Galah Seno Adjie — All rights reserved`,
    projectCoverAlt: (title) => `${title} cover`,
    projectCoverPlaceholder: (title) => `${title} — cover 16:10`,
    projectLinkAria: (label, title) => `${label} for ${title}`,
  },
  id: {
    siteTitle: "Galah Seno Adjie — Software Engineer",
    siteDescription:
      "Portofolio Galah Seno Adjie, seorang mobile engineer yang membangun aplikasi Android, iOS, dan lintas platform dengan Kotlin dan Compose Multiplatform.",
    downloadCv: "Unduh CV",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    switchTheme: "Ganti tema",
    switchLanguage: "Bahasa",
    languageNames: { en: "English", id: "Bahasa Indonesia" },
    footer: (year) => `© ${year} Galah Seno Adjie — Hak cipta dilindungi`,
    projectCoverAlt: (title) => `Sampul ${title}`,
    projectCoverPlaceholder: (title) => `${title} — sampul 16:10`,
    projectLinkAria: (label, title) => `${label} untuk ${title}`,
  },
};

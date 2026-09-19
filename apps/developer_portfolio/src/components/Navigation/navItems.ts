import type { Lang } from "../../i18n/config";

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_IDS = ["home", "about", "experience", "project", "contact"] as const;

type NavId = (typeof NAV_IDS)[number];

const LABELS: Record<Lang, Record<NavId, string>> = {
  en: {
    home: "Home",
    about: "About",
    experience: "Experience",
    project: "Projects",
    contact: "Contact",
  },
  id: {
    home: "Beranda",
    about: "Tentang",
    experience: "Pengalaman",
    project: "Proyek",
    contact: "Kontak",
  },
};

const build = (lang: Lang): NavItem[] => NAV_IDS.map((id) => ({ id, label: LABELS[lang][id] }));

export const NAV_ITEMS: Record<Lang, NavItem[]> = {
  en: build("en"),
  id: build("id"),
};

import { BASE_URL } from "../constants/paths";

export type Lang = "en" | "id";

export const LANGS: readonly Lang[] = ["en", "id"];
export const DEFAULT_LANG: Lang = "en";

export const OG_LOCALE: Record<Lang, string> = { en: "en_US", id: "id_ID" };

export function localeHref(lang: Lang): string {
  return lang === DEFAULT_LANG ? BASE_URL : `${BASE_URL}${lang}/`;
}

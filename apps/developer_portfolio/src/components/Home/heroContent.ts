import { BASE_URL } from "../../constants/paths";
import type { Lang } from "../../i18n/config";

export interface HeroContent {
  greetingLine: string;
  name: string;
  role: string;
  lead: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  resumeDownloadName: string;
}

const RESUME_FILE = "Galah-Seno-Adjie-Resume.pdf";
const RESUME = {
  resumeUrl: `${BASE_URL}resume/${RESUME_FILE}`,
  resumeDownloadName: RESUME_FILE,
};

const SHARED = {
  name: "Galah Seno Adjie",
  role: "Software Engineer",
  github: "https://github.com/galahseno",
  linkedin: "https://www.linkedin.com/in/galah-seno/",
  ...RESUME,
};

export const HERO_CONTENT: Record<Lang, HeroContent> = {
  en: {
    ...SHARED,
    greetingLine: "Hi, I'm",
    lead: "I design and build mobile apps (Android, iOS, Flutter and React Native), sharing business logic and UI across platforms with Kotlin/Compose Multiplatform. Currently building at Gaia Consultancy UK also Freelance Fullstack Mobile and Web App.",
  },
  id: {
    ...SHARED,
    greetingLine: "Halo, saya",
    lead: "Saya merancang dan membangun aplikasi mobile (Android, iOS, Flutter, dan React Native), berbagi logika bisnis dan UI lintas platform dengan Kotlin/Compose Multiplatform. Saat ini berkarya di Gaia Consultancy UK, sekaligus mengerjakan proyek Freelance Fullstack Mobile dan Web App.",
  },
};

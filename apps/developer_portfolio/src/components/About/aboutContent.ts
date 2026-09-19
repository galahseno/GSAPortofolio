import type { Lang } from "../../i18n/config";

export interface AboutSegment {
  text: string;
  strong?: boolean;
  href?: string;
}

export type AboutParagraph = AboutSegment[];

export interface AboutStat {
  value: string;
  label: string;
  sublabel?: string;
}

export interface AboutContent {
  ghost: string;
  eyebrow: string;
  paragraphs: AboutParagraph[];
  portraitAlt: string;
  location: string;
  pipeline: string[];
  stats: AboutStat[];
}

const TUMBAS_REPTILE_URL = "https://linktr.ee/tumbas.reptile";

export const ABOUT_CONTENT: Record<Lang, AboutContent> = {
  en: {
    ghost: "ABOUT",
    eyebrow: "About",
    paragraphs: [
      [
        { text: "I'm a mobile engineer with " },
        { text: "5 years of experience", strong: true },
        { text: ", starting with " },
        { text: "native Android in Kotlin", strong: true },
        { text: ". I'm " },
        { text: "certified in both Android and iOS development", strong: true },
        { text: ", and these days I specialize in " },
        { text: "Kotlin and Compose Multiplatform", strong: true },
        { text: " — one codebase, logic and UI shared everywhere." },
      ],
      [
        { text: "I ship apps " },
        { text: "end to end", strong: true },
        { text: " — from " },
        { text: "database modeling and REST API design", strong: true },
        { text: " through testing and release, with " },
        { text: "Clean Architecture", strong: true },
        {
          text: " and modularization so the codebase stays healthy as it grows.",
        },
      ],
      [
        { text: "Since 2021 I've also worked as an " },
        { text: "external code reviewer and assessor for Dicoding Indonesia", strong: true },
        {
          text: ", evaluating student projects across learning paths and grading exit interviews.",
        },
      ],
      [
        { text: "Away from the keyboard, I run " },
        { text: "Tumbas Reptile", strong: true, href: TUMBAS_REPTILE_URL },
        { text: " — I keep and breed ball pythons." },
      ],
    ],
    portraitAlt: "Portrait photograph of Galah Seno Adjie",
    location: "Central Java, Indonesia",
    pipeline: ["Design", "Develop", "Test", "Release", "Maintain"],
    stats: [
      { value: "5", label: "Years of experience" },
      { value: "10+", label: "Apps shipped" },
      { value: "5", label: "Platforms", sublabel: "Android · iOS · Desktop · Web · Backend" },
    ],
  },
  id: {
    ghost: "TENTANG",
    eyebrow: "Tentang",
    paragraphs: [
      [
        { text: "Saya seorang mobile engineer dengan " },
        { text: "pengalaman 5 tahun", strong: true },
        { text: ", yang memulai dari " },
        { text: "Android native dengan Kotlin", strong: true },
        { text: ". Saya " },
        { text: "bersertifikat di pengembangan Android maupun iOS", strong: true },
        { text: ", dan kini berfokus pada " },
        { text: "Kotlin dan Compose Multiplatform", strong: true },
        { text: " — satu codebase, logika dan UI dipakai di semua platform." },
      ],
      [
        { text: "Saya merilis aplikasi " },
        { text: "end to end", strong: true },
        { text: " — mulai dari " },
        { text: "pemodelan database dan desain REST API", strong: true },
        { text: " hingga pengujian dan rilis, dengan " },
        { text: "Clean Architecture", strong: true },
        {
          text: " dan modularisasi agar codebase tetap sehat seiring bertumbuh.",
        },
      ],
      [
        { text: "Sejak 2021 saya juga bekerja sebagai " },
        { text: "external code reviewer dan assessor untuk Dicoding Indonesia", strong: true },
        {
          text: ", mengevaluasi proyek siswa di berbagai learning path dan menilai exit interview.",
        },
      ],
      [
        { text: "Di luar keyboard, saya menjalankan " },
        { text: "Tumbas Reptile", strong: true, href: TUMBAS_REPTILE_URL },
        { text: " — saya memelihara dan membiakkan ball python." },
      ],
    ],
    portraitAlt: "Foto potret Galah Seno Adjie",
    location: "Jawa Tengah, Indonesia",
    pipeline: ["Desain", "Bangun", "Uji", "Rilis", "Pelihara"],
    stats: [
      { value: "5", label: "Tahun pengalaman" },
      { value: "10+", label: "Aplikasi dirilis" },
      { value: "5", label: "Platform", sublabel: "Android · iOS · Desktop · Web · Backend" },
    ],
  },
};

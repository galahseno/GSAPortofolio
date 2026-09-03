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

export const ABOUT_CONTENT: AboutContent = {
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
      {
        text: "Tumbas Reptile",
        strong: true,
        href: "https://linktr.ee/tumbas.reptile",
      },
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
};

export interface ExperienceRole {
  period: string;
  current: boolean;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

export interface ExperienceContent {
  ghost: string;
  eyebrow: string;
  roles: ExperienceRole[];
}

export const EXPERIENCE_CONTENT: ExperienceContent = {
  ghost: "EXPERIENCE",
  eyebrow: "Experience",
  roles: [
    {
      period: "Sep 2025 — Present",
      current: true,
      role: "Mobile Developer Specialist",
      company: "Gaia Consultancy UK LTD",
      description:
        "Comprehensive mobile development across Android, iOS, Flutter and React Native. I architect scalable mobile solutions and pick the stack that fits each project's requirements and business goals.",
      tags: ["Kotlin", "Swift/SwiftUI", "Flutter", "React Native", "KMP", "Compose Multiplatform"],
    },
    {
      period: "Jun 2026 — Oct 2026",
      current: false,
      role: "Software Engineer",
      company: "Danone Indonesia",
      description:
        "Built Lestari, a full-stack web and mobile platform for environmental project monitoring across four programs — Conservation, Regenerative Agriculture, WASH, and Biodiversity. Shipped dashboards, a carbon absorption calculator, offline field data tools, and led the migration to a unified Supabase backend with Clerk auth and in-app OTA updates.",
      tags: [
        "React.js",
        "Next.js",
        "TypeScript",
        "tRPC",
        "TanStack Query",
        "Tailwind CSS",
        "Supabase",
        "Drizzle ORM",
        "Neon (Postgres)",
        "React Native",
        "NativeWind",
        "Clerk",
      ],
    },
    {
      period: "Apr 2025 — Sep 2025",
      current: false,
      role: "Android Developer",
      company: "Lacak.io",
      description:
        "Refactored a client's Android codebase from monolith to modular, removing thousands of lines of duplicate code across two apps with similar domain logic, and built a cross-platform GPS-tracking app in React Native.",
      tags: [
        "Kotlin",
        "Jetpack Compose",
        "Hilt",
        "Coroutines",
        "Modularization",
        "Clean Code",
        "React Native",
        "Expo",
      ],
    },
    {
      period: "Nov 2024 — Present",
      current: true,
      role: "Assessor",
      company: "dev.cert",
      description:
        "End-to-end evaluation of Android developer certification projects against technical standards, including exit interviews to assess candidates' technical depth.",
      tags: ["Android", "Kotlin", "MVVM", "LiveData", "Room"],
    },
    {
      period: "Apr 2021 — Present",
      current: true,
      role: "External Code Reviewer",
      company: "Dicoding Indonesia",
      description:
        "Review student submission projects and give code reviews across the Android, iOS, Machine Learning and Data Science learning paths — evaluating, grading, writing feedback and handling discussion replies.",
      tags: ["Kotlin", "Swift", "Android Studio", "Xcode", "Python"],
    },
  ],
};

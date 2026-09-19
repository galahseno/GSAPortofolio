import type { Lang } from "../../i18n/config";

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

type RoleKey = "gaia" | "danone" | "lacak" | "devcert" | "dicoding";

const ROLE_ORDER: RoleKey[] = ["gaia", "danone", "lacak", "devcert", "dicoding"];

const SHARED: Record<RoleKey, Pick<ExperienceRole, "company" | "current" | "tags">> = {
  gaia: {
    company: "Gaia Consultancy UK LTD",
    current: true,
    tags: ["Kotlin", "Swift/SwiftUI", "Flutter", "React Native", "KMP", "Compose Multiplatform"],
  },
  danone: {
    company: "Danone Indonesia",
    current: false,
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
  lacak: {
    company: "Lacak.io",
    current: false,
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
  devcert: {
    company: "dev.cert",
    current: true,
    tags: ["Android", "Kotlin", "MVVM", "LiveData", "Room"],
  },
  dicoding: {
    company: "Dicoding Indonesia",
    current: true,
    tags: ["Kotlin", "Swift", "Android Studio", "Xcode", "Python"],
  },
};

interface RoleCopy {
  period: string;
  role: string;
  description: string;
}

interface ExperienceCopy {
  ghost: string;
  eyebrow: string;
  roles: Record<RoleKey, RoleCopy>;
}

const build = (copy: ExperienceCopy): ExperienceContent => ({
  ghost: copy.ghost,
  eyebrow: copy.eyebrow,
  roles: ROLE_ORDER.map((key) => ({ ...SHARED[key], ...copy.roles[key] })),
});

const COPY: Record<Lang, ExperienceCopy> = {
  en: {
    ghost: "EXPERIENCE",
    eyebrow: "Experience",
    roles: {
      gaia: {
        period: "Sep 2025 — Present",
        role: "Mobile Developer Specialist",
        description:
          "Comprehensive mobile development across Android, iOS, Flutter and React Native. I architect scalable mobile solutions and pick the stack that fits each project's requirements and business goals.",
      },
      danone: {
        period: "Jun 2026 — Oct 2026",
        role: "Software Engineer",
        description:
          "Built Lestari, a full-stack web and mobile platform for environmental project monitoring across four programs — Conservation, Regenerative Agriculture, WASH, and Biodiversity. Shipped dashboards, a carbon absorption calculator, offline field data tools, and led the migration to a unified Supabase backend with Clerk auth and in-app OTA updates.",
      },
      lacak: {
        period: "Apr 2025 — Sep 2025",
        role: "Android Developer",
        description:
          "Refactored a client's Android codebase from monolith to modular, removing thousands of lines of duplicate code across two apps with similar domain logic, and built a cross-platform GPS-tracking app in React Native.",
      },
      devcert: {
        period: "Nov 2024 — Present",
        role: "Assessor",
        description:
          "End-to-end evaluation of Android developer certification projects against technical standards, including exit interviews to assess candidates' technical depth.",
      },
      dicoding: {
        period: "Apr 2021 — Present",
        role: "External Code Reviewer",
        description:
          "Review student submission projects and give code reviews across the Android, iOS, Machine Learning and Data Science learning paths — evaluating, grading, writing feedback and handling discussion replies.",
      },
    },
  },
  id: {
    ghost: "PENGALAMAN",
    eyebrow: "Pengalaman",
    roles: {
      gaia: {
        period: "Sep 2025 — Sekarang",
        role: "Mobile Developer Specialist",
        description:
          "Pengembangan mobile menyeluruh di Android, iOS, Flutter, dan React Native. Saya merancang arsitektur solusi mobile yang scalable dan memilih stack yang paling cocok dengan kebutuhan serta tujuan bisnis tiap proyek.",
      },
      danone: {
        period: "Jun 2026 — Oct 2026",
        role: "Software Engineer",
        description:
          "Membangun Lestari, platform web dan mobile full-stack untuk pemantauan proyek lingkungan di empat program — Conservation, Regenerative Agriculture, WASH, dan Biodiversity. Merilis dashboard, kalkulator serapan karbon, dan tools data lapangan offline, serta memimpin migrasi ke backend Supabase terpadu dengan autentikasi Clerk dan pembaruan OTA di dalam aplikasi.",
      },
      lacak: {
        period: "Apr 2025 — Sep 2025",
        role: "Android Developer",
        description:
          "Merefaktor codebase Android milik klien dari monolit menjadi modular, menghapus ribuan baris kode duplikat di dua aplikasi dengan logika domain serupa, dan membangun aplikasi pelacakan GPS lintas platform dengan React Native.",
      },
      devcert: {
        period: "Nov 2024 — Sekarang",
        role: "Assessor",
        description:
          "Evaluasi end-to-end proyek sertifikasi developer Android terhadap standar teknis, termasuk exit interview untuk menilai kedalaman teknis kandidat.",
      },
      dicoding: {
        period: "Apr 2021 — Sekarang",
        role: "External Code Reviewer",
        description:
          "Meninjau proyek submission siswa dan memberikan code review di learning path Android, iOS, Machine Learning, dan Data Science — mengevaluasi, menilai, menulis feedback, dan membalas diskusi.",
      },
    },
  },
};

export const EXPERIENCE_CONTENT: Record<Lang, ExperienceContent> = {
  en: build(COPY.en),
  id: build(COPY.id),
};

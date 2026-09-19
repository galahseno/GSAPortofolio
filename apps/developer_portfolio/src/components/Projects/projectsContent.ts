import type { Lang } from "../../i18n/config";

export type ProjectCategory = "company" | "side" | "course" | "collab";
export type ProjectLinkIcon = "github" | "globe" | "apple" | "google-play";

export interface ProjectLink {
  label: string;
  href: string;
  icon: ProjectLinkIcon;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  platform: string;
  org?: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  cover?: string;
}

export interface ProjectGroup {
  id: ProjectCategory;
  label: string;
  projects: Project[];
}

export interface ProjectsContent {
  ghost: string;
  eyebrow: string;
  groups: ProjectGroup[];
}

type ProjectSlug =
  | "lestari"
  | "daily-refuge"
  | "qrcraft"
  | "notemark"
  | "spendless"
  | "snoozeloo"
  | "storyact"
  | "chirp-extended"
  | "chirp-api-extended"
  | "lazypizza"
  | "platform-sync";

interface ProjectBase {
  title: string;
  year: string;
  cover?: string;
  tags: string[];
  links: { href: string; icon: ProjectLinkIcon }[];
}

const BASE: Record<ProjectSlug, ProjectBase> = {
  lestari: {
    title: "Lestari",
    year: "Jun — Oct 2026",
    cover: "lestari.jpg",
    tags: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Tailwind CSS",
      "Supabase",
      "Drizzle ORM",
      "Clerk",
      "Expo",
      "React Native",
      "NativeWind",
    ],
    links: [
      { href: "https://www.lestariapp.id/", icon: "globe" },
      {
        href: "https://play.google.com/store/apps/details?id=com.ddevitoox.lestarisuperapp&hl=en_US",
        icon: "google-play",
      },
    ],
  },
  "daily-refuge": {
    title: "Daily Refuge",
    year: "Mar — May 2026",
    cover: "daily-refuge.jpg",
    tags: [
      "Capacitor",
      "React",
      "TypeScript",
      "Vite",
      "RevenueCat",
      "Local Notifications",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    links: [
      { href: "https://apps.apple.com/id/app/daily-refuge/id6761103450", icon: "apple" },
      {
        href: "https://play.google.com/store/apps/details?id=uk.co.dailyrefuge&hl=en_US",
        icon: "google-play",
      },
    ],
  },
  qrcraft: {
    title: "QRCraft",
    year: "2025 — 2026",
    cover: "qrcraft.jpg",
    tags: [
      "Jetpack Compose",
      "MVI",
      "Koin",
      "CameraX",
      "ML Kit",
      "ZXing",
      "Room",
      "Adaptive layouts",
    ],
    links: [{ href: "https://github.com/galahseno/QRCraft", icon: "github" }],
  },
  notemark: {
    title: "NoteMark",
    year: "2025",
    cover: "notemark.jpg",
    tags: [
      "Jetpack Compose",
      "MVI",
      "Multi-module",
      "Koin",
      "Room",
      "Ktor",
      "WorkManager",
      "Offline-first",
    ],
    links: [{ href: "https://github.com/galahseno/NoteMark", icon: "github" }],
  },
  spendless: {
    title: "SpendLess",
    year: "2025",
    cover: "spendless.jpg",
    tags: [
      "Jetpack Compose",
      "Clean Architecture",
      "MVI",
      "Koin",
      "Room",
      "SQLCipher",
      "Biometric",
      "Glance",
    ],
    links: [{ href: "https://github.com/galahseno/SpendLess", icon: "github" }],
  },
  snoozeloo: {
    title: "Snoozeloo",
    year: "2025",
    cover: "snoozeloo.jpg",
    tags: [
      "Jetpack Compose",
      "MVI",
      "Koin",
      "Room",
      "Kotlin Flow",
      "Compose Navigation",
      "Edge-to-edge",
    ],
    links: [{ href: "https://github.com/galahseno/Snoozeloo", icon: "github" }],
  },
  storyact: {
    title: "StoryAct",
    year: "Jul — Aug 2024",
    cover: "storyact.png",
    tags: [
      "Jetpack Compose",
      "Clean Architecture",
      "MVI",
      "Multi-module",
      "Dynamic Feature",
      "Koin",
      "Ktor",
      "Room",
      "Glance",
      "JUnit5",
    ],
    links: [{ href: "https://github.com/galahseno/StoryAct", icon: "github" }],
  },
  "chirp-extended": {
    title: "Chirp Extended",
    year: "2026",
    cover: "chirp.png",
    tags: [
      "Kotlin Multiplatform",
      "Compose Multiplatform",
      "Koin",
      "Ktor",
      "Room",
      "Coil",
      "Firebase Messaging",
      "Adaptive layouts",
      "Convention plugins",
    ],
    links: [{ href: "https://github.com/galahseno/Chirp-Extended", icon: "github" }],
  },
  "chirp-api-extended": {
    title: "Chirp API Extended",
    year: "2026",
    cover: "chirp.png",
    tags: [
      "Spring Boot",
      "Kotlin",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "WebSocket",
      "JWT",
      "Firebase Admin",
      "Thymeleaf",
      "Multi-module",
    ],
    links: [{ href: "https://github.com/galahseno/Chirp-Api-Extended", icon: "github" }],
  },
  lazypizza: {
    title: "LazyPizza",
    year: "2025",
    cover: "lazypizza.jpg",
    tags: [
      "Jetpack Compose",
      "MVI",
      "Koin",
      "Ktor",
      "Room",
      "Coil",
      "Firebase",
      "Adaptive layouts",
    ],
    links: [{ href: "https://github.com/ismaelcordon/LazyPizza", icon: "github" }],
  },
  "platform-sync": {
    title: "Platform Sync",
    year: "2025",
    cover: "platform-sync.png",
    tags: [
      "Kotlin",
      "TypeScript",
      "IntelliJ Platform",
      "VS Code Extension",
      "WebSocket",
      "Gradle",
    ],
    links: [{ href: "https://github.com/dicodingacademy/platform-sync", icon: "github" }],
  },
};

/** Group membership and display order. */
const GROUPS: { id: ProjectCategory; slugs: ProjectSlug[] }[] = [
  { id: "company", slugs: ["lestari", "daily-refuge"] },
  { id: "side", slugs: ["qrcraft", "notemark", "spendless", "snoozeloo", "storyact"] },
  { id: "course", slugs: ["chirp-extended", "chirp-api-extended"] },
  { id: "collab", slugs: ["lazypizza", "platform-sync"] },
];

interface ProjectCopy {
  platform: string;
  org?: string;
  description: string;
}

interface ProjectsCopy {
  ghost: string;
  eyebrow: string;
  groupLabels: Record<ProjectCategory, string>;
  linkLabels: Record<ProjectLinkIcon, string>;
  projects: Record<ProjectSlug, ProjectCopy>;
}

const build = (copy: ProjectsCopy): ProjectsContent => ({
  ghost: copy.ghost,
  eyebrow: copy.eyebrow,
  groups: GROUPS.map(({ id, slugs }) => ({
    id,
    label: copy.groupLabels[id],
    projects: slugs.map((slug) => {
      const { links, ...base } = BASE[slug];
      return {
        slug,
        ...base,
        ...copy.projects[slug],
        links: links.map((link) => ({ ...link, label: copy.linkLabels[link.icon] })),
      };
    }),
  })),
});

const COPY: Record<Lang, ProjectsCopy> = {
  en: {
    ghost: "PROJECTS",
    eyebrow: "Projects",
    groupLabels: {
      company: "Company Client",
      side: "Side Projects",
      course: "Course Projects",
      collab: "Collaboration & Open Source",
    },
    linkLabels: {
      globe: "Live site",
      github: "Source code",
      apple: "App Store",
      "google-play": "Google Play",
    },
    projects: {
      lestari: {
        platform: "Web + Mobile",
        org: "Danone",
        description:
          "Impact monitoring platform for Danone's environmental programs: Conservation, Regenerative Agriculture, WASH and Biodiversity. A web app handles dashboards, impact reports and admin. A mobile app collects field data offline — GPS, tree measurements, water readings, QR check-in and photo evidence.",
      },
      "daily-refuge": {
        platform: "iOS + Android",
        org: "GAIA Consultancy UK Ltd",
        description:
          "Sobriety and recovery companion for iOS and Android. I wrapped the existing React web app in a native shell with Capacitor, then added in-app subscriptions and recovery reminders. I also took it through App Store and Google Play submission.",
      },
      qrcraft: {
        platform: "Android — Kotlin",
        description:
          "A camera-first QR scanner with live preview and instant detection. Results show the content type, with share and copy actions. You can also create six kinds of QR code — text, link, contact, phone, geolocation and Wi-Fi.",
      },
      notemark: {
        platform: "Android — Kotlin",
        description:
          "An offline-first note-taking app. Notes live on the device and sync on your schedule — every 15 or 30 minutes, hourly, or manually. Edits save automatically once you stop typing.",
      },
      spendless: {
        platform: "Android — Kotlin",
        description:
          "A secure finance tracker. PIN and biometric login come with session expiry and lockout, and local data is encrypted. Track income, expenses and recurring transactions, export to CSV or PDF, or add one from a home-screen widget.",
      },
      snoozeloo: {
        platform: "Android — Kotlin",
        description:
          "An alarm clock app. Alarms can be named, scheduled and given their own ringtone, and each one opens a dedicated screen when it rings.",
      },
      storyact: {
        platform: "Android — Kotlin",
        org: "Dicoding Android Expert Class",
        description:
          "A mobile storytelling app, built as the final submission for the Dicoding Android Expert Class. Clean Architecture splits it into Data, Domain and Presentation modules, with MVI in the UI layer. It also ships a dynamic-feature favorites module, a Glance widget and a unit and integration test suite.",
      },
      "chirp-extended": {
        platform: "Android + iOS + Desktop",
        org: "Extended from philipplackner/Chirp",
        description:
          "My extended version of Philipp Lackner's Chirp course project: a chat app for Android, iOS and desktop from one Kotlin Multiplatform codebase. The UI is shared in Compose Multiplatform with adaptive layouts, backed by Room and Firebase push notifications. Feature and core modules share Gradle convention plugins.",
      },
      "chirp-api-extended": {
        platform: "Backend — Kotlin",
        org: "Extended from philipplackner/chirp-api",
        description:
          "The backend for Chirp, extended from Philipp Lackner's course project. A modular Spring Boot service with JWT auth, WebSocket chat, RabbitMQ messaging, Redis rate limiting, and email and push notifications. My addition: the verification email is sent automatically on a login attempt.",
      },
      lazypizza: {
        platform: "Android — Kotlin",
        org: "3-developer community build",
        description:
          "An online pizza delivery app built with two other community developers. Browse the menu, customise toppings and pick an earliest or scheduled pickup time. Orders are stored in Firebase and listed in a history screen.",
      },
      "platform-sync": {
        platform: "Developer tooling",
        org: "Dicoding Indonesia",
        description:
          "A code review tool that syncs file and cursor position between your IDE and the Dicoding Review Platform. It ships as an IntelliJ / Android Studio plugin and a VS Code extension. My contribution was a build-compatibility update.",
      },
    },
  },
  id: {
    ghost: "PROYEK",
    eyebrow: "Proyek",
    groupLabels: {
      company: "Perusahaan & Klien",
      side: "Proyek Sampingan",
      course: "Proyek Kursus",
      collab: "Kolaborasi & Open Source",
    },
    linkLabels: {
      globe: "Situs web",
      github: "Kode sumber",
      apple: "App Store",
      "google-play": "Google Play",
    },
    projects: {
      lestari: {
        platform: "Web + Mobile",
        org: "Danone",
        description:
          "Platform pemantauan dampak untuk program lingkungan Danone: Conservation, Regenerative Agriculture, WASH, dan Biodiversity. Aplikasi web menangani dashboard, laporan dampak, dan admin. Aplikasi mobile mengumpulkan data lapangan secara offline — GPS, pengukuran pohon, pembacaan air, check-in QR, dan bukti foto.",
      },
      "daily-refuge": {
        platform: "iOS + Android",
        org: "GAIA Consultancy UK Ltd",
        description:
          "Aplikasi pendamping sobriety dan pemulihan untuk iOS dan Android. Saya membungkus aplikasi web React yang sudah ada ke dalam shell native dengan Capacitor, lalu menambahkan langganan in-app dan pengingat pemulihan. Saya juga mengurus proses submission ke App Store dan Google Play.",
      },
      qrcraft: {
        platform: "Android — Kotlin",
        description:
          "Pemindai QR yang mengutamakan kamera, dengan pratinjau langsung dan deteksi instan. Hasil menampilkan jenis konten, lengkap dengan aksi bagikan dan salin. Anda juga bisa membuat enam jenis kode QR — teks, tautan, kontak, telepon, geolokasi, dan Wi-Fi.",
      },
      notemark: {
        platform: "Android — Kotlin",
        description:
          "Aplikasi catatan yang mengutamakan offline (offline-first). Catatan tersimpan di perangkat dan disinkronkan sesuai jadwal Anda — setiap 15 atau 30 menit, tiap jam, atau manual. Perubahan tersimpan otomatis begitu Anda berhenti mengetik.",
      },
      spendless: {
        platform: "Android — Kotlin",
        description:
          "Pelacak keuangan yang aman. Login dengan PIN dan biometrik dilengkapi masa berlaku sesi dan penguncian, dan data lokal dienkripsi. Catat pemasukan, pengeluaran, dan transaksi berulang, ekspor ke CSV atau PDF, atau tambahkan transaksi dari widget layar utama.",
      },
      snoozeloo: {
        platform: "Android — Kotlin",
        description:
          "Aplikasi jam alarm. Alarm dapat diberi nama, dijadwalkan, dan diberi nada dering sendiri, dan tiap alarm membuka layar khusus saat berbunyi.",
      },
      storyact: {
        platform: "Android — Kotlin",
        org: "Dicoding Android Expert Class",
        description:
          "Aplikasi bercerita mobile, dibuat sebagai submission akhir Dicoding Android Expert Class. Clean Architecture membaginya menjadi modul Data, Domain, dan Presentation, dengan MVI di lapisan UI. Aplikasi ini juga menyertakan modul favorit dynamic-feature, widget Glance, serta rangkaian unit dan integration test.",
      },
      "chirp-extended": {
        platform: "Android + iOS + Desktop",
        org: "Dikembangkan dari philipplackner/Chirp",
        description:
          "Versi pengembangan saya dari proyek kursus Chirp milik Philipp Lackner: aplikasi chat untuk Android, iOS, dan desktop dari satu codebase Kotlin Multiplatform. UI dibagi bersama dengan Compose Multiplatform lengkap dengan adaptive layout, didukung Room dan push notification Firebase. Modul feature dan core berbagi Gradle convention plugin.",
      },
      "chirp-api-extended": {
        platform: "Backend — Kotlin",
        org: "Dikembangkan dari philipplackner/chirp-api",
        description:
          "Backend untuk Chirp, dikembangkan dari proyek kursus Philipp Lackner. Layanan Spring Boot modular dengan autentikasi JWT, chat WebSocket, messaging RabbitMQ, rate limiting Redis, serta notifikasi email dan push. Tambahan dari saya: email verifikasi dikirim otomatis saat ada percobaan login.",
      },
      lazypizza: {
        platform: "Android — Kotlin",
        org: "Proyek komunitas 3 developer",
        description:
          "Aplikasi pesan-antar pizza online yang dibangun bersama dua developer komunitas lainnya. Telusuri menu, atur topping, dan pilih waktu pengambilan tercepat atau terjadwal. Pesanan disimpan di Firebase dan ditampilkan di layar riwayat.",
      },
      "platform-sync": {
        platform: "Developer tooling",
        org: "Dicoding Indonesia",
        description:
          "Alat code review yang menyinkronkan file dan posisi kursor antara IDE Anda dan Dicoding Review Platform. Tersedia sebagai plugin IntelliJ / Android Studio dan ekstensi VS Code. Kontribusi saya adalah pembaruan kompatibilitas build.",
      },
    },
  },
};

export const PROJECTS_CONTENT: Record<Lang, ProjectsContent> = {
  en: build(COPY.en),
  id: build(COPY.id),
};

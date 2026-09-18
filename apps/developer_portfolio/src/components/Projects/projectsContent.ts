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
  /** Filename inside src/assets/projects/. Leave undefined to show the dashed placeholder. */
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

export const PROJECTS_CONTENT: ProjectsContent = {
  ghost: "PROJECTS",
  eyebrow: "Projects",
  groups: [
    {
      id: "company",
      label: "Company & Client",
      projects: [
        {
          slug: "lestari",
          cover: "lestari.jpg",
          title: "Lestari",
          year: "Jun — Oct 2026",
          platform: "Web + Mobile",
          org: "Danone",
          description:
            "Impact monitoring platform for Danone's environmental programs: Conservation, Regenerative Agriculture, WASH and Biodiversity. A web app handles dashboards, impact reports and admin. A mobile app collects field data offline — GPS, tree measurements, water readings, QR check-in and photo evidence.",
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
            { label: "Live site", href: "https://www.lestariapp.id/", icon: "globe" },
            {
              label: "Google Play",
              href: "https://play.google.com/store/apps/details?id=com.ddevitoox.lestarisuperapp&hl=en_US",
              icon: "google-play",
            },
          ],
        },
        {
          slug: "daily-refuge",
          cover: "daily-refuge.jpg",
          title: "Daily Refuge",
          year: "Mar — May 2026",
          platform: "iOS + Android",
          org: "GAIA Consultancy UK Ltd",
          description:
            "Sobriety and recovery companion for iOS and Android. I wrapped the existing React web app in a native shell with Capacitor, then added in-app subscriptions and recovery reminders. I also took it through App Store and Google Play submission.",
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
            {
              label: "App Store",
              href: "https://apps.apple.com/id/app/daily-refuge/id6761103450",
              icon: "apple",
            },
            {
              label: "Google Play",
              href: "https://play.google.com/store/apps/details?id=uk.co.dailyrefuge&hl=en_US",
              icon: "google-play",
            },
          ],
        },
      ],
    },
    {
      id: "side",
      label: "Side Projects",
      projects: [
        {
          slug: "qrcraft",
          cover: "qrcraft.jpg",
          title: "QRCraft",
          year: "2025 — 2026",
          platform: "Android — Kotlin",
          description:
            "A camera-first QR scanner with live preview and instant detection. Results show the content type, with share and copy actions. You can also create six kinds of QR code — text, link, contact, phone, geolocation and Wi-Fi.",
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
          links: [
            { label: "Source code", href: "https://github.com/galahseno/QRCraft", icon: "github" },
          ],
        },
        {
          slug: "notemark",
          cover: "notemark.jpg",
          title: "NoteMark",
          year: "2025",
          platform: "Android — Kotlin",
          description:
            "An offline-first note-taking app. Notes live on the device and sync on your schedule — every 15 or 30 minutes, hourly, or manually. Edits save automatically once you stop typing.",
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
          links: [
            { label: "Source code", href: "https://github.com/galahseno/NoteMark", icon: "github" },
          ],
        },
        {
          slug: "spendless",
          cover: "spendless.jpg",
          title: "SpendLess",
          year: "2025",
          platform: "Android — Kotlin",
          description:
            "A secure finance tracker. PIN and biometric login come with session expiry and lockout, and local data is encrypted. Track income, expenses and recurring transactions, export to CSV or PDF, or add one from a home-screen widget.",
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
          links: [
            { label: "Source code", href: "https://github.com/galahseno/SpendLess", icon: "github" },
          ],
        },
        {
          slug: "snoozeloo",
          cover: "snoozeloo.jpg",
          title: "Snoozeloo",
          year: "2025",
          platform: "Android — Kotlin",
          description:
            "An alarm clock app. Alarms can be named, scheduled and given their own ringtone, and each one opens a dedicated screen when it rings.",
          tags: [
            "Jetpack Compose",
            "MVI",
            "Koin",
            "Room",
            "Kotlin Flow",
            "Compose Navigation",
            "Edge-to-edge",
          ],
          links: [
            { label: "Source code", href: "https://github.com/galahseno/Snoozeloo", icon: "github" },
          ],
        },
        {
          slug: "storyact",
          cover: "storyact.png",
          title: "StoryAct",
          year: "Jul — Aug 2024",
          platform: "Android — Kotlin",
          org: "Dicoding Android Expert Class",
          description:
            "A mobile storytelling app, built as the final submission for the Dicoding Android Expert Class. Clean Architecture splits it into Data, Domain and Presentation modules, with MVI in the UI layer. It also ships a dynamic-feature favorites module, a Glance widget and a unit and integration test suite.",
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
          links: [
            { label: "Source code", href: "https://github.com/galahseno/StoryAct", icon: "github" },
          ],
        },
      ],
    },
    {
      id: "course",
      label: "Course Projects",
      projects: [
        {
          slug: "chirp-extended",
          cover: "chirp.png",
          title: "Chirp Extended",
          year: "2026",
          platform: "Android + iOS + Desktop",
          org: "Extended from philipplackner/Chirp",
          description:
            "My extended version of Philipp Lackner's Chirp course project: a chat app for Android, iOS and desktop from one Kotlin Multiplatform codebase. The UI is shared in Compose Multiplatform with adaptive layouts, backed by Room and Firebase push notifications. Feature and core modules share Gradle convention plugins.",
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
          links: [
            {
              label: "Source code",
              href: "https://github.com/galahseno/Chirp-Extended",
              icon: "github",
            },
          ],
        },
        {
          slug: "chirp-api-extended",
          cover: "chirp.png",
          title: "Chirp API Extended",
          year: "2026",
          platform: "Backend — Kotlin",
          org: "Extended from philipplackner/chirp-api",
          description:
            "The backend for Chirp, extended from Philipp Lackner's course project. A modular Spring Boot service with JWT auth, WebSocket chat, RabbitMQ messaging, Redis rate limiting, and email and push notifications. My addition: the verification email is sent automatically on a login attempt.",
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
          links: [
            {
              label: "Source code",
              href: "https://github.com/galahseno/Chirp-Api-Extended",
              icon: "github",
            },
          ],
        },
      ],
    },
    {
      id: "collab",
      label: "Collaboration & Open Source",
      projects: [
        {
          slug: "lazypizza",
          cover: "lazypizza.jpg",
          title: "LazyPizza",
          year: "2025",
          platform: "Android — Kotlin",
          org: "3-developer community build",
          description:
            "An online pizza delivery app built with two other community developers. Browse the menu, customise toppings and pick an earliest or scheduled pickup time. Orders are stored in Firebase and listed in a history screen.",
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
          links: [
            {
              label: "Source code",
              href: "https://github.com/ismaelcordon/LazyPizza",
              icon: "github",
            },
          ],
        },
        {
          slug: "platform-sync",
          cover: "platform-sync.png",
          title: "Platform Sync",
          year: "2025",
          platform: "Developer tooling",
          org: "Dicoding Indonesia",
          description:
            "A code review tool that syncs file and cursor position between your IDE and the Dicoding Review Platform. It ships as an IntelliJ / Android Studio plugin and a VS Code extension. My contribution was a build-compatibility update.",
          tags: [
            "Kotlin",
            "TypeScript",
            "IntelliJ Platform",
            "VS Code Extension",
            "WebSocket",
            "Gradle",
          ],
          links: [
            {
              label: "Source code",
              href: "https://github.com/dicodingacademy/platform-sync",
              icon: "github",
            },
          ],
        },
      ],
    },
  ],
};

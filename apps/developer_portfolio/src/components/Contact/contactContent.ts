import type { Lang } from "../../i18n/config";

export const NEED_KEYS = [
  "crossplatform",
  "android",
  "ios",
  "desktop",
  "web",
  "backend",
  "consulting",
  "other",
] as const;

export type NeedKey = (typeof NEED_KEYS)[number];

export interface NeedOption {
  value: NeedKey;
  label: string;
}

export interface ContactFormCopy {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailInvalid: string;
  needLabel: string;
  needOptions: NeedOption[];
  messageLabel: string;
  messagePlaceholder: string;
  sendLabel: string;
  sendingLabel: string;
  replyNote: string;
}

export interface ContactContent {
  ghost: string;
  eyebrow: string;
  title: string;
  intro: string;
  email: string;
  copyEmail: string;
  emailCopied: string;
  location: string;
  availability: string;
  form: ContactFormCopy;
  toast: {
    messageSent: string;
    messageFailed: string;
  };
}

const EMAIL = "galahsenoadjie@gmail.com";

const NEED_LABELS: Record<Lang, Record<NeedKey, string>> = {
  en: {
    crossplatform: "Crossplatform/Multiplatform app",
    android: "Android app",
    ios: "iOS app",
    desktop: "Desktop App",
    web: "Web App",
    backend: "API + Backend",
    consulting: "Consulting / Review",
    other: "Something else",
  },
  id: {
    crossplatform: "Aplikasi crossplatform/multiplatform",
    android: "Aplikasi Android",
    ios: "Aplikasi iOS",
    desktop: "Aplikasi Desktop",
    web: "Aplikasi Web",
    backend: "API + Backend",
    consulting: "Konsultasi / Review",
    other: "Lainnya",
  },
};

const needOptions = (lang: Lang): NeedOption[] =>
  NEED_KEYS.map((value) => ({ value, label: NEED_LABELS[lang][value] }));

export const CONTACT_CONTENT: Record<Lang, ContactContent> = {
  en: {
    ghost: "CONTACT",
    eyebrow: "Get in touch",
    title: "Tell me what you're building.",
    intro:
      "Have a project in mind, or a question about my work? One or two sentences is plenty.",
    email: EMAIL,
    copyEmail: "Copy email address",
    emailCopied: "Copied",
    location: "Central Java, Indonesia",
    availability: "Available for freelance and consulting",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      emailInvalid: "Please enter a valid email address.",
      needLabel: "What do you need?",
      needOptions: needOptions("en"),
      messageLabel: "Message",
      messagePlaceholder: "What are you building?",
      sendLabel: "Send message",
      sendingLabel: "Sending…",
      replyNote: "Reply within 2 working days",
    },
    toast: {
      messageSent: "Message sent — I'll be in touch",
      messageFailed: "There was a problem sending your message",
    },
  },
  id: {
    ghost: "KONTAK",
    eyebrow: "Hubungi saya",
    title: "Ceritakan apa yang sedang Anda bangun.",
    intro:
      "Punya proyek dalam pikiran, atau pertanyaan tentang karya saya? Satu atau dua kalimat sudah cukup.",
    email: EMAIL,
    copyEmail: "Salin alamat email",
    emailCopied: "Tersalin",
    location: "Jawa Tengah, Indonesia",
    availability: "Tersedia untuk freelance dan konsultasi",
    form: {
      nameLabel: "Nama",
      namePlaceholder: "Nama Anda",
      emailLabel: "Email",
      emailPlaceholder: "anda@perusahaan.com",
      emailInvalid: "Masukkan alamat email yang valid.",
      needLabel: "Apa yang Anda butuhkan?",
      needOptions: needOptions("id"),
      messageLabel: "Pesan",
      messagePlaceholder: "Apa yang sedang Anda bangun?",
      sendLabel: "Kirim pesan",
      sendingLabel: "Mengirim…",
      replyNote: "Balasan dalam 2 hari kerja",
    },
    toast: {
      messageSent: "Pesan terkirim — saya akan segera menghubungi Anda",
      messageFailed: "Terjadi masalah saat mengirim pesan Anda",
    },
  },
};

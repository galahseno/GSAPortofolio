export interface ContactFormCopy {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailInvalid: string;
  needLabel: string;
  needOptions: string[];
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
  location: string;
  availability: string;
  form: ContactFormCopy;
  toast: {
    messageSent: string;
    messageFailed: string;
  };
}

export const CONTACT_CONTENT: ContactContent = {
  ghost: "CONTACT",
  eyebrow: "Get in touch",
  title: "Tell me what you're building.",
  intro:
    "Have a project in mind, or a question about my work? One or two sentences is plenty.",
  email: "galahsenoadjie@gmail.com",
  location: "Central Java, Indonesia",
  availability: "Available for freelance and consulting",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    emailInvalid: "Please enter a valid email address.",
    needLabel: "What do you need?",
    needOptions: [
      "Crossplatform/Multiplatform app",
      "Android app",
      "iOS app",
      "Desktop App",
      "Web App",
      "API + Backend",
      "Consulting / Review",
      "Something else",
    ],
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
};

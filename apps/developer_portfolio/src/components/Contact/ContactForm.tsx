import { useRef, useState } from "react";
import { SPRITE_URL } from "../../constants/paths";
import { sendContactMessage } from "../../services/contactService";
import { CONTACT_CONTENT } from "./contactContent";
import { SelectField } from "./components/SelectField";
import { TextAreaField } from "./components/TextAreaField";
import { TextField } from "./components/TextField";
import { ToastPill } from "./ToastPill";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { form, toast } = CONTACT_CONTENT;

  const [values, setValues] = useState({
    name: "",
    email: "",
    need: form.needOptions[0],
    message: "",
  });
  const [emailTouched, setEmailTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [hoveringSubmit, setHoveringSubmit] = useState(false);
  const [toastState, setToastState] = useState<{ message: string; tone: "success" | "danger" } | null>(
    null,
  );
  const toastTimerRef = useRef<number | null>(null);

  const isEmailValid = EMAIL_REGEX.test(values.email);
  const showEmailError = emailTouched && !isEmailValid;
  const isFormComplete =
    values.name.trim() !== "" && values.email.trim() !== "" && values.message.trim() !== "";
  const isSubmitDisabled = sending || !isFormComplete || !isEmailValid;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitDisabled) return;

    setSending(true);
    try {
      await sendContactMessage(values);
      setValues({ name: "", email: "", need: form.needOptions[0], message: "" });
      setEmailTouched(false);
      setToastState({ message: toast.messageSent, tone: "success" });
    } catch {
      setToastState({ message: toast.messageFailed, tone: "danger" });
    } finally {
      setSending(false);
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToastState(null), 3200);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "var(--space-8)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--grad-bloom)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <form
        onSubmit={handleSubmit}
        style={{ position: "relative", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          <TextField
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder={form.namePlaceholder}
            value={values.name}
            onChange={handleChange}
            label={form.nameLabel}
          />
          <TextField
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={form.emailPlaceholder}
            value={values.email}
            onChange={handleChange}
            onBlur={() => setEmailTouched(true)}
            label={form.emailLabel}
            error={showEmailError ? form.emailInvalid : undefined}
          />
        </div>

        <SelectField
          id="contact-need"
          name="need"
          label={form.needLabel}
          options={form.needOptions}
          value={values.need}
          onChange={handleChange}
        />

        <TextAreaField
          id="contact-message"
          name="message"
          label={form.messageLabel}
          rows={6}
          required
          placeholder={form.messagePlaceholder}
          value={values.message}
          onChange={handleChange}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--space-4)",
            marginTop: "var(--space-2)",
          }}
        >
          <button
            type="submit"
            disabled={isSubmitDisabled}
            onMouseEnter={() => setHoveringSubmit(true)}
            onMouseLeave={() => setHoveringSubmit(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-3)",
              height: 48,
              padding: "0 var(--space-6)",
              background: hoveringSubmit && !isSubmitDisabled ? "var(--accent-hover)" : "var(--accent)",
              color: "var(--text-on-accent)",
              border: "1px solid transparent",
              boxShadow: hoveringSubmit && !isSubmitDisabled ? "var(--shadow-accent)" : "var(--shadow-sm)",
              fontFamily: "var(--font-core)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--weight-medium)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: 1,
              borderRadius: "var(--radius-control)",
              cursor: isSubmitDisabled ? "not-allowed" : "pointer",
              opacity: isSubmitDisabled ? 0.45 : 1,
              transition: "var(--transition-control)",
              whiteSpace: "nowrap",
            }}
          >
            {sending ? form.sendingLabel : form.sendLabel}
            <svg aria-hidden="true" width="17" height="17" style={{ flex: "none" }}>
              <use href={`${SPRITE_URL}#arrow-right-icon`} />
            </svg>
          </button>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
            }}
          >
            {form.replyNote}
          </span>
        </div>
      </form>
      <ToastPill message={toastState?.message ?? null} tone={toastState?.tone} />
    </div>
  );
}

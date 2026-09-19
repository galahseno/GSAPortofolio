import type { Lang } from "../i18n/config";

export interface ContactPayload {
  name: string;
  email: string;
  need: string;
  needLabel: string;
  message: string;
  lang: Lang;
  botcheck: boolean;
}

export interface ContactResponse {
  ok: boolean;
}

const ENDPOINT = "https://api.web3forms.com/submit";

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) throw new Error("PUBLIC_WEB3FORMS_KEY is not set");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio contact — ${payload.needLabel} — ${payload.name}`,
      from_name: "GSA Portfolio",
      replyto: payload.email,
      botcheck: payload.botcheck,
      name: payload.name,
      email: payload.email,
      need: payload.needLabel,
      message: payload.message,
      language: payload.lang,
    }),
  });

  const result: { success?: boolean; message?: string } | null = await response
    .json()
    .catch(() => null);
  if (!response.ok || !result?.success) {
    throw new Error(result?.message ?? `Web3Forms request failed (${response.status})`);
  }
  return { ok: true };
}

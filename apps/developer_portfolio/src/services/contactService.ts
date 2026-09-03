export interface ContactPayload {
  name: string;
  email: string;
  need: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
}

// TODO(backend): replace the simulated delay with a real POST (fetch to API endpoint).
export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ok: true };
}

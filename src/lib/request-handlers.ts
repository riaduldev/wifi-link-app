/**
 * Request handling logic, kept free of the "use server" directive so it can
 * be unit-tested and reused. The Server Action wrappers in
 * `src/app/actions/requests.ts` only adapt the request context and call
 * these handlers.
 *
 * IMPORTANT: no request is ever reported as accepted unless the configured
 * backend actually accepted it (see `deliver`).
 */

import { business } from "@/config/business";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  MESSAGES,
  isHoneypotTripped,
  normalizeBdPhone,
  text,
  validateAddress,
  validateArea,
  validateCustomerId,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  type FieldErrors,
} from "@/lib/validation";
import type { ActionState } from "@/app/actions/request-state";

export type RequestKind =
  | "connection"
  | "coverage"
  | "support"
  | "contact";

export type RequestPayload = {
  kind: RequestKind;
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  address?: string;
  packageId?: string;
  customerId?: string;
  category?: string;
  subject?: string;
  message?: string;
  note?: string;
};

/**
 * Sends the request to the configured backend.
 *
 * `FORM_ENDPOINT_URL` (server-only) is optional. When it is missing the
 * request is NOT stored anywhere — the caller is told so and the UI offers
 * a manual hand-off instead of pretending the request was received.
 */
export async function deliver(payload: RequestPayload): Promise<
  { delivered: true } | { delivered: false; error: string }
> {
  const endpoint = process.env.FORM_ENDPOINT_URL;
  if (!endpoint) return { delivered: false, error: "no-endpoint" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.FORM_ENDPOINT_TOKEN
          ? { authorization: `Bearer ${process.env.FORM_ENDPOINT_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        source: "netwave-website",
        brand: business.brandNameEn,
        receivedAt: new Date().toISOString(),
        ...payload,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      return { delivered: false, error: `upstream-${response.status}` };
    }
    return { delivered: true };
  } catch {
    return { delivered: false, error: "network" };
  }
}

export function makeReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `NW-${out}`;
}

/** Rate limit + honeypot. Returns an error state when the request is blocked. */
export function guard(
  kind: RequestKind,
  clientKey: string,
  honeypotValue: string,
): ActionState | null {
  const limit = checkRateLimit(`${kind}:${clientKey}`);
  if (!limit.allowed) {
    return { status: "error", message: MESSAGES.rateLimited, errors: {} };
  }
  if (isHoneypotTripped(honeypotValue)) {
    return { status: "error", message: MESSAGES.generic, errors: {} };
  }
  return null;
}

function validationError(errors: FieldErrors): ActionState {
  return {
    status: "error",
    message: "কিছু তথ্য ঠিক করতে হবে। চিহ্নিত ঘরগুলো দেখুন।",
    errors,
  };
}

/**
 * Builds the honest "we could not accept this" message. When no backend is
 * configured we say exactly that; when the backend exists but failed we
 * say the request did not reach us.
 */
function notAcceptedMessage(
  error: string,
  notConfigured: string,
  unreachable: string,
): string {
  return error === "no-endpoint" ? notConfigured : unreachable;
}

export async function handleConnectionRequest(
  formData: FormData,
  clientKey: string,
): Promise<ActionState> {
  const blocked = guard("connection", clientKey, text(formData.get("website")));
  if (blocked) return blocked;

  const name = text(formData.get("name"));
  const phoneRaw = text(formData.get("phone"));
  const area = text(formData.get("area"));
  const address = text(formData.get("address"));
  const email = text(formData.get("email"));
  const packageId = text(formData.get("packageId"));
  const note = text(formData.get("note"));

  const errors: FieldErrors = {};
  const nameError = validateName(name);
  if (nameError) errors.name = nameError;
  const phoneError = validatePhone(phoneRaw);
  if (phoneError) errors.phone = phoneError;
  const areaError = validateArea(area);
  if (areaError) errors.area = areaError;
  const addressError = validateAddress(address);
  if (addressError) errors.address = addressError;
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  if (Object.keys(errors).length > 0) return validationError(errors);

  const payload: RequestPayload = {
    kind: "connection",
    name,
    phone: normalizeBdPhone(phoneRaw) ?? undefined,
    email: email || undefined,
    area,
    address,
    packageId: packageId || undefined,
    note: note || undefined,
  };

  const result = await deliver(payload);
  const reference = makeReference();

  if (result.delivered) {
    return {
      status: "delivered",
      message:
        "আপনার সংযোগের অনুরোধ গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি যাচাই করে ফোনে যোগাযোগ করবেন।",
      errors: {},
      reference,
    };
  }

  return {
    status: "not-connected",
    message: notAcceptedMessage(
      result.error,
      "অনুরোধের তথ্য যাচাই করা হয়েছে, কিন্তু এই মুহূর্তে অনুরোধ গ্রহণ করার ব্যাকএন্ড সংযুক্ত নয় — তাই এটি সংরক্ষিত হয়নি। নিচের যোগাযোগ মাধ্যমে ব্যবহার করে একই তথ্য পাঠান।",
      "আপনার অনুরোধটি এই মুহূর্তে আমাদের সার্ভারে পৌঁছায়নি, তাই এটি সংরক্ষিত হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন অথবা সরাসরি যোগাযোগ করুন।",
    ),
    errors: {},
    reference,
  };
}

export async function handleCoverageRequest(
  formData: FormData,
  clientKey: string,
): Promise<ActionState> {
  const blocked = guard("coverage", clientKey, text(formData.get("website")));
  if (blocked) return blocked;

  const area = text(formData.get("area"));
  const address = text(formData.get("address"));
  const name = text(formData.get("name"));
  const phoneRaw = text(formData.get("phone"));

  const errors: FieldErrors = {};
  const areaError = validateArea(area);
  if (areaError) errors.area = areaError;
  const addressError = validateAddress(address);
  if (addressError) errors.address = addressError;
  // Contact details are optional for a coverage check — they only speed up
  // the manual verification.
  if (phoneRaw) {
    const phoneError = validatePhone(phoneRaw);
    if (phoneError) errors.phone = phoneError;
  }
  if (name) {
    const nameError = validateName(name);
    if (nameError) errors.name = nameError;
  }

  if (Object.keys(errors).length > 0) return validationError(errors);

  const payload: RequestPayload = {
    kind: "coverage",
    area,
    address,
    name: name || undefined,
    phone: phoneRaw ? (normalizeBdPhone(phoneRaw) ?? undefined) : undefined,
  };

  const result = await deliver(payload);
  const reference = makeReference();

  if (result.delivered) {
    return {
      status: "delivered",
      message:
        "আপনার ঠিকানাটি টিমের যাচাই তালিকায় যোগ হয়েছে। ফিজিক্যাল লাইনের তথ্য যাচাই করে টিম আপনার সঙ্গে যোগাযোগ করবে।",
      errors: {},
      reference,
    };
  }

  return {
    status: "not-connected",
    message: notAcceptedMessage(
      result.error,
      "ঠিকানার তথ্য যাচাই করা হয়েছে, কিন্তু এখনো কোনো যাচাই সার্ভার সংযুক্ত না থাকায় অনুরোধটি সংরক্ষিত হয়নি। যোগাযোগ করতে পারলে টিম হাতে-কলমে যাচাই করে দেবে।",
      "আপনার ঠিকানার তথ্য এই মুহূর্তে আমাদের সার্ভারে পৌঁছায়নি, তাই অনুরোধটি সংরক্ষিত হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন অথবা সরাসরি যোগাযোগ করুন।",
    ),
    errors: {},
    reference,
  };
}

export async function handleSupportTicket(
  formData: FormData,
  clientKey: string,
): Promise<ActionState> {
  const blocked = guard("support", clientKey, text(formData.get("website")));
  if (blocked) return blocked;

  const name = text(formData.get("name"));
  const phoneRaw = text(formData.get("phone"));
  const customerId = text(formData.get("customerId"));
  const category = text(formData.get("category"));
  const message = text(formData.get("message"));
  const email = text(formData.get("email"));

  const errors: FieldErrors = {};
  const nameError = validateName(name);
  if (nameError) errors.name = nameError;
  const phoneError = validatePhone(phoneRaw);
  if (phoneError) errors.phone = phoneError;
  const messageError = validateMessage(message);
  if (messageError) errors.message = messageError;
  const customerIdError = validateCustomerId(customerId);
  if (customerIdError) errors.customerId = customerIdError;
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  if (!category) errors.category = "ক্যাটাগরি নির্বাচন করুন";

  if (Object.keys(errors).length > 0) return validationError(errors);

  const payload: RequestPayload = {
    kind: "support",
    name,
    phone: normalizeBdPhone(phoneRaw) ?? undefined,
    email: email || undefined,
    customerId: customerId || undefined,
    category,
    message,
  };

  const result = await deliver(payload);
  const reference = makeReference();

  if (result.delivered) {
    return {
      status: "delivered",
      message:
        "আপনার টিকিট গ্রহণ করা হয়েছে। টিম যত দ্রুত সম্ভব ফোনে যোগাযোগ করবে।",
      errors: {},
      reference,
    };
  }

  return {
    status: "not-connected",
    message: notAcceptedMessage(
      result.error,
      "টিকিটের তথ্য যাচাই করা হয়েছে, কিন্তু টিকিট সংরক্ষণের ব্যাকএন্ড সংযুক্ত নয় — তাই টিকিট খোলা হয়নি। নিচের উপায়ে সরাসরি যোগাযোগ করুন।",
      "আপনার টিকিটটি এই মুহূর্তে আমাদের সার্ভারে পৌঁছায়নি, তাই টিকিট খোলা হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন অথবা সরাসরি যোগাযোগ করুন।",
    ),
    errors: {},
    reference,
  };
}

export async function handleContactMessage(
  formData: FormData,
  clientKey: string,
): Promise<ActionState> {
  const blocked = guard("contact", clientKey, text(formData.get("website")));
  if (blocked) return blocked;

  const name = text(formData.get("name"));
  const phoneRaw = text(formData.get("phone"));
  const email = text(formData.get("email"));
  const subject = text(formData.get("subject"));
  const message = text(formData.get("message"));

  const errors: FieldErrors = {};
  const nameError = validateName(name);
  if (nameError) errors.name = nameError;
  const phoneError = validatePhone(phoneRaw);
  if (phoneError) errors.phone = phoneError;
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  const messageError = validateMessage(message);
  if (messageError) errors.message = messageError;
  if (subject.length > 120) errors.subject = MESSAGES.tooLong;

  if (Object.keys(errors).length > 0) return validationError(errors);

  const payload: RequestPayload = {
    kind: "contact",
    name,
    phone: normalizeBdPhone(phoneRaw) ?? undefined,
    email: email || undefined,
    subject: subject || undefined,
    message,
  };

  const result = await deliver(payload);
  const reference = makeReference();

  if (result.delivered) {
    return {
      status: "delivered",
      message:
        "আপনার বার্তা গ্রহণ করা হয়েছে। টিম যত দ্রুত সম্ভব ফোনে বা ইমেইলে উত্তর দেবে।",
      errors: {},
      reference,
    };
  }

  return {
    status: "not-connected",
    message: notAcceptedMessage(
      result.error,
      "বার্তাটি যাচাই করা হয়েছে, কিন্তু বার্তা গ্রহণের ব্যাকএন্ড সংযুক্ত নয় — তাই এটি সংরক্ষিত হয়নি। ফোন বা ইমেইলে সরাসরি যোগাযোগ করুন।",
      "আপনার বার্তাটি এই মুহূর্তে আমাদের সার্ভারে পৌঁছায়নি, তাই এটি সংরক্ষিত হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন অথবা সরাসরি যোগাযোগ করুন।",
    ),
    errors: {},
    reference,
  };
}

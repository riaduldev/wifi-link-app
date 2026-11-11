/**
 * Shared validation helpers used by both the client forms and the server
 * actions. No schema library is used — the rules are small, explicit and
 * mirrored in `src/lib/validation.client.ts` so browser and server agree.
 */

export type FieldErrors = Record<string, string>;

export const MESSAGES = {
  required: "এই ঘরটি পূরণ করুন",
  nameShort: "নাম কমপক্ষে ৩ অক্ষরের হতে হবে",
  phoneInvalid: "সঠিক মোবাইল নম্বর দিন (যেমন 01712345678)",
  phoneRequired: "মোবাইল নম্বর দিন",
  emailInvalid: "সঠিক ইমেইল ঠিকানা দিন",
  areaRequired: "এলাকার নাম লিখুন",
  addressRequired: "বাসার ঠিকানা লিখুন",
  addressShort: "ঠিকানা কমপক্ষে ১০ অক্ষরের হতে হবে",
  messageRequired: "সমস্যার বিবরণ লিখুন",
  messageShort: "বিবরণ কমপক্ষে ১৫ অক্ষরের হতে হবে",
  customerIdInvalid: "কাস্টমার আইডি ৪ থেকে ১২ অক্ষরের হতে হবে",
  rateLimited: "অনেকগুলো অনুরোধ পাঠানো হয়েছে। একটু পরে আবার চেষ্টা করুন।",
  generic: "অনুরোধটি প্রেরণ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
  tooLong: "ফরমের ঘরগুলো খুব বড় হয়ে গেছে",
};

export function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateName(value: string): string | undefined {
  if (!value) return MESSAGES.required;
  if (value.length < 3) return MESSAGES.nameShort;
  if (value.length > 120) return MESSAGES.tooLong;
  return undefined;
}

/**
 * Normalises a Bangladeshi mobile number to `01XXXXXXXXX`.
 * Accepts `01712345678`, `+8801712345678`, `8801712345678`,
 * `017-1234-5678` and Bengali numerals.
 */
export function normalizeBdPhone(value: string): string | null {
  if (!value) return null;
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const ascii = value.replace(/[০-৯]/g, (d) =>
    String(bengaliDigits.indexOf(d)),
  );
  const digits = ascii.replace(/\D/g, "");

  let local = digits;
  if (local.startsWith("00880")) local = local.slice(5);
  else if (local.startsWith("880")) local = local.slice(3);
  // "8801XXXXXXXXX" -> "01XXXXXXXXX"
  if (local.length === 10 && local.startsWith("1")) local = `0${local}`;

  if (!/^01[3-9]\d{8}$/.test(local)) return null;
  return local;
}

export function validatePhone(value: string): string | undefined {
  if (!value) return MESSAGES.phoneRequired;
  if (!normalizeBdPhone(value)) return MESSAGES.phoneInvalid;
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  if (!value) return undefined; // optional
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return MESSAGES.emailInvalid;
  if (value.length > 160) return MESSAGES.tooLong;
  return undefined;
}

export function validateArea(value: string): string | undefined {
  if (!value) return MESSAGES.areaRequired;
  if (value.length < 2) return MESSAGES.areaRequired;
  if (value.length > 120) return MESSAGES.tooLong;
  return undefined;
}

export function validateAddress(value: string): string | undefined {
  if (!value) return MESSAGES.addressRequired;
  if (value.length < 10) return MESSAGES.addressShort;
  if (value.length > 400) return MESSAGES.tooLong;
  return undefined;
}

export function validateMessage(value: string): string | undefined {
  if (!value) return MESSAGES.messageRequired;
  if (value.length < 15) return MESSAGES.messageShort;
  if (value.length > 2000) return MESSAGES.tooLong;
  return undefined;
}

export function validateCustomerId(value: string): string | undefined {
  if (!value) return undefined; // optional
  if (!/^[A-Za-z0-9-]{4,12}$/.test(value)) return MESSAGES.customerIdInvalid;
  return undefined;
}

/**
 * Simple spam guard: a hidden field that must stay empty. Real bots fill
 * every input they find; humans never see it.
 */
export function isHoneypotTripped(value: string): boolean {
  return value.length > 0;
}

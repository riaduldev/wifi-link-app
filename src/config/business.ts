/**
 * Single source of truth for brand + business facts.
 *
 * IMPORTANT — DEMO CONTENT
 * The identity below ("নেটওয়েভ" / "NetWave") is a replaceable demo brand.
 * Every factual field (phone, whatsapp, email, address, office hours,
 * coverage areas, notices, payment methods, external service URLs) is EMPTY
 * on purpose. Empty values render as an explicit placeholder in the UI
 * ("তথ্য যোগ করতে হবে") and never as a fake contact detail.
 *
 * Fill these in before going live. Nothing here is read from the database.
 */

export type Business = {
  /** Bengali brand name. */
  brandName: string;
  /** Latin brand name. */
  brandNameEn: string;
  /** Short tagline. */
  tagline: string;
  /**
   * Marks the identity as demo content. Rendered as a visible badge in the
   * footer and the "About" page so nobody mistakes it for a registered
   * business.
   */
  isDemoBrand: boolean;

  /** E.164-ish international format, digits only, e.g. "+8801XXXXXXXXX". */
  phone: string;
  /** Same format as `phone`. */
  whatsapp: string;
  email: string;
  address: string;
  officeHours: string;

  /** Areas where the service is available. Empty = not published yet. */
  coverageAreas: string[];

  /** Payment methods accepted by the business. Empty = not published yet. */
  paymentMethods: PaymentMethod[];

  /** External, authorized speed-test provider URL. Empty = not configured. */
  speedTestUrl: string;
  /**
   * A publicly available third-party speed-test service the visitor can be
   * sent to when no provider of our own is configured. This is NOT a
   * measurement taken by this site and carries no uptime or accuracy
   * guarantee from the business — it is only a convenience link.
   */
  speedTestFallbackUrl: string;
  /** Label shown next to the fallback link, so the source is never implied. */
  speedTestFallbackLabel: string;
  /** External media server URL. Empty = not configured. */
  mediaServerUrl: string;

  /** Public site URL, used for canonical links / sitemap. */
  siteUrl: string;

  /** Notices / announcements. Empty = the notices block is not rendered. */
  notices: Notice[];

  /** Social links. Empty values are skipped in the footer. */
  social: SocialLink[];
};

export type PaymentMethod = {
  id: string;
  /** Method name in Bengali, e.g. "বিকাশ". */
  label: string;
  /** Account number / merchant identifier. Empty = needs owner input. */
  account: string;
  /** Account type, e.g. "পার্সোনাল" / "মার্চেন্ট". */
  accountType: string;
  /** Extra instructions. */
  instructions: string;
};

export type Notice = {
  id: string;
  title: string;
  body: string;
  /** ISO date (YYYY-MM-DD) — optional. */
  date?: string;
  /** "info" | "warning" | "success" */
  tone?: "info" | "warning" | "success";
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export const business: Business = {
  brandName: "নেটওয়েভ",
  brandNameEn: "NetWave",
  tagline: "আপনার নির্ভরযোগ্য ইন্টারনেট পার্টনার",
  isDemoBrand: true,

  // TODO(owner): replace with the real support line. Format: +8801XXXXXXXXX
  phone: "",
  // TODO(owner): replace with the real WhatsApp number.
  whatsapp: "",
  // TODO(owner): replace with the real support mailbox.
  email: "",
  // TODO(owner): replace with the real office address.
  address: "",
  // TODO(owner): e.g. "শনিবার–বৃহস্পতিবার, সকাল ৯টা – রাত ৯টা"
  officeHours: "",

  // TODO(owner): add serviceable areas only after they are verified.
  coverageAreas: [],

  // TODO(owner): add only verified payment methods with real account details.
  paymentMethods: [],

  // TODO(owner): set a speed-test provider URL you are authorized to embed.
  speedTestUrl: "",
  // A neutral, publicly available third-party speed-test service offered as
  // a convenience link. Replace with a provider you have permission to
  // recommend if you prefer.
  speedTestFallbackUrl: "https://www.speedtest.net/",
  speedTestFallbackLabel: "Speedtest.net (তৃতীয় পক্ষের সেবা)",
  // TODO(owner): set the media server URL once the service is live.
  mediaServerUrl: "",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "http://localhost:3000",

  // TODO(owner): add real announcements only. An empty array hides the block.
  notices: [],

  social: [],
};

/** Phone digits only, for tel: links. Empty string when not configured. */
export function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

/** WhatsApp link needs the number without "+" and without leading zeros. */
export function whatsappHref(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "").replace(/^0+/, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export function mailHref(email: string): string {
  return email ? `mailto:${email}` : "";
}

export function hasPhone(): boolean {
  return business.phone.trim().length > 0;
}

export function hasWhatsApp(): boolean {
  return business.whatsapp.trim().length > 0;
}

export function hasEmail(): boolean {
  return business.email.trim().length > 0;
}

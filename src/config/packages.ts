/**
 * Internet package catalogue — the single typed data source used by
 * /packages, the homepage preview and the connection-request form.
 *
 * DEMO STRUCTURE: the package list below is real structure with EMPTY
 * business values. Speeds, prices, installation and equipment charges are
 * `null` until the owner confirms them. Every `null` renders as
 * "তথ্য যোগ করতে হবে" in the UI — never as 0 and never as a guess.
 *
 * To publish a package: fill the numbers, list its features/terms, and set
 * `available: true`.
 */

export type InternetPackage = {
  /** Stable id, used in links and form values. */
  id: string;
  /** Package name shown to customers. */
  name: string;
  /** One-line description. */
  summary: string;
  /** Downlink speed in Mbps. `null` = not published yet. */
  speedMbps: number | null;
  /** Monthly price in BDT. `null` = not published yet. */
  monthlyPrice: number | null;
  /** One-time installation/activation charge in BDT. `null` = unknown. */
  installationFee: number | null;
  /** One-time ONT/ONU/router device charge in BDT. `null` = unknown. */
  equipmentCharge: number | null;
  /** Included features. Empty array = not published yet. */
  features: string[];
  /** Terms & conditions specific to this package. */
  terms: string[];
  /** Where the package can be used, e.g. "সব সার্ভিসেবল এলাকায়". */
  availability: string;
  /** Whether the package is offered to new customers right now. */
  available: boolean;
};

export const packages: InternetPackage[] = [
  {
    id: "home-basic",
    name: "হোম বেসিক",
    summary:
      "হালকা ইন্টারনেট ব্যবহারের জন্য — ব্রাউজিং, সোশ্যাল মিডিয়া ও স্ট্রিমিং।",
    speedMbps: null,
    monthlyPrice: null,
    installationFee: null,
    equipmentCharge: null,
    features: [],
    terms: [],
    availability: "",
    available: false,
  },
  {
    id: "home-stream",
    name: "হোম স্ট্রিম",
    summary:
      "পরিবারের সব সদস্যের জন্য সমান্তরাল ব্যবহার — ভিডিও কল ও একাধিক ডিভাইস।",
    speedMbps: null,
    monthlyPrice: null,
    installationFee: null,
    equipmentCharge: null,
    features: [],
    terms: [],
    availability: "",
    available: false,
  },
  {
    id: "biz-pro",
    name: "বিজনেস প্রো",
    summary:
      "ছোট ব্যবসা, অফিস ও দোকানের জন্য বিশেষভাবে তৈরি সেটআপ।",
    speedMbps: null,
    monthlyPrice: null,
    installationFee: null,
    equipmentCharge: null,
    features: [],
    terms: [],
    availability: "",
    available: false,
  },
];

/** Packages that are actually offered right now. */
export const availablePackages = packages.filter((p) => p.available);

export function getPackageById(id: string): InternetPackage | undefined {
  return packages.find((p) => p.id === id);
}

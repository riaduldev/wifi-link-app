export type NavItem = {
  /** Route path. */
  href: string;
  /** Bengali label used in the full navigation. */
  label: string;
  /**
   * Shorter Bengali label used on narrower desktop widths (1024–1279px),
   * where all nine full labels would not fit next to the logo.
   * Falls back to `label` when omitted.
   */
  shortLabel?: string;
};

/**
 * Main navigation, in the order requested for the site.
 * The header renders these as a horizontal bar on desktop and a
 * disclosure menu on mobile.
 */
export const navItems: NavItem[] = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "আমাদের পরিচিতি", shortLabel: "পরিচিতি" },
  { href: "/packages", label: "প্যাকেজ" },
  { href: "/coverage", label: "কভারেজ" },
  { href: "/speed-test", label: "স্পিড টেস্ট" },
  { href: "/media-server", label: "মিডিয়া সার্ভার", shortLabel: "মিডিয়া" },
  { href: "/pay-bill", label: "পে বিল" },
  { href: "/support", label: "সাপোর্ট" },
  { href: "/contact", label: "যোগাযোগ" },
];

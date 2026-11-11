import type { SVGProps } from "react";

/**
 * Hand-rolled icon set (no icon dependency).
 * All icons are 24x24, stroke-based, and inherit `currentColor`.
 */

export type IconName =
  | "arrow-right"
  | "billing"
  | "business"
  | "cable"
  | "check"
  | "chevron-down"
  | "close"
  | "device"
  | "devices"
  | "external"
  | "fiber"
  | "gauge"
  | "info"
  | "location"
  | "mail"
  | "menu"
  | "phone"
  | "power"
  | "search"
  | "shield"
  | "support"
  | "whatsapp"
  | "wifi"
  | "warning";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  billing: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M7.5 15h3" />
    </>
  ),
  business: (
    <>
      <path d="M4 20V8.5a1 1 0 0 1 .7-1l7-3.2a1 1 0 0 1 1.3 1V20" />
      <path d="M13 11h5.6a1 1 0 0 1 1 1V20" />
      <path d="M3 20h18" />
      <path d="M7.5 11.5h1.5M7.5 15h1.5M16 14.5h1.5" />
    </>
  ),
  cable: (
    <>
      <path d="M4 4v6a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v2" />
      <rect x="2" y="2" width="4" height="4" rx="1" />
      <rect x="18" y="18" width="4" height="4" rx="1" />
    </>
  ),
  check: (
    <>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </>
  ),
  "chevron-down": (
    <>
      <path d="m6 9.5 6 6 6-6" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  device: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  devices: (
    <>
      <rect x="2.5" y="5" width="11" height="14" rx="2" />
      <rect x="13.5" y="9" width="8" height="10" rx="2" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="m20 4-9 9" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </>
  ),
  fiber: (
    <>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="m12 13 4-3" />
      <circle cx="12" cy="17" r="1.6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </>
  ),
  power: (
    <>
      <path d="M12 3v9" />
      <path d="M7.5 6.5a7 7 0 1 0 9 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  support: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.2-1.2.8-1.2 1.6v.5" />
      <path d="M12 17h.01" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16.6A8 8 0 1 1 8.4 19.5Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6 2 .9-.4 1.6c-3.9 1-8.5-3.6-7.5-7.5l1.6-.4.9 2Z" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 8.5a15 15 0 0 1 19 0" />
      <path d="M5.5 12a10.5 10.5 0 0 1 13 0" />
      <path d="M8.5 15.5a6 6 0 0 1 7 0" />
      <path d="M12 19h.01" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4 2.8 20h18.4Z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
};

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

import Link from "next/link";
import { business } from "@/config/business";

type LogoProps = {
  /** Render as a link to the homepage (default) or as plain markup. */
  asLink?: boolean;
  /** Use the light (on-dark background) colour treatment. */
  inverted?: boolean;
  className?: string;
};

/**
 * Custom NetWave mark: a rounded tile carrying three signal waves that
 * double as the "নেটওয়েভ" wave. Drawn inline so it stays crisp and needs
 * no image request.
 */
export function LogoMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" rx="13" fill="#0B1F3A" />
      <path
        d="M11 27.5c3.2 0 3.2-7 6.4-7s3.2 7 6.4 7 3.2-7 6.4-7 3.2 7 6.4 7"
        stroke="#27D8E8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M13.5 34.5h21"
        stroke="#1769FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="19.5" r="2.6" fill="#1769FF" />
    </svg>
  );
}

export function Logo({ asLink = true, inverted = false, className }: LogoProps) {
  const content = (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-tight ${
            inverted ? "text-white" : "text-navy"
          }`}
        >
          {business.brandName}
        </span>
        <span
          className={`mt-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] ${
            inverted ? "text-cyan" : "text-brand"
          }`}
        >
          {business.brandNameEn}
        </span>
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label={`${business.brandName} — হোমপেজ`}
      className="inline-flex rounded-lg"
    >
      {content}
    </Link>
  );
}

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Layout primitives                                                    */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
  tone = "canvas",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "canvas" | "white" | "navy";
  labelledBy?: string;
}) {
  // The canvas/white surfaces are slightly translucent so the site-wide
  // dot-grid and glow field in the body reads through the whole page
  // rather than being cut off at every section boundary. Text tones are
  // unchanged, so contrast is unaffected.
  const tones = {
    canvas: "bg-canvas/70",
    white: "bg-white/80",
    navy: "bg-navy text-white",
  } as const;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} py-14 sm:py-16 lg:py-20 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  id,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={`max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            isDark ? "text-cyan" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={`text-2xl font-bold sm:text-3xl lg:text-[2rem] ${
          isDark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </Tag>
      {description ? (
        <div
          className={`mt-4 text-base leading-relaxed sm:text-[1.0625rem] ${
            isDark ? "text-slate-300" : "text-ink-soft"
          }`}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Surfaces                                                            */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
}) {
  return (
    <Tag
      className={`rounded-lg border border-line bg-white shadow-xs ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "cyan" | "warning" | "success" | "neutral" | "danger";
}) {
  const tones = {
    brand: "bg-brand-soft text-brand-dark",
    cyan: "bg-cyan-soft text-cyan-dark",
    warning: "bg-warning-soft text-warning",
    success: "bg-success-soft text-success",
    danger: "bg-danger-soft text-danger",
    neutral: "bg-canvas text-ink-soft",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        tones[tone]
      }`}
    >
      {children}
    </span>
  );
}

/** Small note that a value is still waiting for the owner. */
export function TbdNote({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-xs bg-warning-soft px-1.5 py-0.5 text-[0.7rem] font-semibold text-warning ${className}`}
    >
      তথ্য যোগ করতে হবে
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "ghost" | "on-dark" | "on-dark-ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-xs hover:bg-brand-dark focus-visible:outline-brand",
  secondary:
    "border border-line-strong bg-white text-navy hover:border-brand hover:text-brand-dark",
  ghost: "text-navy hover:bg-brand-soft hover:text-brand-dark",
  "on-dark":
    "bg-white text-navy hover:bg-cyan hover:text-navy-deep",
  "on-dark-ghost":
    "border border-white/25 text-white hover:border-cyan hover:text-cyan",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-6 py-3 text-base",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
): string {
  return `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  external = false,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses(variant, size, className)}
        {...(rest as ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-line ${className}`} />;
}

/** Renders an unordered list with a consistent check icon. */
export function CheckList({
  items,
  tone = "light",
  className = "",
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            aria-hidden="true"
            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
              tone === "dark" ? "bg-cyan" : "bg-brand"
            }`}
          />
          <span
            className={
              tone === "dark" ? "text-slate-300" : "text-ink-soft"
            }
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

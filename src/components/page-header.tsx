import Link from "next/link";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui";

export type Crumb = {
  href?: string;
  label: string;
};

/** Shared header for inner pages: breadcrumb, title and intro copy. */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-line bg-white/85">
      <Container className="py-10 sm:py-12 lg:py-16">
        {crumbs.length > 0 ? (
          <nav aria-label="ব্রেডক্রাম্ব" className="mb-4">
            <ol className="flex flex-wrap items-center gap-x-1.5 text-sm text-ink-muted">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <Icon name="chevron-down" size={12} className="-rotate-90" />
                  ) : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      // Padding gives the link a real touch target on
                      // phones without changing the visual rhythm.
                      className="-mx-1 rounded px-1 py-2.5 transition-colors hover:text-brand sm:py-1"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current="page"
                      className="-mx-1 rounded px-1 py-2.5 font-medium text-ink-soft sm:py-1"
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </div>
  );
}

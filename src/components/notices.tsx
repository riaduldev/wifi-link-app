import { business } from "@/config/business";
import { Icon } from "@/components/icons";
import { formatDate } from "@/lib/format";

/**
 * Announcements area. Renders nothing when no notice is configured, so the
 * site never shows an empty "notice" section.
 */
export function Notices({ className = "" }: { className?: string }) {
  if (business.notices.length === 0) return null;

  return (
    <section
      aria-labelledby="notices-heading"
      className={`border-y border-line bg-white/85 py-10 ${className}`}
    >
      <div className="container-page">
        <h2
          id="notices-heading"
          className="flex items-center gap-2 text-lg font-bold text-navy"
        >
          <Icon name="info" size={20} className="text-brand" />
          চলমান খবর
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {business.notices.map((notice) => (
            <li
              key={notice.id}
              className={`rounded-lg border p-5 ${
                notice.tone === "warning"
                  ? "border-warning/30 bg-warning-soft"
                  : notice.tone === "success"
                    ? "border-success/30 bg-success-soft"
                    : "border-line bg-canvas"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-navy">{notice.title}</h3>
                {notice.date ? (
                  <span className="text-xs font-medium text-ink-muted">
                    {formatDate(notice.date)}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {notice.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

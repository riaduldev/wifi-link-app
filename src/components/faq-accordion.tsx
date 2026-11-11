import type { FaqItem } from "@/config/content";

/**
 * Accessible disclosure list built on native <details>/<summary>, so it
 * works without JavaScript and is operable by keyboard and screen readers.
 */
export function FaqAccordion({
  items,
  openFirst = false,
}: {
  items: FaqItem[];
  openFirst?: boolean;
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line-strong bg-white p-8 text-center text-ink-soft">
        এখনো কোনো প্রশ্ন যোগ করা হয়নি।
      </p>
    );
  }

  return (
    <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white shadow-xs">
      {items.map((item, index) => (
        <details
          key={item.id}
          id={item.id}
          open={openFirst && index === 0}
          className="group"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[0.95rem] font-semibold text-navy marker:content-none hover:bg-canvas sm:px-6 sm:py-5">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors group-open:border-brand group-open:bg-brand-soft group-open:text-brand"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-open:rotate-180"
              >
                <path d="m6 9.5 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="space-y-3 px-5 pb-5 text-[0.95rem] leading-relaxed text-ink-soft sm:px-6">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { faqTopics, type FaqItem, type FaqTopic } from "@/config/content";
import { Icon } from "@/components/icons";

/**
 * Searchable, filterable FAQ list for the support centre.
 * Filtering happens entirely in the browser — no data leaves the page.
 */
export function FaqExplorer({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<FaqTopic | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesTopic = topic === "all" || item.topic === topic;
      if (!matchesTopic) return false;
      if (!needle) return true;
      return (
        item.question.toLowerCase().includes(needle) ||
        item.answer.some((paragraph) => paragraph.toLowerCase().includes(needle))
      );
    });
  }, [items, query, topic]);

  return (
    <div className="space-y-5">
      <div className="relative">
        <label htmlFor="faq-search" className="sr-only">
          প্রশ্ন খুঁজুন
        </label>
        <Icon
          name="search"
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="প্রশ্ন লিখুন — যেমন: ইনস্টলেশন, বিল, স্পিড"
          className="w-full rounded-md border border-line-strong bg-white py-3 pl-10 pr-4 text-[0.95rem] text-navy placeholder:text-ink-muted/80 focus:border-brand"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <TopicChip
          active={topic === "all"}
          onClick={() => setTopic("all")}
          label="সব"
        />
        {faqTopics.map((item) => (
          <TopicChip
            key={item.id}
            active={topic === item.id}
            onClick={() => setTopic(item.id)}
            label={item.label}
          />
        ))}
      </div>

      <p aria-live="polite" className="text-sm text-ink-muted">
        {filtered.length}টি প্রশ্ন দেখানো হচ্ছে
        {query.trim() ? ` “${query.trim()}” শব্দের জন্য` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line-strong bg-white p-8 text-center">
          <p className="font-semibold text-navy">কোনো প্রশ্ন মেলেনি</p>
          <p className="mt-1.5 text-sm text-ink-soft">
            অন্য শব্দ দিয়ে খুঁজে দেখুন, অথবা নিচের ফর্মে সরাসরি টিকিট পাঠান।
          </p>
        </div>
      ) : (
        <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white shadow-xs">
          {filtered.map((item) => (
            <details key={item.id} id={item.id} className="group">
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
      )}
    </div>
  );
}

function TopicChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      // 44px minimum touch target on phones, tighter on larger screens.
      className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors sm:min-h-0 sm:py-1.5 ${
        active
          ? "border-brand bg-brand text-white"
          : "border-line-strong bg-white text-ink-soft hover:border-brand hover:text-brand-dark"
      }`}
    >
      {label}
    </button>
  );
}

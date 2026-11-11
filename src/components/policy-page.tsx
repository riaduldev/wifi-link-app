import type { PolicySection } from "@/config/content";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui";

/**
 * Renders an owner-editable policy structure. Empty sections are shown
 * explicitly as "not written yet" so no empty legal text is implied.
 */
export function PolicyPage({
  eyebrow,
  title,
  description,
  sections,
  updatedNote,
  crumbLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: PolicySection[];
  updatedNote: string;
  crumbLabel: string;
}) {
  const written = sections.filter((section) => section.paragraphs.length > 0);

  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        crumbs={[{ href: "/", label: "হোম" }, { label: crumbLabel }]}
      />

      <Section tone="canvas">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-line bg-white p-5 shadow-xs">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  অংশসমূহ
                </h2>
                <ol className="mt-3 space-y-0.5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="-mx-2 block rounded px-2 py-2.5 text-sm text-ink-soft transition-colors hover:bg-brand-soft hover:text-brand"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="rounded-lg border border-warning/30 bg-warning-soft p-5">
                <h2 className="flex items-center gap-2 text-base font-bold text-warning">
                  <Icon name="info" size={18} />
                  প্রকাশের আগে যা করা দরকার
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  এই পাতাটি একটি কাঠামো। নিচের কোনো অংশেই এখনো আইনি ভাষা লেখা
                  হয়নি — কারণ কোনো প্রতিষ্ঠানের জন্য উপযুক্ত নীতি কেবল প্রতিষ্ঠান
                  নিজেই ও তার আইনি পরামর্শক ঠিক করতে পারেন। {updatedNote}
                </p>
              </div>

              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="rounded-lg border border-line bg-white p-6 shadow-xs sm:p-8"
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="text-lg font-bold text-navy"
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.length > 0 ? (
                    <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 rounded-md border border-dashed border-line-strong bg-canvas px-4 py-3 text-sm text-ink-muted">
                      এই অংশটি এখনো লেখা হয়নি — তথ্য যোগ করতে হবে।
                    </p>
                  )}
                </section>
              ))}

              <p className="text-sm text-ink-muted">
                লেখা অংশের সংখ্যা: {written.length} / {sections.length}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

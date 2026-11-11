import type { Metadata } from "next";
import { business } from "@/config/business";
import { aboutBlocks, serviceFeatures } from "@/config/content";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "আমাদের পরিচিতি",
  description:
    "নেটওয়েভ কে, কীভাবে কাজ করি এবং কী সেবা দিই — প্রতিষ্ঠানের পরিচিতি, লক্ষ্য ও নেটওয়ার্ক সম্পর্কিত তথ্য।",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="আমাদের পরিচিতি"
        title={`${business.brandName} — ${business.tagline}`}
        description="এই পাতাটি প্রতিষ্ঠানের পরিচিতি, কাজের ধরন ও নেটওয়ার্ক সম্পর্কিত তথ্যের জায়গা। যা এখনো যোগ করা হয়নি, তা স্পষ্টভাবে চিহ্নিত করা আছে।"
        crumbs={[{ href: "/", label: "হোম" }, { label: "আমাদের পরিচিতি" }]}
      />

      {business.isDemoBrand ? (
        <div className="border-b border-line bg-warning-soft">
          <Container className="py-4">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-warning">
              <Icon name="info" size={18} className="mt-0.5 shrink-0" />
              <span>
                এই সাইট একটি ডেমো প্রকল্প। “{business.brandName}” নামে কোনো
                নিবন্ধিত ব্যবসা প্রতিষ্ঠানের তথ্য এখানে যোগ করা হয়নি।
              </span>
            </p>
          </Container>
        </div>
      ) : null}

      <Section tone="canvas" labelledBy="about-blocks-heading">
        <Container>
          <SectionHeading
            id="about-blocks-heading"
            eyebrow="পরিচিতি"
            title="প্রতিষ্ঠান সম্পর্কে"
            description="নিচের অংশগুলো প্রতিষ্ঠানের নিজস্ব তথ্য দিয়ে পূরণ করার জন্য প্রস্তুত রাখা হয়েছে।"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {aboutBlocks.map((block) => (
              <article
                key={block.id}
                className="rounded-lg border border-line bg-white p-6 shadow-xs sm:p-8"
              >
                <h3 className="text-lg font-bold text-navy">{block.heading}</h3>
                {block.paragraphs.length > 0 ? (
                  <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 rounded-md border border-dashed border-warning/40 bg-warning-soft px-4 py-3 text-sm leading-relaxed text-warning">
                    এই অংশের বিষয়বস্তু যোগ করতে হবে — কোনো তথ্য অনুমান করে লেখা
                    হয়নি।
                  </p>
                )}
                {block.callout ? (
                  <p className="mt-4 border-l-2 border-cyan pl-4 text-sm leading-relaxed text-ink-muted">
                    {block.callout}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="about-service-heading">
        <Container>
          <SectionHeading
            id="about-service-heading"
            eyebrow="সেবা"
            title="আমরা যা নিয়ে কাজ করি"
            description="সেবার ধরনগুলো সাধারণ পরিভাষায় বর্ণনা করা — প্রতিষ্ঠানের অনুমোদিত তথ্য যোগ করার জায়গা রেখে দেওয়া হয়েছে।"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceFeatures.map((feature) => (
              <li
                key={feature.id}
                className="rounded-lg border border-line bg-canvas p-6"
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 place-items-center rounded-md bg-navy text-cyan"
                >
                  <Icon name={feature.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {feature.detail}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <div className="rounded-lg border border-line bg-white p-6 shadow-xs sm:p-8">
            <h2 className="text-xl font-bold text-navy">আমাদের সঙ্গে যুক্ত হোন</h2>
            <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
              আপনার এলাকায় সেবা সম্ভব কি না যাচাই করে নিন, অথবা সরাসরি ফোনে
              যোগাযোগ করুন।
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/coverage">কভারেজ চেক করুন</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                যোগাযোগ করুন
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { business } from "@/config/business";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "মিডিয়া সার্ভার",
  description:
    "নেটওয়েভের মিডিয়া সার্ভার সেবা — কীভাবে প্রবেশ করবেন, নীতিমালা ও বিষয়বস্তুর সফলভাবা উপলব্ধতা।",
  path: "/media-server",
});

const accessSteps = [
  {
    id: "a1",
    title: "সেবা চালু আছে কি না নিশ্চিত হোন",
    detail:
      "মিডিয়া সার্ভারের ঠিকানা ও অ্যাক্সেস পদ্ধতি এখানে দেওয়া আছে কি না দেখুন। লিংক না থাকলে টিমের সঙ্গে যোগাযোগ করুন।",
  },
  {
    id: "a2",
    title: "ডিভাইস থেকে সার্ভারে প্রবেশ",
    detail:
      "অনুমোদিত ডিভাইস বা ব্রাউজারে সার্ভারের ঠিকানা খুলে লগইন করুন। লগইনের তথ্য কাস্টমার আইডির সঙ্গে প্রাপ্ত হয়।",
  },
  {
    id: "a3",
    title: "বিষয়বস্তু ব্রাউজ করুন",
    detail:
      "ক্যাটাগরি থেকে খুঁজে নিন এবং পছন্দমতো নির্বাচন করুন। সার্ভারের বিষয়বস্তুর তালিকা প্রতি মাসে পরিবর্তিত হতে পারে।",
  },
];

const policyPoints = [
  "সার্ভারের বিষয়বস্তু কেবল ব্যক্তিগত ও পরিবারের ব্যবহারের জন্য।",
  "সার্ভারের ঠিকানা অন্যের সঙ্গে ভাগ করা যাবে না।",
  "সরকারি নির্দেশনা অনুযায়ী কেবল অনুমোদিত ও আইনসম্মত বিষয়বস্তু রাখা হবে।",
  "পরিষ্কার-অপরিষ্কার সংস্করণের উপর নির্ভরশীল সেবা — প্রাপ্যতা নিশ্চিত নয়।",
];

export default function MediaServerPage() {
  const hasUrl = business.mediaServerUrl.trim().length > 0;

  return (
    <>
      <PageHeader
        eyebrow="মিডিয়া সার্ভার"
        title="এক জায়গায় সিনেমা ও সিরিজ"
        description="ফোন, ট্যাব বা টিভি স্ক্রিনে সরাসরি সেবাটি ব্যবহারের নির্দেশনা, প্রবেশ পদ্ধতি ও নীতিমালা এখানে রাখা হয়েছে।"
        crumbs={[{ href: "/", label: "হোম" }, { label: "মিডিয়া সার্ভার" }]}
      />

      <Section tone="canvas" labelledBy="media-access-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                id="media-access-heading"
                eyebrow="প্রবেশ"
                title="কীভাবে প্রবেশ করবেন"
                description="সার্ভারের বিস্তারিত তথ্য কাস্টমারদের জন্য প্রকাশ করা হয়। যা এখনো যোগ করা হয়নি, তা স্পষ্টভাবে দেখানো হচ্ছে।"
              />
              <ol className="mt-8 space-y-5">
                {accessSteps.map((step, index) => (
                  <li key={step.id} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-navy">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-5">
              <div className="rounded-lg border border-line bg-white p-6 shadow-xs">
                <h3 className="text-base font-bold text-navy">সার্ভারে প্রবেশ</h3>
                {hasUrl ? (
                  <div className="mt-4 space-y-3">
                    <p className="break-all rounded-md bg-canvas px-3 py-2 text-sm text-ink-soft">
                      {business.mediaServerUrl}
                    </p>
                    <ButtonLink href={business.mediaServerUrl} external size="lg">
                      মিডিয়া সার্ভার খুলুন
                      <Icon name="external" size={16} />
                    </ButtonLink>
                  </div>
                ) : (
                  <div className="mt-4 rounded-md border border-dashed border-warning/40 bg-warning-soft p-4">
                    <p className="text-sm font-bold text-warning">
                      সার্ভারের ঠিকানা যোগ করতে হবে
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      সেবা চালু হওয়ার পর সার্ভারের ঠিকানা ও প্রবেশের নির্দেশনা এখানে
                      যোগ করা হবে। ততক্ষণ কাস্টমার সাপোর্ট থেকে ঠিকানা ও
                      লগইনের তথ্য নিতে পারেন।
                    </p>
                    <ButtonLink href="/support" variant="secondary" className="mt-4">
                      সাপোর্টে যোগাযোগ করুন
                    </ButtonLink>
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-line bg-white p-6 shadow-xs">
                <h3 className="flex items-center gap-2 text-base font-bold text-navy">
                  <Icon name="shield" size={18} className="text-brand" />
                  ব্যবহারের নীতিমালা
                </h3>
                <ul className="mt-4 space-y-3">
                  {policyPoints.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-ink-soft">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="media-note-heading">
        <Container>
          <div className="rounded-lg border border-line bg-canvas p-6 sm:p-8">
            <h2
              id="media-note-heading"
              className="flex items-center gap-2 text-lg font-bold text-navy"
            >
              <Icon name="info" size={20} className="text-brand" />
              বিষয়বস্তু ও প্রাপ্যতা
            </h2>
            <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-ink-soft">
              মিডিয়া সার্ভারে কী কী বিষয়বস্তু থাকবে এবং কখন সেগুলো পাওয়া যাবে,
              তা আইন ও লাইসেন্সের শর্তের উপর নির্ভর করে। সেবাটি সাময়িকভাবে
              বন্ধ থাকতে পারে। এই সাইটে কোনো বিষয়বস্তুর তালিকা, অ্যাক্সেস
              তথ্য বা পাওয়া যাওয়ার নিশ্চয়তা দেখানো হয় না — কারণ সেগুলো কেবল
              প্রকৃত সেবার তথ্য থেকেই নেওয়া উচিত।
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

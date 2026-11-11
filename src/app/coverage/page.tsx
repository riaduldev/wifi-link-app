import type { Metadata } from "next";
import { business } from "@/config/business";
import { CoverageRequestForm } from "@/components/forms/coverage-request-form";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "কভারেজ চেক",
  description:
    "আপনার এলাকায় ইন্টারনেট সেবা আছে কি না যাচাই করার অনুরোধ পাঠান। চূড়ান্ত ফলাফল আমাদের টিম হাতে-কলমে যাচাই করে জানাবে।",
  path: "/coverage",
});

const whatHappens = [
  {
    id: "w1",
    title: "আপনার তথ্য নেওয়া হয়",
    detail:
      "এলাকা ও বাসার ঠিকানা পাওয়া যায়। মোবাইল নম্বর দিলে যাচাই দ্রুত হয়, কারণ টিম সরাসরি যোগাযোগ করতে পারে।",
  },
  {
    id: "w2",
    title: "ফিজিক্যাল লাইন যাচাই",
    detail:
      "টেকনিক্যাল টিম আশপাশের লাইন ও সম্ভাব্য রিলেল উপস্থাপনা দেখে সিদ্ধান্ত নেয়। এই ধাপটি সময় নেয়।",
  },
  {
    id: "w3",
    title: "চূড়ান্ত ফলাফল জানানো",
    detail:
      "সংযোগ সম্ভব হলে প্রতিনিধি ফোন করে সময় ঠিক করবেন এবং প্যাকেজ ও ফির বিস্তারিত জানাবেন।",
  },
];

export default function CoveragePage() {
  return (
    <>
      <PageHeader
        eyebrow="কভারেজ"
        title="আপনার ঠিকানায় সেবা আছে কি না?"
        description="নিচের ফর্মে এলাকা ও বাসার ঠিকানা দিন। এটি একটি যাচাইয়ের অনুরোধ — চূড়ান্ত ফলাফল আমাদের টিম হাতে-কলমে দেখে জানাবে।"
        crumbs={[{ href: "/", label: "হোম" }, { label: "কভারেজ" }]}
      />

      <Section tone="canvas" labelledBy="coverage-form-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                id="coverage-form-heading"
                eyebrow="অনুরোধ"
                title="কভারেজ যাচাইয়ের অনুরোধ"
                description="ফর্মটি খুব ছোট — এলাকা ও ঠিকানাই মূল বিষয়। বাকি তথ্য ঐচ্ছিক।"
              />

              <ol className="mt-8 space-y-5">
                {whatHappens.map((step, index) => (
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

              <div className="mt-8 rounded-md border border-line bg-white p-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-navy">
                  <Icon name="info" size={16} className="text-brand" />
                  একটি গুরুত্বপূর্ণ কথা
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  এই পাতার ফর্ম কোনো স্বয়ংক্রিয় মানচিত্র বা লাইভ কভারেজ
                  ডেটাবেস দেখায় না। ফলাফল নিশ্চিত করে একমাত্র আমাদের টেকনিক্যাল
                  টিমই পারে — তাই চূড়ান্ত সিদ্ধান্তের আগে ফলাফলকে নিশ্চিত হিসেবে
                  ধরে কাজ করবেন না।
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-line bg-white p-6 shadow-xs sm:p-8">
              <h3 className="text-lg font-bold text-navy">ঠিকানা জানান</h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                চিহ্নিত ঘরগুলো পূরণ করে অনুরোধ পাঠান।
              </p>
              <div className="mt-6">
                <CoverageRequestForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="areas-heading">
        <Container>
          <SectionHeading
            id="areas-heading"
            eyebrow="সার্ভিস এলাকা"
            title="যেসব এলাকায় সেবা চালু আছে"
          />
          {business.coverageAreas.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {business.coverageAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-line bg-canvas px-4 py-2 text-sm font-medium text-navy"
                >
                  {area}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-lg border border-dashed border-warning/40 bg-warning-soft p-6">
              <p className="text-base font-bold text-warning">
                প্রকাশিত এলাকার তালিকা এখনো যোগ করা হয়নি
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                এলাকার তালিকা কেবল তখনই প্রকাশ করা হবে যখন প্রতিটি এলাকার ফিজিক্যাল
                লাইন সম্ভাবনা যাচাই করা হয়েছে। ততক্ষণ ফর্মে ঠিকানা দিয়ে যাচাইয়ের
                অনুরোধ পাঠান — টিম সরাসরি যাচাই করে জানাবে।
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { business } from "@/config/business";
import { faqs, troubleshootingSteps } from "@/config/content";
import { ContactChannels } from "@/components/contact-channels";
import { FaqExplorer } from "@/components/faq-explorer";
import { SupportRequestForm } from "@/components/forms/support-request-form";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "সাপোর্ট",
  description:
    "ইন্টারনেট সংযোগে সমস্যা হলে ধাপে ধাপে সমাধান, প্রায় জিজ্ঞাসিত প্রশ্নের উত্তর এবং সাপোর্ট টিকিট পাঠানোর সুবিধা।",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="সাপোর্ট"
        title="সাপোর্ট কেন্দ্র"
        description="বেশিরভাগ সমস্যা নিজেই সমাধান করা যায়। নিচের ধাপগুলো দেখুন, না হলে টিকিট পাঠান।"
        crumbs={[{ href: "/", label: "হোম" }, { label: "সাপোর্ট" }]}
      />

      {/* Troubleshooting ------------------------------------------- */}
      <Section tone="canvas" labelledBy="troubleshoot-heading">
        <Container>
          <SectionHeading
            id="troubleshoot-heading"
            eyebrow="সমস্যা সমাধান"
            title="এই ধাপগুলো দেখে নিন"
            description="সংযোগ বিচ্ছিন্ন হলে, স্পিড কম মনে হলে বা ডিভাইসে আলো না জ্বললে — প্রথমে এই কাজগুলো করুন।"
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {troubleshootingSteps.map((step, index) => (
              <li
                key={step.id}
                className="rounded-lg border border-line bg-white p-6 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-md bg-brand-soft text-brand"
                  >
                    <Icon name={step.icon} size={20} />
                  </span>
                  <span className="text-xs font-bold tracking-[0.16em] text-brand">
                    ধাপ {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-md border border-line bg-white p-4 text-sm leading-relaxed text-ink-soft">
            ধাপগুলো কাজ না করলে বা সমস্যা দ্রুত সমাধান না হলে নিচের ফর্মে টিকিট
            পাঠান — টিম টেকনিক্যাল বিবরণ দেখে সমাধানের নির্দেশনা দেবে।
          </div>
        </Container>
      </Section>

      {/* FAQ -------------------------------------------------------- */}
      <Section tone="white" labelledBy="faq-search-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHeading
                id="faq-search-heading"
                eyebrow="সাধারণ প্রশ্ন"
                title="প্রশ্ন খুঁজে দেখুন"
                description="শব্দ লিখে বা বিষয় বেছে নিয়ে খুঁজুন।"
              />
              <div className="mt-8">
                <ContactChannels variant="plain" />
              </div>
            </div>
            <FaqExplorer items={faqs} />
          </div>
        </Container>
      </Section>

      {/* Ticket form ----------------------------------------------- */}
      <Section tone="canvas" id="ticket" labelledBy="ticket-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                id="ticket-heading"
                eyebrow="টিকিট"
                title="সাপোর্ট টিকিট পাঠান"
                description="সমস্যার বিবরণ যত সুনির্দিষ্ট হবে, টিম তত দ্রুত সমাধান করতে পারবে।"
              />
              <ul className="mt-7 space-y-3">
                {[
                  "কাস্টমার আইডি থাকলে দিন — খুব দ্রুত সমাধান হয়।",
                  "সমস্যা শুরুর সময় ও কতক্ষণ ধরে ছিল তা লিখুন।",
                  "সম্ভব হলে রাউটারের আলোর অবস্থা জানান।",
                  "ভুল বা অসংগত তথ্য দেওয়া থেকে বিরত থাকুন।",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                    <Icon
                      name="check"
                      size={16}
                      className="mt-1 shrink-0 text-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {business.officeHours ? (
                <p className="mt-7 rounded-md border border-line bg-white px-4 py-3 text-sm text-ink-soft">
                  সাপোর্ট সময়: {business.officeHours}
                </p>
              ) : (
                <p className="mt-7 rounded-md border border-dashed border-warning/40 bg-warning-soft px-4 py-3 text-sm text-warning">
                  সাপোর্টের সময়সূচি যোগ করতে হবে।
                </p>
              )}
            </div>

            <div className="rounded-lg border border-line bg-white p-6 shadow-xs sm:p-8">
              <h3 className="text-lg font-bold text-navy">টিকিট ফর্ম</h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                চিহ্নিত ঘরগুলো পূরণ করে টিকিট পাঠান।
              </p>
              <div className="mt-6">
                <SupportRequestForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

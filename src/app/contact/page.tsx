import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { ContactChannels } from "@/components/contact-channels";
import { ContactMessageForm } from "@/components/forms/contact-message-form";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "যোগাযোগ",
  description:
    "নেটওয়েভের সঙ্গে যোগাযোগের সব মাধ্যম — ফোন, হোয়াটসঅ্যাপ, ইমেইল ও অফিসের ঠিকানা, সঙ্গে বার্তা পাঠানোর সুবিধা।",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="যোগাযোগ"
        title="আমাদের সঙ্গে যোগাযোগ করুন"
        description="প্রশ্ন, মতামত বা সহায়তার প্রয়োজন — যেকোনো মাধ্যমে লিখুন। টিম যত দ্রুত সম্ভব উত্তর দেবে।"
        crumbs={[{ href: "/", label: "হোম" }, { label: "যোগাযোগ" }]}
      />

      <Section tone="canvas" labelledBy="channels-heading">
        <Container>
          <SectionHeading
            id="channels-heading"
            eyebrow="যোগাযোগের মাধ্যম"
            title="যেভাবে পৌঁছাতে পারেন"
            description="যে তথ্যগুলো এখনো যোগ করা হয়নি, সেগুলো স্পষ্টভাবে দেখানো হচ্ছে — ভুল নম্বরে যাওয়ার ঝুঁকি থাকে না।"
          />
          <div className="mt-10">
            <ContactChannels />
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="message-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                id="message-heading"
                eyebrow="বার্তা"
                title="ফর্মে লিখে পাঠান"
                description="বার্তা পাঠালে টিম আপনার নম্বরে ফোন করবে অথবা ইমেইলে উত্তর দেবে।"
              />
              <div className="mt-8 rounded-lg border border-line bg-canvas p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-navy">
                  <Icon name="info" size={16} className="text-brand" />
                  তথ্য ব্যবহারের বিষয়ে
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  যোগাযোগের তথ্য কেবল আপনার অনুরোধের উত্তর দেওয়ার জন্য ব্যবহৃত হয়।
                  বিস্তারিত{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-brand underline"
                  >
                    গোপনীয়তা নীতিতে
                  </Link>{" "}
                  পড়ুন।
                </p>
              </div>

              {business.address ? (
                <p className="mt-6 text-sm text-ink-soft">
                  অফিস: {business.address}
                </p>
              ) : null}
            </div>

            <div className="rounded-lg border border-line bg-white p-6 shadow-xs sm:p-8">
              <h3 className="text-lg font-bold text-navy">বার্তার ফর্ম</h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                চিহ্নিত ঘরগুলো পূরণ করে বার্তা পাঠান।
              </p>
              <div className="mt-6">
                <ContactMessageForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

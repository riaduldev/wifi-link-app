import type { Metadata } from "next";
import { business } from "@/config/business";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "পে বিল",
  description:
    "নেটওয়েভের ইন্টারনেট বিল পরিশোধের নির্দেশনা, গ্রহণযোগ্য পেমেন্ট মাধ্যম এবং কাস্টমার আইডি ও ট্রানজেকশন রেফারেন্স সংক্রান্ত তথ্য।",
  path: "/pay-bill",
});

const howToSteps = [
  {
    id: "p1",
    title: "বিলের তথ্য নিন",
    detail:
      "কাস্টমার আইডি, বিলের মাস ও প্রদেয় অঙ্ক বিলের কাগজে বা অনুমোদিত চ্যানেলে দেখুন।",
  },
  {
    id: "p2",
    title: "পেমেন্ট মাধ্যম বাছুন",
    detail:
      "নিচের তালিকা থেকে আপনার সুবিধাজনক মাধ্যম বেছে নিন এবং টাকা পাঠান।",
  },
  {
    id: "p3",
    title: "রেফারেন্স সংরক্ষণ করুন",
    detail:
      "পেমেন্টের ট্রানজেকশন আইডি বা রেফারেন্স নম্বর সংরক্ষণ করে রাখুন — বিল জিজ্ঞাসা করতে এটি লাগে।",
  },
  {
    id: "p4",
    title: "বিল যাচাই হলে পরবর্তী মাসের বিল",
    detail:
      "বিল জমা হওয়ার পর সেবা চলমান থাকে। কোনো সমস্যা হলে সাপোর্টে টিকিট পাঠান।",
  },
];

export default function PayBillPage() {
  const methods = business.paymentMethods;

  return (
    <>
      <PageHeader
        eyebrow="পে বিল"
        title="বিল পরিশোধের নির্দেশনা"
        description="কীভাবে টাকা পাঠাবেন, কাস্টমার আইডি ও ট্রানজেকশন রেফারেন্স কী এবং কোনো সমস্যায় কী করবেন — সবকিছু এক পাতায়।"
        crumbs={[{ href: "/", label: "হোম" }, { label: "পে বিল" }]}
      />

      <Section tone="canvas" labelledBy="methods-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                id="methods-heading"
                eyebrow="পেমেন্ট মাধ্যম"
                title="কোন মাধ্যমে টাকা পাঠাতে পারবেন"
                description="কেবল যেসব মাধ্যম প্রতিষ্ঠানের অনুমোদিত, সেগুলোই এখানে দেখানো হবে।"
              />

              {methods.length > 0 ? (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {methods.map((method) => (
                    <li
                      key={method.id}
                      className="rounded-lg border border-line bg-white p-5 shadow-xs"
                    >
                      <h3 className="text-base font-bold text-navy">
                        {method.label}
                      </h3>
                      <dl className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between gap-4">
                          <dt className="text-ink-muted">অ্যাকাউন্ট</dt>
                          <dd className="font-semibold text-navy">
                            {method.account || "তথ্য যোগ করতে হবে"}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-ink-muted">ধরন</dt>
                          <dd className="font-semibold text-navy">
                            {method.accountType || "তথ্য যোগ করতে হবে"}
                          </dd>
                        </div>
                      </dl>
                      {method.instructions ? (
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                          {method.instructions}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-8 rounded-lg border border-dashed border-warning/40 bg-warning-soft p-6">
                  <p className="text-base font-bold text-warning">
                    পেমেন্ট মাধ্যমের তালিকা যোগ করতে হবে
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    অ্যাকাউন্ট নম্বর ও বিস্তারিত ছাড়া কোনো পেমেন্ট মাধ্যম
                    প্রকাশ করা হয়নি — ভুল নম্বরে টাকা পাঠানোর ঝুঁকি এড়াতে।
                    যোগাযোগের তথ্য যোগ করার পর এই অংশে নির্দিষ্ট নির্দেশনাসহ
                    দেখানো হবে।
                  </p>
                </div>
              )}

              <div className="mt-8 rounded-lg border border-line bg-white p-6 shadow-xs">
                <h3 className="text-base font-bold text-navy">
                  টাকা পাঠানোর সময় যা লিখবেন
                </h3>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-navy">
                      কাস্টমার আইডি
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                      আপনার বিলে ছাপা আইডি — এটি দিয়ে টাকা পাঠালে টিম সহজেই
                      আপনার অ্যাকাউন্ট খুঁজে পায় ও বিল মিলিয়ে দেয়।
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-navy">
                      ট্রানজেকশন রেফারেন্স
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                      পেমেন্ট সম্পন্ন হলে মোবাইল ব্যাংকিং বা অন্যান্য মাধ্যম থেকে
                      যে ট্রানজেকশন আইডি পাবেন, তা সংরক্ষণ করুন। বিল জিজ্ঞাসা
                      বা ফেরত দরকার হলে এটি দরকার হয়।
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-lg border border-line bg-white p-6 shadow-xs">
                <h3 className="text-base font-bold text-navy">
                  পেমেন্টের ধাপ
                </h3>
                <ol className="mt-4 space-y-4">
                  {howToSteps.map((step, index) => (
                    <li key={step.id} className="flex gap-3.5">
                      <span
                        aria-hidden="true"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand-dark"
                      >
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-navy">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-lg border border-danger/25 bg-danger-soft p-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-danger">
                  <Icon name="warning" size={18} />
                  গুরুত্বপূর্ণ সতর্কতা
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                  <li>
                    এই পাতায় কার্ড নম্বর, CVV বা পাসওয়ার্ড কখনোই চাওয়া হয় না
                    এবং চাওয়া উচিতও নয়।
                  </li>
                  <li>
                    কেবল প্রতিষ্ঠানের অনুমোদিত অ্যাকাউন্টে টাকা পাঠান — অন্য কোনো
                    ব্যক্তির অ্যাকাউন্টে পাঠালে টাকা ফেরত পাওয়া কঠিন হয়ে যায়।
                  </li>
                  <li>
                    পেমেন্টের পর রসিদ সংরক্ষণ করুন; বিলের বিষয়ে বিতর্ক হলে
                    সাপোর্টে টিকিট পাঠান।
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="pay-note-heading">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="rounded-lg border border-line bg-canvas p-6 sm:p-8">
              <h2
                id="pay-note-heading"
                className="text-xl font-bold text-navy"
              >
                অনলাইন পেমেন্ট ও কাস্টমার পোর্টাল
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                এখনো কোনো পেমেন্ট গেটওয়ে বা কাস্টমার পোর্টাল সংযুক্ত নেই।
                গেটওয়ে যুক্ত হলে এখানে নিরাপদ পেমেন্ট বোতাম থাকবে এবং পেমেন্ট
                সফল হওয়ার কথা সার্ভার থেকেই নিশ্চিত করা হবে — এই সাইট কখনো
                নিজে থেকে “পেমেন্ট সম্পন্ন” বলবে না। পেমেন্ট প্রসেসর যুক্ত করার
                জন্য প্রয়োজন: প্রতিষ্ঠানের মার্চেন্ট অ্যাকাউন্ট, API কী, ওয়েবহুক
                ঠিকানা এবং সার্ভার-সাইড যাচাই।
              </p>
              <ButtonLink href="/support" variant="secondary" className="mt-6">
                বিল সংক্রান্ত সহায়তা নিন
              </ButtonLink>
            </div>
            <div className="rounded-lg border border-line bg-white p-6 shadow-xs">
              <h3 className="text-base font-bold text-navy">
                বিল জিজ্ঞাসা হলে যা লাগবে
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                {[
                  "কাস্টমার আইডি",
                  "বিলের মাস",
                  "ট্রানজেকশন রেফারেন্স (পেমেন্ট করে থাকলে)",
                  "সমস্যার বিবরণ",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

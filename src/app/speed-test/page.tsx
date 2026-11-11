import type { Metadata } from "next";
import { business } from "@/config/business";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "স্পিড টেস্ট",
  description:
    "ডাউনলোড, আপলোড ও পিং কী, এবং Wi-Fi বনাম LAN কানেকশনে সঠিকভাবে স্পিড টেস্ট কীভাবে করবেন — নেটওয়েভের সহায়তা কেন্দ্র থেকে।",
  path: "/speed-test",
});

const metrics = [
  {
    id: "m1",
    icon: "arrow-right" as const,
    title: "ডাউনলোড স্পিড",
    detail:
      "আপনার কাছ থেকে ইন্টারনেটে তথ্য আসার গতি (Mbps)। ওয়াচ ও স্ট্রিমিং এর উপর এটি সবচেয়ে বেশি প্রভাব ফেলে।",
  },
  {
    id: "m2",
    icon: "external" as const,
    title: "আপলোড স্পিড",
    detail:
      "আপনার কাছ থেকে বাইরে তথ্য পাঠানোর গতি (Mbps)। ভিডিও কল, ক্লাউড ব্যাকআপ ও ফাইল শেয়ারে এটি কাজে লাগে।",
  },
  {
    id: "m3",
    icon: "gauge" as const,
    title: "পিং / লেটেন্সি",
    detail:
      "অনুরোধে উত্তর পেতে কত সময় লাগে (ms)। গেমিং, ভিডিও কল ও ওয়েব ব্রাউজিং-এ সাড়া দেওয়ার গতি এটি দেখায়।",
  },
];

const lanSteps = [
  "কম্পিউটারটি রাউটারের সাথে ইথারনেট কেবলে (LAN) সরাসরি যুক্ত করুন — Wi-Fi বন্ধ রাখুন।",
  "স্পিড টেস্ট চালান এবং ফলাফল লিখে রাখুন।",
  "এবার একই ডিভাইসে Wi-Fi দিয়ে আবার টেস্ট চালান।",
  "দুই ফলাফলের পার্থক্য থাকলে বুঝবেন সমস্যা Wi-Fi সংযোগে, নাকি লাইনে।",
];

const dos = [
  "টেস্টের সময় বড় ফাইল ডাউনলোড বা আপলোড চালাবেন না।",
  "ভিডিও কল, ক্লাউড সিঙ্ক ও অন্য ডিভাইসের ব্যবহার বন্ধ রাখুন।",
  "সম্ভব হলে কাছাকাছি সার্ভারের সঙ্গে টেস্ট করুন।",
  "পরিণাম দেখে সিদ্ধান্ত নিন — বারবার টেস্ট না করে একবার পরিষ্কার ফলাফল নিন।",
];

export default function SpeedTestPage() {
  const hasProvider = business.speedTestUrl.trim().length > 0;
  const fallbackUrl = business.speedTestFallbackUrl.trim();

  return (
    <>
      <PageHeader
        eyebrow="স্পিড টেস্ট"
        title="আপনার ইন্টারনেট স্পিড কত?"
        description="স্পিড টেস্ট কীভাবে পড়বেন এবং সঠিক ফলাফল পেতে কী করবেন — সব ধাপে ধাপে বলে দেওয়া হলো।"
        crumbs={[{ href: "/", label: "হোম" }, { label: "স্পিড টেস্ট" }]}
      />

      <Section tone="canvas" labelledBy="metrics-heading">
        <Container>
          <SectionHeading
            id="metrics-heading"
            eyebrow="পরিচিতি"
            title="টেস্ট রিপোর্টে তিনটি সংখ্যা"
            description="একটি ভালো স্পিড টেস্টে তিনটি মান থাকে। প্রতিটির অর্থ কী, সেটা জানলে ফলাফল সহজে বোঝা যায়।"
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {metrics.map((metric) => (
              <li
                key={metric.id}
                className="rounded-lg border border-line bg-white p-6 shadow-xs"
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 place-items-center rounded-md bg-brand-soft text-brand"
                >
                  <Icon name={metric.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy">
                  {metric.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {metric.detail}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" labelledBy="howto-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                id="howto-heading"
                eyebrow="পদ্ধতি"
                title="সঠিক ফলাফল পেতে Wi-Fi বনাম LAN"
                description="Wi-Fi সংযোগে দূরত্ব, দেয়াল ও সংযুক্ত ডিভাইসের সংখ্যা স্পিড কমিয়ে দেয়। লাইনের আসল স্পিড বুঝতে কেবল ব্রাদার পরিমাপ করুন।"
              />
              <ol className="mt-8 space-y-4">
                {lanSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand-dark"
                    >
                      {index + 1}
                    </span>
                    <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg border border-line bg-canvas p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-base font-bold text-navy">
                <Icon name="check" size={18} className="text-brand" />
                টেস্টের সময় মনে রাখুন
              </h3>
              <ul className="mt-5 space-y-3">
                {dos.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-line pt-6">
                {hasProvider ? (
                  <div className="space-y-3">
                    <p className="text-sm text-ink-soft">
                      টেস্টটি আমাদের অনুমোদিত প্রতিষ্ঠানের সার্ভারে চালানো হবে:
                    </p>
                    <ButtonLink
                      href={business.speedTestUrl}
                      external
                      size="lg"
                    >
                      স্পিড টেস্ট চালান
                      <Icon name="external" size={16} />
                    </ButtonLink>
                  </div>
                ) : (
                  <div className="rounded-md border border-line bg-white p-4 shadow-xs">
                    <p className="flex items-center gap-2 text-sm font-bold text-navy">
                      <Icon name="gauge" size={16} className="text-brand" />
                      স্পিড টেস্ট চালানোর উপায়
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      এই সাইট নিজে স্পিড পরিমাপ করে না এবং কোনো নমুনা বা নকল ফলাফল
                      দেখায় না। নিচের লিংকে একটি তৃতীয় পক্ষের স্পিড টেস্ট সেবা খোলা
                      হবে — পরিমাপটি আপনার ব্রাউজার ও ওই প্রতিষ্ঠানের সার্ভারের মধ্যে
                      হয়, আমাদের সাইটের নয়।
                    </p>
                    {fallbackUrl ? (
                      <ButtonLink
                        href={fallbackUrl}
                        external
                        size="lg"
                        className="mt-4 w-full sm:w-auto"
                      >
                        {business.speedTestFallbackLabel}
                        <Icon name="external" size={16} />
                      </ButtonLink>
                    ) : (
                      <p className="mt-3 text-sm text-ink-soft">
                        কোনো তৃতীয় পক্ষের লিংকও যোগ করা হয়নি। অনুমোদিত প্রতিষ্ঠানের
                        ঠিকানা সেট করা হলে এখানে দেখা যাবে।
                      </p>
                    )}
                    <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                      প্রতিষ্ঠানের নিজস্ব স্পিড টেস্ট সেবা যুক্ত করা হলে
                      এই লিংকের বদলে সেটি দেখানো হবে।
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" labelledBy="slow-heading">
        <Container>
          <div className="rounded-lg border border-line bg-white p-6 shadow-xs sm:p-8">
            <h2
              id="slow-heading"
              className="text-xl font-bold text-navy"
            >
              স্পিড কম মনে হলে কী করবেন?
            </h2>
            <p className="mt-2 max-w-3xl text-[0.95rem] leading-relaxed text-ink-soft">
              প্রথমে রাউটার রিস্টার্ট করুন, তারপর কেবল সংযোগে আবার টেস্ট করুন।
              দুটি ফলাফলের পার্থক্য দেখে সমস্যা লাইনে নাকি Wi-Fi সংযোগে তা বোঝা
              যায়। সমাধান না হলে সাপোর্ট কেন্দ্রে টিকিট পাঠান — টিকিটে ধাপে ধাপে
              যা করবেন তা লেখা থাকে।
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/support">সাপোর্টে টিকিট পাঠান</ButtonLink>
              <ButtonLink href="/packages" variant="secondary">
                প্যাকেজ দেখুন
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

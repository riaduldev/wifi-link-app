import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { packages } from "@/config/packages";
import {
  connectionSteps,
  faqs,
  serviceFeatures,
} from "@/config/content";
import { pageMetadata } from "@/lib/metadata";
import { FaqAccordion } from "@/components/faq-accordion";
import { HeroVisual } from "@/components/hero-visual";
import { Icon } from "@/components/icons";
import { Notices } from "@/components/notices";
import { PackageCard } from "@/components/package-card";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: `${business.brandName} — ${business.tagline}`,
  description:
    "বাসস্থান ও ছোট ব্যবসার জন্য ইন্টারনেট। প্যাকেজ তুলনা করুন, কভারেজ চেক করুন, সংযোগের অনুরোধ দিন এবং সাপোর্টে টিকিট পাঠান।",
  path: "/",
});

const benefits = [
  {
    id: "b1",
    title: "স্পড ও দাম এক নজরে",
    detail: "প্রতিটি প্যাকেজে স্পিড, মাসিক বিল ও ইনস্টলেশন ফি পরিষ্কারভাবে দেখা যায়।",
  },
  {
    id: "b2",
    title: "সহজ অনুরোধ প্রক্রিয়া",
    detail: "নাম, মোবাইল ও ঠিকানা দিয়েই সংযোগের অনুরোধ জমা দিন।",
  },
  {
    id: "b3",
    title: "স্পষ্ট বিলিং",
    detail: "প্রতিটি বিলে কাস্টমার আইডি ও বিলের বিবরণ আলাদা করে থাকে।",
  },
  {
    id: "b4",
    title: "সমস্যা সমাধানের নির্দেশনা",
    detail: "সংযোগের সমস্যা হলে ধাপে ধাপে সমাধানের নির্দেশনা পাওয়া যায়।",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white/85">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-grid-lines opacity-60 lg:block"
        />
        <Container className="relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              {business.isDemoBrand ? (
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-semibold text-ink-soft">
                  <Icon name="info" size={14} className="text-brand" />
                  ডেমো সাইট — প্রকৃত ব্যবসার তথ্য যোগ করার আগে চালু হবে না
                </p>
              ) : null}

              <div data-rise="">
                <h1 className="text-[2.1rem] font-bold leading-[1.2] tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]">
                  আপনার ঘরে ও{" "}
                  <span className="text-brand">অফিসে</span> নির্ভরযোগ্য ইন্টারনেট
                </h1>
              </div>

              <div data-rise="" style={{ animationDelay: "80ms" }}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                  প্যাকেজ তুলনা করে সঠিক সিদ্ধান্ত নিন, কভারেজ যাচাই করে
                  অনুরোধ পাঠান, আর সমস্যা হলে ধাপে ধাপে সমাধান পান — সবই এক জায়গায়।
                </p>
              </div>

              <div
                data-rise=""
                style={{ animationDelay: "140ms" }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <ButtonLink href="/packages" size="lg">
                  প্যাকেজ দেখুন
                  <Icon name="arrow-right" size={18} />
                </ButtonLink>
                <ButtonLink href="/coverage" variant="secondary" size="lg">
                  কভারেজ চেক করুন
                </ButtonLink>
              </div>

              <div data-rise="" style={{ animationDelay: "200ms" }}>
                <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
                  <div>
                    <dt className="text-xs text-ink-muted">সেবার ধরন</dt>
                    <dd className="mt-1 text-sm font-semibold text-navy">
                      ফাইবার ও ওয়্যারলেস
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">গ্রাহক</dt>
                    <dd className="mt-1 text-sm font-semibold text-navy">
                      বাসস্থান ও ছোট ব্যবসা
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">সাপোর্ট</dt>
                    <dd className="mt-1 text-sm font-semibold text-navy">
                      ফোনে ও টিকিটে
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div data-rise="" style={{ animationDelay: "120ms" }} className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-2xl bg-dot-grid opacity-70"
              />
              <HeroVisual className="relative h-auto w-full" />
            </div>
          </div>
        </Container>
      </section>

      <Notices />

      {/* Benefits --------------------------------------------------- */}
      <Section tone="canvas" labelledBy="benefits-heading">
        <Container>
          <Reveal>
            <SectionHeading
              id="benefits-heading"
              eyebrow="কেন নেটওয়েভ"
              title="সিদ্ধান্ত নেওয়া সহজ, যোগাযোগ সহজ"
              description="সব তথ্য এক জায়গায়, সহজ ভাষায় — যাতে আপনি দ্রুত সিদ্ধান্ত নিতে পারেন।"
            />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.id}
                as="li"
                delay={index * 60}
                className="rounded-lg border border-line bg-white p-5 shadow-xs transition-shadow hover:shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-md bg-brand-soft text-brand"
                >
                  <Icon name="check" size={18} />
                </span>
                <h3 className="mt-3.5 text-base font-bold text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {benefit.detail}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Packages --------------------------------------------------- */}
      <Section tone="white" labelledBy="packages-heading">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="packages-heading"
              eyebrow="প্যাকেজ"
              title="আপনার প্রয়োজনের প্যাকেজ বেছে নিন"
              description="প্রতিটি প্যাকেজে স্পিড, মাসিক বিল, ইনস্টলেশন ফি ও ডিভাইস খরচ আলাদা করে দেওয়া আছে।"
            />
            <ButtonLink href="/packages" variant="secondary">
              সব প্যাকেজ তুলনা করুন
              <Icon name="arrow-right" size={16} />
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((item, index) => (
              <Reveal key={item.id} delay={index * 70} className="h-full">
                <PackageCard item={item} />
              </Reveal>
            ))}
          </div>

          <p className="mt-6 rounded-md border border-line bg-canvas px-4 py-3 text-sm text-ink-soft">
            দাম, স্পিড ও ফিচার এখনো প্রকাশ করা হয়নি। ভ্যারিফায়েড
            প্রতিষ্ঠানের অনুমোদিত তথ্য যোগ করলে এখানেই দেখা যাবে।
          </p>
        </Container>
      </Section>

      {/* Features --------------------------------------------------- */}
      <Section tone="canvas" labelledBy="features-heading">
        <Container>
          <SectionHeading
            id="features-heading"
            eyebrow="সেবার ধরন"
            title="শুধু ইন্টারনেট নয়, সম্পূর্ণ সেবা"
            description="সংযোগ থেকে বিল পরিশোধ ও সমস্যা সমাধান — প্রতিটি ধাপে সহায়তা।"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceFeatures.map((feature, index) => (
              <Reveal
                key={feature.id}
                as="li"
                delay={index * 60}
                className="rounded-lg border border-line bg-white p-6 shadow-xs transition-shadow hover:shadow-sm"
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
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Coverage preview ------------------------------------------- */}
      <Section tone="white" labelledBy="coverage-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                id="coverage-heading"
                eyebrow="কভারেজ"
                title="আপনার এলাকায় সেবা আছে কি না?"
                description="কভারেজ চেক করতে এলাকা ও বাসার ঠিকানা দিন। চেকটি একটি অনুরোধ নিবন্ধন — আমাদের টিম হাতে-কলমে ফিজিক্যাল লাইন দেখে চূড়ান্ত ফলাফল জানাবে।"
              />
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/coverage">
                  কভারেজ চেক করুন
                  <Icon name="arrow-right" size={16} />
                </ButtonLink>
                <ButtonLink href="/packages" variant="secondary">
                  প্যাকেজ দেখুন
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-lg border border-line bg-canvas p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                সার্ভিসেবল এলাকা
              </h3>
              {business.coverageAreas.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {business.coverageAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 rounded-md border border-dashed border-warning/40 bg-warning-soft px-4 py-4">
                  <p className="text-sm font-semibold text-warning">
                    এলাকার তালিকা যোগ করতে হবে
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    বিজ্ঞাপিত এলাকার তালিকা প্রকাশ করার আগে প্রতিটি এলাকা
                    যাচাই করা হবে। ততক্ষণ ঠিকানা দিয়ে যাচাইয়ের অনুরোধ পাঠান।
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Steps ------------------------------------------------------ */}
      <Section tone="canvas" labelledBy="steps-heading">
        <Container>
          <SectionHeading
            id="steps-heading"
            eyebrow="কীভাবে শুরু করবেন"
            title="চার ধাপে সংযোগ"
            description="অনুরোধ থেকে ইনস্টলেশন — পুরো প্রক্রিয়াটি এক নজরে।"
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {connectionSteps.map((step, index) => (
              <Reveal
                key={step.id}
                as="li"
                delay={index * 70}
                className="relative rounded-lg border border-line bg-white p-6 shadow-xs transition-shadow hover:shadow-sm"
              >
                <span className="text-xs font-bold tracking-[0.18em] text-brand">
                  {step.step}
                </span>
                <h3 className="mt-2 text-base font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.detail}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQ -------------------------------------------------------- */}
      <Section tone="white" labelledBy="faq-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                id="faq-heading"
                eyebrow="সাধারণ প্রশ্ন"
                title="জানতে চাওয়া কিছু প্রশ্ন"
                description="সাপোর্ট কেন্দ্রে আরও প্রশ্ন ও টিকিট পাঠানোর সুবিধা আছে।"
              />
              <ButtonLink href="/support" variant="secondary" className="mt-7">
                সাপোর্ট কেন্দ্রে যান
                <Icon name="arrow-right" size={16} />
              </ButtonLink>
            </div>
            <FaqAccordion items={faqs.slice(0, 5)} openFirst />
          </div>
        </Container>
      </Section>

      {/* Support CTA ------------------------------------------------- */}
      <Section tone="navy">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                সংযোগ নিতে চান, নাকি সমস্যায় পড়েছেন?
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-300 sm:text-base">
                অনুরোধ পাঠান অথবা সাপোর্টে টিকিট খুলুন — আমাদের টিম ধাপে ধাপে
                সাহায্য করবে।
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/coverage" variant="on-dark" size="lg">
                সংযোগের অনুরোধ দিন
              </ButtonLink>
              <ButtonLink href="/support" variant="on-dark-ghost" size="lg">
                সাপোর্টে যান
              </ButtonLink>
            </div>
          </div>
          <p className="mt-8 text-xs text-slate-400">
            <Link href="/privacy" className="underline hover:text-cyan">
              গোপনীয়তা নীতি
            </Link>{" "}
            ও{" "}
            <Link href="/terms" className="underline hover:text-cyan">
              শর্তাবলি
            </Link>{" "}
            পড়ে নেওয়ার পরেই অনুরোধ পাঠান।
          </p>
        </Container>
      </Section>
    </>
  );
}

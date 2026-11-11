import type { Metadata } from "next";
import { Suspense } from "react";
import { business } from "@/config/business";
import { packages } from "@/config/packages";
import { PackageComparison } from "@/components/package-comparison";
import { PackageCard } from "@/components/package-card";
import { Reveal } from "@/components/reveal";
import { ApplyFormSection } from "@/components/forms/apply-form-section";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { pageMetadata } from "@/lib/metadata";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "প্যাকেজ",
  description:
    "নেটওয়েভের ইন্টারনেট প্যাকেজগুলো এক নজরে — স্পিড, মাসিক বিল, ইনস্টলেশন ফি ও ONU খরচের তুলনা করে সঠিক প্যাকেজ বেছে নিন।",
  path: "/packages",
});

const comparisonNotes = [
  "স্পিড, দাম ও ফিচার প্রকাশের আগে ভ্যারিফায়েড হয়।",
  "ফিচার, ফি ও শর্ত প্যাকেজ অনুযায়ী কম-বেশি হতে পারে।",
  "যেকোনো প্যাকেজ বা শর্ত পরিবর্তনের আগে টিমের সঙ্গে কথা বলে নিন।",
];

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="প্যাকেজ"
        title="আপনার প্রয়োজনের প্যাকেজটি বেছে নিন"
        description="প্রতিটি প্যাকেজে স্পিড, মাসিক বিল, ইনস্টলেশন ফি, ONU/ডিভাইস খরচ ও ফিচার আলাদা করে দেওয়া আছে। তুলনা করে সিদ্ধান্ত নিন।"
        crumbs={[{ href: "/", label: "হোম" }, { label: "প্যাকেজ" }]}
      />

      <Section tone="canvas" labelledBy="package-list-heading">
        <Container>
          <SectionHeading
            id="package-list-heading"
            title="প্যাকেজের তালিকা"
            description="দাম ও স্পিড প্রকাশের আগে প্রতিটি ঘরে “তথ্য যোগ করতে হবে” দেখানো হচ্ছে।"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((item, index) => (
              <Reveal key={item.id} delay={index * 70} className="h-full">
                <PackageCard item={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="compare-heading">
        <Container>
          <SectionHeading
            id="compare-heading"
            eyebrow="তুলনা"
            title="এক নজরে পার্থক্য দেখুন"
            description="মোবাইলে কার্ড আকারে, বড় স্ক্রিনে টেবিল আকারে।"
          />
          <div className="mt-10">
            <PackageComparison items={packages} />
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {comparisonNotes.map((note) => (
              <li
                key={note}
                className="flex gap-2.5 rounded-md border border-line bg-canvas px-4 py-3 text-sm leading-relaxed text-ink-soft"
              >
                <Icon
                  name="info"
                  size={16}
                  className="mt-0.5 shrink-0 text-brand"
                />
                {note}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="canvas" id="apply" labelledBy="apply-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                id="apply-heading"
                eyebrow="আবেদন"
                title="সংযোগের অনুরোধ পাঠান"
                description="নাম, মোবাইল ও ঠিকানা দিলেই চলবে। অনুরোধ পাওয়ার পর আমাদের প্রতিনিধি যাচাই করে ফোনে যোগাযোগ করবেন।"
              />
              <ul className="mt-6 space-y-3">
                {[
                  "অনুরোধ যাচাই ছাড়া কোনো ফি বা চুক্তি স্বীকৃত বলে গণ্য হয় না।",
                  "তথ্য যাচাই ও যোগাযোগের জন্যই আপনার তথ্য ব্যবহৃত হয়।",
                  "ইনস্টলেশনের সময় ডিভাইস ও ফির বিস্তারিত সামনে জানানো হবে।",
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
            </div>

            <div className="rounded-lg border border-line bg-white p-6 shadow-xs sm:p-8">
              <h3 className="text-lg font-bold text-navy">
                সংযোগের অনুরোধ ফর্ম
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                চিহ্নিত ঘরগুলো পূরণ করে ফর্ম পাঠান।
              </p>
              <Suspense
                fallback={
                  <div
                    aria-busy="true"
                    className="h-72 animate-pulse rounded-md border border-line bg-canvas"
                  />
                }
              >
                <ApplyFormSection />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <p className="text-sm text-slate-300">
            {business.brandNameEn} একটি ডেমো ব্র্যান্ড — প্রকাশিত দাম, স্পিড ও
            শর্ত বাস্তব প্রতিষ্ঠানের অনুমোদনের পরেই কার্যকর হবে।
          </p>
        </Container>
      </Section>
    </>
  );
}

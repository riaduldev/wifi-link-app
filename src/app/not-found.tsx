import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { ButtonLink, Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "পাতাটি পাওয়া যায়নি",
  description:
    "আপনি যে ঠিকানায় যেতে চেয়েছেন সেটি সরানো হয়েছে বা কখনো ছিল না।",
  // A missing page should never be indexed.
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section tone="canvas">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
            ৪০৪
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            পাতাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            আপনি যে ঠিকানায় যেতে চাইছেন সেটি সরানো হয়েছে বা কখনো ছিল না।
            নিচের লিংক থেকে আপনি যা খুঁজছেন তা পেতে পারেন।
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              হোমপেজে ফিরে যান
            </ButtonLink>
            <ButtonLink href="/support" variant="secondary" size="lg">
              সাপোর্ট কেন্দ্র
            </ButtonLink>
          </div>

          <ul className="mx-auto mt-12 grid max-w-xl gap-3 text-left sm:grid-cols-2">
            {[
              { href: "/packages", label: "প্যাকেজ দেখুন" },
              { href: "/coverage", label: "কভারেজ চেক করুন" },
              { href: "/pay-bill", label: "বিল পরিশোধ" },
              { href: "/contact", label: "যোগাযোগ করুন" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-3 rounded-md border border-line bg-white px-4 py-3 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
                >
                  {item.label}
                  <Icon name="arrow-right" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

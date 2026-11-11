import Link from "next/link";
import { business } from "@/config/business";
import { navItems } from "@/config/navigation";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";

const supportLinks = [
  { href: "/support", label: "সাপোর্ট কেন্দ্র" },
  { href: "/pay-bill", label: "বিল পরিশোধ" },
  { href: "/speed-test", label: "স্পিড টেস্ট" },
  { href: "/coverage", label: "কভারেজ চেক" },
];

const policyLinks = [
  { href: "/privacy", label: "গোপনীয়তা নীতি" },
  { href: "/terms", label: "শর্তাবলি" },
  { href: "/about", label: "আমাদের পরিচিতি" },
];

export function SiteFooter() {
  const phoneHref = business.phone
    ? `tel:${business.phone.replace(/[^\d+]/g, "")}`
    : "";
  const whatsappHref = business.whatsapp
    ? `https://wa.me/${business.whatsapp.replace(/\D/g, "").replace(/^0+/, "")}`
    : "";
  const emailHref = business.email ? `mailto:${business.email}` : "";

  return (
    <footer className="mt-auto border-t border-line bg-navy text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">
              {business.tagline}
            </p>
            {business.isDemoBrand ? (
              <p className="mt-4 inline-flex rounded-md bg-white/10 px-3 py-2 text-xs leading-relaxed text-slate-300">
                এটি একটি ডেমো ব্র্যান্ড ও ডেমো সাইট। প্রকৃত ব্যবসার তথ্য যোগ
                করার আগে কোনো সেবা প্রদান করা হয় না।
              </p>
            ) : null}
          </div>

          <nav aria-label="ফুটার — সেবা">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">
              সেবা
            </h2>
            <ul className="mt-3 space-y-0.5">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="-mx-2 inline-block rounded px-2 py-2.5 text-sm text-slate-300 transition-colors hover:text-cyan"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="ফুটার — সহায়তা">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">
              সহায়তা
            </h2>
            <ul className="mt-3 space-y-0.5">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="-mx-2 inline-block rounded px-2 py-2.5 text-sm text-slate-300 transition-colors hover:text-cyan"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">
              যোগাযোগ
            </h2>
            <ul className="mt-3 space-y-1 text-sm">
              <li className="flex items-start gap-2.5 text-slate-300">
                <Icon name="phone" size={18} className="mt-0.5 shrink-0" />
                {phoneHref ? (
                  <a
                    href={phoneHref}
                    className="-my-1 inline-block rounded px-1 py-2.5 transition-colors hover:text-cyan"
                  >
                    {business.phone}
                  </a>
                ) : (
                  <span className="text-slate-400">ফোন নম্বর যোগ করতে হবে</span>
                )}
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <Icon name="whatsapp" size={18} className="mt-0.5 shrink-0" />
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-1 inline-block rounded px-1 py-2.5 transition-colors hover:text-cyan"
                  >
                    {business.whatsapp}
                  </a>
                ) : (
                  <span className="text-slate-400">
                    WhatsApp নম্বর যোগ করতে হবে
                  </span>
                )}
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <Icon name="mail" size={18} className="mt-0.5 shrink-0" />
                {emailHref ? (
                  <a
                    href={emailHref}
                    className="-my-1 inline-block rounded px-1 py-2.5 transition-colors hover:text-cyan"
                  >
                    {business.email}
                  </a>
                ) : (
                  <span className="text-slate-400">ইমেইল ঠিকানা যোগ করতে হবে</span>
                )}
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <Icon name="location" size={18} className="mt-0.5 shrink-0" />
                {business.address ? (
                  <span>{business.address}</span>
                ) : (
                  <span className="text-slate-400">ঠিকানা যোগ করতে হবে</span>
                )}
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <Icon name="support" size={18} className="mt-0.5 shrink-0" />
                {business.officeHours ? (
                  <span>{business.officeHours}</span>
                ) : (
                  <span className="text-slate-400">সময়সূচি যোগ করতে হবে</span>
                )}
              </li>
            </ul>

            {business.social.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {business.social.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-cyan hover:text-cyan"
                    >
                      {item.label}
                      <Icon name="external" size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.brandNameEn}. সর্বস্বত্ব
            সংরক্ষিত।
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {policyLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="-my-1 inline-block rounded px-1 py-2.5 transition-colors hover:text-cyan"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business } from "@/config/business";
import { navItems } from "@/config/navigation";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { buttonClasses } from "@/components/ui";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const phoneHref = business.phone ? `tel:${business.phone.replace(/[^\d+]/g, "")}` : "";
  const whatsappHref = business.whatsapp
    ? `https://wa.me/${business.whatsapp.replace(/\D/g, "").replace(/^0+/, "")}`
    : "";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="hidden bg-navy text-white lg:block">
        <div className="container-page flex h-10 items-center justify-between text-sm">
          <p className="text-slate-300">
            {business.tagline}
            {business.isDemoBrand ? (
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-cyan">
                ডেমো ব্র্যান্ড
              </span>
            ) : null}
          </p>
          <div className="flex items-center gap-4">
            {phoneHref ? (
              <a
                href={phoneHref}
                className="flex items-center gap-1.5 text-slate-200 transition-colors hover:text-cyan"
              >
                <Icon name="phone" size={16} />
                {business.phone}
              </a>
            ) : null}
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-200 transition-colors hover:text-cyan"
              >
                <Icon name="whatsapp" size={16} />
                WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo />

        <nav
          aria-label="প্রধান মেনু"
          className="hidden min-w-0 lg:block"
        >
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="min-w-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block whitespace-nowrap rounded-md px-2 py-2 text-[0.8rem] font-medium transition-colors xl:px-3 xl:text-[0.9rem] ${
                      active
                        ? "text-brand"
                        : "text-ink-soft hover:bg-brand-soft hover:text-brand-dark"
                    }`}
                  >
                    {/* Both labels are rendered so the full one can replace
                        the short one on wide screens; `display: none`
                        removes the hidden copy from the accessibility
                        tree as well. */}
                    <span className="xl:hidden">{item.shortLabel ?? item.label}</span>
                    <span className="hidden xl:inline">{item.label}</span>
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand xl:inset-x-3"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/*
            The responsive hiding lives on the wrapper, not on the button:
            `buttonClasses` already sets `inline-flex`, and two display
            utilities in the same element resolve by stylesheet order, not
            by the order they appear in the class attribute.
          */}
          <span className="hidden sm:inline-flex">
            {phoneHref ? (
              <a href={phoneHref} className={buttonClasses("primary", "sm")}>
                <Icon name="phone" size={16} />
                কল করুন
              </a>
            ) : (
              <span
                className={buttonClasses("secondary", "sm", "cursor-not-allowed")}
                aria-disabled="true"
              >
                ফোন নম্বর যোগ করতে হবে
              </span>
            )}
          </span>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-navy transition-colors hover:bg-brand-soft lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
            <span className="sr-only">
              {open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        {/*
          The panel is capped to the space left under the sticky header and
          scrolls on its own. Without this, the menu is taller than a short
          phone viewport (e.g. 375x667), the bottom call/WhatsApp buttons
          become unreachable, and the locked body scroll cannot be used to
          reach them either. See `.menu-scroll-panel` in globals.css.
        */}
        <nav
          aria-label="মোবাইল মেনু"
          className="menu-scroll-panel container-page py-4"
        >
          <ul className="grid gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
                      active
                        ? "bg-brand-soft text-brand"
                        : "text-navy hover:bg-canvas"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <Icon name="check" size={18} className="text-brand" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 grid gap-2 border-t border-line pt-4">
            {phoneHref ? (
              <a
                href={phoneHref}
                className={buttonClasses("primary", "md", "w-full")}
              >
                <Icon name="phone" size={18} />
                সাপোর্টে কল করুন
              </a>
            ) : (
              <span
                className={buttonClasses(
                  "secondary",
                  "md",
                  "w-full cursor-not-allowed",
                )}
                aria-disabled="true"
              >
                ফোন নম্বর যোগ করতে হবে
              </span>
            )}
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("secondary", "md", "w-full")}
              >
                <Icon name="whatsapp" size={18} />
                WhatsApp-এ লিখুন
              </a>
            ) : (
              <span
                className={buttonClasses(
                  "secondary",
                  "md",
                  "w-full cursor-not-allowed",
                )}
                aria-disabled="true"
              >
                WhatsApp নম্বর যোগ করতে হবে
              </span>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

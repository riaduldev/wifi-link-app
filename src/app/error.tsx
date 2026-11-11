"use client";

import { useEffect } from "react";
import { Icon } from "@/components/icons";
import { ButtonLink, Container, Section } from "@/components/ui";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="canvas">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-danger-soft text-danger"
          >
            <Icon name="warning" size={26} />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            কিছু একটা সমস্যা হয়েছে
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            পেজটি লোড করার সময় অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন,
            আর সমস্যা থাকলে সাপোর্টে জানান।
          </p>
          {error.digest ? (
            <p className="mt-3 text-xs text-ink-muted">
              ত্রুটির কোড: {error.digest}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              আবার চেষ্টা করুন
            </button>
            <ButtonLink href="/support" variant="secondary" size="lg">
              সাপোর্টে যান
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

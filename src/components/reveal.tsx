"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Restrained scroll reveal.
 *
 * The wrapper only ever *adds* motion — the content is always present in
 * the DOM and in the accessibility tree (opacity, not `display`/`hidden`),
 * so nothing is hidden from assistive technology or search engines.
 *
 * The initial hidden state is applied by CSS only when `html.js` is set,
 * and that class is added by an inline script in the root layout before
 * first paint. Without JavaScript (or if `IntersectionObserver` is
 * unavailable) the content renders plainly and never disappears.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds, used to stagger sibling blocks. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => node.setAttribute("data-visible", "true");

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      // `threshold: 0` fires as soon as any part of the element enters the
      // viewport, so content that is already on screen is never delayed.
      { threshold: 0 },
    );

    observer.observe(node);

    // Safety net: never leave content hidden if the observer never fires
    // (e.g. the element sits inside a container with unusual overflow).
    const timer = window.setTimeout(reveal, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

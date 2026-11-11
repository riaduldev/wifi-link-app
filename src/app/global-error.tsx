"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Last-resort error boundary. It replaces the whole document, so it
 * cannot rely on the root layout — it renders its own minimal shell with
 * inline styles so it still looks like the rest of the site.
 */
export default function GlobalError({
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
    <html lang="bn">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#F5F8FC",
          color: "#0B1F3A",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', 'Noto Sans Bengali', sans-serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#1769FF",
            }}
          >
            ৫০০
          </p>
          <h1
            style={{
              margin: "1rem 0 0",
              fontSize: "1.75rem",
              lineHeight: 1.3,
              fontWeight: 700,
            }}
          >
            কিছু একটা সমস্যা হয়েছে
          </h1>
          <p
            style={{
              margin: "1rem 0 0",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#3f5573",
            }}
          >
            পেজটি লোড করার সময় অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন, আর
            সমস্যা থাকলে সাপোর্টে জানান।
          </p>
          {error.digest ? (
            <p style={{ margin: "0.75rem 0 0", fontSize: "0.75rem", color: "#64748b" }}>
              ত্রুটির কোড: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.75rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: 0,
              backgroundColor: "#1769FF",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            আবার চেষ্টা করুন
          </button>
          <p style={{ margin: "1.5rem 0 0", fontSize: "0.85rem", color: "#64748b" }}>
            <Link href="/" style={{ color: "#1769FF" }}>
              হোমপেজে ফিরে যান
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}

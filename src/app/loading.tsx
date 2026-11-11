import { Container } from "@/components/ui";

/** Route-level loading skeleton. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">পেজ লোড হচ্ছে…</span>
      <div className="border-b border-line bg-white">
        <Container className="py-12">
          <div className="h-4 w-28 animate-pulse rounded bg-line" />
          <div className="mt-4 h-9 w-full max-w-xl animate-pulse rounded bg-line" />
          <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-line" />
        </Container>
      </div>
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-lg border border-line bg-white"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

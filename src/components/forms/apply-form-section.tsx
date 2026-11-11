"use client";

import { useSearchParams } from "next/navigation";
import { ConnectionRequestForm } from "@/components/forms/connection-request-form";
import { packages } from "@/config/packages";

/**
 * Reads the `?package=` query parameter on the client so the packages page
 * can stay statically prerendered.
 */
export function ApplyFormSection() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("package") ?? "";
  const selected = packages.find((item) => item.id === selectedId);

  return (
    <>
      {selected ? (
        <div className="mt-6 rounded-lg border border-brand/30 bg-brand-soft px-4 py-4">
          <p className="text-sm font-semibold text-brand-dark">
            আপনি নির্বাচিত করেছেন: {selected.name}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            ফর্মের “প্যাকেজ” ঘরে এটি নির্বাচিত আছে।
          </p>
        </div>
      ) : null}
      <div className="mt-6">
        <ConnectionRequestForm defaultPackageId={selectedId} />
      </div>
    </>
  );
}

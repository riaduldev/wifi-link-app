import Link from "next/link";
import type { InternetPackage } from "@/config/packages";
import { formatBdt, formatSpeed, TBD } from "@/lib/format";
import { Icon } from "@/components/icons";

export function PackageFacts({
  item,
  tone = "light",
}: {
  item: InternetPackage;
  tone?: "light" | "dark";
}) {
  const rows = [
    { label: "স্পিড", value: formatSpeed(item.speedMbps) },
    { label: "মাসিক বিল", value: formatBdt(item.monthlyPrice) },
    { label: "ইনস্টলেশন ফি", value: formatBdt(item.installationFee) },
    { label: "ONU / ডিভাইস", value: formatBdt(item.equipmentCharge) },
  ];

  return (
    <dl className="grid gap-3">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 border-b border-dashed border-line pb-2.5 last:border-0 last:pb-0"
        >
          <dt
            className={`text-sm ${
              tone === "dark" ? "text-slate-400" : "text-ink-muted"
            }`}
          >
            {row.label}
          </dt>
          <dd
            className={`text-right text-sm font-semibold sm:text-base ${
              tone === "dark" ? "text-white" : "text-navy"
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function PackageCard({
  item,
  highlighted = false,
}: {
  item: InternetPackage;
  highlighted?: boolean;
}) {
  const speed = formatSpeed(item.speedMbps);
  const price = formatBdt(item.monthlyPrice);
  const isPending = item.speedMbps === null || item.monthlyPrice === null;

  return (
    <article
      className={`flex h-full flex-col rounded-lg border bg-white p-6 shadow-xs transition-shadow ${
        highlighted
          ? "border-brand shadow-md ring-1 ring-brand/20"
          : "border-line hover:shadow-sm"
      }`}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-navy">{item.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            {item.summary}
          </p>
        </div>
        {!item.available ? (
          <span className="shrink-0 rounded-full bg-warning-soft px-2.5 py-1 text-[0.7rem] font-semibold text-warning">
            চালু হওয়ার অপেক্ষায়
          </span>
        ) : null}
      </header>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-3xl font-bold tracking-tight text-navy">
          {speed}
        </span>
        {item.speedMbps !== null ? (
          <span className="pb-1 text-sm text-ink-muted">ডাউনলিংক</span>
        ) : null}
      </div>

      <p className="mt-2 text-sm text-ink-muted">
        মাসিক:{" "}
        <span className="font-semibold text-navy">
          {price}
          {item.monthlyPrice !== null ? " / মাস" : ""}
        </span>
      </p>

      <div className="mt-5 border-t border-line pt-5">
        <PackageFacts item={item} />
      </div>

      {item.features.length > 0 ? (
        <ul className="mt-5 space-y-2">
          {item.features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-ink-soft">
              <Icon name="check" size={16} className="mt-1 shrink-0 text-brand" />
              {feature}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 rounded-md bg-warning-soft px-3 py-2 text-xs font-medium text-warning">
          ফিচারের তালিকা যোগ করতে হবে
        </p>
      )}

      <p className="mt-4 text-xs text-ink-muted">
        প্রযোজ্যতা: {item.availability || TBD}
      </p>

      <div className="mt-6 flex flex-col gap-2 pt-1">
        <Link
          href={`/packages?package=${encodeURIComponent(item.id)}#apply`}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          এই প্যাকেজ নিতে চাই
          <Icon name="arrow-right" size={16} />
        </Link>
        <Link
          href="/coverage"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand-dark"
        >
          আগে কভারেজ দেখি
        </Link>
        {isPending ? (
          <p className="pt-1 text-center text-xs text-ink-muted">
            দাম ও স্পিড প্রকাশের আগে যাচাই করা হচ্ছে।
          </p>
        ) : null}
      </div>
    </article>
  );
}

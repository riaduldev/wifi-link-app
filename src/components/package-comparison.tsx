import type { InternetPackage } from "@/config/packages";
import { formatBdt, formatSpeed, TBD } from "@/lib/format";
import { Icon } from "@/components/icons";

const comparisonRows = [
  { id: "speed", label: "ডাউনলিংক স্পিড" },
  { id: "price", label: "মাসিক বিল" },
  { id: "installation", label: "ইনস্টলেশন ফি" },
  { id: "equipment", label: "ONU / ডিভাইস খরচ" },
  { id: "availability", label: "প্রযোজ্যতা" },
  { id: "status", label: "বর্তমান অবস্থা" },
];

function cellValue(item: InternetPackage, rowId: string) {
  switch (rowId) {
    case "speed":
      return formatSpeed(item.speedMbps);
    case "price":
      return formatBdt(item.monthlyPrice);
    case "installation":
      return formatBdt(item.installationFee);
    case "equipment":
      return formatBdt(item.equipmentCharge);
    case "availability":
      return item.availability || TBD;
    case "status":
      return item.available ? "চালু আছে" : "চালু হওয়ার অপেক্ষায়";
    default:
      return TBD;
  }
}

export function PackageComparison({ items }: { items: InternetPackage[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line-strong bg-white p-8 text-center text-ink-soft">
        তুলনা দেখানোর জন্য প্যাকেজ যোগ করতে হবে।
      </p>
    );
  }

  return (
    <div>
      {/* Desktop: real comparison table */}
      <div className="hidden overflow-x-auto rounded-lg border border-line bg-white shadow-xs md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            প্যাকেজ তুলনার টেবিল — স্পিড, মাসিক বিল, ইনস্টলেশন ফি, ONU খরচ ও
            প্রযোজ্যতা
          </caption>
          <thead>
            <tr className="border-b border-line bg-canvas">
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-ink-soft">
                বিবরণ
              </th>
              {items.map((item) => (
                <th
                  key={item.id}
                  scope="col"
                  className="px-5 py-4 text-sm font-bold text-navy"
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0">
                <th
                  scope="row"
                  className="px-5 py-4 text-sm font-medium text-ink-muted"
                >
                  {row.label}
                </th>
                {items.map((item) => (
                  <td
                    key={item.id}
                    className="px-5 py-4 text-sm font-semibold text-navy"
                  >
                    {cellValue(item, row.id)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-5 py-4 text-sm font-medium text-ink-muted">
                ফিচার
              </th>
              {items.map((item) => (
                <td key={item.id} className="px-5 py-4 align-top">
                  {item.features.length > 0 ? (
                    <ul className="space-y-1.5">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2 text-sm text-ink-soft"
                        >
                          <Icon
                            name="check"
                            size={15}
                            className="mt-1 shrink-0 text-brand"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs font-semibold text-warning">
                      তথ্য যোগ করতে হবে
                    </span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked comparison cards */}
      <div className="grid gap-4 md:hidden">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border border-line bg-white p-5 shadow-xs"
          >
            <h3 className="text-base font-bold text-navy">{item.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{item.summary}</p>
            <dl className="mt-4 space-y-2.5">
              {comparisonRows.map((row) => (
                <div
                  key={row.id}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-line pb-2 last:border-0"
                >
                  <dt className="text-sm text-ink-muted">{row.label}</dt>
                  <dd className="text-right text-sm font-semibold text-navy">
                    {cellValue(item, row.id)}
                  </dd>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4">
                <dt className="text-sm text-ink-muted">ফিচার</dt>
                <dd className="text-right text-sm font-semibold text-navy">
                  {item.features.length > 0 ? (
                    <ul className="space-y-1">
                      {item.features.map((feature) => (
                        <li key={feature} className="text-ink-soft">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-warning">
                      তথ্য যোগ করতে হবে
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

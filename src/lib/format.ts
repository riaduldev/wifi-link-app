/**
 * Placeholder + formatting helpers.
 *
 * Rule of the codebase: a missing business value is NEVER rendered as 0,
 * "-" or an empty cell. It always renders through `TBD` so the owner can
 * see exactly what still has to be filled in.
 */

export const TBD = "তথ্য যোগ করতে হবে";

export function isBlank(value: string | number | null | undefined): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "number") return Number.isNaN(value);
  return value.trim().length === 0;
}

/** Returns the value, or the placeholder when it is missing. */
export function orTbd(
  value: string | number | null | undefined,
  placeholder: string = TBD,
): string {
  return isBlank(value) ? placeholder : String(value);
}

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/**
 * Formats a BDT amount. `null`/`undefined` render as the placeholder.
 * Set `currency: false` to render the raw number without the ৳ sign.
 */
export function formatBdt(
  amount: number | null | undefined,
  options: { currency?: boolean } = {},
): string {
  if (isBlank(amount)) return TBD;
  const value = Number(amount ?? 0);
  const formatted = numberFormatter.format(value);
  if (options.currency === false) return formatted;
  return `৳${formatted}`;
}

/** Formats an Mbps speed. `null`/`undefined` render as the placeholder. */
export function formatSpeed(
  speedMbps: number | null | undefined,
  unit: "Mbps" | "Mbps+" = "Mbps",
): string {
  if (isBlank(speedMbps)) return TBD;
  return `${numberFormatter.format(Number(speedMbps))} ${unit}`;
}

/**
 * Formats a value that may be a plain string (already human readable).
 * Blank strings become the placeholder.
 */
export function formatText(
  value: string | null | undefined,
  placeholder: string = TBD,
): string {
  if (value === null || value === undefined || value.trim().length === 0) {
    return placeholder;
  }
  return value.trim();
}

/** Formats an ISO date (YYYY-MM-DD) as a Bengali long date. */
export function formatDate(isoDate: string | undefined): string {
  if (!isoDate) return "";
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}

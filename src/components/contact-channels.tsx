import { business } from "@/config/business";
import { Icon, type IconName } from "@/components/icons";

type Channel = {
  id: string;
  icon: IconName;
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
  note?: string;
};

/**
 * Renders the real contact channels. Missing details are shown as an
 * explicit placeholder instead of a broken link.
 */
export function ContactChannels({
  variant = "card",
  className = "",
}: {
  variant?: "card" | "plain";
  className?: string;
}) {
  const phone = business.phone.trim();
  const whatsapp = business.whatsapp.trim();
  const email = business.email.trim();
  const address = business.address.trim();

  const channels: Channel[] = [
    {
      id: "phone",
      icon: "phone",
      label: "সাপোর্ট ফোন",
      value: phone || "ফোন নম্বর যোগ করতে হবে",
      href: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null,
    },
    {
      id: "whatsapp",
      icon: "whatsapp",
      label: "হোয়াটসঅ্যাপ",
      value: whatsapp || "WhatsApp নম্বর যোগ করতে হবে",
      href: whatsapp
        ? `https://wa.me/${whatsapp.replace(/\D/g, "").replace(/^0+/, "")}`
        : null,
      external: true,
    },
    {
      id: "email",
      icon: "mail",
      label: "ইমেইল",
      value: email || "ইমেইল ঠিকানা যোগ করতে হবে",
      href: email ? `mailto:${email}` : null,
    },
    {
      id: "address",
      icon: "location",
      label: "অফিসের ঠিকানা",
      value: address || "ঠিকানা যোগ করতে হবে",
      href: null,
    },
    {
      id: "hours",
      icon: "support",
      label: "সাপোর্ট সময়",
      value: business.officeHours.trim() || "সময়সূচি যোগ করতে হবে",
      href: null,
    },
  ];

  if (variant === "card") {
    return (
      <ul className={`grid gap-4 sm:grid-cols-2 ${className}`}>
        {channels.map((channel) => (
          <li
            key={channel.id}
            className="rounded-lg border border-line bg-white p-5 shadow-xs"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-soft text-brand">
              <Icon name={channel.icon} size={20} />
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {channel.label}
            </p>
            {channel.href ? (
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-1 inline-flex items-center gap-1.5 text-base font-semibold text-navy transition-colors hover:text-brand"
              >
                {channel.value}
                {channel.external ? <Icon name="external" size={14} /> : null}
              </a>
            ) : (
              <p className="mt-1 text-base font-semibold text-ink-muted">
                {channel.value}
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <dl className={`space-y-3 ${className}`}>
      {channels.map((channel) => (
        <div key={channel.id} className="flex gap-3">
          <dt className="shrink-0 pt-0.5 text-ink-muted">
            <Icon name={channel.icon} size={18} />
            <span className="sr-only">{channel.label}</span>
          </dt>
          <dd className="text-[0.95rem] text-ink-soft">
            {channel.href ? (
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-semibold text-navy transition-colors hover:text-brand"
              >
                {channel.value}
              </a>
            ) : (
              <span className="text-ink-muted">{channel.value}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

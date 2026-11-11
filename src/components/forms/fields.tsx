"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Icon } from "@/components/icons";
import { ContactChannels } from "@/components/contact-channels";
import type { RequestStatus } from "@/app/actions/request-state";

/* ------------------------------------------------------------------ */
/* Fields                                                              */
/* ------------------------------------------------------------------ */

type FieldShellProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    className: string;
  }) => ReactNode;
};

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
}: FieldShellProps) {
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-muted">
            (ঐচ্ছিক)
          </span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-ink-muted">
          {hint}
        </p>
      ) : null}
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        className: `w-full rounded-md border bg-white px-3.5 py-2.5 text-[0.95rem] text-navy transition-colors placeholder:text-ink-muted/70 focus:border-brand ${
          error ? "border-danger" : "border-line-strong"
        }`,
      })}
      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-sm font-medium text-danger"
        >
          <Icon name="warning" size={16} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  id,
  label,
  hint,
  error,
  required,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
    >
      {(fieldProps) => (
        <input
          {...props}
          {...fieldProps}
          required={required}
          className={fieldProps.className}
        />
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  hint,
  error,
  required,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
    >
      {(fieldProps) => (
        <textarea
          {...props}
          {...fieldProps}
          required={required}
          className={`${fieldProps.className} min-h-32 resize-y`}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  children,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
    >
      {(fieldProps) => (
        <select
          {...props}
          {...fieldProps}
          required={required}
          className={`${fieldProps.className} appearance-none bg-[length:1rem] pr-9`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9.5 6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
          }}
        >
          {children}
        </select>
      )}
    </FieldShell>
  );
}

/** Honeypot: hidden from humans, visible to naive bots. */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">ওয়েবসাইট</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status + submit                                                     */
/* ------------------------------------------------------------------ */

export function FormStatus({
  status,
  message,
  reference,
}: {
  status: RequestStatus;
  message: string;
  reference?: string;
}) {
  if (status === "idle" || !message) return null;

  const tone =
    status === "delivered"
      ? "border-success bg-success-soft text-success"
      : status === "not-connected"
        ? "border-warning bg-warning-soft text-warning"
        : "border-danger bg-danger-soft text-danger";

  const title =
    status === "delivered"
      ? "অনুরোধ গ্রহণ করা হয়েছে"
      : status === "not-connected"
        ? "ব্যাকএন্ড সংযুক্ত নয়"
        : "ফরম জমা দেওয়া যায়নি";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-md border px-4 py-3.5 ${tone}`}
    >
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed">{message}</p>
      {reference ? (
        <p className="mt-2 text-xs font-semibold opacity-80">
          রেফারেন্স: {reference}
        </p>
      ) : null}
      {status === "not-connected" ? (
        <div className="mt-3 rounded-md border border-current/20 bg-white/70 px-3 py-3 text-navy">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            সরাসরি যোগাযোগ
          </p>
          <div className="mt-2">
            <ContactChannels variant="plain" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SubmitButton({
  pending,
  children,
  className = "",
}: {
  pending: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-base font-semibold text-white shadow-xs transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
          প্রেরণ করা হচ্ছে…
        </>
      ) : (
        children
      )}
    </button>
  );
}

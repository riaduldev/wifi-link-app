"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactMessage } from "@/app/actions/requests";
import { initialActionState } from "@/app/actions/request-state";
import {
  FormStatus,
  HoneypotField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import {
  validateMessage,
  validateName,
  validatePhone,
  type FieldErrors,
} from "@/lib/validation";

export function ContactMessageForm() {
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    initialActionState,
  );
  const [localErrors, setLocalErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "delivered") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const errorFor = (name: string) => state.errors[name] ?? localErrors[name];

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="space-y-5"
      onSubmit={(event) => {
        const data = new FormData(event.currentTarget);
        const errors: FieldErrors = {};

        const name = String(data.get("name") ?? "").trim();
        const phone = String(data.get("phone") ?? "").trim();
        const message = String(data.get("message") ?? "").trim();

        const nameError = validateName(name);
        if (nameError) errors.name = nameError;
        const phoneError = validatePhone(phone);
        if (phoneError) errors.phone = phoneError;
        const messageError = validateMessage(message);
        if (messageError) errors.message = messageError;

        if (Object.keys(errors).length > 0) {
          event.preventDefault();
          setLocalErrors(errors);
          document.getElementById(Object.keys(errors)[0])?.focus();
          return;
        }
        setLocalErrors({});
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          name="name"
          label="পূর্ণ নাম"
          required
          autoComplete="name"
          error={errorFor("name")}
        />
        <TextField
          id="phone"
          name="phone"
          label="মোবাইল নম্বর"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="01712345678"
          error={errorFor("phone")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="email"
          name="email"
          label="ইমেইল ঠিকানা"
          required={false}
          type="email"
          autoComplete="email"
          error={errorFor("email")}
        />
        <TextField
          id="subject"
          name="subject"
          label="বিষয়"
          required={false}
          placeholder="যেমন: বিল সংক্রান্ত প্রশ্ন"
          error={errorFor("subject")}
        />
      </div>

      <TextAreaField
        id="message"
        name="message"
        label="বার্তা"
        required
        rows={5}
        placeholder="আপনার প্রশ্ন বা মতামত লিখুন।"
        error={errorFor("message")}
      />

      <HoneypotField />

      <FormStatus
        status={state.status}
        message={state.message}
        reference={state.reference}
      />

      <SubmitButton pending={pending}>বার্তা পাঠান</SubmitButton>
    </form>
  );
}

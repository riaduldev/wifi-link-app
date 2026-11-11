"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitSupportTicket } from "@/app/actions/requests";
import { initialActionState } from "@/app/actions/request-state";
import {
  FormStatus,
  HoneypotField,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import {
  validateCustomerId,
  validateMessage,
  validateName,
  validatePhone,
  type FieldErrors,
} from "@/lib/validation";

const categories = [
  { value: "connection", label: "সংযোগ সমস্যা" },
  { value: "speed", label: "স্পিড সমস্যা" },
  { value: "billing", label: "বিল সংক্রান্ত" },
  { value: "device", label: "ONU / ডিভাইস" },
  { value: "media", label: "মিডিয়া সার্ভার" },
  { value: "coverage", label: "কভারেজ ও নতুন সংযোগ" },
  { value: "other", label: "অন্যান্য" },
];

export function SupportRequestForm() {
  const [state, formAction, pending] = useActionState(
    submitSupportTicket,
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
        const customerId = String(data.get("customerId") ?? "").trim();
        const category = String(data.get("category") ?? "").trim();
        const message = String(data.get("message") ?? "").trim();

        const nameError = validateName(name);
        if (nameError) errors.name = nameError;
        const phoneError = validatePhone(phone);
        if (phoneError) errors.phone = phoneError;
        const messageError = validateMessage(message);
        if (messageError) errors.message = messageError;
        const customerIdError = validateCustomerId(customerId);
        if (customerIdError) errors.customerId = customerIdError;
        if (!category) errors.category = "ক্যাটাগরি নির্বাচন করুন";

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
          id="customerId"
          name="customerId"
          label="কাস্টমার আইডি"
          required={false}
          placeholder="যেমন: NW-1024"
          hint="বিলে থাকা আইডি দিলে দ্রুত সমাধান হয়।"
          error={errorFor("customerId")}
        />
        <TextField
          id="email"
          name="email"
          label="ইমেইল ঠিকানা"
          required={false}
          type="email"
          autoComplete="email"
          error={errorFor("email")}
        />
      </div>

      <SelectField
        id="category"
        name="category"
        label="সমস্যার ক্যাটাগরি"
        required
        error={errorFor("category")}
      >
        <option value="">ক্যাটাগরি নির্বাচন করুন</option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </SelectField>

      <TextAreaField
        id="message"
        name="message"
        label="সমস্যার বিবরণ"
        required
        rows={5}
        placeholder="যেমন: রাত ১০টার পর ইন্টারনেট বিচ্ছিন্ন হয়ে যায়, রাউটারে আলো নেই।"
        hint="যত বিস্তারিত লিখবেন, সমাধান তত দ্রুত হবে।"
        error={errorFor("message")}
      />

      <HoneypotField />

      <FormStatus
        status={state.status}
        message={state.message}
        reference={state.reference}
      />

      <SubmitButton pending={pending}>টিকিট পাঠান</SubmitButton>
    </form>
  );
}

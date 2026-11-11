"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitCoverageRequest } from "@/app/actions/requests";
import { initialActionState } from "@/app/actions/request-state";
import {
  FormStatus,
  HoneypotField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import {
  validateAddress,
  validateArea,
  validateName,
  validatePhone,
  type FieldErrors,
} from "@/lib/validation";

export function CoverageRequestForm() {
  const [state, formAction, pending] = useActionState(
    submitCoverageRequest,
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

        const area = String(data.get("area") ?? "").trim();
        const address = String(data.get("address") ?? "").trim();
        const name = String(data.get("name") ?? "").trim();
        const phone = String(data.get("phone") ?? "").trim();

        const areaError = validateArea(area);
        if (areaError) errors.area = areaError;
        const addressError = validateAddress(address);
        if (addressError) errors.address = addressError;
        if (phone) {
          const phoneError = validatePhone(phone);
          if (phoneError) errors.phone = phoneError;
        }
        if (name) {
          const nameError = validateName(name);
          if (nameError) errors.name = nameError;
        }

        if (Object.keys(errors).length > 0) {
          event.preventDefault();
          setLocalErrors(errors);
          document.getElementById(Object.keys(errors)[0])?.focus();
          return;
        }
        setLocalErrors({});
      }}
    >
      <TextField
        id="area"
        name="area"
        label="এলাকা / থানা"
        required
        placeholder="যেমন: মিরপুর, ঢাকা"
        error={errorFor("area")}
      />

      <TextAreaField
        id="address"
        name="address"
        label="বাসার সম্পূর্ণ ঠিকানা"
        required
        rows={4}
        placeholder="বাড়ি ও রোড নম্বর, এলাকা, জেলা"
        hint="ঠিকানা অনুযায়ী টিম ফিজিক্যাল লাইনের সম্ভাবনা যাচাই করে।"
        error={errorFor("address")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          name="name"
          label="আপনার নাম"
          required={false}
          autoComplete="name"
          error={errorFor("name")}
        />
        <TextField
          id="phone"
          name="phone"
          label="মোবাইল নম্বর"
          required={false}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="01712345678"
          error={errorFor("phone")}
        />
      </div>

      <HoneypotField />

      <FormStatus
        status={state.status}
        message={state.message}
        reference={state.reference}
      />

      <SubmitButton pending={pending}>যাচাইয়ের অনুরোধ পাঠান</SubmitButton>
    </form>
  );
}

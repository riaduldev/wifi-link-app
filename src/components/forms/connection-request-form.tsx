"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  submitConnectionRequest,
} from "@/app/actions/requests";
import { initialActionState } from "@/app/actions/request-state";
import {
  HoneypotField,
  FormStatus,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { packages } from "@/config/packages";
import {
  validateAddress,
  validateArea,
  validateName,
  validatePhone,
  type FieldErrors,
} from "@/lib/validation";

export function ConnectionRequestForm({
  defaultPackageId = "",
}: {
  defaultPackageId?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitConnectionRequest,
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
        const area = String(data.get("area") ?? "").trim();
        const address = String(data.get("address") ?? "").trim();

        const nameError = validateName(name);
        if (nameError) errors.name = nameError;
        const phoneError = validatePhone(phone);
        if (phoneError) errors.phone = phoneError;
        const areaError = validateArea(area);
        if (areaError) errors.area = areaError;
        const addressError = validateAddress(address);
        if (addressError) errors.address = addressError;

        if (Object.keys(errors).length > 0) {
          event.preventDefault();
          setLocalErrors(errors);
          const firstKey = Object.keys(errors)[0];
          document.getElementById(firstKey)?.focus();
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
          placeholder="যেমন: রহিম উদ্দিন"
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
          hint="যাচাইয়ের জন্য আমরা এই নম্বরে যোগাযোগ করব।"
          error={errorFor("phone")}
        />
      </div>

      <TextField
        id="area"
        name="area"
        label="এলাকা"
        required
        placeholder="যেমন: ধানমন্ডি, ঢাকা"
        hint="এলাকার নাম বা থানা/উপজেলার নাম লিখুন।"
        error={errorFor("area")}
      />

      <TextAreaField
        id="address"
        name="address"
        label="বাসার সম্পূর্ণ ঠিকানা"
        required
        placeholder="বাড়ি ও রোড নম্বর, এলাকা, জেলা"
        hint="ঠিকানা যত সুনির্দিষ্ট হবে, যাচাই তত দ্রুত হবে।"
        error={errorFor("address")}
      />

      <SelectField
        id="packageId"
        name="packageId"
        label="প্যাকেজ"
        required={false}
        defaultValue={defaultPackageId}
        error={errorFor("packageId")}
      >
        <option value="">প্যাকেজ এখনো বেছে নিননি</option>
        {packages.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </SelectField>

      <TextAreaField
        id="note"
        name="note"
        label="অতিরিক্ত কিছু জানানোর থাকলে"
        required={false}
        rows={3}
        placeholder="যেমন: কবে সংযোগ দরকার, বিলিংয়ের ধরন"
        error={errorFor("note")}
      />

      <HoneypotField />

      <FormStatus
        status={state.status}
        message={state.message}
        reference={state.reference}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SubmitButton pending={pending}>সংযোগের অনুরোধ পাঠান</SubmitButton>
        <p className="text-xs leading-relaxed text-ink-muted">
          ফর্ম পাঠালে আপনার তথ্য শুধুমাত্র সংযোগ যাচাই ও যোগাযোগের জন্য ব্যবহৃত হবে।
        </p>
      </div>
    </form>
  );
}

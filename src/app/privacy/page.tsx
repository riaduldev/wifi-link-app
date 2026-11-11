import type { Metadata } from "next";
import { privacySections } from "@/config/content";
import { PolicyPage } from "@/components/policy-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "গোপনীয়তা নীতি",
  description:
    "নেটওয়েভের গোপনীয়তা নীতি — কোন তথ্য সংগ্রহ করা হয়, কীভাবে ব্যবহার করা হয় এবং আপনার অধিকার।",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="গোপনীয়তা নীতি"
      title="গোপনীয়তা নীতি"
      description="আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সংরক্ষণ করা হয় তার কাঠামো এখানে রয়েছে।"
      sections={privacySections}
      updatedNote="সংশ্লিষ্ট প্রতিষ্ঠানের নাম, ঠিকানা, তথ্য সংগ্রহের উদ্দেশ্য ও যোগাযোগের ঠিকানা যোগ করার পরই এই নীতি প্রকাশ করা উচিত।"
      crumbLabel="গোপনীয়তা নীতি"
    />
  );
}

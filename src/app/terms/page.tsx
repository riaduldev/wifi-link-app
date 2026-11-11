import type { Metadata } from "next";
import { termsSections } from "@/config/content";
import { PolicyPage } from "@/components/policy-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "শর্তাবলি",
  description:
    "নেটওয়েভের সেবার শর্তাবলি — সংযোগ, বিলিং, ভাষাগত ব্যবহার, সরবরাহ ও দায়বদ্ধতা সংক্রান্ত কাঠামো।",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="শর্তাবলি"
      title="সেবার শর্তাবলি"
      description="ইন্টারনেট সেবা ব্যবহারের শর্তাবলির কাঠামো এখানে রয়েছে।"
      sections={termsSections}
      updatedNote="বিলিং, ফেরত ও দায়বদ্ধতা সংক্রান্ত শর্ত বাংলাদেশের প্রযোজ্য আইন ও প্রতিষ্ঠানের নীতি অনুযায়ী লিখে নিতে হবে।"
      crumbLabel="শর্তাবলি"
    />
  );
}

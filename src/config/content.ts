import type { IconName } from "@/components/icons";

/**
 * Editorial content. Everything here is placeholder copy that the owner
 * replaces with real, verified information. It contains no fabricated
 * company history, no testimonials, and no legal commitments.
 */

export type FaqItem = {
  id: string;
  question: string;
  /** Plain-text answer, one paragraph per entry. */
  answer: string[];
  topic: FaqTopic;
};

export type FaqTopic = "connection" | "billing" | "speed" | "service" | "account";

export const faqTopics: { id: FaqTopic; label: string }[] = [
  { id: "connection", label: "সংযোগ" },
  { id: "billing", label: "বিল" },
  { id: "speed", label: "স্পিড" },
  { id: "service", label: "সেবা" },
  { id: "account", label: "অ্যাকাউন্ট" },
];

export const faqs: FaqItem[] = [
  {
    id: "faq-new-connection",
    topic: "connection",
    question: "নতুন সংযোগ কীভাবে নেব?",
    answer: [
      "প্রথমে কভারেজ চেক করে আপনার এলাকা সার্ভিসেবল কি না নিশ্চিত করুন। এরপর সংযোগের অনুরোধ ফর্মে নাম, মোবাইল নম্বর ও ঠিকানা দিন। অনুরোধটি যাচাইয়ের পর আমাদের প্রতিনিধি আপনার সঙ্গে যোগাযোগ করে সময় ঠিক করবেন।",
      "যাচাই সম্পন্ন না হওয়া পর্যন্ত কোনো ফি বা চুক্তি স্বীকৃত বলে গণ্য হবে না।",
    ],
  },
  {
    id: "faq-install-time",
    topic: "connection",
    question: "ইনস্টলেশনে কত সময় লাগে?",
    answer: [
      "সময়টি এলাকার অবস্থান, বিল্ডিংয়ে ক্যাবল পৌঁছানোর সুবিধা ও ব্যবস্থাপকের কাজের তালিকার উপর নির্ভর করে। নির্দিষ্ট সময় প্রতিনিধি সংযোগের সময়ই জানিয়ে দেবেন।",
    ],
  },
  {
    id: "faq-onu",
    topic: "connection",
    question: "ONU/রাউটার ডিভাইসের খরচ কে বহন করে?",
    answer: [
      "ডিভাইস সংক্রান্ত খরচের বিস্তারিত প্রতিটি প্যাকেজের সাথে আলাদা করে দেওয়া আছে। অর্ডার নিশ্চিত করার সময় টাকা পরিশোধের ধাপ, ডিভাইস ফেরত এবং ওয়ারেন্টির নিয়ম জানানো হবে।",
    ],
  },
  {
    id: "faq-pay-bill",
    topic: "billing",
    question: "বিল কীভাবে পরিশোধ করব?",
    answer: [
      "গ্রহণযোগ্য পেমেন্ট মাধ্যম, কাস্টমার আইডি এবং ট্রানজেকশন রেফারেন্স দেওয়ার নিয়ম “পে বিল” পাতায় দেওয়া আছে। পেমেন্ট করার পর রসিদ সংরক্ষণ করে রাখুন।",
      "বিল সংক্রান্ত যেকোনো প্রশ্নে সাপোর্ট কেন্দ্রে টিকিট পাঠান।",
    ],
  },
  {
    id: "faq-slow-speed",
    topic: "speed",
    question: "ইন্টারনেট স্পিড কম মনে হচ্ছে — কী করব?",
    answer: [
      "প্রথমে রাউটার বন্ধ করে ৩০ সেকেন্ড পর আবার চালু করুন, তারপর ডিভাইসটি ইথারনেট কেবলে সরাসরি কম্পিউটারের সাথে যুক্ত করে স্পিড টেস্ট করুন। দুটি ফলাফলের পার্থক্য দেখলে বুঝতে পারবেন সমস্যা Wi-Fi সংযোগে নাকি লাইনে।",
      "বিস্তারিত ধাপ “সাপোর্ট” পাতার সমস্যা সমাধান অংশে দেওয়া আছে।",
    ],
  },
  {
    id: "faq-wifi-vs-lan",
    topic: "speed",
    question: "Wi-Fi টেস্ট আর ওয়্যারলেস টেস্টের ফলাফল কেন আলাদা?",
    answer: [
      "ওয়্যারলেস সংযোগে দূরত্ব, দেয়াল, এবং সম্পর্কিত ডিভাইসের সংখ্যা স্পিড কমিয়ে দেয়। ওয়্যারলেসের সর্বোচ্চ সীমা বোঝার জন্য কম্পিউটারটি ইথারনেট কেবলে যুক্ত করে টেস্ট করা ভালো।",
    ],
  },
  {
    id: "faq-ticket",
    topic: "account",
    question: "সাপোর্ট টিকিট কীভাবে ও কত দ্রুত পাঠাব?",
    answer: [
      "সাপোর্ট পাতার ফর্মে ক্যাটাগরি, সমস্যার বিবরণ এবং চাইলে কাস্টমার আইডি দিন। টিকিট জমা হওয়ার পর একটি রেফারেন্স নম্বর দেখানো হবে, যা রাখে রাখা ভালো।",
    ],
  },
  {
    id: "faq-coverage-check",
    topic: "service",
    question: "কভারেজ চেক করলে কি সাথে সাথেই ফলাফল পাব?",
    answer: [
      "কভারেজ চেকটি একটি অনুরোধ নিবন্ধন — এটি স্বয়ংক্রিয়ভাবে চূড়ান্ত ফলাফল দেয় না। আপনার এলাকা সার্ভিসেবল কি না তা আমাদের টেকনিক্যাল টিম হাতে-কলমে যাচাই করে জানাবে।",
    ],
  },
];

export type TroubleshootingStep = {
  id: string;
  title: string;
  detail: string;
  /** Optional icon for the step. */
  icon: IconName;
};

export const troubleshootingSteps: TroubleshootingStep[] = [
  {
    id: "ts-restart",
    title: "রাউটার রিস্টার্ট করুন",
    detail:
      "রাউটারের পাওয়ার বোতাম ১ বার বন্ধ করে ৩০ সেকেন্ড পর আবার চালু করুন। আলো চালু হওয়ার পর লাল আলো বন্ধ হওয়া পর্যন্ত অপেক্ষা করুন।",
    icon: "power",
  },
  {
    id: "ts-cable",
    title: "কেবল সংযোগ যাচাই করুন",
    detail:
      "ইথারনেট কেবল আলগা হয়ে থাকলে ঠিক করে লাগান। ONU/ডিভাইসের আলো স্ট্যাটাস দেখে সমস্যা চিহ্নিত করুন।",
    icon: "cable",
  },
  {
    id: "ts-devices",
    title: "ডিভাইস সংখ্যা কমান",
    detail:
      "ব্যবহার না হওয়া ডিভাইসের Wi-Fi বন্ধ করুন। ব্যস্ত সময়ে অন্য কোনো ডিভাইস থেকে ডাউনলোড আটকে দিলে সমস্যা কমবে।",
    icon: "devices",
  },
  {
    id: "ts-lan-test",
    title: "ওয়্যারলেস বনাম কেবল টেস্ট",
    detail:
      "কম্পিউটারটি ইথারনেট কেবলে যুক্ত করে স্পিড টেস্ট করুন। ফলাফল ভালো হলে সমস্যা Wi-Fi সংযোগে, কম হলে লাইনে — সেই অনুযায়ী টিকিট খুলুন।",
    icon: "gauge",
  },
];

export type ConnectionStep = {
  id: string;
  step: string;
  title: string;
  detail: string;
};

export const connectionSteps: ConnectionStep[] = [
  {
    id: "cs-1",
    step: "০১",
    title: "এলাকা যাচাই করুন",
    detail:
      "কভারেজ চেক পেতে আপনার এলাকা ও বাসার ঠিকানা দিন। আমাদের টিম ফিজিক্যাল লাইন লেবেলযোগ্যতা যাচাই করে জানাবে।",
  },
  {
    id: "cs-2",
    step: "০২",
    title: "প্যাকেজ বেছে নিন",
    detail:
      "স্পিড, মাসিক চার্জ ও ফিচার মিলিয়ে আপনার প্রয়োজনের প্যাকেজ বেছে নিন। সব প্যাকেজের তুলনা একসাথে দেখা যায়।",
  },
  {
    id: "cs-3",
    step: "০৩",
    title: "অনুরোধ জমা দিন",
    detail:
      "নাম, মোবাইল নম্বর ও ঠিকানাসহ সংযোগের অনুরোধ দিন। ব্যক্তিগত তথ্য শুধুমাত্র যাচাই ও যোগাযোগের জন্য ব্যবহৃত হয়।",
  },
  {
    id: "cs-4",
    step: "০৪",
    title: "সময় ঠিক করে ইনস্টল",
    detail:
      "যাচাই শেষে প্রতিনিধি ফোন করে সময় ঠিক করবেন। ইনস্টলেশনের পর ডিভাইস হ্যান্ডওভার ও বিলিং শুরুর নির্দেশনা পাবেন।",
  },
];

export type ServiceFeature = {
  id: string;
  title: string;
  detail: string;
  icon: IconName;
};

/**
 * Service capability descriptions. These describe the product category in
 * general terms — they deliberately avoid uptime figures, SLA numbers and
 * coverage claims that have not been supplied by the business.
 */
export const serviceFeatures: ServiceFeature[] = [
  {
    id: "sf-fiber",
    title: "ফাইবার সংযোগ",
    detail:
      "ঘরে ও ব্যবসায় আলাদা আলাদা ডিভাইসে সমান গতি — ল্যাগ ছাড়া স্ট্রিমিং, ভিডিও কল ও অনলাইন কাজ।",
    icon: "fiber",
  },
  {
    id: "sf-support",
    title: "স্থানীয় সাপোর্ট",
    detail:
      "টেকনিক্যাল টিম নিজেই লাইন দেখে সমস্যা ঠিক করে — কাস্টমারকে বারবার বলার দরকার নেই।",
    icon: "support",
  },
  {
    id: "sf-billing",
    title: "সহজ বিলিং",
    detail:
      "প্রতি মাসের বিল পরিষ্কারভাবে বিবরণসহ, কাস্টমার আইডি দিয়ে চিহ্নিত করা থাকে।",
    icon: "billing",
  },
  {
    id: "sf-onu",
    title: " ONU ও যন্ত্রাংশ",
    detail:
      "সংযোগের সময় প্রয়োজনীয় ONU/রাউটার সরবরাহ করা হয় — ডিভাইস সংক্রান্ত বিস্তারিত কথোপকথনে জানানো হয়।",
    icon: "device",
  },
  {
    id: "sf-static",
    title: "স্থির IP (প্রযোজ্য ক্ষেত্রে)",
    detail:
      "ওয়েব সার্ভার, CCTV বা নির্দিষ্ট ডিভাইসের জন্য স্থির IP প্রয়োজন হলে কোনো প্যাকেজে আছে কি না জেনে নিন।",
    icon: "shield",
  },
  {
    id: "sf-business",
    title: "ব্যবসায়িক সেবা",
    detail:
      "অফিস ও দোকানের জন্য বেশি ডিভাইস, বাড়তি ট্রাফিক ও আলাদা সাপোর্ট চ্যানেল — বিস্তারিত জানতে যোগাযোগ করুন।",
    icon: "business",
  },
];

export type PolicySection = {
  id: string;
  heading: string;
  /** Paragraphs. Empty = the owner has not written this section yet. */
  paragraphs: string[];
};

export const privacySections: PolicySection[] = [
  {
    id: "privacy-collect",
    heading: "আমরা যে তথ্য সংগ্রহ করি",
    paragraphs: [],
  },
  {
    id: "privacy-use",
    heading: "তথ্যের ব্যবহার",
    paragraphs: [],
  },
  {
    id: "privacy-share",
    heading: "তৃতীয় পক্ষের সঙ্গে ভাগ করা",
    paragraphs: [],
  },
  {
    id: "privacy-retention",
    heading: "তথ্য সংরক্ষণ",
    paragraphs: [],
  },
  {
    id: "privacy-rights",
    heading: "আপনার অধিকার",
    paragraphs: [],
  },
  {
    id: "privacy-contact",
    heading: "গোপনীয়তা নীতি সংক্রান্ত যোগাযোগ",
    paragraphs: [],
  },
];

export const termsSections: PolicySection[] = [
  {
    id: "terms-service",
    heading: "সেবার শর্ত",
    paragraphs: [],
  },
  {
    id: "terms-billing",
    heading: "বিল ও ফি",
    paragraphs: [],
  },
  {
    id: "terms-fair-use",
    heading: "ভাষাগত ব্যবহার (Fair Use)",
    paragraphs: [],
  },
  {
    id: "terms-termination",
    heading: "সংযোগ বাতিল ও সরবরাহ",
    paragraphs: [],
  },
  {
    id: "terms-liability",
    heading: "দায়বদ্ধতা",
    paragraphs: [],
  },
  {
    id: "terms-changes",
    heading: "শর্তাবলির পরিবর্তন",
    paragraphs: [],
  },
];

export type AboutBlock = {
  id: string;
  heading: string;
  paragraphs: string[];
  /** A pull quote shown next to the block. */
  callout?: string;
};

export const aboutBlocks: AboutBlock[] = [
  {
    id: "ab-story",
    heading: "আমাদের পরিচিতি",
    paragraphs: [],
    callout:
      "এই বিভাগে প্রতিষ্ঠানের পরিচিতি, কাজের ধরন ও অভিজ্ঞতার বিবরণ যুক্ত করা হবে।",
  },
  {
    id: "ab-mission",
    heading: "আমাদের লক্ষ্য",
    paragraphs: [],
  },
  {
    id: "ab-network",
    heading: "নেটওয়ার্ক ও অবকাঠামো",
    paragraphs: [],
  },
  {
    id: "ab-team",
    heading: "আমাদের টিম",
    paragraphs: [],
  },
];

export type FaqSearchDocument = FaqItem;

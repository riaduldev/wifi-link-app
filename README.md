# নেটওয়েভ (NetWave) — ISP Website

A custom-coded, production-oriented marketing and self-service website for a
Bangladeshi ISP / Wi-Fi provider. Built with the Next.js App Router,
TypeScript and Tailwind CSS v4.

> **Demo identity.** "নেটওয়েভ / NetWave" is a replaceable demo brand. All
> business facts (phone, WhatsApp, email, address, office hours, package
> prices and speeds, coverage areas, notices, payment methods) are **empty on
> purpose** and render as an explicit placeholder — never as invented data.
> See `src/config/business.ts`.

---

## Stack

| Concern            | Choice                                              |
| ------------------ | --------------------------------------------------- |
| Framework          | Next.js 16.4.6 (App Router, Turbopack, React Compiler) |
| Language           | TypeScript (strict)                                  |
| Styling            | Tailwind CSS v4 (CSS-first `@theme` design tokens)    |
| Fonts              | `next/font/google` — Hind Siliguri (Bengali) + Geist (Latin) |
| Forms              | React Server Actions + native HTML validation         |
| Backend            | None (by design) — one clearly marked extension point |
| Package manager    | npm                                                  |

No UI kit, no component library, no icon package: the layout system, icons
and hero illustration are hand-written for this project.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see "Environment variables"
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Scripts:

| Script          | Purpose                                  |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Development server (Turbopack)            |
| `npm run build` | Production build + type check             |
| `npm run start` | Serve the production build                |
| `npm run lint`  | ESLint (`eslint-config-next` flat config) |

There is no test suite in this repository; the request-handling logic lives in
`src/lib/request-handlers.ts` as pure functions specifically so it can be unit
tested when a test runner is added.

---

## Environment variables

Names only — never commit values or secrets. Full list in `.env.example`.

| Name                  | Scope   | Purpose                                                                 |
| --------------------- | ------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | public | Site origin used for canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`. Defaults to `http://localhost:3000`. |
| `FORM_ENDPOINT_URL`   | server  | Optional HTTPS endpoint that receives form submissions as JSON. Empty ⇒ the site runs in honest "not connected" mode. |
| `FORM_ENDPOINT_TOKEN` | server  | Optional bearer token for `FORM_ENDPOINT_URL`. Never sent to the browser. |

---

## Routes

| Route            | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `/`              | Homepage: hero, benefits, package preview, features, coverage preview, connection steps, FAQ, support CTA |
| `/about`         | Company profile (owner-editable blocks)                        |
| `/packages`      | Package cards + responsive comparison table + apply form (`#apply`) |
| `/coverage`      | Coverage-check explanation + manual verification request       |
| `/speed-test`    | What download/upload/ping mean, how to test accurately, link to a real provider |
| `/media-server`  | Media server access steps and policy                          |
| `/pay-bill`      | Payment instructions, customer ID / transaction reference      |
| `/support`       | Troubleshooting steps, searchable FAQ, support ticket form     |
| `/contact`       | Contact channels + message form                               |
| `/privacy`       | Editable privacy-policy structure                             |
| `/terms`         | Editable terms structure                                      |
| `not-found` / `error` / `global-error` / `loading` | Custom 404, error boundaries and route skeleton |

The 404 route returns a real `404` status and is marked `noindex, nofollow`.

Navigation order in the header: হোম, আমাদের পরিচিতি, প্যাকেজ, কভারেজ, স্পিড টেস্ট,
মিডিয়া সার্ভার, পে বিল, সাপোর্ট, যোগাযোগ.

---

## How to update business content

Everything editable lives in `src/config/`. No database, no CMS, no admin UI.

| File                        | What it holds                                                        |
| --------------------------- | -------------------------------------------------------------------- |
| `src/config/business.ts`    | Brand name, tagline, demo flag, phone, WhatsApp, email, address, office hours, coverage areas, payment methods, speed-test URL + fallback, media-server URL, notices, social links, site URL |
| `src/config/packages.ts`    | The package catalogue (`InternetPackage[]`)                          |
| `src/config/content.ts`     | FAQs, troubleshooting steps, connection steps, service features, about blocks, privacy & terms sections |
| `src/config/navigation.ts`  | The main navigation list (full label + optional `shortLabel` for 1024–1279 px) |
| `src/lib/metadata.ts`       | `pageMetadata()` — per-page title, description, canonical and Open Graph |

Rules the UI enforces:

* A blank value renders as **`তথ্য যোগ করতে হবে`** (see `src/lib/format.ts`).
* A blank phone / WhatsApp / email renders as a **disabled placeholder**, never
  a fake `tel:` or `wa.me` link.
* `business.notices.length === 0` ⇒ the announcements block is not rendered.
* `business.coverageAreas.length === 0` ⇒ the coverage area list is not
  published; the site asks for a manual verification instead.
* `business.paymentMethods.length === 0` ⇒ no payment details are shown.
* `business.speedTestUrl` / `business.mediaServerUrl` empty ⇒ no embed or link
  is rendered, and the page explains why. The speed-test page falls back to the
  clearly labelled third-party link in `business.speedTestFallbackUrl`.

To publish a package: fill `speedMbps`, `monthlyPrice`, `installationFee`,
`equipmentCharge`, `features`, `terms`, `availability` and set
`available: true`.

---

## Forms, validation and honesty rules

Four forms: connection request (`/packages`), coverage check (`/coverage`),
support ticket (`/support`) and contact message (`/contact`).

* Client **and** server validation using the same rules
  (`src/lib/validation.ts`). Bangladeshi mobile numbers are normalised from
  `01712345678`, `+8801712345678`, `8801712345678`, `017-1234-5678` and
  Bengali numerals.
* A honeypot field blocks naive bots; an in-memory rate limiter allows 5
  submissions per form kind per IP per 10 minutes
  (`src/lib/rate-limit.ts`).
* **A success message is only shown when the request was actually accepted.**
  Without `FORM_ENDPOINT_URL` the UI states plainly that the backend is not
  connected, that nothing was stored, and offers phone / WhatsApp / email
  hand-off with the real reference number.
* No card number, CVV or password field exists anywhere, and the site never
  claims a payment completed.
* No secret is ever placed in client code — `FORM_ENDPOINT_*` are read in
  server-only modules.

### Connecting a backend

1. Set `FORM_ENDPOINT_URL` to an HTTPS endpoint that accepts a JSON `POST`.
2. Optionally set `FORM_ENDPOINT_TOKEN` (sent as `Authorization: Bearer …`).
3. The payload shape is:

```json
{
  "source": "netwave-website",
  "brand": "NetWave",
  "receivedAt": "2026-01-01T00:00:00.000Z",
  "kind": "connection | coverage | support | contact",
  "name": "…", "phone": "01XXXXXXXXX", "email": "…",
  "area": "…", "address": "…", "packageId": "…",
  "customerId": "…", "category": "…", "subject": "…", "message": "…"
}
```

The endpoint should answer `2xx` to confirm acceptance. Any other status is
reported to the visitor as "not received".

Architecture note: the Server Action wrappers (`src/app/actions/requests.ts`)
only adapt the request context; all validation, rate limiting and delivery
live in `src/lib/request-handlers.ts` so they can be tested without a browser.

### Optional future integrations

* **Online payment** — a gateway (e.g. bKash/Nagad merchant API or an
  international processor) needs a merchant account, an API key, a webhook and
  server-side verification. Until then `/pay-bill` explains the manual
  instructions only.
* **Customer portal** — deliberately not included; a login screen without a
  real backend would be a fake product.
* **Coverage API** — the checker is manual by design. Plug a real coverage
  service into `src/lib/request-handlers.ts` before claiming live results.
* **Rate limiting at scale** — the current limiter is per-instance and
  in-memory; use Redis/KV behind `checkRateLimit` when deploying to multiple
  instances.

---

## Design system

Tokens live in `src/app/globals.css` (Tailwind v4 `@theme`):

* Navy `#0B1F3A`, blue `#1769FF`, cyan `#27D8E8`, canvas `#F5F8FC`, white
  surfaces, accessible slate text.
* Centralised radius, shadow, spacing and type tokens; `prefers-reduced-motion`
  is honoured globally.
* Visible `:focus-visible` ring on every interactive element; skip link to the
  main content; one `h1` per page and a consistent heading order.

### Site-wide atmosphere

One continuous background field runs through the whole site: a faint 26 px dot
grid plus three very low-contrast cool glows (top-left blue, top-right cyan,
bottom blue), defined once on `body` in `src/app/globals.css`. Section surfaces
are deliberately slightly translucent (`bg-canvas/70`, `bg-white/80`) so the
field reads through every band instead of being cut off at each section
boundary. Cards stay fully opaque white, which keeps them visually related to
the background while preserving text contrast.

### Motion

* `src/components/reveal.tsx` — a scroll reveal built on `IntersectionObserver`.
  It only ever *adds* motion: the content is always in the DOM and in the
  accessibility tree (opacity, never `display` / `hidden`).
* The hidden start state is applied by CSS only when `html.js` is present.
  `html.js` is added by a tiny inline script in `src/app/layout.tsx` **before**
  first paint. If JavaScript is disabled or fails, nothing is ever hidden.
* `prefers-reduced-motion: reduce` disables the reveal entirely and the global
  transition/animation override applies.
* The hero uses a one-shot CSS rise (`data-rise`) instead of the observer, so
  above-the-fold content never waits on an intersection.
* Only `transform` and `opacity` are animated — no layout-shifting properties.

### Artwork

`src/components/hero-visual.tsx` (inline SVG network illustration) and
`src/components/icons.tsx` (hand-drawn 24×24 stroke icon set). No remote
images are used.

---

## Accessibility & responsiveness

* Semantic landmarks (`header`, `nav`, `main`, `footer`), skip link, labelled
  form controls with `aria-describedby` / `aria-invalid`, `role="status"`
  regions for submission feedback.
* The mobile menu is a button with `aria-expanded` / `aria-controls`, closes
  on `Escape` (focus returns to the trigger) and on navigation.
* FAQ uses native `<details>` / `<summary>` — keyboard and screen-reader
  friendly without JavaScript.
* Layouts are mobile-first and checked for 320 / 375 / 430 / 768 / 1024 /
  1440 / 1920 px; the comparison table becomes stacked cards below `md`.
* The nine-item main navigation uses short labels ("পরিচিতি", "মিডিয়া")
  between 1024–1279 px and the full labels from `xl` upwards, so nothing
  overlaps or overflows at any width.
* Colour is never the only signal: pending values also carry explicit text.

---

## Speed test

`/speed-test` **never** displays an invented or simulated measurement, and the
site never claims to measure speed itself.

* `business.speedTestUrl` — set this to a provider you are authorised to
  link or embed. When set, it is offered as the primary action.
* `business.speedTestFallbackUrl` / `business.speedTestFallbackLabel` — a
  clearly labelled third-party service used as a convenience link when no
  provider of our own is configured. The page states plainly that the
  measurement happens between the visitor's browser and that third party's
  server, not on this site.
* The page also explains download / upload / ping and how to test accurately
  (LAN vs Wi-Fi, device capability, network congestion).

---

## SEO

* Per-page `title`, `description`, Open Graph and canonical metadata.
* `lang="bn"`, semantic headings, `src/app/sitemap.ts` and `src/app/robots.ts`
  generated from the real site URL.
* No production domain is hard-coded — set `NEXT_PUBLIC_SITE_URL`.

---

## Deployment notes

* Works on any Next.js 16 host (Vercel, Node server, container).
* Set `NEXT_PUBLIC_SITE_URL` to the public origin so canonical URLs, the
  sitemap and robots file point to the right host.
* Fonts are fetched from Google Fonts **at build time** by `next/font` and
  self-hosted afterwards; a build machine without internet access needs the
  font files vendored locally (`next/font/local`).
* The in-memory rate limiter resets on every deploy and is per-instance.

---

## Known limitations

* The site ships without a backend: forms validate and generate a reference
  number, but nothing is persisted until `FORM_ENDPOINT_URL` is configured.
* Package prices, speeds, features, coverage areas, payment details, notices,
  media-server address and legal texts are placeholders pending real data.
* The brand is a demo brand and is flagged as such in the header, footer and
  `/about`.
* `/speed-test` links out to a third-party service by default; there is no
  first-party measurement, by design.
* There is no analytics, cookie banner or customer portal.
* There is no test suite. The request-handling logic in
  `src/lib/request-handlers.ts` is kept as pure functions specifically so it
  can be unit tested as soon as a runner is added.

---

## Project structure

```
src/
  app/                 routes (App Router), sitemap.ts, robots.ts, layout, states
  actions/             Server Action wrappers + shared action state type
  components/          layout, forms, package, FAQ, hero artwork, icons, reveal
  config/              business.ts, packages.ts, content.ts, navigation.ts
  lib/                 validation, formatting, metadata, rate limiting, request handlers
```

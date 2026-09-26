# NaNu NaNa – Du Học Đức · Website 2.0

Marketing website for **NaNu NaNa – Du Học Đức** (German courses A1–C1, university study and vocational training/Ausbildung in Germany). The site is in Vietnamese; its one job is to turn visitors into consultation requests (form, Zalo, phone).

**Stack:** Next.js 16 (App Router, React Server Components) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP + ScrollTrigger · Motion (Framer Motion) · react-hook-form + zod · lucide-react · Vercel Analytics & Speed Insights · pnpm.

---

## 1. Getting started

Requirements: **Node.js ≥ 20.9** and **pnpm** (`corepack enable pnpm`).

```bash
pnpm install
cp .env.example .env.local   # all variables are optional for local development
pnpm dev                     # http://localhost:3000
```

| Command                     | What it does                                                       |
| --------------------------- | ------------------------------------------------------------------ |
| `pnpm dev`                  | Development server with hot reload                                 |
| `pnpm build` / `pnpm start` | Production build / serve it locally                                |
| `pnpm check`                | TypeScript + ESLint + Prettier check (run before every commit)     |
| `pnpm format`               | Auto-format all files                                              |
| `pnpm verify:content`       | Lists every unconfirmed claim (`verify(...)`) still in `content/`  |
| `pnpm placeholders`         | Re-generates the grey placeholder photos in `public/placeholders/` |

Internal page with all UI building blocks: **`/dev/ui`** (only in development).

---

## 2. Project structure

```
app/
  layout.tsx                 fonts, metadata, analytics, <html lang="vi">
  (site)/                    pages that share header + footer
    page.tsx                 landing page (composes the sections)
    tuyen-dung/              careers page
    chinh-sach-bao-mat/      privacy policy (draft)
  actions/consultation.ts    Server Action for the consultation form
  admin/                     password-protected behaviour stats
  api/stats/collect/         first-party click, section and visit ingest
  opengraph-image.tsx        generated social share image
  sitemap.ts, robots.ts, icon.png, apple-icon.png, not-found.tsx
components/
  layout/    Header, MobileNav, Footer, MobileCtaBar, Logo …
  sections/  Hero, Stats, Founder, Courses, Pathways, Process, Team,
             Testimonials, Gallery, Faq, Contact
  form/      ConsultationForm, FormSuccess, PrefillLink, Turnstile
  motion/    GSAP setup + scroll effects, Framer Motion provider
  ui/        Button, Badge, CourseBadge, Card, form controls, …
content/     ALL text, numbers and images (edit these — see section 3)
lib/
  validation/  zod schema + phone rules shared by browser and server
  leads/       lead destination: zapier.ts (Slack), index.ts
  spam/        rate limit (Upstash) + Cloudflare Turnstile
docs/        design system (DESIGN.md), old site copy, reference mockup
```

---

## 3. Editing content (no React knowledge needed)

Every text on the site lives in **`content/*.ts`**. Change the text between the quotes, save, and the page updates. Keep the quotes, commas and brackets as they are.

| File              | What's in it                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `site.ts`         | Company name, phone, email, address, offices, Zalo/Messenger/WhatsApp links, social links |
| `hero.ts`         | Top of the page: headline, tagline, badges, trust bullets                                 |
| `stats.ts`        | The four numbers (students, years, pass rate, partners)                                   |
| `founder.ts`      | Phương's section (intro text, quote)                                                      |
| `courses.ts`      | Course cards A1–C1 + Giao Tiếp                                                            |
| `pathways.ts`     | Du học đại học / Du học nghề                                                              |
| `process.ts`      | The 5 steps "Lộ trình cùng NaNu NaNa"                                                     |
| `team.ts`         | Team members and bios (copied word for word from the old site)                            |
| `testimonials.ts` | Student stories                                                                           |
| `gallery.ts`      | Which photos appear in the gallery                                                        |
| `faq.ts`          | Questions and answers                                                                     |
| `contact.ts`      | Texts around the consultation form                                                        |
| `careers.ts`      | Tuyển dụng page and open roles                                                            |
| `form-options.ts` | Options in the form's dropdowns                                                           |
| `images.ts`       | Which image file is used where (see 3.2)                                                  |

### 3.1 Confirmed vs. unconfirmed claims (`ok` / `verify`)

Marketing claims that NaNu NaNa has **not confirmed yet** are wrapped like this:

```ts
value: verify(1000, "Tổng số học viên thực tế?"),
```

- In **development** (`pnpm dev`) they are shown with a **dashed amber outline**; hover to see the question.
- In **production** they are **hidden** automatically (or replaced by a neutral fallback text). Sections whose content is entirely unconfirmed — Stats, FAQ — are hidden completely.
- To confirm a claim, fix the value if needed and change `verify(value, "…")` to `ok(value)`:

```ts
value: ok(1200),
```

Run `pnpm verify:content` to see everything that is still open. To preview unconfirmed content on a Vercel preview deployment, set `NEXT_PUBLIC_SHOW_UNVERIFIED=1` for the Preview environment only.

### 3.2 Photos

1. Put the photo in `public/images/` (JPG/WebP, at least 1600 px on the long side).
2. In `content/images.ts`, change the matching `import` line to point to the new file, update `alt` (short Vietnamese description of the photo) and set `placeholder: false`.

Width/height and the blur preview are detected automatically. **Team photos:** import the photo in `content/team.ts` and set `photo: myPhoto` on that person — without a photo, the card shows initials. Only use photos of students/team members who agreed to it.

### 3.3 Common edits

- **Add a course:** copy one block in `courses.ts`, change `id`, `level`, texts; add a matching option to `courseOptions` in `form-options.ts` if it should be selectable in the form.
- **Add an FAQ:** add `{ id, question, answer: ok("…") }` to `faq.ts` — confirmed answers are also sent to Google as FAQ rich results.
- **Google reviews:** set `GOOGLE_PLACES_API_KEY` (Places API New). `#cam-nhan` shows the 5-star reviews Google returns (at most five) and stays hidden when the key is missing or none remain. Set `GOOGLE_PLACE_ID` to pin the listing.
- **Open job:** in `careers.ts` set `open: ok(true)` and fill in the details with `ok(...)`.
- **Current intake badge:** `hero.ts → intakeBadge` — update it every intake.

---

## 4. Consultation form & leads

Flow: visitor submits → **Server Action** (`app/actions/consultation.ts`) validates with the shared zod schema → spam checks → sends the lead to every configured destination → success or error message.

- Works **without JavaScript** (plain form post, errors and values are kept).
- **Phone:** Vietnamese (`0…`, `+84…`) and German (`+49…`) numbers; stored in E.164 (`+84988123456`).
- **Pre-fill:** every course/pathway button pre-selects the course/goal. Links from ads can do the same: `/?khoa=b1#tu-van`, `/?muc-tieu=du-hoc-nghe#tu-van` (values in `content/form-options.ts`).
- **Attribution:** `utm_source/medium/campaign/content`, `fbclid`, landing page and referrer are captured on the visitor's first page of the session and stored with the lead.
- **Spam:** hidden honeypot field (bots are silently dropped), optional rate limit (5 requests / 10 min per IP) and optional Cloudflare Turnstile.
- **Conversion events on success:** Vercel Analytics `lead`, Meta Pixel `Lead` and GA4 `generate_lead` (the last two only when their IDs are set).
- **Never lost silently:** if a destination fails, the full lead is written to the server log (`[lead:lost]` / `[lead:partial]`) and the visitor is shown Zalo/hotline alternatives.

> ⚠️ **Before launch:** with no destination configured, leads only appear in the server log as `[lead:unrouted]` (Vercel → Project → Logs). Set the Slack webhook first. Leads are not written to Notion or email.

### 4.1 Slack via Zapier

1. In Zapier, create a Zap: **Webhooks by Zapier → Catch Hook**, then **Slack → Send Channel Message**.
2. Copy the catch-hook URL (`https://hooks.zapier.com/hooks/catch/…`) → `ZAPIER_LEAD_WEBHOOK_URL`.
3. Send one test submission (or a sample POST) so Zapier sees the fields, then map `name`, `phone`, `course`, `goal`, `message`, and `landingPage` into the Slack message and publish the Zap.

The site POSTs the lead only after validation. The variable must be a `https://hooks.zapier.com/` URL; anything else leaves this destination off. This is the only lead destination.

### 4.2 Optional: rate limit, Turnstile, tracking

- **Upstash Redis** (free tier is enough): `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- **Cloudflare Turnstile:** `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`. Note: with Turnstile on, the no-JavaScript fallback can't pass the check.
- **Meta Pixel / GA4:** `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_ID`. Check your privacy policy/consent requirements before enabling.
- **Behaviour stats:** `STATS_ADMIN_PASSWORD`, plus Upstash if you want the numbers kept on Vercel. Open `/admin` (not linked from the site). The page shows visits for today, this week and this month, which button was clicked and from which section, how long each section stayed on screen, and city/country. City and country come from Vercel’s network headers, so they appear after deploy, not on a laptop. No IP address is stored. Changing the password signs everyone out. Without Upstash, `pnpm dev` saves the numbers in `.data/` on that computer.

### 4.3 Adding another destination (e.g. Google Sheets)

Create `lib/leads/sheets.ts` exporting a `LeadDestinationFactory` (see `zapier.ts` for the pattern — return `null` when its env vars are missing) and add it to the `destinations` array in `lib/leads/index.ts`. The form and the Server Action don't change.

---

## 5. Environment variables

All documented in [`.env.example`](.env.example). Every integration switches on only when its variables are set.

| Variable                                             | Needed for                                                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                               | Canonical URLs, sitemap, share image. Set to the final domain once it's connected. On Vercel the project URL is used if empty. |
| `NOTION_TOKEN`, `NOTION_CLASSES_DB_ID`               | Running classes from Klassen Datenbank. Leads are not written here.                                                            |
| `ZAPIER_LEAD_WEBHOOK_URL`                            | Leads → Slack (the only destination; Zapier Catch Hook at `https://hooks.zapier.com/`)                                         |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limiting, and behaviour stats on Vercel. Locally, stats still work without these and are saved in `.data/`.               |
| `STATS_ADMIN_PASSWORD`                               | Password for `/admin`. Sessions last 14 days and are signed with this value.                                                   |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`         | Bot check                                                                                                                      |
| `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_ID`     | Ad/analytics conversion events                                                                                                 |
| `NEXT_PUBLIC_SHOW_UNVERIFIED`                        | `1` = show unconfirmed claims in a production build (previews only!)                                                           |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`           | Google reviews in `#cam-nhan`. Place ID is optional.                                                                           |

`NEXT_PUBLIC_*` values are baked in at build time — redeploy after changing them.

---

## 6. Deploying to Vercel

1. Push the repository to GitHub/GitLab.
2. In Vercel: **Add New → Project → Import** the repository. Framework preset: Next.js (auto), package manager pnpm (auto from `packageManager`).
3. Add the environment variables (Settings → Environment Variables) for **Production** (and Preview if you want previews to send real leads — usually not).
4. Deploy. Vercel Analytics and Speed Insights: enable them in the project's **Analytics** / **Speed Insights** tabs (they only run on Vercel).
5. **Domain:** Settings → Domains → add the domain and follow the DNS instructions. Then set `NEXT_PUBLIC_SITE_URL=https://your-domain` and redeploy.

Good to know:

- Preview deployments send `Disallow: /` in `robots.txt`, so they don't appear in Google.
- **Old Webflow URLs** redirect permanently (308) to the new sections — see `next.config.ts` (`/niveau`, `/du-hoc-duc`, `/du-hoc-nghe`, `/du-hoc-nghe-old`, `/about`, `/ve-phuong`, `/career`). After moving the domain, submit `https://your-domain/sitemap.xml` in Google Search Console.

---

## 7. Quality notes

- **Design system:** tokens from `docs/DESIGN.md` live in `app/globals.css` (`@theme`). Button fills are slightly darker than the raw brand colours (coral `#B85A0C`, teal `#0B7793`) so white text meets WCAG AA.
- **Accessibility:** one `<h1>` per page, landmarks, skip link, labelled form fields with Vietnamese error messages, visible focus everywhere, 44 px touch targets. axe-core: 0 violations on all pages.
- **Motion:** the hero entrance is pure CSS (starts at first paint); GSAP (lazy-loaded) runs the scroll effects — stat count-up, process line, hero parallax; Motion (Framer) handles interactions. Everything respects "reduce motion", and the page is fully readable without JavaScript.
- **Performance (Lighthouse mobile, production build):** Performance 90+ (98 with real throttling), Accessibility / Best Practices / SEO 100, CLS 0.

### Launch checklist

- [ ] All `pnpm verify:content` items confirmed or accepted as hidden
- [ ] Real photos in place (`content/images.ts`), logo files (SVG/PNG) from the brand owner
- [ ] Slack (Zapier) configured, one real test lead received
- [ ] Privacy policy text final (`app/(site)/chinh-sach-bao-mat/page.tsx`)
- [ ] Domain connected, `NEXT_PUBLIC_SITE_URL` set, sitemap submitted

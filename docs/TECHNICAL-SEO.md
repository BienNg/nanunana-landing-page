# Technical SEO and consent changes

## Behaviour

- The Vietnamese and German privacy panels offer separate statistics and marketing choices. Both start off. Choices expire after 180 days and can be changed from the footer.
- Statistics consent gates first-party visitor IDs, behaviour/section events, Vercel Analytics, Speed Insights and configured GA4. Marketing consent gates Meta Pixel and stored campaign attribution. Consultation and contact controls work without either consent.
- Withdrawal suppresses subsequent events and removes the known first-party analytics identifiers and vendor cookies accessible to this site. It does not erase historical data already collected.
- Third-party tags are downloaded only after their category is accepted. Tags finish initialising only while consent remains valid; loaded tags are disabled/revoked on withdrawal. Consent changes sync between tabs. If browser storage fails, the choice lasts only in the current document.
- Counts in `/admin` and analytics reports will now represent consenting visitors.
- GA4 still requires `NEXT_PUBLIC_GA_ID` in the deployment environment. Meta uses the existing `NEXT_PUBLIC_META_PIXEL_ID`. No IDs or account settings were changed.

## Search metadata

- Shorter bilingual homepage titles and title templates; job titles no longer repeat the careers suffix.
- Visible breadcrumbs and matching `BreadcrumbList` on course, pathway and career pages.
- Course list markup derives from the confirmed descriptions on `/niveau`, with links to the actual course anchors.
- Organization markup includes separate Ho Chi Minh City and Hanoi departments with confirmed addresses. Stuttgart is omitted until its address is confirmed.
- Individual open job pages contain `JobPosting` data generated from their confirmed content. Remote teaching is limited to applicants in Germany. The original publication date is taken from commit `7bf1d24` (2026-10-29) and is not refreshed on copy edits. Unknown salaries and closing dates are omitted. Closing a role removes it from published detail routes on the next build.
- Class-photo thumbnails use the existing localized class description. Decorative images keep empty alt text.
- The hero headline and main brand image are visible at first paint, without waiting for an opacity entrance animation. No new Lighthouse score is claimed.

## Validation

Run `pnpm check`, `pnpm test` and `pnpm build`.

The consent tests cover invalid/expired preferences, independent categories, script-download races, withdrawal, repeat page views, navigation, attribution cleanup and failed browser storage. SEO tests cover both languages, course URLs, job eligibility, closed jobs, titles and confirmed offices.

Browser QA covered desktop and 390px mobile layout, both languages, rejecting, accepting, saving a statistics-only choice, reopening preferences and reload persistence. Built HTML was checked across all 18 public pages for language, one H1, canonical URLs, concise titles and parseable JSON-LD; course anchors were checked against their actual IDs.

Local build/browser checks used empty tracking IDs and disabled remote data/lead integrations. Vendor behaviour was checked with controlled script doubles; receipt of events by production analytics accounts requires a post-deployment check with those accounts. Public pages remain statically generated (homepages use daily revalidation).

These changes are prepared locally; production deployment and Search Console submission are separate steps.

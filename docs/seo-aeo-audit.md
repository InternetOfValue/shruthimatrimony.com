# Shruthi Matrimony — SEO/AEO fixes and verification

Updated 13 November 2026. Scope: the cinematic homepage, `/for-shruti`, the utility privacy notice, metadata, structured data, FAQ, trail resources, images, robots, sitemap and optional `llms.txt`.

## Implemented fixes

| Finding | Release result |
|---|---|
| Story previously absent from initial HTML | All twelve scenes remain in the response HTML. Each public page has one H1 and crawlable contextual text, links and authorship. Motion enhances that HTML. |
| Missing structured data | Both public pages have a JSON-LD entity graph: WebSite, WebPage, Person, Organization and the fictional CreativeWork Seraphina. The homepage also has a FAQPage graph describing the actual visible questions and answers. |
| Missing concise programme explanation | Five native expandable FAQ answers cover independence, the proposed 90-day journey, no date/introduction offer, interest-list signup, and the existing HouseOfBros trail resources. |
| Missing social metadata | Both public pages have canonical URL, author, Open Graph and Twitter large-card metadata, image dimensions/alt text, and dedicated 1200×630 JPEG cards. |
| Large delivery images | The original drawings are preserved outside `public/`. Delivery uses 540px and 1080px WebP variants with `srcset`/`sizes`, and deferred loading ahead of the current scene. Largest served raster: **157,630 bytes**, below the 250 KB generic display-image budget. The asset audit has no findings. |
| Mobile startup artwork cost | The two initial largest variants total **269,132 bytes**, versus 644,032 previously: approximately **58% less artwork data**. Smaller candidates may be selected depending on viewport and pixel density. This is an asset comparison, not a field LCP or total page-transfer measurement. |
| Footer duplication | Removed only the standalone HouseOfBros and public wellbeing identity links from the footer navigation. The Foundation credit, author/profile credit, LinkedIn and team-page link remain. |
| Trail links lacked context | Three real HouseOfBros guardian drawings link to the verified Monster, Divine and Integration trail pages. They open in new tabs to preserve unfinished signup entries. Local lazy-loaded thumbnails total **42,970 bytes**. |
| Plain factual context for other consumers | Added a small optional `llms.txt` with identity, independence, programme status and primary links. No ranking benefit is claimed. |

## Structured-data and content checks

`node scripts/check-discovery.mjs` verifies:

- source-level H1, canonical, graph types and the creator's actual identity links;
- no invented Offer, Course, Review or attached Movie;
- all five JSON-LD questions and accepted answers exactly match their reader-visible FAQ copy;
- correct local image references, social metadata, trail destinations and footer-link removal;
- the served display-image budget.

The FAQ and schema are generated from `content/faq.json`, so they cannot drift independently. The site still describes an independent creative experiment and a proposed journey. Shruti Haasan is not represented as an organiser, endorser, partner or attached cast member. No cohort dates, prices, ratings, credentials or promised relationship outcomes have been invented.

FAQPage markup describes content; it is not a promise of a Google rich result. Google's 2026 documentation states that the FAQ rich-result feature was removed. [Google Search documentation updates](https://developers.google.com/search/updates). The visible-copy matching follows the principle that markup must represent the page's actual content. [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

The creator-supplied podcast moment at 41:04 is linked, with no unverified direct quote. The supplied LinkedIn profile and public wellbeing identity are linked. Login-restricted profile contents were not used for claims.

## Performance and interaction

The FAQ uses native HTML details/summary elements: no extra browser library, FAQ script or animation loop. Trail art is stored locally and lazy-loaded near the form. Existing bounded illustration motion, pause/reduced-motion behavior and form delivery logic are preserved. The GPU texture cache follows the selected responsive image candidate.

Static original art remains in `artwork-originals/`. Previously shared `/assets/name.webp` URLs redirect to the new 1080px variants on Netlify. The mobile checks cover the linked guardian cards, collapsed/expanded FAQ, no horizontal overflow, and the existing story; they are viewport checks, not a claim about real-device p75 frame times.

The site build uses only local Node standard-library scripts; no production package dependency or client framework was added. The image preparation script is an offline authoring utility, not a deploy/runtime dependency.

## Crawl policy and external verification limits

Both public pages are included in the sitemap with the actual update date. Robots permits crawling. The privacy notice intentionally remains `noindex` and outside the sitemap. There is no wildcard SPA route that turns missing pages into the homepage.

Google PageSpeed Insights previously returned its shared daily quota error. **No Lighthouse score, CrUX p75 result, Google indexing confirmation, rich-result eligibility or live AI-citation outcome is claimed.** Those are external verification limits rather than unresolved source-code fixes. Search Console/URL Inspection was not connected.

The prior article-oriented AEO heuristic was a limited baseline, not a campaign success metric. We have not added fake academic references, credentials or keyword repetition to game that score. This release is checked for factual clarity, explicit authorship, provenance links, readable source HTML, and accurate structured data.

## Reproduction and evidence

- `node scripts/build.mjs`
- `node scripts/check-discovery.mjs`
- `node --check public/app.js`
- `node --check public/living-art.js`
- `node /Users/mosessampaul/.codex/skills/run-iov-web-quality-audit/scripts/audit-assets.mjs .`
- `node /Users/mosessampaul/.codex/skills/run-iov-web-quality-audit/scripts/route-matrix.mjs https://shruthimatrimony.com / /for-shruti /privacy /sitemap.xml /robots.txt /favicon.svg /llms.txt`

Evidence is retained in `docs/qa/`. Trail source attribution is recorded in `docs/trail-artwork-sources.md`. No visitor details or submission contents are recorded in these files.

## Published release verification

The post-deployment route matrix returned 200 on all twelve current routes/assets checked, including both public pages, all three dragon thumbnails and both social cards. Two representative legacy illustration URLs returned the expected 301 to optimized variants. The live page exposed all five FAQ entries and the six-node homepage graph; the native FAQ toggle and footer removal were verified in the browser. Layout checks passed at 320px and 360px widths without horizontal overflow.

## Copy follow-up — 14 November 2026

Renamed the visible journey to Date Yourself and changed the CTA to “Date yourself first.” Replaced ambiguous card counts with explicit Days 1–30, 31–60 and 61–90. The FAQ, entity descriptions, social titles and privacy copy use the same name. The existing internal Netlify form identifier remains unchanged to preserve submission continuity. Existing source/schema consistency checks pass after the wording update.

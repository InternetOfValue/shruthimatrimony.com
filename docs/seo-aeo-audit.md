# Shruthi Matrimony — SEO, AEO and motion review

Reviewed 13 November 2026. Scope: `/`, `/for-shruti`, `/privacy`, robots, sitemap, favicon, story illustrations, and both contact forms. This is a small static creative campaign, not an official celebrity matchmaking service.

## Findings and evidence

| Priority | Finding | Result / next action |
|---|---|---|
| High, addressed in the animation rendering refactor | The initial HTML previously contained an empty story and no H1. | The twelve scenes now exist in the response HTML; one H1 and subsequent H2 headings are available without JavaScript. The cinematic layer enhances that same content. `node scripts/render-story.mjs` maintains the HTML. |
| Medium, improved for mobile animation | All twelve full illustrations previously fetched at startup, about 3.8 MB in total. | Two initial full drawings now total 644,032 bytes; later drawings fetch ahead of the current scene. This is an asset total, not a measured full-page transfer or Core Web Vitals result. |
| Medium, open | Eleven individual illustrations exceed the audit's generic 250 KB display-image budget. | They are already WebP, each below 357 KB. Responsive smaller variants could reduce transfers further; the originals were preserved. |
| Medium, open | No structured data or dedicated factual programme/FAQ page. | Consider a truthful WebSite/Person graph and a short reader-visible explanation of the proposed programme. Do not represent Shruti as an organiser, partner or attached cast member, or invent course dates, prices, reviews, or offers. |
| Low, open | The team page has a canonical and description but no dedicated social-card metadata; the homepage has Open Graph but no explicit Twitter card. | Optional social-sharing polish in a later release. |
| Informational | Privacy intentionally has `noindex` and is excluded from the sitemap. | Appropriate for a utility notice. The two public story/context routes are in the sitemap. |
| Informational | Custom-domain HTTPS and WWW redirect were already configured. | Production route matrix checks direct responses, canonical agreement and Netlify security headers. |

## AEO assessment

The site identifies the creator and Foundation, links the public wellbeing identity and LinkedIn, labels the programme as proposed/in development, and states that participation does not offer a date or introduction. The separate creator letter gives the purpose and fictional Seraphina context. The source now contains readable copy and headings rather than requiring client rendering.

The creator-supplied podcast link is timestamped at 41:04. No transcript was retrieved, and no purported verbatim quote or independently verified endorsement was added. LinkedIn is linked at the supplied URL; login-restricted profile contents were not used for claims.

The bundled media-content heuristic produced **44/100** on a Markdown extraction (`qa/aeo-heuristics.json`). It rewards academic/numbered citations, case studies, credentials, and article structures that this fictional campaign does not aim to provide. This is a limited editorial heuristic, not an AI citation probability, ranking score, or validation of the story's claims. Its useful remaining suggestion is clear factual programme information and accurate entity markup. No fabricated authority signals were added to increase the score. Live answer-engine citation coverage was not measured.

## Motion and mobile checks

- Actual localized deformation of the pencil drawing: wing membranes, flame and its light, bow fragments, a modest stone lift/strain, and ribbon movement. These are restrained illustration effects, not newly drawn character acting or a fully reconstructed intact-to-broken bow sequence.
- One 960×640 GPU canvas, a target cap of 30 frames/second, at most three cached GPU textures, and only the current supported drawing animates.
- The DNA paths also change geometry over time, rather than only revealing a fixed stroke.
- Pause control, reduced-motion preference, hidden-tab suspension, off-story suspension, and a static-image fallback if GPU rendering is unavailable.
- Desktop and portrait mobile viewport checks, including retained face/flame framing; no horizontal overflow observed. This does not establish real-device p75 frame times or Core Web Vitals.
- Existing Netlify form delivery code, names, and honeypots are retained. The new motion controls do not submit forms. Backend abuse/rate-limit settings were not independently verified in this SEO review.

## Verification and limits

- JavaScript syntax and whitespace checks pass.
- Local route matrix: 200 responses, one H1 per HTML page, expected public canonicals, and a valid favicon route. Local Python-server headers are not representative of production Netlify headers.
- XML parsing verifies the sitemap and SVG favicon.
- Google PageSpeed Insights returned a shared daily quota error. **No Lighthouse performance, accessibility, best-practices or SEO score is claimed.** No CrUX p75 or Search Console indexing data was available.
- The static site has no package dependency manifest or application dependency tree to run `npm audit` against. No dependency metadata was submitted to npm.

## Reproduction

`node scripts/render-story.mjs`

`node --check public/app.js`

`node --check public/living-art.js`

`node /Users/mosessampaul/.codex/skills/run-iov-web-quality-audit/scripts/route-matrix.mjs https://shruthimatrimony.com / /for-shruti /privacy /sitemap.xml /robots.txt /favicon.svg`

Local and production evidence is retained in `docs/qa/`. No visitor or form-submission contents are included.

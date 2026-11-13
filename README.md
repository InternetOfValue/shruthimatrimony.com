# Shruthi Matrimony / Become Worth

An independent creative story and proposed 90-day programme at https://shruthimatrimony.com. Seraphina is a fictional dragon goddess. This project is not affiliated with or endorsed by Shruti Haasan and offers no dates or introductions. Illustrations are generated artwork; the trail guardians are reused from HouseOfBros at the creator's request.

## Delivery

GitHub `main` deploys to Netlify. The build command is `node scripts/build.mjs`; the publish directory is `public`. The build uses Node standard-library modules only, with no package installation or browser runtime framework. Keep the account on its existing free tier with overage billing disabled.

The story is present in the initial HTML and enhanced into a native-scroll-driven cinematic stage. Living pencil effects use one bounded GPU canvas, pause/reduced-motion handling, visibility suspension and still-image fallbacks. The FAQ uses native details/summary elements. Both contact forms use Netlify Forms and require form detection to remain enabled. No reader contact details are committed to this repository.

## Content and checks

- Story copy and cinematic behavior: `public/app.js`.
- Living illustration layer: `public/living-art.js`.
- FAQ and matching schema: `content/faq.json`.
- Real trail destinations and drawing sources: `content/trails.json`.
- Generated HTML, social metadata and entity graphs: `node scripts/build.mjs`.
- Semantic/content verification: `node scripts/check-discovery.mjs`.
- Audit and remaining external verification limits: `docs/seo-aeo-audit.md`.

After changing story/FAQ/trail content, run the build and checker. Netlify also runs the same build before publishing. For a local preview, serve `public` with a static HTTP server. Local preview does not process Netlify form submissions or hosting redirects.

## Artwork

Original story drawings and source trail variants are preserved in `artwork-originals/`, outside the deployed directory. The site serves optimized 540px/1080px WebP drawings, fetches ahead of the current scene, and lazy-loads the three small dragon trail images. Previously shared illustration URLs redirect to current variants on Netlify. Social cards are local JPEGs.

Offline image regeneration uses `scripts/prepare-images.mjs` with a local `sharp` module, or an explicit `IMAGE_OPTIMIZER_MODULE` path. Image processing is not part of the deploy/runtime. See `docs/trail-artwork-sources.md` for HouseOfBros artwork provenance.

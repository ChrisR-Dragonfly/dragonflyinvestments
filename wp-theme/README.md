# Dragonfly WordPress theme

The theme itself is `dragonfly/`. This folder holds the build tooling. The design source of truth is the
Next.js app in the repo root; Tailwind classes and copy are ported verbatim into the PHP templates.

## Build
- `npm install` once.
- `npm run dev` while editing (rebuilds `dragonfly/assets/css/main.css` on every save).
- `npm run build` before packaging (minified). The built CSS is committed, so the zip never needs npm.
- `src/tailwind.css` scans only `dragonfly/**/*.php` and `dragonfly/assets/js/**/*.js` (`source(none)` turns off
  auto-detection). Dynamic class strings must stay as full literals in PHP or JS, never assembled from fragments.

## Package
```
python package.py
```
Run from `wp-theme/`. Writes `dist/dragonfly-theme-v<version>.zip` (version read from `dragonfly/style.css`) using
Python's zipfile so entry names use forward slashes. Do not use PowerShell `Compress-Archive`: it writes backslashes,
which Linux hosts unpack as literal filenames and the theme install breaks. The zip has one top-level `dragonfly/`
folder, which is what Appearance > Themes > Add New > Upload Theme expects. `dist/` is gitignored.

## Local development (LocalWP)
Link the theme folder into the LocalWP site with a directory junction (no admin rights needed), from cmd.exe:
```
mklink /J "C:\Users\chris\Local Sites\dragonfly-local\app\public\wp-content\themes\dragonfly" "C:\Users\chris\Documents\Claude\dragonflyinvestments\wp-theme\dragonfly"
```
Then Appearance > Themes > Activate "Dragonfly Investments", create the pages (slugs `home`, `about`, `portfolio`,
`contact`, `legal`, `privacy-policy`, `investor-portal`), Settings > Reading > static front page = Home,
Settings > Permalinks > Post name. Test logged out (the admin bar shifts the sticky header).

## Generated files
- `dragonfly/parts/icons.php`: run `node wp-theme/gen-icons.mjs` from the repo root. Pulls the 22 icons the site
  uses out of `node_modules/lucide-react` so the PHP matches the React icons exactly.
- `dragonfly/assets/img/footprint-map.svg`: snapshot of the fully rendered `react-simple-maps` SVG from the Next.js
  `/about` page (`document.querySelector('svg.rsm-svg').outerHTML`, path coordinates rounded to 2 decimals).
  Re-capture only if `components/FootprintMap.tsx` changes. Expected: viewBox `0 0 960 560`, 56 paths, 48 circles.
- `dragonfly/assets/img/*`: the referenced files from `public/`. The 14 photo PNGs were converted to JPEG q82 in both
  places (16.5 MB to 1.4 MB). The 13 unreferenced files in `public/` are not shipped.

## Tests (no WordPress needed)
`tests/` holds an offline harness that stubs just enough of WordPress to execute the theme. It needs only a PHP
binary; LocalWP bundles one at `%APPDATA%\Local\lightning-services\php-*\bin\win64\php.exe`.

- `php tests/render-test.php` renders all 9 templates and fails on any runtime error (undefined function, bad
  array key, broken loop) that `php -l` cannot see.
- `php tests/endpoint-test.php` exercises the contact endpoint: nonce, honeypot, rate limit, validation per tab,
  email subject/labels/escaping, Resend payload, `wp_mail()` fallback, and the from-address sanitizer.
- `php tests/dump.php <page-key> <template>` prints one rendered page. Dump all seven into `preview/`, copy
  `dragonfly/assets` alongside, and serve the folder to eyeball the theme or diff it against the Next.js site.

- `bash tests/verify-site.sh <base-url>` checks a RUNNING WordPress site from the outside with curl: pages,
  content sanity, assets, all 17 redirects, 404, and the contact endpoint. Read-only, it never submits the
  form. 50 checks, including that the form has exactly 3 tabs (no Investors tab, no accredited checkbox) and that no
  dead `@dragonflyinvestment.com` address is on the site. Run it against the live site right after go-live.

This is a fast first pass, not a replacement for running the theme in real WordPress. The stubs are simplified
(for example `sanitize_email()` is a pass-through), so a green run proves the theme's own logic, not WordPress's.

## Contact form
Three tabs: Sellers & Brokers, Leasing, General (the Investors tab was removed 2026-09-18 at the owner's request;
a stale page that still posts `tab=investors` is delivered as a General inquiry). The tab list lives in
`dfi_contact_tabs()` (`inc/data-site.php`). The form opens on the FIRST tab in that list: `parts/contact-form.php`
renders that tab's state server-side and `contact-form.js` reads it back, so reordering tabs needs no other edit.
The "Request the Overview" button on the contact page is a plain `mailto:` link, not part of the form.

`POST /wp-json/dragonfly/v1/contact` (`inc/contact-rest.php`): REST nonce check, honeypot, 5/hour per IP, allowlisted
fields, file type and 25 MB checks, then Resend HTTP API (key and addresses in Settings > Dragonfly, `inc/settings-page.php`)
with a `wp_mail()` fallback when no key is saved. Note: the nonce check assumes no full-page cache plugin. If one is
ever added, exclude `/contact/` from the cache or drop the nonce and rely on the honeypot and rate limit.

## Old-site URLs
`inc/redirects.php` 301s the old WordPress slugs (`about-us`, `team`, `acquisition`, `google-maps`, `front-page`,
the empty portal pages) to the new pages. Keep it even after the old pages are trashed.

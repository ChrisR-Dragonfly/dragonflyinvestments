# Dragonfly WordPress rebuild — progress and next steps

Last updated: 2026-09-10 (end of session 2). Read this first when picking the work back up.
Full plan: `C:\Users\chris\.claude\plans\humble-splashing-newell.md`
Backup detail: `C:\Users\chris\Documents\dragonflyri-wordpress-backup-2026-09\STATUS.md`

## The goal in one paragraph

The old dragonflyri.com is an outdated WordPress site (WordPress 7.1, "brooklyn" theme by United
Themes, WPBakery + Slider Revolution) on a Liquid Web VPS. The new site is the Next.js app in this
repo, live on Vercel. WordPress cannot run Next.js, so the new design was rebuilt as a custom classic
WordPress theme, to be installed on the same host, replacing the old site. The old site gets backed
up first.

## Where things stand

| Piece | State |
|---|---|
| New WordPress theme | Built, committed, pushed. **Never executed** — no PHP has run yet |
| Old-site backup | Files + content done and verified. Full DB dump still blocked |
| Live-site email typo | **Fixed and verified 2026-09-10** |
| LocalWP | Not installed yet. This is the blocker for everything else |

Branch: `wordpress-theme` (commit `9caf9c9`, 101 files). Pushed to GitHub. `master` untouched, so the
live Vercel site is unaffected.

## Tomorrow, in order

### 1. Install LocalWP and run the theme for the first time

- Install from localwp.com. Create site `dragonfly-local`.
- **Use PHP 8.0.x, not 8.2.** Production is PHP 8.0.30 (confirmed from the server log). The plan
  originally said 8.2; that was a guess made before we had the real number. Match production.
- Link the theme with a directory junction, from `cmd.exe` (no admin rights needed):
  ```
  mklink /J "C:\Users\chris\Local Sites\dragonfly-local\app\public\wp-content\themes\dragonfly" "C:\Users\chris\Documents\Claude\dragonflyinvestments\wp-theme\dragonfly"
  ```
- **Syntax-check every PHP file before activating**, using LocalWP's bundled PHP: `php -l` on each.
- Activate, create the 7 pages (slugs `home`, `about`, `portfolio`, `contact`, `legal`,
  `privacy-policy`, `investor-portal`), Settings > Reading static front page = Home,
  Settings > Permalinks = Post name.
- Fix whatever breaks. Expect a handful of issues; nothing has ever been run.

### 2. Parity QA

Headless Playwright, not yet installed (`pip install playwright && playwright install chromium`).
For each of 7 routes, load `http://localhost:3000` and the LocalWP URL, screenshot at 1440x900 and
390x844, diff `innerText` of `<main>`, compare top-level `<section>` boxes within 2px. Compare layout
boxes, not pixels (Next serves resized WebP; the theme serves originals).
**Always test logged out** — the admin bar injects `html { margin-top: 32px !important }` and shifts
the sticky header.

Then the contact form end to end: real Resend key in Settings > Dragonfly, submit all 4 tabs, PDF on
the Sellers tab, confirm 4 emails. Then test 25 MB rejection, `.exe` rejection, honeypot.

### 3. Finish the backup (can happen in parallel, needs Chris in wp-admin)

Remaining: full database dump (see STATUS.md for the blocker and four options), `others.zip`, and
Site Health > Info pasted into `site-health.txt`. Then bundle into one zip with a restore README.

### 4. Go-live

Ordered checklist is in the plan file, "Phase 9".

## Open question that must be answered before go-live

**Which email addresses should the new site use?** The theme currently hardcodes
`info@dragonflyinvestment.com` and `investors@dragonflyinvestment.com` — note the domain is
`dragonflyinvestment.com`, **not** `dragonflyri.com`. These came straight from the Next.js source.
The live old site uses `info@dragonflyri.com`. Given we just fixed an address that had been bouncing
for three and a half years, confirm these two are real before shipping them. Files to edit if they
change: `footer.php`, `page-contact.php`, `page-investor-portal.php`, `page-legal.php`,
`page-privacy-policy.php`.

## What happened in session 2 (2026-09-10)

### Live site: email typo fixed

The home page's "Corporate Office" block read `info@draognflyri.com` (g and o transposed). Present in
the March 2023 database too, so it had been bouncing for at least three and a half years. Now reads
`info@dragonflyri.com`, verified live with a cache-buster.

Where it lived, for future reference: Brooklyn theme options, not a page or a widget.
Direct URL `/wp-admin/admin.php?page=ut_theme_options`, **Advanced** tab, Contact Section subsection,
field **"Left Content Area"**. Stored in the `option_tree` row of `wp_options` as a serialized blob
under key `ut_left_csection_content_area`. Edit only through the theme UI — the blob has byte-length
prefixes that hand-editing corrupts.

Also seen there: in 2023 the block had a phone number, **+1 305-319-0662**, and a different street
address. Both changed since; the phone is now absent. Worth asking whether it should return.

### Backup: files and content secured, database still blocked

663 MB filed at `C:\Users\chris\Documents\dragonflyri-wordpress-backup-2026-09\`. All archives pass a
full CRC check. Details in that folder's `STATUS.md`. Summary:

- **Got**: plugins (17), themes (brooklyn + child), uploads (3,924 files, 2013 to 2025), and a
  WordPress XML export carrying 26 pages, 27 portfolio CPT entries, 71 attachments, 16 menu items,
  and **11,920 postmeta entries** (so the page-builder layouts survived).
- **Missing**: a full database dump, and `others.zip` (~13 MB).
- **Blocker**: two Wordfence tables (`mpi_wfKnownFileList`, `mpi_wfPendingIssues`) are corrupt at the
  storage-engine level. UpdraftPlus discards the whole dump rather than skipping them, then retries
  every 5 minutes forever. Four options are listed in STATUS.md; none chosen yet.
- Free disk on the server dropped from 811 MB to 142 MB during the failed run. Watch it.

### Corrections to earlier assumptions

| Earlier belief | Reality |
|---|---|
| PHP 8.2 for LocalWP | Production is **PHP 8.0.30**. Match it |
| 20 pages | **26** — six are draft or private and invisible to the public API |
| Uploads ~14 MB | **575 MB**, 3,924 files. The public API only listed 39 attachments |
| wp-admin only, no file access | **WP File Manager 8.0.4 is installed** — a full file browser inside wp-admin. See below |
| Portal pages simply empty | They were a real portal (WP-Client) with **110 investor accounts**. Plugin since removed; orphan tables remain. Chris confirmed the portal is dead, everyone moved to Agora |

### Three plugin findings that affect go-live

1. **WP File Manager 8.0.4** gives browse/upload/edit/delete access to server files from inside
   wp-admin. If active, the "no file access" constraint this project was designed around is not
   actually true, which opens an easier theme-install path (upload the folder directly, no zip size
   limit). It is also effectively a web shell for anyone who gets into wp-admin, and this plugin
   family has a history of critical, mass-exploited vulnerabilities. Decide deliberately.
2. **WPS Hide Login 1.9.19** changes the wp-admin login URL to something custom. Find out what it is
   **before** go-live, or a rollback could lock everyone out.
3. **Really Simple Security 9.8.1** is active. Watch it, alongside Wordfence, for blocking the new
   theme's REST endpoint at go-live.

### Privacy note

The March 2023 database in `older-backups/` contains **110 user accounts**, nearly all named
"Investor N", with real personal and corporate email addresses. That is investor personal data.
Decide deliberately where the backup bundle is stored or shared. Separately, consider whether 110
dormant accounts should remain on the live site now that their portal is gone — a data-minimisation
question for Chris, not urgent, and deleting accounts is destructive.

## Session 1 recap: what the theme contains

64 files in `wp-theme/dragonfly/`, packaged to `wp-theme/dist/dragonfly-theme-v1.0.0.zip`
(5.5 MB, one top-level `dragonfly/` folder, forward-slash paths).

- All 7 pages ported, Tailwind classes and copy verbatim.
- Data arrays: `inc/data-site.php` (nav, hero slides, stats, 8 focus areas, differentiators,
  accomplishments, team bios, contact tabs, 34 property options) and `inc/data-properties.php`
  (36 properties).
- Map: the rendered `react-simple-maps` SVG captured from the live Next.js `/about` page into
  `assets/img/footprint-map.svg`. Verified viewBox `0 0 960 560`, 56 paths, 48 circles, no React-only
  attributes. Inlined with `file_get_contents()`, no runtime CDN call.
- Icons: `parts/icons.php` generated by `gen-icons.mjs` from `node_modules/lucide-react`.
- 5 vanilla JS files, all pass `node --check`.
- Contact endpoint `inc/contact-rest.php`: REST nonce, honeypot, 5/hour per IP, allowlisted and
  sanitized fields, file type + 25 MB checks, Resend HTTP API, `wp_mail()` fallback.
- Settings page `inc/settings-page.php`: Settings > Dragonfly. Resend key, recipient, from address,
  test-email button, Media Library image-map fallback.
- Redirects `inc/redirects.php`: 17 old-URL 301s matched on request path.
- Images: 32 referenced files; 14 photo PNGs converted to JPEG q82 in both the theme and `public/`
  (16.5 MB to 1.4 MB).
- Fixed in the Next repo: `app/portfolio/page.tsx` said `"50M+"` for YEARS OF EXPERIENCE; home and
  about both say `"50+"`. Now `"50+"` in both.

## Gotchas already hit (do not rediscover)

- **Tailwind v4 needs `source(none)`** plus explicit `@source` globs, or it scans the wrong tree.
- **Dynamic class strings must be full literals** in PHP or JS, never assembled from fragments, or
  the scanner will not see them. That is why `dfi_status_badge_class()` and friends return whole
  strings.
- **Hidden `required` fields silently block form submission.** `contact-form.js` sets `disabled` on
  inactive tab groups, which also keeps them out of `FormData`. Do not simplify this away.
- **Do not use PowerShell `Compress-Archive`** for the theme zip: it writes backslash entry names that
  Linux hosts unpack as literal filenames. Use `python package.py` in `wp-theme/`.
- **`lucide-react` alias modules**: some icon files re-export another (`check-circle.mjs` to
  `circle-check-big.mjs`). `gen-icons.mjs` follows the alias.
- The REST nonce assumes no full-page cache plugin. None is installed today.
- Brooklyn theme options are a serialized blob with byte-length prefixes. Edit via the theme UI only.

## Reference facts (verified)

- Old site: WordPress 7.1, PHP 8.0.30 (fpm-fcgi), MariaDB 10.1.48, Apache, Liquid Web VPS
  `209.59.181.152`, nameservers `ns.liquidweb.com` / `ns1.liquidweb.com`.
- `max_execution_time` 900s, `memory_limit` 1024M.
- ABSPATH `/home/dragono6/public_html/`, DB `dragono6_wor1`, table prefix `mpi_`.
- Page IDs to reuse so WordPress does not append `-2`: `contact` **275**, `portfolio` **1943**,
  `privacy-policy` **5033**. Static front page is `front-page` id **35**.
- `/front-page/` becomes a live URL the moment Home takes over and would render old WPBakery
  shortcodes in the new theme. It is in the redirect map.
- Email is Google Workspace (MX at Google). Nothing in this project touches email delivery.
- Resend stays in sandbox (`onboarding@resend.dev` to `chris@dragonflyri.com`) until someone with
  Liquid Web DNS access can verify the domain. From/To are options, so that needs no code change.

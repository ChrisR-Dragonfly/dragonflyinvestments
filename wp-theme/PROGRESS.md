# Dragonfly WordPress rebuild — progress and next steps

Last updated: 2026-09-18 (session 4). Read this first when picking the work back up.
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
| New WordPress theme | **Running in real WordPress locally. Layout parity with Next.js complete on desktop AND phone, all 7 pages.** Not yet on the live server |
| Old-site backup | Files + content done and verified. DB dump: **fix built and tested, waiting on Chris** (10 min in wp-admin) |
| Live-site email typo | Fixed and verified 2026-09-10 |
| LocalWP site | **Up**: `http://dragonfly-local.local`, PHP 8.0.30, Apache 2.4.43, MariaDB 10.4.32, WordPress 7.1.1. Matches production |

Branch: `wordpress-theme`, pushed to GitHub. `master` untouched, so the live Vercel site is unaffected.

## Local environment (already set up, do not redo)

- LocalWP site `dragonfly-local`, site id `VlzTI5aF1`. Start it from the Local app if it is stopped.
- The theme is linked in by a directory junction, so edits in the repo are live instantly:
  `C:\Users\chris\Local Sites\dragonfly-local\app\public\wp-content\themes\dragonfly` points at `wp-theme/dragonfly`.
- Theme active, 7 pages created (`home`, `about`, `portfolio`, `contact`, `legal`, `privacy-policy`,
  `investor-portal`), static front page = Home, permalinks = Post name, title "Dragonfly Investments".
- Local's mail catcher (Mailpit) is at `http://localhost:10000`. With no Resend key saved, the theme
  falls back to `wp_mail()` and every message lands there, so the form can be tested without emailing anyone.
- WP-CLI works from Git Bash using Local's bundled PHP plus the site's `php.ini` (it carries the MySQL port):
  `php.exe -c <Roaming>/Local/run/VlzTI5aF1/conf/php/php.ini <Local>/resources/extraResources/bin/wp-cli/wp-cli.phar --path="<site>/app/public" <command>`.
  Ignore the `php_imagick.dll` warning, it is harmless. `wp rewrite flush --hard` errors (its helper
  process loses the ini), which does not matter because `.htaccess` already has the rules.

## Next steps, in order

### 1. Chris: finish the database backup (about 10 minutes)

Steps are in the backup folder: `DATABASE-BACKUP-STEPS.md`, with `dragonfly-backup-helper.zip` beside it.
Upload the helper plugin, run a database-only backup, download the `-db.gz`, delete the helper.
Then Claude verifies the dump (26 pages, options, users, revslider tables) and bundles the final zip.
The helper's source is in `wp-theme/tools/dragonfly-backup-helper/`.

### 2. Chris: answer the email-address question (see below)

### 3. One real email through Resend (needs Chris, because Claude never enters API keys)

In the local site's wp-admin: Settings > Dragonfly, paste a sending-only Resend key, Save, click
"Send test email", confirm it reaches chris@dragonflyri.com. Everything else about the form is proven.

### 4. Go-live

Ordered checklist is in the plan file, "Phase 9". After Chris activates the theme on the live site, run
the acceptance test, which is read-only and never submits the form:

```
bash wp-theme/tests/verify-site.sh https://www.dragonflyri.com
```

It must end with `43 passed, 0 failed`. Lessons from the local rehearsal that apply directly:

- **Slug collisions are real.** Locally, WordPress's built-in draft "Privacy Policy" page held the
  `privacy-policy` slug, so the new page silently became `privacy-policy-2` and its template would
  never have loaded. On the live site, REUSE the existing pages: `contact` 275, `portfolio` 1943,
  `privacy-policy` 5033. After creating or retitling any page, check the slug field.
- Before go-live, find the custom login URL set by WPS Hide Login, or a rollback could lock everyone out.
- Watch Wordfence and Really Simple Security for blocking `/wp-json/dragonfly/v1/contact`. The verify
  script's last two checks catch exactly that.

## Open question that must be answered before go-live

**Which email addresses should the new site use?** The theme currently hardcodes
`info@dragonflyinvestment.com` and `investors@dragonflyinvestment.com` — note the domain is
`dragonflyinvestment.com`, **not** `dragonflyri.com`. These came straight from the Next.js source.
The live old site uses `info@dragonflyri.com`. Given we just fixed an address that had been bouncing
for three and a half years, confirm these two are real before shipping them. Files to edit if they
change: `footer.php`, `page-contact.php`, `page-investor-portal.php`, `page-legal.php`,
`page-privacy-policy.php`.

## What happened in session 4 (2026-09-18)

**Layout parity is finished.** Every page measured on the theme and on the Next.js site under identical
conditions:

| Page | Desktop 1440 (doc px) | Phone 390 (doc px) | Match |
|---|---|---|---|
| Home | 2628 | 4894 | exact |
| About | 3417 | 7044 | exact |
| Portfolio | 6085 | 16308 | exact |
| Contact | 2447 | 4554 | exact |
| Legal | 2905 | 4226 | exact |
| Privacy Policy | 2417 | 3651 | exact |
| Investor Portal | 1143 | 1562 | exact |

Every section height matches too, and no page scrolls sideways on a phone. The hamburger menu is visible
at phone width, opens with 5 items, closes on second tap, and fits the screen.

Two measurement traps worth remembering:

- **The session 3 "4px contact page difference" was not real.** The browser pane was scaled to a device
  pixel ratio of 1.75, which snaps sub-pixels differently on each load. At DPR 1 the contact column is
  732.75px on both sites with every child identical. Always record `devicePixelRatio` and compare only
  measurements taken under the same value.
- **Next.js's portfolio page reads as empty (doc 900, no sections) in an unpainted tab.** It reveals its
  Suspense content on an animation frame, and the pane fires none until something forces a paint.
  Take a screenshot first, then measure.

**New: `tests/verify-site.sh <base-url>`**, a curl-only, read-only acceptance test with 43 checks: 7 pages
(200, theme CSS linked, no PHP errors), content sanity (hero headline, 8 slides, 36 properties, anchors,
inlined map, REST config, the old email typo absent), 5 assets, all 17 redirects, 3 must-not-redirect
pages, a 404, REST route registered, and a nonce-less POST rejected with the theme's own 403. Passes 43
of 43 against the local site. This is the go-live gate.

**Settings > Dragonfly verified inside real WordPress** through WP-CLI as an administrator (no wp-admin
login used): the page renders with all three fields and both action forms; saving
`Dragonfly <noreply@dragonflyri.com>` stores it intact through WordPress's own option sanitizing (the
session 3 bug, confirmed fixed end to end); garbage falls back to the default; the test-email path sends.

**Database backup unblocked.** Reading UpdraftPlus 1.26.7's source from the plugins backup showed the
table picker UI is paid, but the free engine consults the `updraftplus_backup_table` filter before it
touches each table. A 10-line helper plugin returns false for the two corrupt Wordfence tables. Tested
locally with the same UpdraftPlus version: the baseline dump contained both stand-in tables; with the
helper the log showed both skipped, no errors, core tables present. Local site cleaned up afterwards.
Gotcha: UpdraftPlus's `-db.gz` is many gzip blocks stitched together, one per table. PHP `gzdecode`
reads only the first (a 1 KB header). Use `gzopen`/`gzread`, `gzip -dc`, or Python's `gzip`.

## What happened in session 3 (2026-09-17)

Decision confirmed: **staying with WordPress.** Irving asked whether to host on WordPress or a plain server
and which is easier to maintain. The tradeoff was laid out (hardcoded content means WordPress's editability
benefit is not realised, so static hosting would be less upkeep), and Chris chose to continue with WordPress.

LocalWP is installed but no site exists yet, so its bundled PHP was used to verify the theme offline:

- **Syntax**: all 23 theme PHP files pass `php -l`. First time any of this PHP was checked.
- **Rendering**: all 9 templates execute cleanly through a WordPress stub harness (`tests/`).
- **Text parity vs the live Next.js site**: home and about are word-for-word identical. Portfolio and contact
  differ only by design (the theme keeps all four contact tabs, the mobile menu and the empty state in the DOM
  and hides them; Next renders them conditionally).
- **Layout parity at 1440x900**: home 2628px and about 3417px document heights, with every section height
  matching the Next.js site exactly. The 506px footprint section confirms the map snapshot renders identically.
- **JavaScript**: portfolio filters (36 / Industrial 1 "property" singular / Retail+Realized 10 / empty state),
  `?filter=` deep link and bogus-value fallback, all four contact tabs (fields, required flags, "Brief
  Description" relabel, submit labels, hidden fields disabled), mobile menu ARIA state, slideshow wrap-around,
  portal eye toggle and Coming Soon flow. All correct.
- **Contact endpoint**: 37 of 37 tests pass.

**Real bug found and fixed.** `sanitize_text_field()` strips anything shaped like an HTML tag, so the from
address `Dragonfly Website <onboarding@resend.dev>` was being reduced to `Dragonfly Website`. Resend would have
rejected every message and the contact form would have failed silently in production. The same flaw sat in the
settings page's save callback. Fixed with `dfi_sanitize_from()` in `inc/contact-rest.php`, covered by six
regression tests. Zip rebuilt.

### Then: run in real WordPress (same day)

Chris created the LocalWP site with production's exact stack. The whole suite was re-run under
**PHP 8.0.30** (27 files clean, all templates render, endpoint tests pass). Then, against real WordPress:

- **All 7 pages return 200 with zero PHP errors**, each picking the right template by slug. Unknown URLs 404.
- **17 of 17 redirects** return 301 to the right place. Variants also work: no trailing slash, uppercase,
  and with tracking parameters.
- **REST route registered** (`/dragonfly/v1/contact`, POST). The page hands out a real nonce and URL.
- **Security gates on real WordPress**: no nonce 403, bad nonce 403 (WordPress's own cookie check catches
  it first), honeypot returns ok and sends nothing, invalid email 400, `.exe` / `.php` / `.pdf.exe` all 400.
- **Real submissions work end to end**: emails captured in Mailpit with correct subject, recipient,
  reply-to, row labels ("Brief Description" on the sellers tab), and the PDF attached.
- **Driven in a browser like a visitor**: filled the Leasing tab, submitted, got "Message Received".
- **Layout vs Next.js at 1440x900, to the pixel**: Home 2628, About 3417, Legal 2905, Privacy 2417,
  Investor Portal 1143. Every section height identical.

**Three more real bugs found and fixed.** None were visible to the offline harness:

1. **Tab label overwritten (visible bug).** `contact-form.js` found the note paragraph with
   `querySelector('[data-dfi-note]')`, but the tab BUTTONS carried the same attribute and come first in
   the DOM. So the script overwrote the "Investors" tab label with the whole note sentence, which wrapped
   and made the tab bar 99px instead of 46px. Found only because the pixel comparison showed the contact
   section 53px too tall. Fix: buttons now use `data-dfi-tab-note` / `data-dfi-tab-submit`, and the script
   selects `p[data-dfi-note]`. Lesson: the earlier tab test passed because it used the same wrong selector,
   so it checked the wrong element against itself. Assert on the elements a visitor sees.
2. **`novalidate="false"` disabled browser validation.** `novalidate` is a boolean attribute: present
   means OFF whatever its value. Removed, so "please fill out this field" prompts work again.
3. **Attachment arrived as `php5410.tmp`** on the `wp_mail()` fallback path, because the temp upload path
   was passed without a name. `wp_mail()` accepts attachments keyed by filename (confirmed in this
   WordPress version's `pluggable.php`), so the array is now keyed that way. Arrives as `deal.pdf`.

Plus one design fix: **failed validation no longer burns rate-limit attempts.** The limiter counted every
request, so a visitor who mistyped their email five times was locked out for an hour. It now counts only
submissions that pass validation and are about to send. Proven on real WordPress: 8 bad attempts, then a
good one goes through.

Test suite is now **39 of 39**. Still unverified: one real Resend delivery, the Settings > Dragonfly page
in a browser, and phone-width layout.

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

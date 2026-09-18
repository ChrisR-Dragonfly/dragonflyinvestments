# Go-live checklist: put the Dragonfly theme on www.dragonflyri.com

Written 2026-09-18. This REPLACES the "Phase 9" list in the plan file, which is stale (it names the wrong theme
for rollback and lists 3 plugins instead of 7). Chris clicks in wp-admin. Claude checks from outside, and can
drive Chris's logged-in Chrome for the clicks, but never types passwords and never permanently deletes anything.

Facts below were read from the live site on 2026-09-18 (Site Health, UpdraftPlus log, plugin backup):
WordPress 7.1.1, PHP 8.0.30, active theme **Brooklyn Child**, static front page = "Front Page" (id 35),
permalinks already "Post name", 15 active plugins, upload limit 2 GB, 13.8 GB free disk.

## Before launch day

- [ ] **`info@dragonflyri.com` must accept mail from outside the company.** Today it is a Google Group that only
      accepts company senders, so a visitor's email bounces. The site shows this address in the footer, the contact
      sidebar, the legal pages, the "Request the Overview" button, and the form's error message. Group owner:
      groups.google.com > `info` group > Group settings > **Who can post = Anyone on the web**. Keep **Who can join**
      invite-only. Then send one test from a personal (non-company) address.
- [ ] **Find the custom login URL** set by the WPS Hide Login plugin and write it down. Without it, a rollback
      could lock everyone out.
- [ ] Decide who receives form emails. Default is `chris@dragonflyri.com`. Use a real person's mailbox, not the
      `info@` group (the group may reject mail sent by the web server).
- [ ] Decide on Resend. It is optional. With no key saved the theme sends through WordPress's own mailer
      (`wp_mail()`), which is how the old site's form worked. Only Chris pastes a key, never Claude.
- [ ] Old-site backup: done and verified 2026-09-18 (`Documents/dragonflyri-wordpress-backup-2026-09-18.zip`).
      A fresh database backup on launch day is optional. It needs the small helper plugin
      (`dragonfly-backup-helper.zip` in the backup folder), because the plain backup stalls on two Wordfence tables.
- [ ] Build the zip: in `wp-theme/` run `npm run build`, then `python package.py`. Upload ONLY
      `wp-theme/dist/dragonfly-theme-v1.0.0.zip` (5.5 MB, 63 files).

## Launch (about 45 minutes)

1. [ ] Appearance > Themes > Add New > Upload Theme > the zip > Install. **Do not activate yet.**
2. [ ] Live Preview the "Dragonfly Investments" theme. Header, footer and home page should render.
3. [ ] Activate.
4. [ ] Pages. **Reuse** the three that exist: `contact` (id 275), `portfolio` (1943), `privacy-policy` (5033). Their old
       content is ignored, the theme's templates hold all content. **Create** four new empty pages with these exact
       slugs: `home`, `about`, `legal`, `investor-portal`. After saving each one, check the slug field: if WordPress
       added `-2`, the template will not load (this happened in the local rehearsal with `privacy-policy`).
5. [ ] Settings > Reading > "A static page" > Homepage = **Home**.
6. [ ] Settings > Permalinks > confirm "Post name" > Save (this refreshes the URL rules).
7. [ ] Settings > Dragonfly > set "Send submissions to", leave "From address" alone unless Resend's domain is verified,
       paste a Resend key or leave it empty, Save Settings, then click **Send test email** and confirm it arrives.
8. [ ] Appearance > Customize > Site Identity > Site Icon (the browser-tab icon).
9. [ ] Submit one real test on each of the **3 tabs**: Sellers & Brokers (attach a small PDF), Leasing, General.
       Confirm 3 emails arrive, with the PDF on the first.
10. [ ] Claude runs the outside check. It is read-only and never submits the form:
        ```
        bash wp-theme/tests/verify-site.sh https://www.dragonflyri.com
        ```
        It must end with `50 passed, 0 failed`.
11. [ ] If the live form shows its error message, or step 10 fails on "REST route registered": Wordfence or Really
        Simple Security is blocking `/wp-json/dragonfly/v1/contact`. Allowlist that path before suspecting the theme.
12. [ ] Plugins > **deactivate, do not delete**, the 7 that only served the old design: WPBakery Page Builder
        (`js_composer`), Slider Revolution, Contact Form 7, Portfolio Management by United Themes, Pricing Tables by
        United Themes, Brooklyn Theme Shortcodes Pack, Team Members (`team-showcase-supreme`). Keep Wordfence,
        UpdraftPlus, Really Simple Security, WPS Hide Login, Smush, Regenerate Thumbnails, Classic Editor.
        Then run step 10 again.
13. [ ] Check on a real phone: menu, slideshow arrows, portfolio filters, the 3 contact tabs, one submit.
14. [ ] Vercel copy of the site: add `noindex` (or turn on Deployment Protection) so Google does not index a
        duplicate. Keep it about 30 days as the design reference.
15. [ ] About a week later: move the 17 old pages to Trash (reversible). The redirects in the theme stay.

## Rollback (about 5 minutes, nothing gets deleted)

1. Appearance > Themes > activate **Brooklyn Child** (not "Brooklyn", that is only its parent).
2. Settings > Reading > Homepage = **Front Page** (id 35).
3. Plugins > reactivate the 7 from step 12.
4. Settings > Permalinks > Save.

If the database itself is damaged: UpdraftPlus > Existing Backups > Restore, using the 2026-09-18 set.

## Known loose ends (not blockers)

- **WP File Manager 8.0.4** is active on the live site. It is a full file browser inside wp-admin, and this plugin
  family has a history of serious security holes. Decide deliberately whether to keep it.
- The UpdraftPlus remote storage is still set to the FTP server that is too small, so any backup that tries to
  upload there fails. Set it to "None" or to storage that works.
- The deactivated "Dragonfly Backup Helper" plugin can be deleted on the live site (Chris's click).
- No full-page cache plugin is installed today. If one is ever added, exclude `/contact/` from it, or the form's
  security token goes stale and every submit fails.
- The Resend key that was pasted into a chat in session 1 should be **rotated**: make a new key, put it in Vercel
  and `.env.local` (and in Settings > Dragonfly if Resend is used there), then revoke the old one.

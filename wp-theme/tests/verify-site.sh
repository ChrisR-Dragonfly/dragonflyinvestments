#!/usr/bin/env bash
# Verify a WordPress site running the Dragonfly theme, from the outside, with curl only.
# Usage:  bash tests/verify-site.sh https://www.dragonflyri.com
# Read-only: it never submits the contact form (it only proves the endpoint rejects a request without a nonce).
BASE="${1:?usage: verify-site.sh <base-url, no trailing slash>}"
BASE="${BASE%/}"
UA="Mozilla/5.0 (dragonfly-verify)"
pass=0; fail=0
ok()   { pass=$((pass+1)); printf '  PASS  %s\n' "$1"; }
bad()  { fail=$((fail+1)); printf '  FAIL  %s\n' "$1"; }
code() { curl -s -o /dev/null -A "$UA" -w '%{http_code}' --max-time 30 "$1"; }

echo "== pages (expect 200, theme markup, no PHP errors) =="
for p in / /about/ /portfolio/ /contact/ /legal/ /privacy-policy/ /investor-portal/; do
	body=$(curl -s -A "$UA" --max-time 40 -w '\n%{http_code}' "$BASE$p"); c=$(echo "$body" | tail -1); body=$(echo "$body" | sed '$d')
	errs=$(echo "$body" | grep -ciE 'fatal error|parse error|<b>warning</b>|<b>notice</b>|<b>deprecated</b>')
	theme=$(echo "$body" | grep -c 'themes/dragonfly/assets/css/main.css')
	if [ "$c" = "200" ] && [ "$errs" = "0" ] && [ "$theme" -ge 1 ]; then ok "$p"; else bad "$p  (status $c, php-errors $errs, theme-css-linked $theme)"; fi
done

echo "== page content sanity =="
home=$(curl -s -A "$UA" --max-time 40 "$BASE/")
echo "$home" | grep -q 'Over 50 Years of Combined Real Estate' && ok "home hero headline" || bad "home hero headline missing"
[ "$(echo "$home" | grep -o 'data-dfi-slide[ >]' | wc -l)" -ge 8 ] && ok "home has 8 slides" || bad "home slide count"
port=$(curl -s -A "$UA" --max-time 40 "$BASE/portfolio/")
n=$(echo "$port" | grep -o 'data-dfi-property' | wc -l); [ "$n" = "36" ] && ok "portfolio has 36 properties" || bad "portfolio has $n properties (want 36)"
about=$(curl -s -A "$UA" --max-time 40 "$BASE/about/")
echo "$about" | grep -q 'id="what-sets-us-apart"' && ok "about anchor #what-sets-us-apart" || bad "about anchor missing"
echo "$about" | grep -q 'rsm-svg' && ok "about footprint map inlined" || bad "about map missing"
contact=$(curl -s -A "$UA" --max-time 40 "$BASE/contact/")
echo "$contact" | grep -q 'id="contact-form"' && ok "contact anchor #contact-form" || bad "contact anchor missing"
echo "$contact" | grep -q '"restUrl"' && ok "contact page hands out REST url + nonce" || bad "contact page missing DFI config"
echo "$home" | grep -q 'draognflyri' && bad "the old email typo is present" || ok "no 'draognflyri' typo"
portal=$(curl -s -A "$UA" --max-time 40 "$BASE/investor-portal/")
# dragonflyinvestment.com has no mail records (checked 2026-09-18), so any address on it bounces.
echo "$home$contact$portal" | grep -q 'dragonflyinvestment\.com' && bad "a dead @dragonflyinvestment.com address is on the site" || ok "no dead @dragonflyinvestment.com addresses (home, contact, investor portal)"
echo "$home" | grep -q 'mailto:info@dragonflyri.com' && ok "footer contact is info@dragonflyri.com" || bad "footer contact address is not info@dragonflyri.com"

echo "== assets =="
for a in /wp-content/themes/dragonfly/assets/css/main.css /wp-content/themes/dragonfly/assets/js/nav.js /wp-content/themes/dragonfly/assets/img/Dragonfly_Def.png /wp-content/themes/dragonfly/assets/img/gem-of-hallandale.jpg /wp-content/themes/dragonfly/assets/img/OtterCreek_Picture2.jpg; do
	c=$(code "$BASE$a"); [ "$c" = "200" ] && ok "$a" || bad "$a -> $c"
done

echo "== old-URL redirects (expect 301 to the right place) =="
redir() { got=$(curl -s -o /dev/null -A "$UA" -w '%{http_code} %{redirect_url}' --max-time 30 "$BASE$1"); want="301 $BASE$2"; [ "$got" = "$want" ] && ok "$1 -> $2" || bad "$1 -> got '$got', want '$want'"; }
redir /about-us/ /about/; redir /about-dragonfly/ /about/; redir /team/ /about/
redir /acquisition/ /portfolio/; redir /google-maps/ /contact/; redir /front-page/ /
for s in login-page staff-directory add-staff edit-staff edit-portal-page staff-profile payment-process successful-client-registration error icon-variants 3415-2; do redir "/$s/" /; done

echo "== must NOT redirect =="
for p in /contact/ /portfolio/ /privacy-policy/; do c=$(code "$BASE$p"); [ "$c" = "200" ] && ok "$p stays 200" || bad "$p -> $c"; done
c=$(code "$BASE/this-page-does-not-exist-$(date +%s)/"); [ "$c" = "404" ] && ok "unknown URL returns 404" || bad "unknown URL -> $c"

echo "== contact endpoint (read-only probes) =="
routes=$(curl -s -A "$UA" --max-time 30 "$BASE/wp-json/dragonfly/v1")
echo "$routes" | tr -d '\134' | grep -q '/dragonfly/v1/contact' && ok "REST route registered" || bad "REST route /dragonfly/v1/contact not found (security plugin blocking wp-json?)"
resp=$(curl -s -A "$UA" --max-time 30 -w ' [%{http_code}]' -X POST "$BASE/wp-json/dragonfly/v1/contact" -F tab=general -F name=verify -F email=verify@example.com -F message=verify)
echo "$resp" | grep -q 'bad_nonce.*\[403\]' && ok "POST without nonce is rejected by the theme (403 bad_nonce), nothing sent" || bad "unexpected reply to nonce-less POST: $resp"

echo
echo "$pass passed, $fail failed"
[ "$fail" = "0" ]

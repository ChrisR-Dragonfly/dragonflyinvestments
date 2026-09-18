<?php
/**
 * Offline tests for the contact endpoint (inc/contact-rest.php), using the stub harness.
 * Run:  <php> tests/endpoint-test.php
 */
ob_start();
require __DIR__ . '/stubs.php';
ob_end_clean();
ini_set( 'error_log', 'NUL' ); // the endpoint error_log()s on send failure; keep output clean

$_SERVER['REMOTE_ADDR'] = '203.0.113.7';
$pass = 0; $fail = 0;

function check( $name, $cond, $detail = '' ) {
	global $pass, $fail;
	if ( $cond ) { $pass++; echo "  PASS  $name\n"; }
	else         { $fail++; echo "  FAIL  $name  $detail\n"; }
}
function req( $params, $nonce = 'good', $files = array() ) {
	return new WP_REST_Request( $params, array( 'X-WP-Nonce' => $nonce ), $files );
}
function reset_state( $with_key = true ) {
	$GLOBALS['dfi_transients'] = array();
	$GLOBALS['dfi_posts']      = array();
	$GLOBALS['dfi_mails']      = array();
	$GLOBALS['dfi_options']    = $with_key ? array( 'dfi_resend_api_key' => 're_test_key' ) : array();
}
$valid = array( 'tab' => 'general', 'name' => 'Jane Doe', 'email' => 'jane@example.com', 'message' => 'Hello' );

echo "== security gates ==\n";
reset_state();
$r = dfi_contact_submit( req( $valid, 'stale' ) );
check( 'bad nonce rejected with 403', 403 === $r->status && 'bad_nonce' === $r->data['code'] );
check( 'bad nonce sends nothing', 0 === count( $GLOBALS['dfi_posts'] ) );

reset_state();
$r = dfi_contact_submit( req( $valid + array( 'website' => 'http://spam.example' ) ) );
check( 'honeypot returns ok:true', 200 === $r->status && true === $r->data['ok'] );
check( 'honeypot sends nothing', 0 === count( $GLOBALS['dfi_posts'] ) );

reset_state();
for ( $i = 1; $i <= 5; $i++ ) { $r = dfi_contact_submit( req( $valid ) ); }
check( '5th attempt still allowed', 200 === $r->status );
$r = dfi_contact_submit( req( $valid ) );
check( '6th attempt rate limited (429)', 429 === $r->status && 'rate_limited' === $r->data['code'] );

reset_state();
for ( $i = 1; $i <= 8; $i++ ) { $p = $valid; $p['email'] = 'typo'; dfi_contact_submit( req( $p ) ); }
$r = dfi_contact_submit( req( $valid ) );
check( 'failed validation does not burn rate-limit attempts', 200 === $r->status, 'status ' . $r->status );

reset_state( false );
$tmp = tempnam( sys_get_temp_dir(), 'dfi' );
file_put_contents( $tmp, 'x' );
dfi_send_email( 'S', '<p>b</p>', array( array( 'filename' => 'deal.pdf', 'path' => $tmp ) ) );
check( 'wp_mail attachment keyed by real filename (not phpXXXX.tmp)', array( 'deal.pdf' => $tmp ) === $GLOBALS['dfi_mails'][0][4] );
unlink( $tmp );

echo "== validation ==\n";
reset_state(); $p = $valid; unset( $p['name'] );
$r = dfi_contact_submit( req( $p ) );
check( 'missing name -> 400', 400 === $r->status && 'missing_name' === $r->data['code'] );

reset_state(); $p = $valid; $p['email'] = 'not-an-email';
$r = dfi_contact_submit( req( $p ) );
check( 'invalid email -> 400', 400 === $r->status && 'invalid_email' === $r->data['code'] );

// The Investors tab was removed 2026-09-18. A page left open from before may still post it: deliver it as General.
reset_state();
$r = dfi_contact_submit( req( array( 'tab' => 'investors', 'name' => 'Old Page', 'email' => 'old@example.com', 'phone' => '305-555-0100', 'accredited' => 'Yes', 'message' => 'Hi' ) ) );
$payload = json_decode( $GLOBALS['dfi_posts'][0][1]['body'], true );
check( 'removed investors tab is delivered as a General inquiry', 200 === $r->status && 'New General Inquiry — Dragonfly Website' === $payload['subject'], $payload['subject'] );
check( 'removed accredited field never reaches the email', false === stripos( $payload['html'], 'accredited' ) );
check( 'no investors tab and no accredited field are defined', ! isset( dfi_contact_tab_labels()['investors'] ) && ! isset( dfi_contact_field_labels()['accredited'] ) );

reset_state();
$r = dfi_contact_submit( req( array( 'tab' => 'general', 'name' => 'A', 'email' => 'a@example.com' ) ) );
check( 'general without message -> 400', 400 === $r->status && 'missing_message' === $r->data['code'] );

reset_state();
$r = dfi_contact_submit( req( array( 'tab' => 'leasing', 'name' => 'A', 'email' => 'a@example.com' ) ) );
check( 'leasing without message is fine (optional)', 200 === $r->status );

echo "== email content ==\n";
reset_state();
$r = dfi_contact_submit( req( $valid ) );
check( 'valid general inquiry -> 200 ok', 200 === $r->status && true === $r->data['ok'] );
check( 'exactly one Resend call', 1 === count( $GLOBALS['dfi_posts'] ) );
$call    = $GLOBALS['dfi_posts'][0];
$payload = json_decode( $call[1]['body'], true );
check( 'posts to Resend API', 'https://api.resend.com/emails' === $call[0] );
check( 'bearer key sent', 'Bearer re_test_key' === $call[1]['headers']['Authorization'] );
check( 'subject matches Next route', 'New General Inquiry — Dragonfly Website' === $payload['subject'], $payload['subject'] );
check( 'default recipient', array( 'chris@dragonflyri.com' ) === $payload['to'] );
check( 'default sandbox sender', 'Dragonfly Website <onboarding@resend.dev>' === $payload['from'] );
check( 'reply_to is the submitter', 'jane@example.com' === $payload['reply_to'] );
check( 'html has Name row', false !== strpos( $payload['html'], '>Name</td>' ) && false !== strpos( $payload['html'], 'Jane Doe' ) );
check( 'html has Message row', false !== strpos( $payload['html'], '>Message</td>' ) && false !== strpos( $payload['html'], 'Hello' ) );
check( 'tab/website fields not in email', false === strpos( $payload['html'], 'general</td>' ) && false === strpos( $payload['html'], 'website' ) );

reset_state();
$r = dfi_contact_submit( req( array( 'tab' => 'sellers-brokers', 'name' => 'B', 'email' => 'b@example.com', 'message' => 'Deal details', 'dealSize' => '$5,000,000' ) ) );
$payload = json_decode( $GLOBALS['dfi_posts'][0][1]['body'], true );
check( 'sellers tab relabels message', false !== strpos( $payload['html'], '>Brief Description</td>' ) && false === strpos( $payload['html'], '>Message</td>' ) );
check( 'sellers subject', 'New Sellers & Brokers Inquiry — Dragonfly Website' === $payload['subject'], $payload['subject'] );
check( 'ampersand escaped in html heading', false !== strpos( $payload['html'], 'Sellers &amp; Brokers' ) );

reset_state();
$r = dfi_contact_submit( req( array( 'tab' => 'general', 'name' => '<script>alert(1)</script>Eve', 'email' => 'e@example.com', 'message' => "line1\n<b>bold</b>" ) ) );
$payload = json_decode( $GLOBALS['dfi_posts'][0][1]['body'], true );
check( 'script tags never reach the email', false === stripos( $payload['html'], '<script' ) );
check( 'no raw <b> from user input', false === strpos( $payload['html'], '<b>bold' ) );

reset_state();
$r = dfi_contact_submit( req( array( 'tab' => 'hax0r', 'name' => 'C', 'email' => 'c@example.com', 'message' => 'm', 'evilField' => 'x' ) ) );
$payload = json_decode( $GLOBALS['dfi_posts'][0][1]['body'], true );
check( 'unknown tab falls back to General', 'New General Inquiry — Dragonfly Website' === $payload['subject'] );
check( 'non-allowlisted field dropped', false === strpos( $payload['html'], 'evilField' ) );

echo "== fallback ==\n";
reset_state( false );
$r = dfi_contact_submit( req( $valid ) );
check( 'no API key -> uses wp_mail, not Resend', 200 === $r->status && 1 === count( $GLOBALS['dfi_mails'] ) && 0 === count( $GLOBALS['dfi_posts'] ) );
$mail = $GLOBALS['dfi_mails'][0];
check( 'wp_mail gets html content-type + reply-to', in_array( 'Content-Type: text/html; charset=UTF-8', $mail[3], true ) && in_array( 'Reply-To: jane@example.com', $mail[3], true ) );

echo "== from-address sanitizer (regression: sanitize_text_field strips the <email> part) ==\n";
$default_from = 'Dragonfly Website <onboarding@resend.dev>';
check( 'keeps Name <email>', $default_from === dfi_sanitize_from( $default_from ) );
check( 'keeps custom domain, trims whitespace', 'Dragonfly <noreply@dragonflyri.com>' === dfi_sanitize_from( '  Dragonfly <noreply@dragonflyri.com> ' ) );
check( 'accepts a bare email', 'noreply@dragonflyri.com' === dfi_sanitize_from( 'noreply@dragonflyri.com' ) );
check( 'garbage falls back to default', $default_from === dfi_sanitize_from( 'not an address' ) );
check( 'empty falls back to default', $default_from === dfi_sanitize_from( '' ) );
check( 'bad email inside brackets falls back', $default_from === dfi_sanitize_from( 'Name <nope>' ) );

echo "\n$pass passed, $fail failed\n";
exit( $fail ? 1 : 0 );

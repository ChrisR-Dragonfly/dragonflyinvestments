<?php
/**
 * Offline render harness for the Dragonfly theme.
 *
 * Stubs just enough of WordPress to actually execute the templates and catch runtime errors
 * (undefined functions, bad array keys, bad loops) that `php -l` cannot see. This is NOT a
 * substitute for running the theme in real WordPress; it is a fast first pass.
 *
 * Shared by render-test.php, endpoint-test.php and dump.php.
 */

error_reporting( E_ALL );
ini_set( 'display_errors', '1' );

define( 'ABSPATH', __DIR__ . '/' );
define( 'HOUR_IN_SECONDS', 3600 );
// UPLOAD_ERR_* are native PHP constants; no need to define them.

$GLOBALS['dfi_actions'] = array();
$GLOBALS['dfi_test_page'] = '';
$GLOBALS['dfi_styles'] = array();
$GLOBALS['dfi_scripts'] = array();
$GLOBALS['dfi_localized'] = array();
$GLOBALS['dfi_options'] = array();
$GLOBALS['dfi_transients'] = array();
$GLOBALS['dfi_posts'] = array();
$GLOBALS['dfi_mails'] = array();

// --- escaping -------------------------------------------------------------
function esc_html( $s )    { return htmlspecialchars( (string) $s, ENT_QUOTES, 'UTF-8' ); }
function esc_attr( $s )    { return htmlspecialchars( (string) $s, ENT_QUOTES, 'UTF-8' ); }
function esc_url( $s )     { return htmlspecialchars( (string) $s, ENT_QUOTES, 'UTF-8' ); }
function esc_url_raw( $s ) { return (string) $s; }
function __( $s, $d = null ) { return $s; }
function _e( $s, $d = null ) { echo $s; }

// --- theme/context --------------------------------------------------------
function get_template_directory()     { return dirname( __DIR__ ) . '/dragonfly'; }
function get_template_directory_uri() { return '.'; }
function home_url( $p = '/' )         { return 'http://example.test' . $p; }
function admin_url( $p = '' )         { return 'http://example.test/wp-admin/' . $p; }
function rest_url( $p = '' )          { return 'http://example.test/wp-json/' . $p; }
function bloginfo( $k )               { echo $k === 'charset' ? 'UTF-8' : ''; }
function language_attributes()        { echo 'lang="en-US"'; }
function body_class( $c = '' )        { echo 'class="' . esc_attr( is_array( $c ) ? implode( ' ', $c ) : $c ) . '"'; }
function wp_head() {
	foreach ( $GLOBALS['dfi_styles'] as $src ) { echo '<link rel="stylesheet" href="' . $src . '">' . "
"; }
}
function wp_footer() {
	foreach ( $GLOBALS['dfi_scripts'] as $s ) {
		if ( isset( $GLOBALS['dfi_localized'][ $s['handle'] ] ) ) {
			echo '<script>window.' . $GLOBALS['dfi_localized'][ $s['handle'] ]['name'] . ' = ' . json_encode( $GLOBALS['dfi_localized'][ $s['handle'] ]['data'] ) . ';</script>' . "
";
		}
		echo '<script src="' . $s['src'] . '" defer></script>' . "
";
	}
}
function wp_body_open()               { echo "<!-- wp_body_open -->\n"; }
function wp_date( $f )                { return date( $f ); }
function is_front_page()              { return $GLOBALS['dfi_test_page'] === 'front-page'; }
function is_page( $s )                { return $GLOBALS['dfi_test_page'] === $s; }
function have_posts()                 { return false; }
function the_post()                   {}
function the_title()                  { echo 'Title'; }
function the_content()                { echo '<p>Content</p>'; }

function get_header() { include get_template_directory() . '/header.php'; }
function get_footer() { include get_template_directory() . '/footer.php'; }
function get_template_part( $slug, $name = null, $args = array() ) {
	$file = get_template_directory() . '/' . $slug . '.php';
	if ( ! file_exists( $file ) ) { throw new RuntimeException( "missing template part: $slug" ); }
	include $file;
}

// --- options / hooks / misc ----------------------------------------------
function get_option( $k, $d = false )  { return array_key_exists( $k, $GLOBALS['dfi_options'] ) ? $GLOBALS['dfi_options'][ $k ] : $d; }
function update_option( $k, $v, $a = null ) { return true; }
function get_transient( $k )           { return $GLOBALS['dfi_transients'][ $k ] ?? false; }
function set_transient( $k, $v, $t )   { $GLOBALS['dfi_transients'][ $k ] = $v; return true; }
function add_action( $h, $cb, $p = 10, $a = 1 ) { $GLOBALS['dfi_actions'][] = array( $h, $cb ); return true; }
function dfi_fire( $hook ) {
	foreach ( $GLOBALS['dfi_actions'] as $a ) { if ( $a[0] === $hook && is_callable( $a[1] ) ) { call_user_func( $a[1] ); } }
}
function add_filter( $h, $cb, $p = 10, $a = 1 ) { return true; }
function apply_filters( $h, $v )       { return $v; }
function add_theme_support( $f, $o = null ) { return true; }
function remove_action( $h, $cb, $p = 10 )   { return true; }
function wp_enqueue_style( ...$a )     { if ( isset( $a[1] ) && $a[1] ) { $GLOBALS['dfi_styles'][] = $a[1]; } }
function wp_enqueue_script( ...$a )    { if ( isset( $a[1] ) && $a[1] ) { $GLOBALS['dfi_scripts'][] = array( 'handle' => $a[0], 'src' => $a[1] ); } }
function wp_dequeue_style( ...$a )     {}
function wp_localize_script( ...$a )   { $GLOBALS['dfi_localized'][ $a[0] ] = array( 'name' => $a[1], 'data' => $a[2] ); }
function wp_create_nonce( $a )         { return 'nonce'; }
function wp_verify_nonce( $n, $a )     { return 'good' === $n; }
function error_log_silent() {}
function wp_json_encode( $d )          { return json_encode( $d ); }
function wp_parse_url( $u, $c = -1 )   { return parse_url( $u, $c ); }
function wp_unslash( $v )              { return $v; }
function is_email( $e )                { return (bool) filter_var( $e, FILTER_VALIDATE_EMAIL ); }
function sanitize_text_field( $s )     { return trim( strip_tags( (string) $s ) ); }
function sanitize_textarea_field( $s ) { return trim( strip_tags( (string) $s ) ); }
function sanitize_email( $s )          { return (string) $s; }
function sanitize_key( $s )            { return strtolower( preg_replace( '/[^a-z0-9_\-]/i', '', (string) $s ) ); }
function sanitize_file_name( $s )      { return (string) $s; }
function current_user_can( $c )        { return true; }
function register_rest_route( ...$a )  { return true; }
function register_setting( ...$a )     { return true; }
function add_options_page( ...$a )     { return true; }
function add_settings_section( ...$a ) { return true; }
function add_settings_field( ...$a )   { return true; }
function settings_fields( $g )         {}
function do_settings_sections( $p )    {}
function submit_button( ...$a )        {}
function wp_nonce_field( ...$a )       {}
function check_admin_referer( ...$a )  { return true; }
function wp_die( $m )                  { throw new RuntimeException( $m ); }
function wp_safe_redirect( $u, $s = 302 ) { return true; }
function add_query_arg( $a, $u = '' )  { return $u; }
function is_wp_error( $t )             { return $t instanceof WP_Error; }
function wp_mail( ...$a )              { $GLOBALS['dfi_mails'][] = $a; return true; }
function wp_remote_post( ...$a )       { $GLOBALS['dfi_posts'][] = $a; return array( 'response' => array( 'code' => 200 ), 'body' => '{}' ); }
function wp_remote_retrieve_body( $r ) { return $r['body'] ?? ''; }
function wp_remote_retrieve_response_code( $r ) { return $r['response']['code'] ?? 0; }
function wp_check_filetype_and_ext( ...$a ) { return array( 'ext' => 'pdf', 'type' => 'application/pdf' ); }
function get_attached_file( $id )      { return ''; }
function wp_get_attachment_url( $id )  { return ''; }

class WP_Error {
	private $c, $m;
	public function __construct( $c = '', $m = '' ) { $this->c = $c; $this->m = $m; }
	public function get_error_message() { return $this->m; }
}
class WP_REST_Response {
	public $data, $status;
	public function __construct( $d = null, $s = 200 ) { $this->data = $d; $this->status = $s; }
}
class WP_REST_Request {
	private $p, $h, $f;
	public function __construct( $p = array(), $h = array(), $f = array() ) { $this->p = $p; $this->h = $h; $this->f = $f; }
	public function get_param( $k )  { return $this->p[ $k ] ?? null; }
	public function get_header( $k ) { return $this->h[ $k ] ?? null; }
	public function get_file_params() { return $this->f; }
}
class WP_Query {
	public $posts = array();
	public function __construct( $a = array() ) {}
}


require get_template_directory() . '/functions.php';

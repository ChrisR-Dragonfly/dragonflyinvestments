<?php
/**
 * Renders every template through the stub harness and reports errors.
 * Catches runtime problems `php -l` cannot: undefined functions, bad array keys, broken loops.
 * Run:  <php> tests/render-test.php
 */
ob_start();
require __DIR__ . '/stubs.php';
ob_end_clean();

$templates = array(
	'front-page'      => 'front-page.php',
	'about'           => 'page-about.php',
	'portfolio'       => 'page-portfolio.php',
	'contact'         => 'page-contact.php',
	'legal'           => 'page-legal.php',
	'privacy-policy'  => 'page-privacy-policy.php',
	'investor-portal' => 'page-investor-portal.php',
	'index'           => 'index.php',
	'404'             => '404.php',
);

$fail = 0;
foreach ( $templates as $page => $file ) {
	$GLOBALS['dfi_test_page'] = $page;
	$GLOBALS['dfi_styles'] = $GLOBALS['dfi_scripts'] = $GLOBALS['dfi_localized'] = array();
	dfi_fire( 'wp_enqueue_scripts' );
	ob_start();
	try {
		include get_template_directory() . '/' . $file;
		$html = ob_get_clean();
		printf( "  %-16s OK   %7d bytes, %3d img, %3d svg, %d script(s)
", $page, strlen( $html ), substr_count( $html, '<img' ), substr_count( $html, '<svg' ), count( $GLOBALS['dfi_scripts'] ) );
	} catch ( Throwable $e ) {
		ob_end_clean();
		$fail++;
		printf( "  %-16s FAIL %s: %s (%s:%d)
", $page, get_class( $e ), $e->getMessage(), basename( $e->getFile() ), $e->getLine() );
	}
}
echo "
" . ( $fail ? "$fail template(s) FAILED
" : "all templates rendered
" );
exit( $fail ? 1 : 0 );

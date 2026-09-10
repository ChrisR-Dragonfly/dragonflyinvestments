<?php
/**
 * Dragonfly Investments theme bootstrap.
 * Templates hardcode all content. Data arrays live in inc/data-*.php.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DFI_VERSION', '1.0.0' );
define( 'DFI_DIR', get_template_directory() );
define( 'DFI_URI', get_template_directory_uri() );

foreach ( array( 'helpers', 'enqueue', 'data-site', 'data-properties', 'contact-rest', 'settings-page', 'redirects' ) as $dfi_inc ) {
	require DFI_DIR . '/inc/' . $dfi_inc . '.php';
}
unset( $dfi_inc );

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'script', 'style' ) );
	remove_action( 'wp_head', 'wp_generator' );
} );

// Site-wide meta description (same text as app/layout.tsx).
add_action( 'wp_head', function () {
	echo '<meta name="description" content="Dragonfly Investment is a private, well-capitalized real estate investment group based in Miami, Florida with over 50 years of experience.">' . "\n";
}, 1 );

// Match the Next.js <title>: "Dragonfly Investment | Miami Real Estate" on every page.
add_filter( 'pre_get_document_title', function () {
	return 'Dragonfly Investment | Miami Real Estate';
} );

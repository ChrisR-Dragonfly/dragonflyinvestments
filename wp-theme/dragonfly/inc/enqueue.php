<?php
/**
 * Styles and scripts. Each script loads only on the page that needs it.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dfi_asset_version( $rel ) {
	$abs = DFI_DIR . $rel;
	return file_exists( $abs ) ? (string) filemtime( $abs ) : DFI_VERSION;
}

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'dfi-main', DFI_URI . '/assets/css/main.css', array(), dfi_asset_version( '/assets/css/main.css' ) );

	$defer = array( 'strategy' => 'defer', 'in_footer' => true );

	wp_enqueue_script( 'dfi-nav', DFI_URI . '/assets/js/nav.js', array(), dfi_asset_version( '/assets/js/nav.js' ), $defer );

	if ( is_front_page() ) {
		wp_enqueue_script( 'dfi-slideshow', DFI_URI . '/assets/js/slideshow.js', array(), dfi_asset_version( '/assets/js/slideshow.js' ), $defer );
	}
	if ( is_page( 'portfolio' ) ) {
		wp_enqueue_script( 'dfi-portfolio', DFI_URI . '/assets/js/portfolio-filter.js', array(), dfi_asset_version( '/assets/js/portfolio-filter.js' ), $defer );
	}
	if ( is_page( 'contact' ) ) {
		wp_enqueue_script( 'dfi-scroll', DFI_URI . '/assets/js/scroll.js', array(), dfi_asset_version( '/assets/js/scroll.js' ), $defer );
		wp_enqueue_script( 'dfi-contact', DFI_URI . '/assets/js/contact-form.js', array(), dfi_asset_version( '/assets/js/contact-form.js' ), $defer );
		wp_localize_script( 'dfi-contact', 'DFI', array(
			'restUrl' => esc_url_raw( rest_url( 'dragonfly/v1/contact' ) ),
			'nonce'   => wp_create_nonce( 'wp_rest' ),
		) );
	}

	// The theme uses no blocks or emoji script.
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'global-styles' );
	wp_dequeue_style( 'classic-theme-styles' );
}, 20 );

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

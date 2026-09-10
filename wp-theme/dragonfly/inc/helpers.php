<?php
/**
 * Small helpers used by every template.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Site-relative URL, e.g. dfi_url('/about/'). */
function dfi_url( $path = '/' ) {
	return home_url( $path );
}

/**
 * URL for a theme image by filename.
 * Uses the theme copy when it exists. Otherwise falls back to the Media Library map
 * saved by the settings page (used only if the theme zip had to ship without images).
 */
function dfi_img( $file ) {
	$file = ltrim( $file, '/' );
	if ( file_exists( DFI_DIR . '/assets/img/' . $file ) ) {
		return DFI_URI . '/assets/img/' . $file;
	}
	$map = get_option( 'dfi_media_map', array() );
	if ( is_array( $map ) && ! empty( $map[ $file ] ) ) {
		return $map[ $file ];
	}
	return DFI_URI . '/assets/img/' . $file;
}

/** Echo an inline SVG icon from parts/icons.php. Mirrors lucide-react sizing (width = height = size). */
function dfi_icon( $name, $size = 24, $class = '' ) {
	static $icons = null;
	if ( null === $icons ) {
		$icons = require DFI_DIR . '/parts/icons.php';
	}
	if ( empty( $icons[ $name ] ) ) {
		return;
	}
	printf(
		'<svg xmlns="http://www.w3.org/2000/svg" width="%1$d" height="%1$d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="%2$s" aria-hidden="true">%3$s</svg>',
		(int) $size,
		esc_attr( $class ),
		$icons[ $name ] // trusted markup from the theme's own icons file
	);
}

/** Render a template part from parts/ with variables, e.g. dfi_part('property-card', ['p' => $p]). */
function dfi_part( $name, $vars = array() ) {
	get_template_part( 'parts/' . $name, null, $vars );
}

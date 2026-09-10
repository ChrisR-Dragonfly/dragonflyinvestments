<?php
/**
 * 301 redirects for URLs from the old WordPress site. Matched on the request path so they keep working
 * after the old pages are trashed. Runs at priority 1, before WordPress picks a template.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dfi_old_url_map() {
	return array(
		'about-us'                       => '/about/',
		'about-dragonfly'                => '/about/',
		'team'                           => '/about/',
		'acquisition'                    => '/portfolio/',
		'google-maps'                    => '/contact/',
		'front-page'                     => '/',
		'login-page'                     => '/',
		'staff-directory'                => '/',
		'add-staff'                      => '/',
		'edit-staff'                     => '/',
		'edit-portal-page'               => '/',
		'staff-profile'                  => '/',
		'payment-process'                => '/',
		'successful-client-registration' => '/',
		'error'                          => '/',
		'icon-variants'                  => '/',
		'3415-2'                         => '/',
	);
}

add_action( 'template_redirect', function () {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return;
	}
	$path = (string) wp_parse_url( wp_unslash( $_SERVER['REQUEST_URI'] ), PHP_URL_PATH );
	$base = (string) wp_parse_url( home_url( '/' ), PHP_URL_PATH ); // "/" unless WordPress lives in a subfolder
	if ( $base && 0 === strpos( $path, $base ) ) {
		$path = substr( $path, strlen( $base ) );
	}
	$slug = strtolower( trim( $path, '/' ) );
	$map  = dfi_old_url_map();
	if ( isset( $map[ $slug ] ) ) {
		wp_safe_redirect( home_url( $map[ $slug ] ), 301 );
		exit;
	}
}, 1 );

<?php
/**
 * Settings > Dragonfly: Resend API key, recipient, from address, test email, Media Library image map.
 * Exists because wp-config.php is not editable on the host (wp-admin access only).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'admin_menu', function () {
	add_options_page( 'Dragonfly Theme Settings', 'Dragonfly', 'manage_options', 'dragonfly', 'dfi_settings_render' );
} );

add_action( 'admin_init', function () {
	register_setting( 'dfi_settings', 'dfi_resend_api_key', array( 'sanitize_callback' => 'sanitize_text_field', 'default' => '' ) );
	register_setting( 'dfi_settings', 'dfi_contact_to', array( 'sanitize_callback' => 'sanitize_email', 'default' => 'chris@dragonflyri.com' ) );
	register_setting( 'dfi_settings', 'dfi_from', array( 'sanitize_callback' => 'dfi_sanitize_from', 'default' => 'Dragonfly Website <onboarding@resend.dev>' ) );

	add_settings_section( 'dfi_email', 'Contact form email', function () {
		echo '<p>Submissions from the contact form are emailed through <a href="https://resend.com" target="_blank" rel="noopener">Resend</a>. Without an API key the theme falls back to the server\'s own mail, which is unreliable.</p>';
	}, 'dragonfly' );

	add_settings_field( 'dfi_resend_api_key', 'Resend API key', function () {
		printf( '<input type="password" name="dfi_resend_api_key" value="%s" class="regular-text" autocomplete="off"><p class="description">Create a <strong>sending-only</strong> key at resend.com/api-keys. Leave blank to use the server\'s mail as a fallback.</p>', esc_attr( get_option( 'dfi_resend_api_key', '' ) ) );
	}, 'dragonfly', 'dfi_email' );

	add_settings_field( 'dfi_contact_to', 'Send submissions to', function () {
		printf( '<input type="email" name="dfi_contact_to" value="%s" class="regular-text"><p class="description">While Resend is in sandbox mode (sender below is onboarding@resend.dev) this must be the email address of the Resend account.</p>', esc_attr( get_option( 'dfi_contact_to', 'chris@dragonflyri.com' ) ) );
	}, 'dragonfly', 'dfi_email' );

	add_settings_field( 'dfi_from', 'From address', function () {
		printf( '<input type="text" name="dfi_from" value="%s" class="regular-text"><p class="description">Format: <code>Name &lt;email@domain.com&gt;</code>. Change this to a dragonflyri.com address only after the domain is verified in Resend.</p>', esc_attr( get_option( 'dfi_from', 'Dragonfly Website <onboarding@resend.dev>' ) ) );
	}, 'dragonfly', 'dfi_email' );
} );

function dfi_settings_render() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$notice = isset( $_GET['dfi_notice'] ) ? sanitize_text_field( wp_unslash( $_GET['dfi_notice'] ) ) : '';
	$ok     = isset( $_GET['dfi_ok'] ) && '1' === $_GET['dfi_ok'];
	?>
	<div class="wrap">
		<h1>Dragonfly Theme Settings</h1>
		<?php if ( $notice ) : ?>
			<div class="notice <?php echo $ok ? 'notice-success' : 'notice-error'; ?> is-dismissible"><p><?php echo esc_html( $notice ); ?></p></div>
		<?php endif; ?>

		<form method="post" action="options.php">
			<?php
			settings_fields( 'dfi_settings' );
			do_settings_sections( 'dragonfly' );
			submit_button( 'Save Settings' );
			?>
		</form>

		<hr>
		<h2>Send a test email</h2>
		<p>Sends a short message to the address above using the saved settings, and shows the raw result.</p>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="dfi_test_email">
			<?php wp_nonce_field( 'dfi_test_email' ); ?>
			<?php submit_button( 'Send test email', 'secondary', 'submit', false ); ?>
		</form>

		<hr>
		<h2>Images from the Media Library</h2>
		<p>Only needed if the theme was installed <em>without</em> its <code>assets/img</code> folder (for example when the theme zip was too large for the host). Upload the site images to the Media Library with their original filenames, then click the button. The theme will use the Media Library copies for any file it cannot find in the theme folder.</p>
		<?php $map = get_option( 'dfi_media_map', array() ); ?>
		<p>Mapped images: <strong><?php echo is_array( $map ) ? count( $map ) : 0; ?></strong></p>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="dfi_rebuild_media_map">
			<?php wp_nonce_field( 'dfi_rebuild_media_map' ); ?>
			<?php submit_button( 'Rebuild image map', 'secondary', 'submit', false ); ?>
		</form>
	</div>
	<?php
}

function dfi_settings_redirect( $ok, $message ) {
	wp_safe_redirect( add_query_arg( array( 'page' => 'dragonfly', 'dfi_ok' => $ok ? '1' : '0', 'dfi_notice' => rawurlencode( $message ) ), admin_url( 'options-general.php' ) ) );
	exit;
}

add_action( 'admin_post_dfi_test_email', function () {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( 'Not allowed.' );
	}
	check_admin_referer( 'dfi_test_email' );
	$result = dfi_send_email(
		'Test email — Dragonfly Website',
		'<h2 style="color:#1A3770;">Test email</h2><p>Sent from the Dragonfly theme settings page at ' . esc_html( wp_date( 'Y-m-d H:i:s' ) ) . '.</p>'
	);
	if ( is_wp_error( $result ) ) {
		dfi_settings_redirect( false, 'Test email failed: ' . $result->get_error_message() );
	}
	dfi_settings_redirect( true, 'Test email sent to ' . get_option( 'dfi_contact_to' ) . '. Check the inbox (and spam).' );
} );

add_action( 'admin_post_dfi_rebuild_media_map', function () {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( 'Not allowed.' );
	}
	check_admin_referer( 'dfi_rebuild_media_map' );
	$map   = array();
	$query = new WP_Query( array(
		'post_type'      => 'attachment',
		'post_status'    => 'inherit',
		'posts_per_page' => -1,
		'fields'         => 'ids',
	) );
	foreach ( $query->posts as $id ) {
		$file = get_attached_file( $id );
		$url  = wp_get_attachment_url( $id );
		if ( $file && $url ) {
			$map[ basename( $file ) ] = $url;
		}
	}
	update_option( 'dfi_media_map', $map, false );
	dfi_settings_redirect( true, 'Image map rebuilt: ' . count( $map ) . ' files.' );
} );

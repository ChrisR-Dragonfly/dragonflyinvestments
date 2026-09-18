<?php
/**
 * Contact form endpoint: POST /wp-json/dragonfly/v1/contact
 * Mirrors app/api/contact/route.ts (same labels, same email layout) with server-side validation added.
 * Sends through the Resend HTTP API when a key is saved in Settings > Dragonfly, otherwise wp_mail().
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DFI_CONTACT_MAX_ATTEMPTS', 5 );            // per IP per hour
define( 'DFI_CONTACT_MAX_FILE_BYTES', 26214400 );   // 25 MB, matches the label in the form

add_action( 'rest_api_init', function () {
	register_rest_route( 'dragonfly/v1', '/contact', array(
		'methods'             => 'POST',
		'callback'            => 'dfi_contact_submit',
		'permission_callback' => '__return_true', // public form; CSRF is covered by the REST nonce check below
	) );
} );

/** app/api/contact/route.ts TAB_LABELS */
function dfi_contact_tab_labels() {
	return array(
		'sellers-brokers' => 'Sellers & Brokers',
		'leasing'         => 'Leasing',
		'general'         => 'General',
	);
}

/** app/api/contact/route.ts FIELD_LABELS (order = order of rows in the email) */
function dfi_contact_field_labels() {
	return array(
		'name'             => 'Name',
		'email'            => 'Email',
		'phone'            => 'Phone',
		'company'          => 'Company',
		'message'          => 'Message',
		'propertyType'     => 'Property Type',
		'location'         => 'Location',
		'dealSize'         => 'Deal Size',
		'tenantRole'       => 'I am',
		'propertyInterest' => 'Property of Interest',
		'sfNeeded'         => 'Approximate SF Needed',
		'useType'          => 'Use Type',
		'moveIn'           => 'Desired Move-In',
	);
}

function dfi_contact_allowed_mimes() {
	return array(
		'pdf'  => 'application/pdf',
		'xls'  => 'application/vnd.ms-excel',
		'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'doc'  => 'application/msword',
		'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'zip'  => 'application/zip',
	);
}

function dfi_contact_error( $code, $message, $status ) {
	return new WP_REST_Response( array( 'ok' => false, 'code' => $code, 'message' => $message ), $status );
}

function dfi_contact_submit( WP_REST_Request $request ) {
	// 1. CSRF: the page hands the visitor a 'wp_rest' nonce; a missing or stale one is rejected.
	if ( ! wp_verify_nonce( (string) $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
		return dfi_contact_error( 'bad_nonce', 'Please refresh the page and try again.', 403 );
	}

	// 2. Honeypot: bots fill the hidden "website" field. Pretend it worked, send nothing.
	if ( '' !== trim( (string) $request->get_param( 'website' ) ) ) {
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	// 3. Rate limit per IP (REMOTE_ADDR only; client-supplied headers are not trusted). Counted in step 7.
	$ip       = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$rate_key = 'dfi_rl_' . md5( $ip );
	$attempts = (int) get_transient( $rate_key );
	if ( $attempts >= DFI_CONTACT_MAX_ATTEMPTS ) {
		return dfi_contact_error( 'rate_limited', 'Too many messages. Please try again later.', 429 );
	}

	// 4. Tab + fields (allowlisted, sanitized).
	$tabs = dfi_contact_tab_labels();
	$tab  = sanitize_key( (string) $request->get_param( 'tab' ) );
	if ( ! isset( $tabs[ $tab ] ) ) {
		$tab = 'general';
	}

	$values = array();
	foreach ( dfi_contact_field_labels() as $field => $label ) {
		$raw = $request->get_param( $field );
		if ( null === $raw || is_array( $raw ) ) {
			continue;
		}
		$value = 'message' === $field ? sanitize_textarea_field( $raw ) : sanitize_text_field( $raw );
		if ( '' === trim( $value ) ) {
			continue;
		}
		$values[ $field ] = $value;
	}

	if ( empty( $values['name'] ) ) {
		return dfi_contact_error( 'missing_name', 'Please enter your name.', 400 );
	}
	$email = isset( $values['email'] ) ? sanitize_email( $values['email'] ) : '';
	if ( ! $email || ! is_email( $email ) ) {
		return dfi_contact_error( 'invalid_email', 'Please enter a valid email address.', 400 );
	}
	$values['email'] = $email;
	if ( in_array( $tab, array( 'sellers-brokers', 'general' ), true ) && empty( $values['message'] ) ) {
		return dfi_contact_error( 'missing_message', 'Please enter a message.', 400 );
	}

	// 5. Optional attachment (Sellers & Brokers tab only).
	$attachments = array();
	$files       = $request->get_file_params();
	if ( 'sellers-brokers' === $tab && ! empty( $files['file'] ) && ! empty( $files['file']['name'] ) ) {
		$file = $files['file'];
		if ( UPLOAD_ERR_NO_FILE !== (int) $file['error'] ) {
			if ( UPLOAD_ERR_INI_SIZE === (int) $file['error'] || UPLOAD_ERR_FORM_SIZE === (int) $file['error'] ) {
				return dfi_contact_error( 'file_too_large', 'That file is larger than this server accepts. Please send a smaller file or email it to us.', 400 );
			}
			if ( UPLOAD_ERR_OK !== (int) $file['error'] || empty( $file['tmp_name'] ) || ! is_uploaded_file( $file['tmp_name'] ) ) {
				return dfi_contact_error( 'file_error', 'The file could not be uploaded. Please try again.', 400 );
			}
			if ( (int) $file['size'] > DFI_CONTACT_MAX_FILE_BYTES ) {
				return dfi_contact_error( 'file_too_large', 'Files must be 25 MB or smaller.', 400 );
			}
			$check = wp_check_filetype_and_ext( $file['tmp_name'], $file['name'], dfi_contact_allowed_mimes() );
			if ( empty( $check['ext'] ) || empty( $check['type'] ) ) {
				return dfi_contact_error( 'file_type', 'Only PDF, Excel, Word, and ZIP files are accepted.', 400 );
			}
			$attachments[] = array(
				'filename' => sanitize_file_name( $file['name'] ),
				'path'     => $file['tmp_name'],
			);
		}
	}

	// 6. Email body, same markup as the Next.js route (values escaped).
	$rows = array();
	foreach ( $values as $field => $value ) {
		$label = dfi_contact_field_labels()[ $field ];
		if ( 'message' === $field && 'sellers-brokers' === $tab ) {
			$label = 'Brief Description';
		}
		$cell = 'message' === $field ? nl2br( esc_html( $value ) ) : esc_html( $value );
		$rows[] = '<tr><td style="padding:6px 16px;font-weight:600;color:#1A3770;white-space:nowrap;vertical-align:top;">' . esc_html( $label ) . '</td><td style="padding:6px 16px;">' . $cell . '</td></tr>';
	}
	$tab_label = $tabs[ $tab ];
	$subject   = 'New ' . $tab_label . ' Inquiry — Dragonfly Website';
	$html      = '<h2 style="color:#1A3770;">New ' . esc_html( $tab_label ) . ' Inquiry</h2><table>' . implode( '', $rows ) . '</table>';

	// 7. Send. Count it against the rate limit only now, so failed validation never burns an attempt.
	set_transient( $rate_key, $attempts + 1, HOUR_IN_SECONDS );
	$sent = dfi_send_email( $subject, $html, $attachments, $email );
	if ( is_wp_error( $sent ) ) {
		error_log( 'Dragonfly contact form send failed: ' . $sent->get_error_message() );
		return dfi_contact_error( 'send_failed', 'Your message could not be sent right now.', 502 );
	}

	return new WP_REST_Response( array( 'ok' => true ), 200 );
}

/**
 * Sanitize a "Name <email@domain>" from address.
 * sanitize_text_field() cannot be used on the whole string: it strips anything shaped like an HTML
 * tag, which removes the <email> part entirely and leaves Resend with an invalid sender.
 */
function dfi_sanitize_from( $value ) {
	$default = 'Dragonfly Website <onboarding@resend.dev>';
	$value   = trim( (string) $value );
	if ( preg_match( '/^(.*)<([^<>]+)>$/', $value, $m ) ) {
		$name  = trim( sanitize_text_field( $m[1] ) );
		$email = sanitize_email( trim( $m[2] ) );
	} else {
		$name  = '';
		$email = sanitize_email( $value );
	}
	if ( ! $email || ! is_email( $email ) ) {
		return $default;
	}
	return '' !== $name ? $name . ' <' . $email . '>' : $email;
}

/**
 * Send an HTML email to the configured recipient. Returns true or WP_Error.
 * $attachments: array of ['filename' => ..., 'path' => ...].
 */
function dfi_send_email( $subject, $html, $attachments = array(), $reply_to = '' ) {
	$to   = sanitize_email( get_option( 'dfi_contact_to', 'chris@dragonflyri.com' ) );
	$from = dfi_sanitize_from( get_option( 'dfi_from', 'Dragonfly Website <onboarding@resend.dev>' ) );
	$key  = trim( (string) get_option( 'dfi_resend_api_key', '' ) );

	if ( ! $to || ! is_email( $to ) ) {
		return new WP_Error( 'dfi_no_recipient', 'No valid recipient address is saved in Settings > Dragonfly.' );
	}

	if ( '' === $key ) {
		$headers = array( 'Content-Type: text/html; charset=UTF-8' );
		if ( $reply_to ) {
			$headers[] = 'Reply-To: ' . $reply_to;
		}
		$paths = array();
		foreach ( $attachments as $a ) {
			$paths[ $a['filename'] ] = $a['path']; // keyed by name, otherwise the file arrives as phpXXXX.tmp
		}
		return wp_mail( $to, $subject, $html, $headers, $paths ) ? true : new WP_Error( 'dfi_wp_mail', 'wp_mail() returned false.' );
	}

	$payload = array(
		'from'    => $from,
		'to'      => array( $to ),
		'subject' => $subject,
		'html'    => $html,
	);
	if ( $reply_to ) {
		$payload['reply_to'] = $reply_to;
	}
	if ( $attachments ) {
		$payload['attachments'] = array();
		foreach ( $attachments as $a ) {
			$payload['attachments'][] = array(
				'filename' => $a['filename'],
				'content'  => base64_encode( file_get_contents( $a['path'] ) ),
			);
		}
	}

	$response = wp_remote_post( 'https://api.resend.com/emails', array(
		'timeout' => 20,
		'headers' => array(
			'Authorization' => 'Bearer ' . $key,
			'Content-Type'  => 'application/json',
		),
		'body'    => wp_json_encode( $payload ),
	) );

	if ( is_wp_error( $response ) ) {
		return $response;
	}
	$status = (int) wp_remote_retrieve_response_code( $response );
	if ( $status < 200 || $status >= 300 ) {
		return new WP_Error( 'dfi_resend_' . $status, 'Resend responded ' . $status . ': ' . wp_remote_retrieve_body( $response ) );
	}
	return true;
}

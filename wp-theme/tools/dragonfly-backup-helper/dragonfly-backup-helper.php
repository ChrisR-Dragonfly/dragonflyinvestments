<?php
/**
 * Plugin Name: Dragonfly Backup Helper
 * Description: TEMPORARY. Tells UpdraftPlus to skip two corrupt Wordfence cache tables so the database backup can finish. Deactivate and delete it once the backup is downloaded.
 * Version: 1.0.0
 * Author: Dragonfly Investments
 *
 * Why: on dragonflyri.com the tables mpi_wfKnownFileList and mpi_wfPendingIssues are corrupt
 * ("doesn't exist in engine"). UpdraftPlus aborts the whole database dump when it reaches them and
 * retries forever. Both are Wordfence scan caches with no site content; Wordfence rebuilds them.
 *
 * How: UpdraftPlus asks the 'updraftplus_backup_table' filter before it opens each table
 * (backup.php, "Skip table due to filter?"). Returning false skips the table untouched.
 * This plugin changes nothing else and stores nothing.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'updraftplus_backup_table', function ( $include, $table ) {
	// Match on the end of the name so any table prefix works, ignoring case (MySQL on Linux is case sensitive).
	foreach ( array( 'wfKnownFileList', 'wfPendingIssues' ) as $suffix ) {
		$len = strlen( $suffix );
		if ( strlen( $table ) >= $len && 0 === substr_compare( $table, $suffix, -$len, $len, true ) ) {
			return false;
		}
	}
	return $include;
}, 10, 2 );

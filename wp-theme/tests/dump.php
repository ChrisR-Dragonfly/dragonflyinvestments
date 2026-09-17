<?php
// Render one template to stdout:  <php> tests/dump.php <page-key> <template-file>
// e.g.  tests/dump.php portfolio page-portfolio.php > preview/portfolio.html
$page = $argv[1]; $file = $argv[2];
ob_start();
require __DIR__ . '/stubs.php';
ob_end_clean();
$GLOBALS['dfi_test_page'] = $page;
dfi_fire('after_setup_theme');
dfi_fire('wp_enqueue_scripts');
include get_template_directory() . '/' . $file;

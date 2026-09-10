<!DOCTYPE html>
<html <?php language_attributes(); ?> class="h-full scroll-smooth">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class( 'min-h-full flex flex-col' ); ?> style='font-family: "Aptos", "Segoe UI", system-ui, sans-serif'>
<?php wp_body_open(); ?>
<header class="sticky top-0 z-50 bg-white border-b border-[#dddddd]">
	<nav class="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
		<a href="<?php echo esc_url( dfi_url( '/' ) ); ?>" class="flex items-center">
			<img src="<?php echo esc_url( dfi_img( 'Dragonfly_Def.png' ) ); ?>" alt="Dragonfly Investments" width="220" height="60" class="h-12 w-auto object-contain" fetchpriority="high">
		</a>

		<div class="hidden md:flex items-center gap-8">
			<?php foreach ( dfi_nav_links() as $l ) : ?>
				<a href="<?php echo esc_url( $l['href'] ); ?>" class="text-sm text-[#1A3770]/70 hover:text-[#1A3770] transition-colors uppercase tracking-widest font-semibold"><?php echo esc_html( $l['label'] ); ?></a>
			<?php endforeach; ?>
			<a href="https://dragonflyri.portal.agorareal.com/#/login?redirectUrl=%2F" target="_blank" rel="noopener noreferrer" class="ml-2 px-4 py-2 text-sm font-bold bg-[#1A3770] text-white rounded hover:bg-[#162d5e] transition-colors uppercase tracking-wider">Investor Portal</a>
		</div>

		<button type="button" class="md:hidden text-[#1A3770] p-1" aria-label="Toggle menu" aria-expanded="false" aria-controls="dfi-mobile-menu" data-dfi-nav-toggle>
			<span data-dfi-nav-icon="menu"><?php dfi_icon( 'menu', 24 ); ?></span>
			<span data-dfi-nav-icon="x" hidden><?php dfi_icon( 'x', 24 ); ?></span>
		</button>
	</nav>

	<div id="dfi-mobile-menu" class="md:hidden bg-white border-t border-[#dddddd] px-6 py-4 flex flex-col gap-4" hidden>
		<?php foreach ( dfi_nav_links() as $l ) : ?>
			<a href="<?php echo esc_url( $l['href'] ); ?>" class="text-[#1A3770]/70 hover:text-[#1A3770] text-sm uppercase tracking-widest font-semibold"><?php echo esc_html( $l['label'] ); ?></a>
		<?php endforeach; ?>
		<a href="https://dragonflyri.portal.agorareal.com/#/login?redirectUrl=%2F" target="_blank" rel="noopener noreferrer" class="self-start px-4 py-2 text-sm font-bold bg-[#1A3770] text-white rounded hover:bg-[#162d5e] transition-colors uppercase tracking-wider">Investor Portal</a>
	</div>
</header>
<main class="flex-1">

<?php
/** app/portfolio/page.tsx. All 36 cards render server-side; portfolio-filter.js hides the ones that do not match. */
get_header();
?>

<section class="bg-white border-b border-[#dddddd] py-16 px-6 relative overflow-hidden">
	<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A]"></div>
	<div class="max-w-7xl mx-auto">
		<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Our Portfolio</p>
		<h1 class="text-4xl md:text-5xl font-bold text-[#1A3770] mb-4">Every property. Every market. Every sector.</h1>
		<p class="text-[#333333]/70 max-w-2xl leading-relaxed mb-10">
			From grocery-anchored retail to industrial warehouses and historic
			landmark buildings, Dragonfly&#039;s portfolio spans every major property
			type across key U.S. markets.
		</p>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#dddddd] pt-10">
			<?php foreach ( dfi_stats() as $s ) : ?>
				<div>
					<p class="text-3xl font-bold text-[#1A3770]"><?php echo esc_html( $s['value'] ); ?></p>
					<p class="text-xs text-[#C8961A] font-semibold uppercase tracking-widest mt-1"><?php echo esc_html( $s['label'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="bg-[#f7f8fa] py-12 px-6 min-h-screen">
	<div class="max-w-7xl mx-auto">
		<div class="flex flex-col sm:flex-row gap-4 mb-8">
			<div class="flex flex-wrap gap-2">
				<?php foreach ( dfi_asset_filters() as $f ) : ?>
					<button type="button" data-dfi-filter="asset" data-value="<?php echo esc_attr( $f ); ?>" aria-pressed="<?php echo 'All' === $f ? 'true' : 'false'; ?>" class="<?php echo esc_attr( dfi_filter_button_class( 'asset', 'All' === $f ) ); ?>"><?php echo esc_html( $f ); ?></button>
				<?php endforeach; ?>
			</div>
			<div class="hidden sm:block w-px bg-[#dddddd] self-stretch"></div>
			<div class="flex flex-wrap gap-2">
				<?php foreach ( dfi_status_filters() as $f ) : ?>
					<button type="button" data-dfi-filter="status" data-value="<?php echo esc_attr( $f ); ?>" aria-pressed="<?php echo 'Any Status' === $f ? 'true' : 'false'; ?>" class="<?php echo esc_attr( dfi_filter_button_class( 'status', 'Any Status' === $f ) ); ?>"><?php echo esc_html( $f ); ?></button>
				<?php endforeach; ?>
			</div>
		</div>

		<?php $dfi_properties = dfi_properties(); ?>
		<p class="text-xs text-[#333333]/50 uppercase tracking-widest mb-6 font-semibold" data-dfi-count aria-live="polite"><?php echo count( $dfi_properties ); ?> properties</p>

		<div class="text-center py-24 text-[#333333]/40 text-sm" data-dfi-empty hidden>No properties match the selected filters.</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-dfi-grid>
			<?php foreach ( $dfi_properties as $p ) : ?>
				<?php dfi_part( 'property-card', array( 'p' => $p ) ); ?>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="bg-white border-t border-[#dddddd] py-16 px-6">
	<div class="max-w-4xl mx-auto text-center">
		<div class="w-12 h-0.5 bg-[#C8961A] mx-auto mb-8"></div>
		<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Acquisition Criteria</p>
		<h2 class="text-3xl font-bold text-[#1A3770] mb-5">Bringing Opportunities to Dragonfly</h2>
		<p class="text-[#333333]/70 leading-relaxed mb-8 max-w-2xl mx-auto">
			Dragonfly actively pursues acquisition opportunities across all asset
			classes and geographies. Our ability to underwrite sophisticated and complex
			transactions — and close quickly with self-funded capital — makes us an
			ideal partner for sellers and brokers.
		</p>
		<a href="<?php echo esc_url( dfi_url( '/contact/' ) ); ?>" class="inline-block px-10 py-4 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#B8840F] transition-colors">Submit an Opportunity</a>
	</div>
</section>

<?php
get_footer();

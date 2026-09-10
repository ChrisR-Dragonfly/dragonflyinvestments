<?php
/** One portfolio card (app/portfolio/page.tsx grid item). Expects $args['p']. */
$p = $args['p'];
?>
<div class="bg-white border border-[#dddddd] rounded overflow-hidden hover:border-[#C8961A] hover:shadow-sm transition-all group" data-dfi-property data-category="<?php echo esc_attr( $p['assetCategory'] ); ?>" data-status="<?php echo esc_attr( $p['status'] ); ?>">
	<div class="h-44 border-b border-[#dddddd] group-hover:border-[#C8961A]/30 transition-colors relative overflow-hidden">
		<?php if ( ! empty( $p['image'] ) ) : ?>
			<img src="<?php echo esc_url( dfi_img( $p['image'] ) ); ?>" alt="<?php echo esc_attr( $p['name'] ); ?>" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
		<?php else : ?>
			<div class="h-full w-full <?php echo esc_attr( dfi_category_placeholder_class( $p['assetCategory'] ) ); ?> flex items-center justify-center">
				<?php dfi_icon( 'building-2', 40, 'text-[#1A3770]/20' ); ?>
			</div>
		<?php endif; ?>
	</div>

	<div class="p-5">
		<div class="flex flex-wrap gap-2 mb-3">
			<span class="text-xs px-2.5 py-0.5 rounded-full bg-[#1A3770]/8 text-[#1A3770] font-semibold border border-[#1A3770]/10"><?php echo esc_html( $p['assetType'] ); ?></span>
			<span class="text-xs px-2.5 py-0.5 rounded-full font-semibold <?php echo esc_attr( dfi_status_badge_class( $p['status'] ) ); ?>"><?php echo esc_html( $p['status'] ); ?></span>
		</div>
		<h3 class="font-bold text-[#1A3770] text-base leading-snug mb-1"><?php echo esc_html( $p['name'] ); ?></h3>
		<p class="text-xs text-[#333333]/50 mb-3 font-medium"><?php echo esc_html( $p['location'] . ( ! empty( $p['sf'] ) ? ' · ' . $p['sf'] : '' ) ); ?></p>
		<p class="text-sm text-[#333333]/65 leading-relaxed"><?php echo esc_html( $p['description'] ); ?></p>
	</div>
</div>

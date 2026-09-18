<?php
/**
 * components/HeroSlideshow.tsx. All 8 slides are in the DOM; slideshow.js shows one at a time.
 * The box uses min-h, never a fixed h: it fills the screen between navbar and stats bar (15rem together, in rem so
 * it follows the big-screen scaling in src/tailwind.css), but grows when the text needs more room, so nothing is
 * ever clipped. The text is compact by default; `tall:` (src/tailwind.css) switches on the full-size layout.
 */
$dfi_slides = dfi_hero_slides();
?>
<section class="bg-[#f7f8fa] px-6">
	<div class="relative min-h-[calc(100dvh-15rem)] flex items-center overflow-hidden rounded border border-[#dddddd] shadow-sm max-w-7xl mx-auto" data-dfi-slideshow>
		<div class="absolute inset-0 z-0">
			<?php foreach ( $dfi_slides as $i => $dfi_file ) : ?>
				<img src="<?php echo esc_url( dfi_img( $dfi_file ) ); ?>" alt="" class="absolute inset-0 w-full h-full object-cover" data-dfi-slide<?php echo 0 === $i ? ' fetchpriority="high"' : ' hidden loading="lazy"'; ?>>
			<?php endforeach; ?>
			<div class="absolute inset-0 bg-[#1A3770]/65"></div>
		</div>

		<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A] z-20"></div>

		<button type="button" data-dfi-slide-prev aria-label="Previous slide" class="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"><?php dfi_icon( 'chevron-left', 24 ); ?></button>
		<button type="button" data-dfi-slide-next aria-label="Next slide" class="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"><?php dfi_icon( 'chevron-right', 24 ); ?></button>

		<div class="relative z-20 px-8 md:px-14 py-6 tall:py-8">
			<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3 tall:mb-6">Miami, Florida &middot; Est. 2013</p>
			<h1 class="text-4xl md:tall:text-6xl font-bold text-white leading-tight max-w-3xl mb-4 tall:mb-8">
				Over 50 Years of Combined Real Estate <span class="text-[#C8961A]">Experience</span>
			</h1>
			<p class="text-white/80 text-base tall:text-lg md:tall:text-xl max-w-2xl leading-relaxed mb-6 tall:mb-12">
				A private, well-capitalized real estate investment group with expertise in
				acquisition, development, adaptive reuse, leasing, and management across
				every major property type.
			</p>
			<div class="flex flex-wrap gap-4">
				<a href="<?php echo esc_url( dfi_url( '/portfolio/' ) ); ?>" class="px-8 py-3 tall:py-4 bg-white text-[#1A3770] font-bold text-sm uppercase tracking-widest rounded hover:bg-[#f0f0f0] transition-colors">View Portfolio</a>
			</div>
		</div>
	</div>
</section>

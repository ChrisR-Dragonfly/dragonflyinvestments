<?php
/** app/about/page.tsx + components/FootprintMap.tsx (map is a static SVG snapshot in assets/img). */
get_header();
?>

<section class="bg-white border-b border-[#dddddd] py-16 px-6 relative overflow-hidden">
	<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A]"></div>
	<div class="max-w-7xl mx-auto">
		<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Who We Are</p>
		<h1 class="text-4xl md:text-5xl font-bold text-[#1A3770]">About Dragonfly Investments</h1>
	</div>
</section>

<section class="bg-white py-16 px-6">
	<div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
		<div>
			<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Our Story</p>
			<h2 class="text-3xl font-bold text-[#1A3770] mb-6">Rooted in Miami. Built on Experience.</h2>
			<div class="space-y-5 text-[#333333] leading-relaxed">
				<p>
					Dragonfly is a private real estate investment and development firm founded
					in Miami in 2013 by Jason Morjain and Irving Weisselberger. We invest our
					own capital alongside a trusted network of long-standing investors and
					partners, allowing us to move with conviction, flexibility, and speed.
				</p>
				<p>
					Without outside mandates or layers of bureaucracy, we focus on opportunities
					where experience, creativity, and execution create an edge. From distressed
					debt and adaptive reuse to workforce housing, industrial development,
					grocery-anchored retail, and opportunistic acquisitions, we pursue projects
					that others often overlook or overcomplicate.
				</p>
				<p>
					We built Dragonfly around complex real estate strategies and hands-on
					execution. Every investment is driven by a clear thesis, disciplined
					underwriting, and a long-term approach to value creation — with our own
					capital invested alongside our partners at every step.
				</p>
			</div>
		</div>

		<div class="space-y-4">
			<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Notable Accomplishments</p>
			<div class="border border-[#dddddd] rounded p-6 space-y-4">
				<?php foreach ( dfi_about_accomplishments() as $item ) : ?>
					<div class="flex gap-3">
						<?php dfi_icon( 'check-circle', 20, 'text-[#C8961A] shrink-0 mt-0.5' ); ?>
						<p class="text-[#333333] text-sm leading-relaxed"><?php echo esc_html( $item ); ?></p>
					</div>
				<?php endforeach; ?>
			</div>

			<div class="border-l-4 border-[#C8961A] bg-[#f7f8fa] rounded-r p-6 mt-4">
				<p class="text-[#333333] text-sm leading-relaxed italic">
					&ldquo;Sophisticated real estate investing should never lose its personal touch,
					which is why we stay directly involved in every deal and every relationship.&rdquo;
				</p>
			</div>
		</div>
	</div>
</section>

<section id="what-sets-us-apart" class="bg-[#f7f8fa] border-y border-[#dddddd] py-16 px-6">
	<div class="max-w-7xl mx-auto">
		<div class="mb-12">
			<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Our Advantage</p>
			<h2 class="text-3xl font-bold text-[#1A3770]">What Sets Us Apart</h2>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			<?php foreach ( dfi_about_differentiators() as $d ) : ?>
				<div class="group bg-white border border-[#dddddd] rounded p-7 transition-colors hover:bg-[#1A3770] hover:border-[#1A3770]">
					<div class="w-8 h-0.5 bg-[#C8961A] mb-4 transition-colors group-hover:bg-white"></div>
					<h3 class="font-bold text-lg mb-2 text-[#1A3770] transition-colors group-hover:text-white"><?php echo esc_html( $d['title'] ); ?></h3>
					<p class="text-[#333333]/70 text-sm leading-relaxed group-hover:hidden"><?php echo esc_html( $d['desc'] ); ?></p>
					<p class="hidden text-[#C8961A] text-sm leading-relaxed group-hover:block"><?php echo esc_html( $d['hoverDesc'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="bg-white py-16 px-6">
	<div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
		<div>
			<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Our Footprint</p>
			<h2 class="text-3xl font-bold text-[#1A3770] mb-6">12 states. One disciplined approach.</h2>
			<p class="text-[#333333]/70 leading-relaxed mb-8">
				Dragonfly&#039;s portfolio operates across the East Coast, Southeast, and
				selective Midwest markets. We invest where we can underwrite with local
				insight — and walk the property ourselves before capital moves.
			</p>
			<div class="grid grid-cols-2 gap-x-8 gap-y-3">
				<?php foreach ( dfi_footprint_states() as $state ) : ?>
					<div class="flex items-center gap-2.5">
						<span class="text-[#C8961A] text-lg leading-none">&bull;</span>
						<span class="text-[#1A3770] font-semibold text-sm"><?php echo esc_html( $state ); ?></span>
					</div>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="rounded overflow-hidden border border-[#dddddd] bg-[#f5f0e8]">
			<?php
			// Static snapshot of the rendered react-simple-maps SVG (see wp-theme/README.md for how it was captured).
			$dfi_map = DFI_DIR . '/assets/img/footprint-map.svg';
			if ( file_exists( $dfi_map ) ) {
				echo file_get_contents( $dfi_map ); // theme-owned file, not user input
			}
			?>
		</div>
	</div>
</section>

<section class="bg-white py-16 px-6">
	<div class="max-w-7xl mx-auto">
		<div class="mb-12">
			<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Our People</p>
			<h2 class="text-3xl font-bold text-[#1A3770]">Leadership Team</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<?php foreach ( dfi_team() as $member ) : ?>
				<div class="border border-[#dddddd] rounded overflow-hidden hover:border-[#C8961A] transition-colors group">
					<div class="flex items-center gap-5 p-6 border-b border-[#dddddd] bg-[#f7f8fa]">
						<div class="w-14 h-14 rounded-full border-2 border-[#C8961A]/50 bg-white flex items-center justify-center shrink-0 group-hover:border-[#C8961A] transition-colors">
							<span class="text-[#C8961A] text-lg font-bold"><?php echo esc_html( $member['initials'] ); ?></span>
						</div>
						<div>
							<p class="font-bold text-[#1A3770] text-lg leading-tight"><?php echo esc_html( $member['name'] ); ?></p>
							<p class="text-sm text-[#C8961A] font-semibold mt-0.5 uppercase tracking-wider"><?php echo esc_html( $member['title'] ); ?></p>
						</div>
					</div>
					<div class="p-6 space-y-3">
						<?php foreach ( $member['bio'] as $para ) : ?>
							<p class="text-sm text-[#333333]/75 leading-relaxed"><?php echo esc_html( $para ); ?></p>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
get_footer();

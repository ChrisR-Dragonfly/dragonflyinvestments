<?php
/** app/page.tsx */
get_header();
dfi_part( 'hero-slideshow' );
?>

<section class="bg-[#f7f8fa] border-y border-[#dddddd]">
	<div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#dddddd]">
		<?php foreach ( dfi_stats() as $s ) : ?>
			<div class="text-center px-4">
				<p class="text-3xl font-bold text-[#1A3770]"><?php echo esc_html( $s['value'] ); ?></p>
				<p class="text-xs text-[#C8961A] mt-1 uppercase tracking-wider font-semibold"><?php echo esc_html( $s['label'] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
</section>

<section class="bg-white py-16 px-6">
	<div class="max-w-7xl mx-auto">
		<div class="mb-10">
			<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">What We Do</p>
			<h2 class="text-4xl font-bold text-[#1A3770]">Investment Focus Areas</h2>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
			<?php foreach ( dfi_focus_areas() as $area ) : ?>
				<a href="<?php echo esc_url( $area['href'] ); ?>" class="border border-[#dddddd] rounded p-6 hover:border-[#C8961A] hover:bg-[#1A3770] hover:shadow-sm transition-all group">
					<?php dfi_icon( $area['icon'], 26, 'text-[#C8961A] mb-4 group-hover:scale-110 transition-transform' ); ?>
					<h3 class="font-bold text-[#1A3770] group-hover:text-white text-base mb-2 transition-colors"><?php echo esc_html( $area['title'] ); ?></h3>
					<p class="text-sm text-[#333333]/70 group-hover:text-white/70 leading-relaxed transition-colors"><?php echo esc_html( $area['desc'] ); ?></p>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="bg-[#f7f8fa] border-y border-[#dddddd] py-16 px-6">
	<div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
		<div>
			<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Why Dragonfly</p>
			<h2 class="text-4xl font-bold text-[#1A3770] leading-snug mb-6">
				Built for Speed, <span class="text-[#C8961A]">Built for Complexity</span>
			</h2>
			<p class="text-[#333333] leading-relaxed mb-8">
				Our independence from institutional funds empowers Dragonfly to offer
				creative solutions and act quickly. The combination of experienced
				underwriting, self-funding, and in-house legal counsel allows us to close
				major transactions efficiently — often where others cannot.
			</p>
			<a href="<?php echo esc_url( dfi_url( '/about/' ) ); ?>" class="inline-flex items-center gap-2 text-[#1A3770] font-semibold border-b-2 border-[#C8961A] pb-0.5 hover:text-[#C8961A] transition-colors">
				Learn About Us <?php dfi_icon( 'arrow-right', 16 ); ?>
			</a>
		</div>
		<div class="grid grid-cols-1 gap-4">
			<?php foreach ( dfi_home_differentiators() as $d ) : ?>
				<a href="<?php echo esc_url( dfi_url( '/about/' ) . '#what-sets-us-apart' ); ?>" class="flex gap-4 p-5 bg-white border border-[#dddddd] rounded hover:border-[#C8961A] transition-colors">
					<div class="shrink-0 w-10 h-10 rounded border border-[#1A3770]/20 bg-white flex items-center justify-center">
						<?php dfi_icon( $d['icon'], 18, 'text-[#1A3770]' ); ?>
					</div>
					<div>
						<p class="font-bold text-[#1A3770] mb-1"><?php echo esc_html( $d['title'] ); ?></p>
						<p class="text-sm text-[#333333]/70 leading-relaxed"><?php echo esc_html( $d['desc'] ); ?></p>
					</div>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="bg-white py-12 px-6">
	<div class="max-w-3xl mx-auto text-center">
		<div class="w-12 h-0.5 bg-[#C8961A] mx-auto mb-8"></div>
		<h2 class="text-3xl md:text-4xl font-bold text-[#1A3770] mb-4">Ready to Explore an Opportunity?</h2>
		<p class="text-[#333333]/70 mb-8 text-lg">
			Dragonfly&#039;s unique position allows us to move swiftly and creatively
			on acquisitions. Reach out to start a conversation.
		</p>
		<a href="<?php echo esc_url( dfi_url( '/contact/' ) . '#contact-form' ); ?>" class="inline-block px-10 py-4 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#B8840F] transition-colors">Get in Touch</a>
	</div>
</section>

<?php
get_footer();

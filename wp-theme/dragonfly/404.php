<?php
get_header();
?>
<section class="bg-white py-16 px-6">
	<div class="max-w-7xl mx-auto">
		<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">404</p>
		<h1 class="text-4xl md:text-5xl font-bold text-[#1A3770] mb-6">Page not found</h1>
		<p class="text-[#333333]/70 mb-8">The page you are looking for does not exist or has moved.</p>
		<a href="<?php echo esc_url( dfi_url( '/' ) ); ?>" class="inline-block px-8 py-4 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#B8840F] transition-colors">Back to Home</a>
	</div>
</section>
<?php
get_footer();

</main>
<footer class="bg-[#1A3770] text-white/60 border-t border-white/10">
	<div class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
		<div>
			<a href="<?php echo esc_url( dfi_url( '/' ) ); ?>" class="inline-block mb-4">
				<img src="<?php echo esc_url( dfi_img( 'Dragonfly_Def.png' ) ); ?>" alt="Dragonfly Investments" width="160" height="44" class="h-9 w-auto object-contain brightness-0 invert" loading="lazy">
			</a>
			<p class="text-sm leading-relaxed">
				A private, well-capitalized real estate investment group based in
				Miami, Florida.
			</p>
		</div>

		<div>
			<p class="text-white text-sm font-semibold uppercase tracking-widest mb-4">Navigation</p>
			<ul class="space-y-2 text-sm">
				<?php foreach ( dfi_footer_links() as $l ) : ?>
					<li><a href="<?php echo esc_url( $l['href'] ); ?>" class="hover:text-[#C8961A] transition-colors"><?php echo esc_html( $l['label'] ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		</div>

		<div>
			<p class="text-white text-sm font-semibold uppercase tracking-widest mb-4">Contact</p>
			<address class="not-italic text-sm space-y-2 leading-relaxed">
				<p>Miami, Florida</p>
				<p><a href="mailto:info@dragonflyri.com" class="hover:text-[#C8961A] transition-colors">info@dragonflyri.com</a></p>
			</address>
		</div>
	</div>

	<div class="border-t border-white/10 max-w-7xl mx-auto px-6 py-2 text-center">
		<p class="text-white/30 text-[0.5rem] leading-relaxed">
			<span class="font-semibold text-white/40">Disclaimer.</span>
			This website is provided for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any security, investment product, or interest in any investment vehicle. Any such offering will be made only to qualified investors pursuant to definitive offering documents and applicable securities laws.
		</p>
		<p class="text-white/30 text-[0.5rem] leading-relaxed mt-1.5">
			Information presented on this site may include forward-looking statements that are subject to risks and uncertainties. Actual results may differ materially. Past performance is not indicative of future results. Real estate investment involves substantial risk, including the potential loss of principal. Investments in securities offered by Dragonfly Investments are limited to accredited investors as defined under Rule 501 of Regulation D promulgated under the U.S. Securities Act of 1933.
		</p>
		<p class="text-white/30 text-[0.5rem] leading-relaxed mt-1.5">
			Dragonfly Investments, its affiliates, officers, employees, and agents make no representation or warranty, express or implied, as to the accuracy, reliability, or completeness of any information contained herein. Prospective investors should consult their own legal, tax, accounting, and investment advisors before making any investment decision.
		</p>
	</div>

	<div class="border-t border-white/10 max-w-7xl mx-auto px-6 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.625rem] text-white/40">
		<p>&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> Dragonfly Investments. All rights reserved.</p>
		<div class="flex items-center gap-4">
			<p>Miami, Florida &middot; Est. 2013</p>
			<a href="<?php echo esc_url( dfi_url( '/legal/' ) ); ?>" class="hover:text-white/70 transition-colors">Legal</a>
			<a href="<?php echo esc_url( dfi_url( '/privacy-policy/' ) ); ?>" class="hover:text-white/70 transition-colors">Privacy Policy</a>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>

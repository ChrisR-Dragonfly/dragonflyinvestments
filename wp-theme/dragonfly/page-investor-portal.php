<?php
/** app/investor-portal/page.tsx. Submitting shows the "Coming Soon" panel (nav.js). */
get_header();
?>

<section class="min-h-[80vh] bg-[#f7f8fa] flex items-center justify-center px-6 py-20">
	<div class="w-full max-w-md">
		<div class="bg-white border border-[#dddddd] rounded shadow-sm overflow-hidden">
			<div class="border-b border-[#dddddd] px-8 py-7 text-center bg-white">
				<div class="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#C8961A]/40 mb-4 bg-[#C8961A]/5">
					<?php dfi_icon( 'lock', 20, 'text-[#C8961A]' ); ?>
				</div>
				<p class="text-[#1A3770] font-bold text-lg tracking-wide">DRAGONFLY<span class="text-[#C8961A]"> INVESTMENTS</span></p>
				<p class="text-[#333333]/50 text-xs mt-1 uppercase tracking-widest">Investor Portal</p>
			</div>

			<div class="px-8 py-8">
				<div class="text-center py-4" data-dfi-portal-done hidden>
					<div class="w-12 h-12 rounded-full border-2 border-[#C8961A]/30 flex items-center justify-center mx-auto mb-4 bg-[#C8961A]/5">
						<?php dfi_icon( 'lock', 20, 'text-[#C8961A]' ); ?>
					</div>
					<h2 class="font-bold text-[#1A3770] mb-2">Coming Soon</h2>
					<p class="text-sm text-[#333333]/60 leading-relaxed mb-6">
						The investor portal is currently under development. Please
						contact us directly for investor access.
					</p>
					<a href="mailto:info@dragonflyri.com" class="inline-block text-sm font-semibold text-[#1A3770] border-b-2 border-[#C8961A] pb-0.5 hover:text-[#C8961A] transition-colors">info@dragonflyri.com</a>
					<div class="mt-6">
						<button type="button" data-dfi-portal-back class="text-xs text-[#333333]/40 hover:text-[#333333] transition-colors">&larr; Back to sign in</button>
					</div>
				</div>

				<form class="space-y-5" data-dfi-portal-form>
					<div>
						<label for="dfi-portal-email" class="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">Email Address</label>
						<input id="dfi-portal-email" type="email" required placeholder="you@example.com" class="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors">
					</div>
					<div>
						<label for="dfi-portal-password" class="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">Password</label>
						<div class="relative">
							<input id="dfi-portal-password" type="password" required placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" class="w-full border border-[#dddddd] rounded px-4 py-3 pr-11 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors">
							<button type="button" data-dfi-eye-toggle aria-controls="dfi-portal-password" aria-label="Toggle password visibility" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#333333]/40 hover:text-[#1A3770] transition-colors">
								<span data-dfi-eye="show"><?php dfi_icon( 'eye', 16 ); ?></span>
								<span data-dfi-eye="hide" hidden><?php dfi_icon( 'eye-off', 16 ); ?></span>
							</button>
						</div>
					</div>

					<button type="submit" class="w-full py-3 bg-[#1A3770] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#162d5e] transition-colors">Sign In</button>

					<p class="text-center text-xs text-[#333333]/50 leading-relaxed">
						Don&#039;t have access?
						<a href="<?php echo esc_url( dfi_url( '/contact/' ) ); ?>" class="text-[#1A3770] font-semibold hover:text-[#C8961A] transition-colors">Contact us</a>
						to request investor portal access.
					</p>
				</form>
			</div>
		</div>

		<p class="text-center text-xs text-[#333333]/40 mt-6">&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> Dragonfly Investments. Secure access only.</p>
	</div>
</section>

<?php
get_footer();

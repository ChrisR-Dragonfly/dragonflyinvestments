<?php
/** app/contact/page.tsx. The form itself is in parts/contact-form.php; behavior in assets/js/contact-form.js. */
get_header();

$dfi_steps = array(
	array( 'num' => '01.', 'title' => 'Vertically integrated execution', 'desc' => 'Acquisitions, underwriting, legal, asset management, and investor relations are all handled in-house. No hand-offs, no diluted accountability.' ),
	array( 'num' => '02.', 'title' => 'Aligned capital', 'desc' => 'The firm\'s principals invest alongside every opportunity. We win when our investors win — and we structure every deal with that in mind.' ),
	array( 'num' => '03.', 'title' => 'Disciplined underwriting', 'desc' => 'Conservative assumptions, sensitivity analysis across multiple cycle scenarios, and full legal review of every transaction before capital moves.' ),
	array( 'num' => '04.', 'title' => 'Transparent reporting', 'desc' => 'Investors receive asset-level statements, distribution history, tax documents, and performance reporting through the dedicated investor portal.' ),
);
?>

<section class="bg-white border-b border-[#dddddd] py-16 px-6 relative overflow-hidden">
	<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A]"></div>
	<div class="max-w-7xl mx-auto">
		<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Get in Touch</p>
		<h1 class="text-4xl md:text-5xl font-bold text-[#1A3770]">Contact Dragonfly Investments</h1>
	</div>
</section>

<section class="bg-white py-16 px-6 border-b border-[#dddddd]">
	<div class="max-w-7xl mx-auto">
		<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-4">What to Expect</p>
		<h2 class="text-4xl font-bold text-[#1A3770] mb-3">How Dragonfly Investments works.</h2>
		<div class="w-10 h-0.5 bg-[#C8961A] mb-12"></div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-16">
			<?php foreach ( $dfi_steps as $step ) : ?>
				<div>
					<p class="text-[#C8961A] text-xl font-bold mb-2"><?php echo esc_html( $step['num'] ); ?></p>
					<h3 class="text-[#1A3770] text-xl font-bold mb-3"><?php echo esc_html( $step['title'] ); ?></h3>
					<p class="text-[#333333]/70 leading-relaxed text-sm"><?php echo esc_html( $step['desc'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#dddddd] border border-[#dddddd] rounded">
			<div class="p-8">
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#333333]/50 mb-3">Minimum Commitment</p>
				<p class="text-2xl font-bold text-[#1A3770] mb-2">Varies</p>
				<p class="text-sm text-[#333333]/60 leading-relaxed">By opportunity and structure. Discussed on introduction.</p>
			</div>
			<div class="p-8">
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#333333]/50 mb-3">Deal Structures</p>
				<p class="text-lg font-bold text-[#1A3770] mb-2 leading-snug">Common equity &middot; Preferred equity &middot; Mezzanine</p>
				<p class="text-sm text-[#333333]/60 leading-relaxed">Selected per transaction, return profile, and investor fit.</p>
			</div>
			<div class="p-8">
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#333333]/50 mb-3">Reporting Cadence</p>
				<p class="text-2xl font-bold text-[#1A3770] mb-2">Quarterly</p>
				<p class="text-sm text-[#333333]/60 leading-relaxed">Plus real-time access through the Agora portal.</p>
			</div>
		</div>

		<div class="mt-8 bg-[#f7f8fa] border border-[#dddddd] rounded p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
			<div>
				<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-2">Investor Overview</p>
				<h3 class="text-[#1A3770] text-xl font-bold mb-1">Request the Dragonfly investor overview (PDF).</h3>
				<p class="text-sm text-[#333333]/60">A one-page firm overview with portfolio stats, strategy, and team. Sent by email on request.</p>
			</div>
			<a href="mailto:info@dragonflyri.com?subject=Investor%20overview%20request" class="shrink-0 px-6 py-3 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#B8840F] transition-colors whitespace-nowrap">Request the Overview &rarr;</a>
		</div>
	</div>
</section>

<section id="contact-form" class="bg-white py-16 px-6">
	<div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
		<div class="lg:col-span-2">
			<div class="flex flex-col items-center justify-center py-20 text-center" data-dfi-form-success hidden>
				<?php dfi_icon( 'check-circle', 56, 'text-[#C8961A] mb-5' ); ?>
				<h2 class="text-2xl font-bold text-[#1A3770] mb-3">Message Received</h2>
				<p class="text-[#333333]/70 max-w-md leading-relaxed">
					Thank you for reaching out. A member of the Dragonfly team will
					be in touch with you shortly.
				</p>
				<button type="button" data-dfi-form-reset class="mt-8 px-6 py-3 border border-[#dddddd] text-sm text-[#333333] rounded hover:border-[#C8961A] hover:text-[#1A3770] transition-colors">Send Another Message</button>
			</div>

			<div data-dfi-form-wrap>
				<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Work With Us</p>
				<h2 class="text-3xl font-bold text-[#1A3770] mb-3">Get in touch.</h2>
				<p class="text-[#333333]/70 text-sm leading-relaxed mb-8">
					Three audiences, three paths. Choose the one that fits and a member of our
					team will respond personally.
				</p>
				<?php dfi_part( 'contact-form' ); ?>
			</div>
		</div>

		<div class="space-y-8">
			<div>
				<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Our Office</p>
				<div class="space-y-4">
					<div class="flex gap-3">
						<?php dfi_icon( 'map-pin', 18, 'text-[#C8961A] shrink-0 mt-0.5' ); ?>
						<address class="not-italic text-sm text-[#333333] leading-relaxed">Miami, Florida</address>
					</div>
					<div class="flex gap-3">
						<?php dfi_icon( 'mail', 18, 'text-[#C8961A] shrink-0 mt-0.5' ); ?>
						<a href="mailto:info@dragonflyri.com" class="text-sm text-[#333333] hover:text-[#C8961A] transition-colors">info@dragonflyri.com</a>
					</div>
				</div>
			</div>

			<div class="border-t border-[#dddddd] pt-8">
				<p class="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Investor Relations</p>
				<p class="text-sm text-[#333333]/70 leading-relaxed mb-3">
					For investor access or inquiries about our investor portal, please
					contact our investor relations team directly.
				</p>
				<a href="mailto:info@dragonflyri.com" class="text-sm text-[#1A3770] font-semibold hover:text-[#C8961A] transition-colors">info@dragonflyri.com</a>
			</div>

			<div class="bg-[#f7f8fa] border border-[#dddddd] rounded p-5">
				<p class="text-xs text-[#333333]/60 leading-relaxed">
					Dragonfly&#039;s ability to underwrite sophisticated and complex
					transactions enables us to move swiftly. We respond to all serious
					inquiries promptly.
				</p>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();

<?php
/**
 * Contact form (app/contact/page.tsx). Every tab's fields are in the DOM; contact-form.js shows one tab's
 * groups (data-dfi-tabs lists the tabs a group belongs to) and disables the rest so they neither validate nor submit.
 */
$dfi_tabs   = dfi_contact_tabs();
$dfi_input  = 'w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors';
$dfi_select = 'w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] focus:outline-none focus:border-[#C8961A] transition-colors bg-white';
$dfi_label  = 'block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2';
?>
<div class="flex flex-wrap gap-2 border-b border-[#dddddd] mb-6" role="tablist">
	<?php foreach ( $dfi_tabs as $i => $t ) : ?>
		<button type="button" role="tab" data-dfi-tab="<?php echo esc_attr( $t['key'] ); ?>" data-dfi-tab-note="<?php echo esc_attr( $t['note'] ); ?>" data-dfi-tab-submit="<?php echo esc_attr( $t['submitLabel'] ); ?>" aria-selected="<?php echo 0 === $i ? 'true' : 'false'; ?>" class="px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px <?php echo 0 === $i ? 'border-[#C8961A] text-[#1A3770]' : 'border-transparent text-[#333333]/50 hover:text-[#1A3770]'; ?>"><?php echo esc_html( $t['label'] ); ?></button>
	<?php endforeach; ?>
</div>

<p class="text-[#333333]/60 text-xs mb-8 italic" data-dfi-note><?php echo esc_html( $dfi_tabs[0]['note'] ); ?></p>

<form class="space-y-6" data-dfi-contact-form enctype="multipart/form-data">
	<input type="hidden" name="tab" value="investors" data-dfi-tab-input>
	<div class="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
		<label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
		<div>
			<label class="<?php echo $dfi_label; ?>" for="dfi-name">Name <span class="text-[#C8961A]">*</span></label>
			<input id="dfi-name" type="text" name="name" required placeholder="John Smith" class="<?php echo $dfi_input; ?>">
		</div>
		<div data-dfi-group data-dfi-tabs="investors">
			<label class="<?php echo $dfi_label; ?>" for="dfi-phone-inv">Phone</label>
			<input id="dfi-phone-inv" type="tel" name="phone" placeholder="+1 (305) 000-0000" class="<?php echo $dfi_input; ?>">
		</div>
		<div data-dfi-group data-dfi-tabs="sellers-brokers leasing general" hidden>
			<label class="<?php echo $dfi_label; ?>" for="dfi-email">Email <span class="text-[#C8961A]">*</span></label>
			<input id="dfi-email" type="email" name="email" required placeholder="john@example.com" class="<?php echo $dfi_input; ?>">
		</div>
	</div>

	<div data-dfi-group data-dfi-tabs="investors">
		<label class="<?php echo $dfi_label; ?>" for="dfi-email-inv">Email <span class="text-[#C8961A]">*</span></label>
		<input id="dfi-email-inv" type="email" name="email" required placeholder="john@example.com" class="<?php echo $dfi_input; ?>">
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6" data-dfi-group data-dfi-tabs="sellers-brokers leasing" hidden>
		<div>
			<label class="<?php echo $dfi_label; ?>" for="dfi-company">Company</label>
			<input id="dfi-company" type="text" name="company" placeholder="Company name" class="<?php echo $dfi_input; ?>">
		</div>
		<div>
			<label class="<?php echo $dfi_label; ?>" for="dfi-phone">Phone</label>
			<input id="dfi-phone" type="tel" name="phone" placeholder="+1 (305) 000-0000" class="<?php echo $dfi_input; ?>">
		</div>
	</div>

	<div class="space-y-6" data-dfi-group data-dfi-tabs="sellers-brokers" hidden>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			<div>
				<label class="<?php echo $dfi_label; ?>" for="dfi-property-type">Property Type</label>
				<select id="dfi-property-type" name="propertyType" class="<?php echo $dfi_select; ?>">
					<option value="">Select one...</option>
					<?php foreach ( dfi_contact_property_types() as $o ) : ?>
						<option value="<?php echo esc_attr( $o ); ?>"><?php echo esc_html( $o ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>
			<div>
				<label class="<?php echo $dfi_label; ?>" for="dfi-location">Location</label>
				<input id="dfi-location" type="text" name="location" placeholder="City, State" class="<?php echo $dfi_input; ?>">
			</div>
		</div>
		<div>
			<label class="<?php echo $dfi_label; ?>" for="dfi-deal-size">Deal Size</label>
			<input id="dfi-deal-size" type="text" name="dealSize" placeholder="e.g. $5,000,000" class="<?php echo $dfi_input; ?>">
		</div>
		<div>
			<label class="<?php echo $dfi_label; ?>" for="dfi-file">Attach OM, Financials, or Deal Package</label>
			<input id="dfi-file" type="file" name="file" accept=".pdf,.xls,.xlsx,.doc,.docx,.zip" class="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-[#f7f8fa] file:text-[#1A3770] file:text-xs file:font-semibold file:uppercase file:tracking-wider focus:outline-none focus:border-[#C8961A] transition-colors">
			<p class="text-xs text-[#333333]/50 mt-2">Optional &middot; PDF, Excel, Word, ZIP &middot; max 25MB<span data-dfi-file-name></span></p>
		</div>
	</div>

	<div class="space-y-6" data-dfi-group data-dfi-tabs="leasing" hidden>
		<div>
			<p class="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-3">I am&hellip;</p>
			<div class="flex flex-wrap gap-6">
				<label class="flex items-center gap-2 text-sm text-[#333333] cursor-pointer"><input type="radio" name="tenantRole" value="representing-tenant" class="accent-[#C8961A]"> Representing a tenant</label>
				<label class="flex items-center gap-2 text-sm text-[#333333] cursor-pointer"><input type="radio" name="tenantRole" value="tenant-principal" class="accent-[#C8961A]"> The tenant / principal</label>
			</div>
		</div>
		<div>
			<label class="<?php echo $dfi_label; ?>" for="dfi-property-interest">Property of Interest</label>
			<select id="dfi-property-interest" name="propertyInterest" class="<?php echo $dfi_select; ?>">
				<option value="">Select one...</option>
				<?php foreach ( dfi_contact_property_options() as $o ) : ?>
					<option value="<?php echo esc_attr( $o ); ?>"><?php echo esc_html( $o ); ?></option>
				<?php endforeach; ?>
			</select>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			<div>
				<label class="<?php echo $dfi_label; ?>" for="dfi-sf-needed">Approximate SF Needed</label>
				<input id="dfi-sf-needed" type="text" name="sfNeeded" placeholder="e.g. 2,500 sq ft" class="<?php echo $dfi_input; ?>">
			</div>
			<div>
				<label class="<?php echo $dfi_label; ?>" for="dfi-use-type">Use Type</label>
				<select id="dfi-use-type" name="useType" class="<?php echo $dfi_select; ?>">
					<option value="">Select one...</option>
					<?php foreach ( dfi_contact_use_types() as $o ) : ?>
						<option value="<?php echo esc_attr( $o ); ?>"><?php echo esc_html( $o ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>
		</div>
		<div>
			<label class="<?php echo $dfi_label; ?>" for="dfi-move-in">Desired Move-In</label>
			<select id="dfi-move-in" name="moveIn" class="<?php echo $dfi_select; ?>">
				<option value="">Select one...</option>
				<?php foreach ( dfi_contact_move_in_options() as $o ) : ?>
					<option value="<?php echo esc_attr( $o ); ?>"><?php echo esc_html( $o ); ?></option>
				<?php endforeach; ?>
			</select>
		</div>
	</div>

	<div>
		<label class="<?php echo $dfi_label; ?>" for="dfi-message"><span data-dfi-message-label>Message</span> <span class="text-[#C8961A]" data-dfi-message-star hidden>*</span></label>
		<textarea id="dfi-message" name="message" rows="6" data-dfi-message
			data-ph-investors="Tell us about your investment goals and how you'd like to get involved..."
			data-ph-sellers-brokers="Describe the property, asking price, and any relevant deal details..."
			data-ph-leasing="Tell us about your space requirements, timeline, and preferred location..."
			data-ph-general="Tell us how we can help..."
			placeholder="Tell us about your investment goals and how you'd like to get involved..."
			class="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors resize-none"></textarea>
	</div>

	<div data-dfi-group data-dfi-tabs="investors">
		<label class="flex items-start gap-3 text-sm text-[#333333] cursor-pointer">
			<input type="checkbox" name="accredited" value="Yes" required class="mt-0.5 accent-[#C8961A]">
			<span>I confirm I am an accredited investor as defined by SEC Rule 501 of Regulation D.</span>
		</label>
	</div>

	<p class="text-sm text-red-600" data-dfi-form-error hidden>
		Something went wrong sending your message. Please try again or email us
		directly at <a href="mailto:info@dragonflyinvestment.com" class="underline">info@dragonflyinvestment.com</a>.
	</p>

	<button type="submit" data-dfi-submit class="px-10 py-4 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#B8840F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"><?php echo esc_html( $dfi_tabs[0]['submitLabel'] ); ?></button>
</form>

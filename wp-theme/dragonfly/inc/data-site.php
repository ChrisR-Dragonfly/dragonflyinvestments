<?php
/**
 * Site-wide data arrays. Values are copied verbatim from the Next.js source files noted on each function.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** components/Navbar.tsx `links` */
function dfi_nav_links() {
	return array(
		array( 'href' => dfi_url( '/' ), 'label' => 'Home' ),
		array( 'href' => dfi_url( '/about/' ), 'label' => 'About' ),
		array( 'href' => dfi_url( '/portfolio/' ), 'label' => 'Portfolio' ),
		array( 'href' => dfi_url( '/contact/' ) . '#contact-form', 'label' => 'Contact' ),
	);
}

/** components/Footer.tsx navigation list */
function dfi_footer_links() {
	return array(
		array( 'href' => dfi_url( '/' ), 'label' => 'Home' ),
		array( 'href' => dfi_url( '/about/' ), 'label' => 'About Us' ),
		array( 'href' => dfi_url( '/portfolio/' ), 'label' => 'Portfolio' ),
		array( 'href' => dfi_url( '/contact/' ), 'label' => 'Contact' ),
		array( 'href' => dfi_url( '/investor-portal/' ), 'label' => 'Investor Portal' ),
	);
}

/** components/HeroSlideshow.tsx `slides` */
function dfi_hero_slides() {
	return array(
		'gem-of-hallandale.jpg',
		'7500-biscayne.jpg',
		'selina-miami-gold-dust.webp',
		'dragonfly-shops-old-cutler.jpg',
		'village-at-myrtle-grove.jpg',
		'dragonfly-commerce-park.jpg',
		'the-emancipator.jpg',
		'casa-florida.jpg',
	);
}

/** app/page.tsx `stats` (the portfolio page reuses this; the Next source had a "50M+" typo there, fixed here) */
function dfi_stats() {
	return array(
		array( 'value' => '50+', 'label' => 'YEARS OF EXPERIENCE' ),
		array( 'value' => '$750M+', 'label' => 'ACQUIRED & DEVELOPED' ),
		array( 'value' => '300+', 'label' => 'PROJECTS' ),
		array( 'value' => 'Full-Service', 'label' => 'Acquisition to Management' ),
	);
}

/** app/page.tsx `focusAreas` */
function dfi_focus_areas() {
	$portfolio = dfi_url( '/portfolio/' );
	return array(
		array( 'icon' => 'store', 'title' => 'Retail Centers', 'desc' => 'Grocery-anchored and discount-focused retail centers across key markets.', 'href' => $portfolio . '?filter=Retail' ),
		array( 'icon' => 'building-2', 'title' => 'Multifamily', 'desc' => 'Residential apartment and mixed-income housing investments across key markets.', 'href' => $portfolio . '?filter=Multifamily' ),
		array( 'icon' => 'warehouse', 'title' => 'Industrial & Warehouse', 'desc' => 'Institutional-quality warehouse and industrial properties.', 'href' => $portfolio . '?filter=Industrial' ),
		array( 'icon' => 'tree-pine', 'title' => 'Mixed-Use', 'desc' => 'Dynamic mixed-use developments combining residential, retail, and commercial uses.', 'href' => $portfolio . '?filter=Mixed-Use' ),
		array( 'icon' => 'hotel', 'title' => 'Hospitality', 'desc' => 'Hospitality establishments and experiential real estate assets.', 'href' => $portfolio . '?filter=Hospitality' ),
		array( 'icon' => 'landmark', 'title' => 'Historic Buildings', 'desc' => 'Adaptive reuse and preservation of historically significant properties.', 'href' => $portfolio . '?filter=' . rawurlencode( 'Adaptive Reuse' ) ),
		array( 'icon' => 'file-text', 'title' => 'Notes & Mortgages', 'desc' => 'Active pursuit of note and mortgage investment opportunities.', 'href' => $portfolio ),
		array( 'icon' => 'cpu', 'title' => 'Prop-Tech', 'desc' => 'Investments in technology companies reshaping real estate.', 'href' => $portfolio ),
	);
}

/** app/page.tsx `differentiators` (home page cards, all link to the About page section) */
function dfi_home_differentiators() {
	return array(
		array( 'icon' => 'shield', 'title' => 'Self-Funded', 'desc' => 'Independent of institutional funds — enabling creative structures and fast decisions.' ),
		array( 'icon' => 'zap', 'title' => 'In-House Legal', 'desc' => 'Expert in-house counsel allows us to close complex transactions efficiently.' ),
		array( 'icon' => 'trending-up', 'title' => 'Expert Underwriting', 'desc' => '50+ years of sophisticated underwriting across every property type.' ),
	);
}

/** app/about/page.tsx `accomplishments` */
function dfi_about_accomplishments() {
	return array(
		'Major stockholder of a local community bank for over 20 years',
		'One of the largest landlords in Downtown Miami since the 1980s',
		'Purchase of over $500 million in distressed debt from 2008 to 2013',
		'50+ years of continuous real estate acquisitions, management, and development',
	);
}

/** app/about/page.tsx `differentiators` (hover swaps desc for hoverDesc, CSS only) */
function dfi_about_differentiators() {
	return array(
		array(
			'title'     => 'Self-Funded Capital',
			'desc'      => 'Independence from institutional funds allows Dragonfly to offer creative solutions and act quickly on opportunities others cannot.',
			'hoverDesc' => 'No outside LPs, no capital calls, no waiting on someone else\'s timeline — we close on our own terms.',
		),
		array(
			'title'     => 'In-House Legal Counsel',
			'desc'      => 'Our expert in-house legal team enables efficient closings on complex and sophisticated transactions.',
			'hoverDesc' => 'No outside firms on the critical path — contracts get drafted, negotiated, and closed under one roof.',
		),
		array(
			'title'     => 'Expert Underwriting',
			'desc'      => 'Decades of underwriting experience across every asset class, enabling us to move swiftly in acquiring complex deals.',
			'hoverDesc' => 'We\'ve seen the deal before it lands on our desk — that\'s how we price risk in days, not weeks.',
		),
		array(
			'title'     => 'Full-Service Platform',
			'desc'      => 'From acquisition and development to leasing and management — we manage the full lifecycle of every asset we own.',
			'hoverDesc' => 'One team owns the asset from closing to disposition — nothing gets lost in a handoff.',
		),
	);
}

/** app/about/page.tsx footprint state list (12 active states) */
function dfi_footprint_states() {
	return array( 'Texas', 'Alabama', 'Indiana', 'Ohio', 'Kentucky', 'West Virginia', 'Virginia', 'North Carolina', 'South Carolina', 'Georgia', 'Florida', 'Pennsylvania' );
}

/** app/about/page.tsx `team` */
function dfi_team() {
	return array(
		array(
			'name'     => 'Jason Morjain',
			'title'    => 'Chief Executive Officer',
			'initials' => 'JM',
			'bio'      => array(
				'Jason "JJ" Morjain serves as the Chief Executive Officer and co-founder of Dragonfly Investments, specializing in real estate acquisitions and debt financing. Since founding the company in 2013, Jason has overseen acquisitions and debt financing totaling over $400 million in commercial, residential, hospitality, and industrial assets.',
				'Before co-founding Dragonfly, Jason held a prominent role at Beacon Investment Properties (now Accesso Partners), where he served as Acquisitions Manager and led the acquisition of more than 3 million square feet of office buildings across the United States.',
				'Jason holds a real estate agent and mortgage broker license and graduated from the University of Maryland in 2007 with a B.S. in Finance. He also attended The Schack Institute of Real Estate at NYU and serves on the Advisory Board at Nova Southeastern University\'s MSRED program.',
			),
		),
		array(
			'name'     => 'Irving Weisselberger',
			'title'    => 'Chief Financial Officer',
			'initials' => 'IW',
			'bio'      => array(
				'Irving Weisselberger is the CFO and Managing Partner at Dragonfly Investments. As a third-generation real estate investor and developer, Irving brings a deep understanding of the industry and a proven track record of success.',
				'Originally from Caracas, Venezuela, Irving relocated to South Florida in 2001. He co-founded Dragonfly Investments in 2013, and since inception the company has acquired over 200 residential/multifamily properties, over 5 million square feet of retail, and 250,000+ square feet of industrial.',
				'Irving holds bachelor\'s degrees in accounting and finance from the University of Central Florida and a Master of Science in Accounting from the H. Wayne Huizenga School of Business and Entrepreneurship.',
			),
		),
		array(
			'name'     => 'Julie Quittner',
			'title'    => 'Executive Vice President',
			'initials' => 'JQ',
			'bio'      => array(
				'Julie Quittner is the Executive Vice President at Dragonfly Investments and a third-generation real estate professional. As a founding member of Dragonfly, Julie has played an integral role in ensuring the company runs smoothly and in maintaining strong relationships with both current and new investors.',
				'Julie is actively involved in the day-to-day operations, working in asset management and overseeing investor communications. She also assists in underwriting and curating deals, ensuring all transactions meet Dragonfly\'s high standards.',
				'Julie graduated Magna Cum Laude from the University of Florida and holds a Florida Real Estate license.',
			),
		),
		array(
			'name'     => 'Amanda De Seta',
			'title'    => 'Head of Development',
			'initials' => 'AD',
			'bio'      => array(
				'Amanda De Seta is the Head of Development at Dragonfly Investments. With over 15 years of experience in residential, hospitality, and commercial real estate development, Amanda has established herself as an expert in both historic renovations and new construction.',
				'As Head of Development, Amanda leads Dragonfly\'s entitlement, development, and construction efforts, bringing expertise in project management, acquisition, and financial projection to every project.',
				'Prior to Dragonfly, Amanda founded LointerHome, a residential real estate development company operating across Los Angeles, Southeastern Pennsylvania, and Miami. She is a recipient of the American Institute of Architects\' top prize for excellence in Renovation and Addition.',
			),
		),
	);
}

/** app/contact/page.tsx `tabs` */
function dfi_contact_tabs() {
	return array(
		array( 'key' => 'investors', 'label' => 'Investors', 'note' => 'Connect with our investor relations team. We respond within one business day.', 'submitLabel' => 'Send Message' ),
		array( 'key' => 'sellers-brokers', 'label' => 'Sellers & Brokers', 'note' => 'We respond to every qualified submission within 2 business days.', 'submitLabel' => 'Submit Deal' ),
		array( 'key' => 'leasing', 'label' => 'Leasing', 'note' => 'Our leasing team will be in touch within 2 business days.', 'submitLabel' => 'Submit Leasing Inquiry' ),
		array( 'key' => 'general', 'label' => 'General', 'note' => '', 'submitLabel' => 'Send Message' ),
	);
}

/** app/contact/page.tsx `propertyTypes`, `useTypes`, `moveInOptions` */
function dfi_contact_property_types() {
	return array( 'Retail', 'Multifamily', 'Industrial', 'Hospitality', 'Mixed-Use', 'NNN / Single-Tenant', 'Real Estate Debt', 'Other' );
}
function dfi_contact_use_types() {
	return array( 'Retail', 'Office', 'Industrial / Warehouse', 'Mixed-Use', 'Restaurant', 'Other' );
}
function dfi_contact_move_in_options() {
	return array( 'Immediate', '30–60 days', '60–90 days', '90+ days', 'Flexible' );
}

/** app/contact/page.tsx `propertyOptions` (34 entries, kept as its own list like the source) */
function dfi_contact_property_options() {
	return array(
		'Anna NEC — Rosamond Town Center — Anna, TX',
		'CVS Portfolio Mezzanine — FL · IN · OH',
		'Dragonfly Commerce Park — Port St. Lucie, FL',
		'7500 Biscayne — Miami, FL',
		'Mundy Street / Historic Restoration — Miami, FL',
		'The Emancipator — Miami, FL',
		'Dragonfly Shops at Old Cutler — Cutler Bay, FL',
		'The Plaza at Chapel Hill — Cuyahoga Falls, OH',
		'Regency Plaza — Jacksonville, FL',
		'Newmarket South — Hampton, VA',
		'Myrtle Grove Shopping Center — Wilmington, NC',
		'Otter Creek Shopping Center — Elgin, IL',
		'Cressona Mall — Pottsville, PA',
		'Boardman Plaza — Boardman, OH',
		'Armuchee Village — Rome, GA',
		'Bridgeport Plaza — Bridgeport, OH',
		'East Side Plaza — Gadsden, AL',
		'Fountain Park Shopping Center — Columbus, GA',
		'Huntingdon Plaza — Huntingdon, PA',
		'Pulaski Plaza — Pulaski, VA',
		'Hupps Mill Plaza — South Boston, VA',
		'Lanier Plaza — Brunswick, GA',
		'Martinsburg Shopping Center — Martinsburg, WV',
		'Selina Miami Gold Dust — Miami, FL',
		'Casa Florida — Miami, FL',
		'Icebox Development — Hallandale Beach, FL',
		'River Exchange — Lawrenceville, GA',
		'Habersham Crossing — Cornelia, GA',
		'Park Plaza — Hopkinsville, KY',
		'Tiffany Square — Rocky Mount, NC',
		'West Towne Square — Rome, GA',
		'Beach Crossing — Myrtle Beach, SC',
		'Lancer Shopping Center — Lancaster, SC',
		'Statesboro Square — Statesboro, GA',
	);
}

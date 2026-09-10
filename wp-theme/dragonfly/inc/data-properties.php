<?php
/**
 * Portfolio data, copied verbatim from app/portfolio/page.tsx (36 properties).
 * Keys: name, location, sf, assetType, assetCategory, status, description, image (bare filename in assets/img, or '').
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dfi_asset_filters() {
	return array( 'All', 'Retail', 'Multifamily', 'Industrial', 'Hospitality', 'Mixed-Use', 'Adaptive Reuse' );
}

function dfi_status_filters() {
	return array( 'Any Status', 'Active', 'Under Construction', 'Realized' );
}

/** Full Tailwind class strings (kept whole so the CSS build can see them). */
function dfi_category_placeholder_class( $category ) {
	$map = array(
		'All'            => 'bg-[#f0f2f7]',
		'Retail'         => 'bg-[#f0f2f7]',
		'Industrial'     => 'bg-slate-100',
		'Multifamily'    => 'bg-indigo-50',
		'Hospitality'    => 'bg-teal-50',
		'Mixed-Use'      => 'bg-purple-50',
		'Adaptive Reuse' => 'bg-amber-50',
	);
	return isset( $map[ $category ] ) ? $map[ $category ] : 'bg-[#f0f2f7]';
}

function dfi_status_badge_class( $status ) {
	$map = array(
		'Active'             => 'bg-green-50 text-green-700 border border-green-200',
		'Under Construction' => 'bg-amber-50 text-amber-700 border border-amber-200',
		'Realized'           => 'bg-gray-100 text-gray-500 border border-gray-200',
	);
	return isset( $map[ $status ] ) ? $map[ $status ] : '';
}

/** Filter button class strings (also mirrored in assets/js/portfolio-filter.js). */
function dfi_filter_button_class( $group, $active ) {
	$base = 'px-4 py-1.5 rounded text-sm font-semibold border transition-colors';
	if ( 'asset' === $group ) {
		return $base . ' ' . ( $active ? 'bg-[#1A3770] text-white border-[#1A3770]' : 'bg-white text-[#1A3770]/70 border-[#dddddd] hover:border-[#1A3770]/40' );
	}
	return $base . ' ' . ( $active ? 'bg-[#C8961A] text-white border-[#C8961A]' : 'bg-white text-[#333333]/60 border-[#dddddd] hover:border-[#C8961A]/50' );
}

function dfi_properties() {
	return array(
		array( 'name' => 'Anna NEC — Rosamond Town Center', 'location' => 'Anna, TX', 'sf' => '355,826 SF', 'assetType' => 'Preferred Equity', 'assetCategory' => 'Retail', 'status' => 'Under Construction', 'description' => 'Preferred equity position in a 355,000 SF multi-tenant retail development in the Dallas–Fort Worth growth corridor. 70% pre-leased.', 'image' => '' ),
		array( 'name' => 'CVS Portfolio Mezzanine', 'location' => 'FL, IN, OH', 'sf' => '', 'assetType' => 'Mezzanine', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => 'Mezzanine debt acquisition across a five-property single-tenant CVS portfolio spanning Florida, Indiana, and Ohio.', 'image' => '' ),
		array( 'name' => 'Dragonfly Commerce Park', 'location' => 'Port St. Lucie, FL', 'sf' => '407,099 SF', 'assetType' => 'Class A Industrial', 'assetCategory' => 'Industrial', 'status' => 'Under Construction', 'description' => '407,000 SF Class A industrial park in the Tradition Center for Commerce. Four-building tilt-up development on 25 acres, Free Trade Zone 218, first tenant Florida Forklift.', 'image' => 'dragonfly-commerce-park.jpg' ),
		array( 'name' => '7500 Biscayne', 'location' => 'Miami, FL', 'sf' => '', 'assetType' => 'Mixed-Use Development', 'assetCategory' => 'Mixed-Use', 'status' => 'Under Construction', 'description' => 'Upper East Side Miami mixed-use development on Biscayne Boulevard. Targeting 2027 opening.', 'image' => '7500-biscayne.jpg' ),
		array( 'name' => 'Irving Flagler', 'location' => 'Miami, FL', 'sf' => '', 'assetType' => 'Multifamily', 'assetCategory' => 'Multifamily', 'status' => 'Under Construction', 'description' => '197-unit residential development with ground-floor retail on Flagler Street.', 'image' => 'irving-flagler-project.jpg' ),
		array( 'name' => 'The Gem of Hallandale', 'location' => 'Hallandale Beach, FL', 'sf' => '', 'assetType' => 'Mixed-Use Multifamily', 'assetCategory' => 'Mixed-Use', 'status' => 'Under Construction', 'description' => 'Twelve-story residential and retail development at 411 N. Dixie Highway, with a significant workforce-housing component.', 'image' => 'gem-of-hallandale.jpg' ),
		array( 'name' => 'Mundy Street', 'location' => 'Miami, FL', 'sf' => '', 'assetType' => 'Adaptive Reuse', 'assetCategory' => 'Adaptive Reuse', 'status' => 'Under Construction', 'description' => 'Historic property restoration in Miami. Adaptive reuse of heritage structures.', 'image' => 'mundy-street.jpg' ),
		array( 'name' => 'The Emancipator', 'location' => 'Miami, FL', 'sf' => '', 'assetType' => 'Adaptive Reuse', 'assetCategory' => 'Adaptive Reuse', 'status' => 'Active', 'description' => 'Reimagined industrial warehouse operating as a collector-car exhibition and private event venue in Miami.', 'image' => 'the-emancipator.jpg' ),
		array( 'name' => 'Dragonfly Shops at Old Cutler', 'location' => 'Cutler Bay, FL', 'sf' => '12,400 SF', 'assetType' => 'Neighborhood Retail', 'assetCategory' => 'Retail', 'status' => 'Under Construction', 'description' => '12,400 SF restaurant and retail center on 1.75 acres. Delivery Q1 2026.', 'image' => 'dragonfly-shops-old-cutler.jpg' ),
		array( 'name' => 'The Plaza at Chapel Hill', 'location' => 'Cuyahoga Falls, OH', 'sf' => '458,935 SF', 'assetType' => 'Power Center', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => '459,000 SF multi-tenant power center anchored by Giant Eagle, Burlington, Dick\'s, Floor & Decor, and Lowe\'s Outlet.', 'image' => 'ChapelHill_Picture2.jpg' ),
		array( 'name' => 'Regency Plaza', 'location' => 'Jacksonville, FL', 'sf' => '205,696 SF', 'assetType' => 'Discount-Anchored', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => '206,000 SF shopping center anchored by Burlington, OfficeMax, and dd\'s Discounts.', 'image' => 'Regency_Picture2.jpg' ),
		array( 'name' => 'Newmarket South', 'location' => 'Hampton, VA', 'sf' => '354,804 SF', 'assetType' => 'Grocery-Anchored', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => '355,000 SF three-building retail community anchored by Food Lion and Haynes Furniture.', 'image' => 'NewMarket_Picture1.jpg' ),
		array( 'name' => 'Myrtle Grove Shopping Center', 'location' => 'Wilmington, NC', 'sf' => '74,370 SF', 'assetType' => 'Community Retail', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '74,370 SF community shopping center in Wilmington\'s Monkey Junction retail corridor — strong national and regional tenancy with upside through in-line leasing and pad development.', 'image' => 'village-at-myrtle-grove.jpg' ),
		array( 'name' => 'Otter Creek Shopping Center', 'location' => 'Elgin, IL', 'sf' => '240,884 SF', 'assetType' => 'Power Center', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => 'Sub-regional power center anchored by Burlington, Hobby Lobby, and Big Lots; adjacent to Target.', 'image' => 'OtterCreek_Picture2.jpg' ),
		array( 'name' => 'Cressona Mall', 'location' => 'Pottsville, PA', 'sf' => '283,553 SF', 'assetType' => 'Regional Retail', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => '283,000 SF regional center anchored by Giant Food, Staples, Planet Fitness, and Ollie\'s.', 'image' => 'Cressona_Picture2.jpg' ),
		array( 'name' => 'Boardman Plaza', 'location' => 'Boardman, OH', 'sf' => '429,650 SF', 'assetType' => 'Large-Format Retail', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => 'Large-format retail center at Boardman-Canfield Road with Michael\'s, Save A Lot, and Dollar Tree.', 'image' => 'Boardman_Picture2.jpg' ),
		array( 'name' => 'Armuchee Village', 'location' => 'Rome, GA', 'sf' => '122,504 SF', 'assetType' => 'Grocery-Anchored', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => 'Grocery-anchored center with 30-year Food Lion and CVS tenancies.', 'image' => 'Armuchee_Picture2.jpg' ),
		array( 'name' => 'Bridgeport Plaza', 'location' => 'Bridgeport, OH', 'sf' => '170,267 SF', 'assetType' => 'Grocery-Anchored', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => '170,000 SF Riesbeck\'s-anchored center with Dollar General and Big Lots.', 'image' => 'Bridgeport_Picture2.jpg' ),
		array( 'name' => 'East Side Plaza', 'location' => 'Gadsden, AL', 'sf' => '85,323 SF', 'assetType' => 'Discount-Anchored', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => 'Dollar General and Tractor Supply anchored shopping center.', 'image' => 'east-side-plaza.jpg' ),
		array( 'name' => 'Fountain Park Shopping Center', 'location' => 'Columbus, GA', 'sf' => '107,105 SF', 'assetType' => 'Multi-Tenant Retail', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => '107,000 SF multi-tenant retail center on Macon Road.', 'image' => 'FountainPark_Picture2.jpg' ),
		array( 'name' => 'Huntingdon Plaza', 'location' => 'Huntingdon, PA', 'sf' => '142,845 SF', 'assetType' => 'Grocery-Anchored', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => 'Aldi-anchored multi-tenant retail center.', 'image' => 'Huntingdon_Picture2.jpg' ),
		array( 'name' => 'Pulaski Plaza', 'location' => 'Pulaski, VA', 'sf' => '112,340 SF', 'assetType' => 'Grocery-Anchored', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => '112,000 SF Food Lion-anchored shopping center in the Blue Ridge region.', 'image' => 'Pulaski_Picture2.jpg' ),
		array( 'name' => 'Hupps Mill Plaza', 'location' => 'South Boston, VA', 'sf' => '173,244 SF', 'assetType' => 'Discount-Anchored', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => 'Belk-anchored center with Dollar Tree, Advance Auto, and Family Dollar.', 'image' => 'Hupps_Picture2.jpg' ),
		array( 'name' => 'Lanier Plaza', 'location' => 'Brunswick, GA', 'sf' => '203,876 SF', 'assetType' => 'Grocery-Anchored', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '203,876 SF grocery-anchored community shopping center near I-95 — the gateway to St. Simons and Sea Island. Anchored by Winn-Dixie, Maxway, Dollar Tree, Rent-A-Center, Habitat for Humanity, and Tradex USA.', 'image' => 'lanier-plaza.jpg' ),
		array( 'name' => 'Martinsburg Shopping Center', 'location' => 'Martinsburg, WV', 'sf' => '58,358 SF', 'assetType' => 'Multi-Tenant Retail', 'assetCategory' => 'Retail', 'status' => 'Active', 'description' => 'Big Lots and Goodwill anchored neighborhood retail center.', 'image' => 'Martinsburg_Picture2.jpg' ),
		array( 'name' => 'Selina Miami Gold Dust', 'location' => 'Miami, FL', 'sf' => '', 'assetType' => 'Boutique Hotel', 'assetCategory' => 'Hospitality', 'status' => 'Active', 'description' => '58-unit adaptive reuse of a 1957 Biscayne Boulevard motel. Reopened 2020.', 'image' => 'selina-miami-gold-dust.webp' ),
		array( 'name' => 'Casa Florida', 'location' => 'Miami, FL', 'sf' => '', 'assetType' => 'Hospitality & Entertainment', 'assetCategory' => 'Hospitality', 'status' => 'Active', 'description' => 'Miami hospitality and entertainment venue.', 'image' => 'casa-florida.jpg' ),
		array( 'name' => 'Icebox Development', 'location' => 'Hallandale Beach, FL', 'sf' => '12,000 SF', 'assetType' => 'Commercial Kitchen', 'assetCategory' => 'Mixed-Use', 'status' => 'Active', 'description' => '12,000 SF commercial kitchen and restaurant development.', 'image' => 'icebox-development.jpg' ),
		array( 'name' => 'River Exchange', 'location' => 'Lawrenceville, GA', 'sf' => '273,023 SF', 'assetType' => 'Grocery-Anchored', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => 'Kroger-anchored 273,000 SF center. Acquired 2021 at $19.3M, realized 2026 at $23.4M.', 'image' => 'RiverExchange_Picture2.jpg' ),
		array( 'name' => 'Habersham Crossing', 'location' => 'Cornelia, GA', 'sf' => '161,130 SF', 'assetType' => 'Community Retail', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '161,130 SF community shopping center anchored by Tractor Supply and Goodwill, with meaningful leasing upside and future outparcel potential.', 'image' => 'habersham-crossing-cornelia.jpg' ),
		array( 'name' => 'Park Plaza', 'location' => 'Hopkinsville, KY', 'sf' => '116,611 SF', 'assetType' => 'Community Retail', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '116,611 SF retail center on Fort Campbell Boulevard — one of Hopkinsville\'s primary retail corridors — anchored by Big Lots and Planet Fitness.', 'image' => 'park-plaza-hopkinsville.jpg' ),
		array( 'name' => 'Tiffany Square', 'location' => 'Rocky Mount, NC', 'sf' => '81,870 SF', 'assetType' => 'Discount-Anchored', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '81,870 SF shopping center across from the area\'s major mall, anchored by Ollie\'s Bargain Outlet, with additional land for expansion or ground-lease opportunities.', 'image' => 'tiffany-square-rocky-mount.jpg' ),
		array( 'name' => 'West Towne Square', 'location' => 'Rome, GA', 'sf' => '89,596 SF', 'assetType' => 'Neighborhood Retail', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '89,596 SF neighborhood shopping center anchored by Big Lots, with Citi Trends added as a junior anchor and significant small-shop leasing upside.', 'image' => '' ),
		array( 'name' => 'Beach Crossing', 'location' => 'Myrtle Beach, SC', 'sf' => '45,790 SF', 'assetType' => 'Community Retail', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '45,790 SF community retail center at the gateway to Myrtle Beach, anchored by Advance Auto and benefiting from strong tourist and local traffic.', 'image' => '' ),
		array( 'name' => 'Lancer Shopping Center', 'location' => 'Lancaster, SC', 'sf' => '180,194 SF', 'assetType' => 'Community Retail', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '180,194 SF community shopping center in Lancaster\'s primary retail corridor — grocery, discount, furniture, apparel, and service tenants including Bi-Lo, Big Lots, Badcock, Citi Trends, PetSense, and Hibbett Sports.', 'image' => 'lancer-shopping-center.jpg' ),
		array( 'name' => 'Statesboro Square', 'location' => 'Statesboro, GA', 'sf' => '41,000 SF', 'assetType' => 'Neighborhood Retail', 'assetCategory' => 'Retail', 'status' => 'Realized', 'description' => '41,000 SF fully leased shopping center anchored by Big Lots, benefiting from the growth of nearby Georgia Southern University.', 'image' => '' ),
	);
}

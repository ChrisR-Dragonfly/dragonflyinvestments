/* Portfolio filters (app/portfolio/page.tsx): category AND status, ?filter= deep link, result count, empty state. */
(function () {
	var grid = document.querySelector('[data-dfi-grid]');
	if (!grid) return;
	var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-dfi-property]'));
	var count = document.querySelector('[data-dfi-count]');
	var empty = document.querySelector('[data-dfi-empty]');
	var assetButtons = Array.prototype.slice.call(document.querySelectorAll('[data-dfi-filter="asset"]'));
	var statusButtons = Array.prototype.slice.call(document.querySelectorAll('[data-dfi-filter="status"]'));

	/* Full class strings, mirrored from dfi_filter_button_class() in inc/data-properties.php. */
	var CLASSES = {
		asset:  { on: 'bg-[#1A3770] text-white border-[#1A3770]', off: 'bg-white text-[#1A3770]/70 border-[#dddddd] hover:border-[#1A3770]/40' },
		status: { on: 'bg-[#C8961A] text-white border-[#C8961A]', off: 'bg-white text-[#333333]/60 border-[#dddddd] hover:border-[#C8961A]/50' }
	};

	var asset = 'All';
	var status = 'Any Status';
	var allowed = assetButtons.map(function (b) { return b.getAttribute('data-value'); });
	var param = new URLSearchParams(window.location.search).get('filter');
	if (param && allowed.indexOf(param) !== -1) asset = param;

	function paint(buttons, current, cls) {
		buttons.forEach(function (b) {
			var on = b.getAttribute('data-value') === current;
			(on ? cls.off : cls.on).split(' ').forEach(function (c) { b.classList.remove(c); });
			(on ? cls.on : cls.off).split(' ').forEach(function (c) { b.classList.add(c); });
			b.setAttribute('aria-pressed', on ? 'true' : 'false');
		});
	}

	function apply() {
		var shown = 0;
		cards.forEach(function (card) {
			var match = (asset === 'All' || card.getAttribute('data-category') === asset) &&
				(status === 'Any Status' || card.getAttribute('data-status') === status);
			card.hidden = !match;
			if (match) shown++;
		});
		count.textContent = shown + ' ' + (shown === 1 ? 'property' : 'properties');
		empty.hidden = shown !== 0;
		grid.hidden = shown === 0;
		paint(assetButtons, asset, CLASSES.asset);
		paint(statusButtons, status, CLASSES.status);
	}

	assetButtons.forEach(function (b) { b.addEventListener('click', function () { asset = b.getAttribute('data-value'); apply(); }); });
	statusButtons.forEach(function (b) { b.addEventListener('click', function () { status = b.getAttribute('data-value'); apply(); }); });
	apply();
})();

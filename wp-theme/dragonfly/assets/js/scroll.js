/* Smooth-scroll buttons (app/contact/page.tsx "Request the Overview"). */
(function () {
	document.querySelectorAll('[data-dfi-scroll-to]').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var target = document.getElementById(btn.getAttribute('data-dfi-scroll-to'));
			if (target) target.scrollIntoView({ behavior: 'smooth' });
		});
	});
})();

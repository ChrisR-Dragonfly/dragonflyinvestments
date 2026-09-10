/* Mobile menu toggle (components/Navbar.tsx) and the investor-portal password eye toggle. */
(function () {
	var toggle = document.querySelector('[data-dfi-nav-toggle]');
	var menu = document.getElementById('dfi-mobile-menu');
	if (toggle && menu) {
		var iconMenu = toggle.querySelector('[data-dfi-nav-icon="menu"]');
		var iconX = toggle.querySelector('[data-dfi-nav-icon="x"]');
		var setOpen = function (open) {
			menu.hidden = !open;
			iconMenu.hidden = open;
			iconX.hidden = !open;
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		};
		toggle.addEventListener('click', function () { setOpen(menu.hidden); });
		menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
	}

	var eye = document.querySelector('[data-dfi-eye-toggle]');
	if (eye) {
		var input = document.getElementById(eye.getAttribute('aria-controls'));
		var show = eye.querySelector('[data-dfi-eye="show"]');
		var hide = eye.querySelector('[data-dfi-eye="hide"]');
		eye.addEventListener('click', function () {
			var visible = input.type === 'text';
			input.type = visible ? 'password' : 'text';
			show.hidden = !visible;
			hide.hidden = visible;
		});
	}
})();

/* Investor portal stub (app/investor-portal/page.tsx): submit shows "Coming Soon", back returns to the form. */
(function () {
	var form = document.querySelector('[data-dfi-portal-form]');
	var done = document.querySelector('[data-dfi-portal-done]');
	if (!form || !done) return;
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		form.hidden = true;
		done.hidden = false;
	});
	done.querySelector('[data-dfi-portal-back]').addEventListener('click', function () {
		done.hidden = true;
		form.hidden = false;
	});
})();

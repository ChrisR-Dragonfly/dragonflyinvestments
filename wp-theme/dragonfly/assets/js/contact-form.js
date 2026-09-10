/* Contact form (app/contact/page.tsx): tabs, per-tab fields, submit to the theme's REST endpoint. Needs window.DFI. */
(function () {
	var form = document.querySelector('[data-dfi-contact-form]');
	if (!form || !window.DFI) return;

	var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-dfi-tab]'));
	var groups = Array.prototype.slice.call(form.querySelectorAll('[data-dfi-group]'));
	var note = document.querySelector('[data-dfi-note]');
	var tabInput = form.querySelector('[data-dfi-tab-input]');
	var message = form.querySelector('[data-dfi-message]');
	var messageLabel = form.querySelector('[data-dfi-message-label]');
	var messageStar = form.querySelector('[data-dfi-message-star]');
	var fileInput = form.querySelector('input[type="file"]');
	var fileName = form.querySelector('[data-dfi-file-name]');
	var errorBox = form.querySelector('[data-dfi-form-error]');
	var submit = form.querySelector('[data-dfi-submit]');
	var wrap = document.querySelector('[data-dfi-form-wrap]');
	var success = document.querySelector('[data-dfi-form-success]');

	var TAB_ON = ['border-[#C8961A]', 'text-[#1A3770]'];
	var TAB_OFF = ['border-transparent', 'text-[#333333]/50', 'hover:text-[#1A3770]'];
	var MESSAGE_REQUIRED = { 'sellers-brokers': true, general: true };

	var active = 'investors';
	var submitLabel = submit.textContent;

	function setTab(key) {
		active = key;
		form.reset();
		if (fileName) fileName.textContent = '';
		errorBox.hidden = true;
		tabInput.value = key;

		tabs.forEach(function (t) {
			var on = t.getAttribute('data-dfi-tab') === key;
			TAB_ON.forEach(function (c) { t.classList.toggle(c, on); });
			TAB_OFF.forEach(function (c) { t.classList.toggle(c, !on); });
			t.setAttribute('aria-selected', on ? 'true' : 'false');
			if (on) {
				var n = t.getAttribute('data-dfi-note');
				note.textContent = n;
				note.hidden = !n;
				submitLabel = t.getAttribute('data-dfi-submit-label');
				submit.textContent = submitLabel;
			}
		});

		groups.forEach(function (g) {
			var on = (' ' + g.getAttribute('data-dfi-tabs') + ' ').indexOf(' ' + key + ' ') !== -1;
			g.hidden = !on;
			/* Disabled controls are skipped by validation and left out of FormData. */
			g.querySelectorAll('input, select, textarea').forEach(function (el) { el.disabled = !on; });
		});

		messageLabel.textContent = key === 'sellers-brokers' ? 'Brief Description' : 'Message';
		messageStar.hidden = !MESSAGE_REQUIRED[key];
		message.required = !!MESSAGE_REQUIRED[key];
		message.placeholder = message.getAttribute('data-ph-' + key) || '';
	}

	tabs.forEach(function (t) { t.addEventListener('click', function () { setTab(t.getAttribute('data-dfi-tab')); }); });

	if (fileInput && fileName) {
		fileInput.addEventListener('change', function () {
			fileName.textContent = fileInput.files && fileInput.files[0] ? ' · Selected: ' + fileInput.files[0].name : '';
		});
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		errorBox.hidden = true;
		submit.disabled = true;
		submit.textContent = 'Sending...';

		fetch(window.DFI.restUrl, {
			method: 'POST',
			headers: { 'X-WP-Nonce': window.DFI.nonce },
			body: new FormData(form)
		}).then(function (res) {
			if (!res.ok) throw new Error('Request failed');
			return res.json();
		}).then(function (data) {
			if (!data || !data.ok) throw new Error('Request failed');
			wrap.hidden = true;
			success.hidden = false;
			success.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}).catch(function () {
			errorBox.hidden = false;
		}).then(function () {
			submit.disabled = false;
			submit.textContent = submitLabel;
		});
	});

	document.querySelector('[data-dfi-form-reset]').addEventListener('click', function () {
		success.hidden = true;
		wrap.hidden = false;
		setTab(active);
	});

	setTab(active);
})();

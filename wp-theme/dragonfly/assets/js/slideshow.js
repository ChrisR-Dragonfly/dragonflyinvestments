/* Hero slideshow (components/HeroSlideshow.tsx): auto-advance every 5 s, arrows, instant swap. */
(function () {
	var root = document.querySelector('[data-dfi-slideshow]');
	if (!root) return;
	var slides = root.querySelectorAll('[data-dfi-slide]');
	if (slides.length < 2) return;
	var current = 0;
	var show = function (i) {
		slides[current].hidden = true;
		current = (i + slides.length) % slides.length;
		slides[current].hidden = false;
	};
	root.querySelector('[data-dfi-slide-prev]').addEventListener('click', function () { show(current - 1); });
	root.querySelector('[data-dfi-slide-next]').addEventListener('click', function () { show(current + 1); });
	setInterval(function () { show(current + 1); }, 5000);
})();

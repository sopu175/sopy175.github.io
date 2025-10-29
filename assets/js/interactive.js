/** @format */

// Interactive scrolling behavior: highlight timeline items and toggle active sections

document.addEventListener('DOMContentLoaded', function () {
	const sections = Array.from(document.querySelectorAll('[data-section]'));
	const navLinks = Array.from(document.querySelectorAll('.timeline-nav a'));

	if (!sections.length || !navLinks.length) return;

	// Map id -> nav link
	const linkById = {};
	navLinks.forEach((link) => {
		const target = link.getAttribute('href')?.replace('#', '');
		if (target) linkById[target] = link;
	});

	const observerOptions = {
		root: null,
		rootMargin: '0px 0px -30% 0px', // trigger when section is 30% into view
		threshold: 0,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const id = entry.target.id;
			if (entry.isIntersecting) {
				// activate section
				entry.target.classList.add('active');
				// update nav
				Object.values(linkById).forEach((l) => l.classList.remove('active'));
				if (linkById[id]) linkById[id].classList.add('active');
			} else {
				entry.target.classList.remove('active');
			}
		});
	}, observerOptions);

	sections.forEach((s) => observer.observe(s));

	// Smooth scroll for nav links
	navLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const href = this.getAttribute('href');
			const target = document.querySelector(href);
			if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});
});

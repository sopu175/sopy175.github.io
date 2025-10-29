/** @format */

// Minimal GSAP + ScrollTrigger proof-of-concept
// Pins the #experience section and moves the stage character horizontally while scrubbing.

document.addEventListener('DOMContentLoaded', function () {
	// Guard: require gsap and ScrollTrigger
	if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

	gsap.registerPlugin(ScrollTrigger);

	// Simple timeline: when #experience is scrolled into view, pin it and move the character
	try {
		const experience = document.querySelector('#experience');
		const character = document.querySelector('#stage-character');
		if (!experience || !character) return;

		// Ensure character starts near center-left
		gsap.set(character, { xPercent: -10, y: 0, willChange: 'transform' });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: experience,
				start: 'top top',
				end: '+=1000', // length of the pin (pixels)
				scrub: 0.6,
				pin: true,
				anticipatePin: 1,
			},
		});

		// Move character from left to right while the section is pinned
		tl.to(character, { xPercent: 40, duration: 1, ease: 'none' }, 0);

		// Slight scale/float for character for a playful effect
		tl.to(character, { scale: 1.02, y: -6, duration: 1, ease: 'sine.inOut' }, 0);
	} catch (err) {
		// silent fail; do not break other scripts
		// console.warn('GSAP scroll-anim error', err);
	}
});

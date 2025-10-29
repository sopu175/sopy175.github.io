/** @format */

// Minimal site JS for interactions
document.addEventListener('DOMContentLoaded', function () {
	// Skip link: focus main content when activated
	var skip = document.querySelector('.skip-link');
	if (skip) {
		skip.addEventListener('click', function (e) {
			var main = document.getElementById('main-content');
			if (main) {
				main.setAttribute('tabindex', '-1');
				main.focus();
				// remove tabindex after focus to keep DOM clean
				setTimeout(function () {
					main.removeAttribute('tabindex');
				}, 1000);
			}
		});
	}

	// Add any other small interactions here (placeholders for future work)
});

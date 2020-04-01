/* Microslides.js
 * https://github.com/chapmanethan/microslides.js
 *
 * @license MIT, see LICENSE
 *
 * Copyright (C) 2020 https://ethanchap.com
 */
var msGetClosest = function (e, selector ) {
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function() {
				var matches = (this.document || this.ownerDocument).querySelectorAll(),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}
	// Get closest match
	for ( ; e && e !== document; e = e.parentNode ) {
		if ( e.matches( selector ) ) return e;
	}
	return null;
};
function msInit(){
	var x = document.querySelectorAll(".ms-slides > .ms-slide")
		, i
		;
	// Label and transform slides
	for (i = 0; i < x.length; i++) {
		x[i].dataset.slide = i;
		x[i].style["z-index"] = i;
		if (i == 0) {
			x[i].classList.add("ms-focus");
		}
	}
	x = document.querySelectorAll(".ms-slides button[data-control]");
	for (i = 0; i < x.length; i++) {
		x[i].addEventListener("click", msChangeSlide);
	}
}
function msChangeSlide(e){
	if (e.target.dataset.control == "previous") {
		change = -1;
	} else {
		change = 1;
	}
	var current_slide = msGetClosest(e.target, ".ms-slide");
	var current = parseInt(current_slide.dataset.slide);
	var next = current + change;
	var next_slide = document.querySelector(`*[data-slide='${next}']`);
	document.querySelector(".ms-slides").dataset.viewing = next_slide.dataset.slide;

	next_slide.style.visibility = "visible";
	if (change == 1) {
		next_slide.classList.add("ms-focus");
	} else{
		current_slide.classList.remove("ms-focus");
	}
	setTimeout(function(){
		if (document.querySelector(".ms-slides").dataset.viewing != current_slide.dataset.slide) {
			current_slide.style.visibility = "hidden";
		}
	}, 600);
}

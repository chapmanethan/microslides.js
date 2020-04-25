/* Microslides.js
 * https://github.com/chapmanethan/microslides.js
 *
 * @license MIT, see LICENSE
 *
 * Copyright (C) 2020 https://ethanchap.com
 */
var msCurrentSlide = 0
	, msIsUpdating = false
	, msHoldPage = false
	;
function msGetClosest(e, selector ) {
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
}
function msIsMobile(){
	x = [/Android/i, /BlackBerry/i, /iPhone|iPad|iPod/i, /Opera Mini/i, /IEMobile/i]
	for(i=0;i<x.length;i++){if(navigator.userAgent.match(x[i])){return true}}
	return false
}
function msInit(){
	var x = document.querySelectorAll(".ms-slides > .ms-slide")
		, i
		;
	if (msIsMobile() == false){
		window.addEventListener("wheel", msWatchScroll, {passive: true});
		window.addEventListener('keydown', msCheckKey)
		document.querySelector(".ms-slides").classList.add("ms-viewport");
		// Label and transform slides
		for (i = 0; i < x.length; i++) {
			x[i].dataset.slide = i;
			x[i].style["z-index"] = i;
			x[i].classList.add("ms-pane");
			if(i==0){x[i].classList.add("ms-focus")}else{x[i].classList.add("ms-below")}
		}
	}
	y = document.querySelectorAll(".ms-slides *[data-control]");
	for (i = 0; i < y.length; i++) {
		if (msIsMobile()){
			// Remove all Slide Navigation buttons
			y[i].style["display"] = "none";
		} else {
			y[i].addEventListener("click", msChangeSlide);
		}
	}
}
function msChangeSlide(e){
	if(e.target.dataset.control=="previous"){d= -1}else{d=1}
	msUpdateSlide(d);
}
function msUpdateSlide(d){
	if(msIsUpdating){return}
	if(d!=1&&d!= -1){return}
	msIsUpdating = true;

	var current = document.querySelector(`*[data-slide='${msCurrentSlide}']`);
	var nextSlide = msCurrentSlide + d;
	var next = document.querySelector(`*[data-slide='${nextSlide}']`);

	if (next == null){
		msIsUpdating = false
		return
	}
	document.querySelector(".ms-slides").dataset.viewing = next.dataset.slide;

	msCurrentSlide = nextSlide;
	next.style.visibility = "visible";

	next.classList.add("ms-focus");
	next.classList.remove("ms-below");
	next.classList.remove("ms-above");

	current.classList.remove("ms-focus");
	if (d==1) {
		current.classList.add("ms-above");
	} else {
		current.classList.add("ms-below");
	}

	setTimeout(function(){
		if (document.querySelector(".ms-slides").dataset.viewing != current.dataset.slide) {
			current.style.visibility = "hidden";
		}
		msIsUpdating = false;
	}, 500);
}
function msWatchScroll(e){
	if (msHoldPage == false) {
		d = Math.sign(e.deltaY)
		msUpdateSlide(d)
	}
}
function msCheckKey(e) {
	if(e.keyCode=='38'){msUpdateSlide(-1)}
  else if(e.keyCode=='40'){msUpdateSlide(1)}
}

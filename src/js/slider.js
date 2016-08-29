export default (function (window, document, $){
	'use strict';

	let $slider;
	let $slides;
	let $nav;
	let $navHrefs;

	let sliderId;

	function getDOM(){
		$slider = $('#slider-list');
		$slides = $slider.find('.slider__item');
		$nav = $('#nav');
		$navHrefs = $('.js-nav-href');
	}

	function events(){
		$navHrefs.on('click', function(e){
			e.preventDefault();

			const targetSlideId = $(this).attr('href').replace('#slide-', '');

			sliderId && sliderId.goToSlide(targetSlideId);
		});
	}

	function navColor(currentSlideIndex){
		const navColor = $slides.eq(currentSlideIndex).data('nav-color');
		console.log(currentSlideIndex, navColor);
		
		if (navColor){
			$nav.css('color', navColor);
		}else{
			$nav.css('color', '');
		}
	}

	function slider(){
		if (!$slider){
			return;
		}

		sliderId = $slider.bxSlider({
			pager: false,
			controls: true,
			adaptiveHeight: true,
			//infiniteLoop: false,
			onSliderLoad: (currentIndex) => {
				navColor(currentIndex);
			},
			onSlideBefore: ($slideElement, oldIndex, newIndex) => {
				navColor(newIndex);
			},
		});
	}

	function init(){
		getDOM();
		slider();
		events();
	}

	return {
		init
	}
})(window, document, jQuery, undefined);

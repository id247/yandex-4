export default (function (window, document, $){
	'use strict';

	let $slider;
	let $slides;
	let $nav;
	let $navHrefs;

	let sliderId;

	let isNativeScrollEnabled = true;
	let isScrolling = false;

	const isMobile = (function() { 
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
			return true;
		} else {
			return false;
		}
	})();

	function getDOM(){
		$slider = $('#slider-list');
		$slides = $slider.find('.slider__item');
		$nav = $('#nav');
		$navHrefs = $('.js-nav-href');
	}

	function styles(){
		if ($(document).width() > 900 ){
			$slides.css('height', '100vh');
		}
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
				isScrolling = true;
			},
			onSlideAfter: ($slideElement, oldIndex, newIndex) => {
				navColor(newIndex);
				setTimeout( () => {
					isScrolling = false;
				}, 300);
			},
		});

		if (sliderId){
			isNativeScrollEnabled = false;
		}
	}

	function scroll(){
		
		var scrollDirection;

		function scrollMeTo(e, scrollDirection){

			e.preventDefault();

			sliderId && sliderId.goToSlide(targetSlideId);
		}

		function smoothScroll(e){

			if (!sliderId){
				return;
			}

			if (isScrolling){
				e.preventDefault();
				return;
			}		

			if (e.keyCode){

				switch(e.keyCode){
					case 37:
					case 38:
						scrollDirection = 'up';
						break;
					case 39:
					case 40:
						scrollDirection = 'down';
						break;
				}

			}

			if (e.deltaY){

				if(e.deltaY > 0) {
					scrollDirection = 'up';
				}else{
					scrollDirection = 'down';
				}

			}

			switch (scrollDirection){
				case 'up': 
					sliderId.goToPrevSlide();
					break;
				case 'down': 
					sliderId.goToNextSlide();
					break;
			}

		}

		function enableScroll(e){
			if (!isNativeScrollEnabled){
				smoothScroll(e);
			}	
		}

		$(window).on('mousewheel', function(e){
			enableScroll(e);
		});		

		$(document).keydown(function(e){	
			const codes = [32, 37, 38, 39, 40];		

			if (codes.indexOf(e.keyCode) > -1){
				enableScroll(e);			
			}
		});		
	}


	function init(){
		if ($(document).width() <= 900 ){
			return false;
		}
		getDOM();
		styles();
		slider();
		events();
		scroll();
	}

	return {
		init
	}
})(window, document, jQuery, undefined);

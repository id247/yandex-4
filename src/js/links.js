'use strict';

export default (function (window, document, $){

	function downloadLinks(){
		let os = 'Windows'; //win by default
		const clientStrings = [
			{s:'Windows', r:/Windows/},
			{s:'Android', r:/Android/},
			{s:'iPhone', r:/(iPhone|iPod)/},
			{s:'iPad', r:/iPad/},
			{s:'Mac', r:/Mac OS X/},
			{s:'Mac', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
		];
		for (var id in clientStrings) {
			var cs = clientStrings[id];
			if (cs.r.test(navigator.userAgent)) {
				os = cs.s;
				break;
			}
		}
		$('.js-download-link').attr('href', YAdownloadLinks[os]);
	}

	function init(){
		downloadLinks();
	}

	return {
		init
	}

})(window, document, jQuery, undefined);

'use strict';

module.exports = LazyImgDirective;

LazyImgDirective.$inject = ['$scope', '$rootScope', 'lazyImgMagic'];

function LazyImgDirective ($rootScope, lazyImgMagic){
	
	var t = {};
	
	t.restrict = 'A';

	t.link = link;
	
	var lazyModule = lazyImgMagic();
	
	return t;
	
	function link(scope, element, attributes) {
		var lazyImage = new lazyModule(element),
			deregister = attributes.$observe('lazyImg', function (newSource) {
				if (newSource) {
					deregister();
					lazyImage.setSource(newSource);
				}
			});
		scope.$on('$destroy', function () {
			lazyImage.removeImage();
		});
		$rootScope.$on('lazyImg.runCheck', function () {
			lazyImage.checkImages();
		});
		$rootScope.$on('lazyImg:refresh', function () {
			lazyImage.checkImages();
		});
	}
	
}	

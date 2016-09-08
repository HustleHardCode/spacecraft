'use strict';

module.exports = LazyImgDirective;

LazyImgDirective.$inject = ['$scope', '$rootScope', 'lazyImgMagic'];

function LazyImgDirective ($scope, $rootScope, lazyImgMagic){
	
	$scope.restrict = 'A';

	$scope.link = link;
	
	function link(scope, element, attributes) {
		var lazyImage = new lazyImgMagic(element),
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

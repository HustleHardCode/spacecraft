'use strict';

module.exports = LazyImgContainer;

LazyImgContainer.$inject = ['$scope', 'lazyImgMagic'];

function LazyImgContainer ($scope, lazyImgMagic) {

	$scope.restrict = 'A';

	$scope.link = link;

	function link(scope, element) {
		lazyImgMagic.addContainer(element);
		scope.$on('$destroy', function () {
			lazyImgMagic.removeContainer(element);
		});
	}
}


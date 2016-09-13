'use strict';

module.exports = LazyImgContainer;

LazyImgContainer.$inject = ['$scope', 'lazyImgMagic'];

function LazyImgContainer (lazyImgMagic) {
	
	var t = {};
	
	t.restrict = 'A';

	t.link = link;
	
	var lazyModule = lazyImgMagic();
	
	return t;

	function link(scope, element) {
		lazyModule.addContainer(element);
		scope.$on('$destroy', function () {
			lazyModule.removeContainer(element);
		});
	}
}


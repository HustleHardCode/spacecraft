'use strict';

module.exports = LazyImgMagic;

LazyImgMagic.$inject = ['$scope', '$window', '$rootScope', 'lazyImgConfig', 'lazyImgHelpers'];

function LazyImgMagic ($window, $rootScope, lazyImgConfig, lazyImgHelpers){
	
	var t = {};
	
	var config = lazyImgConfig();
	var helpers = lazyImgHelpers();
	
	t.checkImages = checkImages;
	t.listen = listen;
	t.startListening = startListening;
	t.stopListening = stopListening;
	t.removeImage = removeImage;
	t.loadImage = loadImage;
	t.setPhotoSrc = setPhotoSrc;
	t.Photo = Photo;

	var images = [];
	var isListening = false;
	var options = config.getOptions();
	var $win = angular.element($window);
	var winDimensions = helpers.getWinDimensions();

	var saveWinOffsetT = helpers.throttle(function () {

		winDimensions = helpers.getWinDimensions();

	}, 60);

	var containers = [options.container || $win];
	var checkImagesT;
	
	return t;
	
	function checkImages() {
		for (var i = images.length - 1; i >= 0; i--) {
			var image = images[i];
			if (image && helpers.isElementInView(image.$elem[0], options.offset, winDimensions)) {
				loadImage(image);
				images.splice(i, 1);
			}
		}
		if (images.length === 0) {
			stopListening();
		}
	}

	checkImagesT = helpers.throttle(checkImages, 30);

	function listen(param) {
		containers.forEach(function (container) {
			container[param]('scroll', checkImagesT);
			container[param]('touchmove', checkImagesT);
		});
		$win[param]('resize', checkImagesT);
		$win[param]('resize', saveWinOffsetT);
	}

	function startListening() {
		isListening = true;
		setTimeout(function () {
			checkImages();
			listen('on');
		}, 1);
	}

	function stopListening() {
		isListening = false;
		listen('off');
	}

	function removeImage(image) {
		var index = images.indexOf(image);
		if (index !== -1) {
			images.splice(index, 1);
		}
	}

	function loadImage(photo) {
		var img = new Image();
		img.onerror = function () {
			if (options.errorClass) {
				photo.$elem.addClass(options.errorClass);
			}
			$rootScope.$emit('lazyImg:error', photo);
			options.onError(photo);
		};
		img.onload = function () {
			setPhotoSrc(photo.$elem, photo.src);
			if (options.successClass) {
				photo.$elem.addClass(options.successClass);
			}
			$rootScope.$emit('lazyImg:success', photo);
			options.onSuccess(photo);
		};
		img.src = photo.src;
	}

	function setPhotoSrc($elem, src) {
		if ($elem[0].nodeName.toLowerCase() === 'img') {
			$elem[0].src = src;
		} else {
			$elem.css('background-image', 'url("' + src + '")');
		}
	}

	// PHOTO
	function Photo($elem) {
		this.$elem = $elem;
	}

	t.Photo.prototype.setSource = function (source) {
		this.src = source;
		images.unshift(this);
		if (!isListening) {
			startListening();
		}
	};

	t.Photo.prototype.removeImage = function () {
		removeImage(this);
		if (images.length === 0) {
			stopListening();
		}
	};

	t.Photo.prototype.checkImages = function () {
		checkImages();
	};

	t.Photo.addContainer = function (container) {
		stopListening();
		containers.push(container);
		startListening();
	};

	t.Photo.removeContainer = function (container) {
		stopListening();
		containers.splice(containers.indexOf(container), 1);
		startListening();
	};
}

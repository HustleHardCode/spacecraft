'use strict';

VideoBoard.$inject = ['$sce'];

module.exports = VideoBoard;

/**
 * Директива вывода видео контента уроков.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function VideoBoard($sce) {

	var directive = {
		scope:       {
			content: '=',// текст
			boardTitle:   '=',// заголовок
			url:     '=' // url видео
		},
		templateUrl: 'views/directives/lesson/video.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.getContent = getContent;

		// ==================================================
		// ======================PUBLIC======================
		// ==================================================

		/**
		 * Возвращает контент урока.
		 */
		function getContent() {

			// Проверка html на предмет xss
			if ($scope.content) {

				return $sce.trustAsHtml($scope.content);

			}

		}

	}

}

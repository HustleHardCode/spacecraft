/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$storage', 'autocompleter',
	function ($scope, $storage, autocompleter)
{
	//===================================
	//============== CODE ===============
	//===================================

	var code = $storage.local.getItem('code') || 'this.run = function(spaceCraft, world)\n{\n\n}\n';

	$scope.ep =
	{
		isCodeRunning: false,
		code: code,
		error: null
	};

	$scope.toggleCodeRun = function ()
	{
		$scope.ep.isCodeRunning = !$scope.ep.isCodeRunning;
	};

	//===================================
	//============== HIDE ===============
	//===================================
	$scope.hideLesson = true;
	$scope.hideEditor = false;

	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
	};

	$scope.toggleLessonOpen = function ()
	{
		$scope.hideLesson = !$scope.hideLesson;
	};

	// TODO
	// Вынести в сервис инициализации ace
	// Используется в GameController

	//===================================
	//============== EDITOR =============
	//===================================

	var editorSession;

	$scope.aceChanged = function ()
	{
		$scope.ep.code = editorSession.getDocument().getValue();
		$storage.local.setItem('code', $scope.ep.code);
	};

	$scope.aceLoaded = function (editor)
	{
		editorSession = editor.getSession();
		editor.$blockScrolling = Infinity;
		editorSession.setValue($scope.ep.code);

		var langTools = ace.require('ace/ext/language_tools');
		var spaceCraftCompleter = autocompleter(editor);

		editor.completers = [spaceCraftCompleter];
		editor.setOptions(
		{
			enableSnippets: false,
			enableBasicAutocompletion: true
		});

		langTools.addCompleter(spaceCraftCompleter);

		$storage.local.setItem('code', $scope.ep.code);
	};

	var Range = ace.require('ace/range').Range;
	var markerID = null;

	$scope.$watch('ep.error', function ()
	{
		if ($scope.ep.error != false && $scope.ep.error != null)
		{
			var foundedStringNumb = $scope.ep.error.stack.split(':')[3] - 1;

			if (markerID != null)
			{
				// Удаляем старый маркер, что бы не получилось их много
				editorSession.removeMarker(markerID);
			}

			// по какимто причинам не получается выделить одну строку, нужно как миимум две.
			markerID = editorSession.addMarker(new Range(foundedStringNumb, 0, foundedStringNumb + 1, 0), "bar", "fullLine");

			editorSession.setAnnotations([{
				row: foundedStringNumb,
				column: 0,
				text: $scope.ep.error.toString(),
				type: "error"
			}]);
		}
		else
		{
			// очищаем едитор от анотаций и маркеров, по идее анотации сами могут удалться,
			// но но мало ли, что лучше удалять их явно
			editorSession.clearAnnotations();
			editorSession.removeMarker(markerID);
		}
	});
}]);

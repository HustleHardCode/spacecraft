/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$stateParams', '$state', '$http', '$storage', 'lessonProvider', 'interpreter',
	function ($scope, $stateParams, $state, $http, $storage, lessonProvider, interpreter)
{
	/**
	 * Local storage
	 */
	var st =
	{
		set: function(name, value)
		{
			$storage.local.setItem(name, JSON.stringify(value));
		},
		getCurrent: function(name)
		{
			var l = JSON.parse($storage.local.getItem('lessons'));

			if (l)
			{
				return parseInt(l[name].current)
			}

			return 0;
		},
		getLessons: function ()
		{
			return JSON.parse($storage.local.getItem('lessons')) || [];;
		}
	};

	function current()
	{
		return $scope.lesson.sub[$scope.subIndex];
	}

	function error(message)
	{
		$scope.textBot = message;

		// Удаляем кнопку 'Далее' тк получили ошибку.
		$scope.nextSubLesson = null;
	}

	function success(message)
	{

		$scope.textBot = message;

		// Добавляем ссылку на функцию и кнопку 'Далее'
		$scope.nextSubLesson = nextSubLesson;
	}

	function nextSubLesson()
	{
		function set(a, i, len, completed)
		{
			// Устанавливаем текущий
			a[$stateParams.id] = {
				current: i,
				size: len,
				completed: completed
			};

			st.set('lessons', a);
		}

		// Слова BBot'а
		$scope.textBot = current().defaultBBot;

		// Размер массива подуроков с 0
		var len = $scope.lesson.sub.length - 1;

		// Индекс текущего подурока
		var i = $scope.subIndex;

		// Текущий объект статистики уроков
		var l = st.getLessons();

		if (i !== len)
		{
			options.code = initCode(++$scope.subIndex);

			// Устанавливаем текущий урок в хранилище
			set(l, $scope.subIndex, len);
		}
		else
		{
			// Устанавливаем текущий урок в хранилище
			set(l, 0, len, true);

			$state.go('lessons');
		}
	}

	//===================================
	//============== CODE ===============
	//===================================

	var options = $scope.editorOptions =
	{
		isCodeRunning: false,
		code: '',
		error: null
	};

	function initCode(i)
	{
		$http({
			method: 'GET',
			url: 'javascripts/code/lesson' + $stateParams.id + '/' + i + '.js'
		})
		.success(function (date)
		{
			editorSession.setValue(date);
			options.code = date;

			// Слова BBot'а
			$scope.textBot = current().defaultBBot;
			$scope.nextSubLesson = nextSubLesson;
		});
	}

	initCode(st.getCurrent($stateParams.id) || 0);

	//===================================
	//============== SCOPE ==============
	//===================================

	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);

	// Индекс под урока
	$scope.subIndex = st.getCurrent($stateParams.id);

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.run = function ()
	{
		options.isCodeRunning = true;

		options.result = interpreter.execute(options.code);

		var result = current().result(options.result, options.code);

		if (result.status)
		{
			success(result.message);
		}
		else
		{
			error(result.message);
		}

		options.isCodeRunning = false;
	};

	//===================================
	//============== EDITOR =============
	//===================================

	var editorSession;

	$scope.aceChanged = function ()
	{
		options.code = editorSession.getDocument().getValue();
	};

	$scope.aceLoaded = function (editor)
	{
		editorSession = editor.getSession();
		editor.$blockScrolling = Infinity;
		editor.setOption("scrollPastEnd", true);

		// Скролл до конца. Т.е. скролл есть всегда.
		editorSession.setValue(options.code);
	};
}]);

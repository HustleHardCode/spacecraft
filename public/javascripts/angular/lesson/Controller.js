/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$stateParams', '$state', '$http',
	'$storage', 'lessonProvider', 'interpreter', 'audioManager', 'connection', 'aceService', 'markerService',
	function ($scope, $stateParams, $state, $http, $storage, lessonProvider, interpreter, audioManager, connection, aceService, markerService)
{
	var audio;
	var audioIndex = 0;
	var markerId;

	$scope.starsHide = false;
	$scope.idLesson = $stateParams.id;

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

			if (l && l[name])
			{
				return parseInt(l[name].current) - 1;
			}

			return 0;
		},
		getLessons: function ()
		{
			return JSON.parse($storage.local.getItem('lessons')) || [];
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
		options.nextSubLesson = true;
		options.isCodeRunning = false;

		function set(a, i, len, completed)
		{
			// Устанавливаем текущий
			a[$stateParams.id] = {
				current: i + 1,
				size: len + 1,
				completed: completed
			};

			st.set('lessons', a);
		}

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

			connection.httpSaveStatisticLesson({
				lessonId: $stateParams.id,
				size: len,
				current: $scope.subIndex
			});

			next();
		}
		else
		{
			// Устанавливаем текущий урок в хранилище
			set(l, 0, len, true);

			connection.httpSaveStatisticLesson({
				lessonId: $stateParams.id,
				size: len,
				current: 0,
				completed: true
			});

			$scope.starsHide = true;
		}

		audioIndex = 0;
		$scope.textContent = false;
	}

	function tryShowHint (char, callback)
	{
		var hint = char.hint;

		if (hint)
		{
			var enjoyHint = new EnjoyHint(
				{
					onEnd: function ()
					{
						enjoyHint = null;
						if (char.waitForHint)
						{
							audio.onended = callback;
						}
					}
				});

			enjoyHint.set(hint);
			enjoyHint.run();

			if (!char.waitForHint)
			{
				audio.onended = function ()
				{
					enjoyHint && enjoyHint.trigger("skip");
					callback && callback();
				}
			}
		}
		else
		{
			audio.onended = callback;
		}
	}

	function previous()
	{
		$scope.audioPause = false;
		audioIndex = Math.max(audioIndex- 2, 0);
		next();
	}

	function next()
	{
		var ch = $scope.char = current().character[audioIndex];

		if (ch)
		{
			audio = audioManager.create(ch.audio);
			audio.play();
			$scope.audioPause = false;

			tryShowHint(ch, function ()
			{
				$scope.audioPause = true;
				audioIndex++;
				next();
				$scope.$apply();
			});
		}
	}

	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);

	function initialize(id)
	{
		// Получаем урок из локального хранилища
		var ls = st.getCurrent(id);
		$scope.subIndex = 0;

		if(!ls)
		{
			// Идем в базу за статой по урокам
			$http.get('/statistic/lessons').then(function(result)
			{
				if(result.data[id])
				{
					// Индекс под урока
					$scope.subIndex = parseInt(result.data[id].current);
				}

				initCode($scope.subIndex);
			});
		}
		else
		{
			$scope.subIndex = ls;
			initCode(ls);
		}
	}

	initialize($stateParams.id);

	//===================================
	//============== CODE ===============
	//===================================

	var options = $scope.options =
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
			$scope.textBot = current().defaultBBot && current().defaultBBot();
			$scope.isGameLesson = $scope.lesson.isGameLesson;
			$scope.nextSubLesson = nextSubLesson;
			next();
		});
	}


	//===================================
	//============== SCOPE ==============
	//===================================

	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);
	$scope.hideEditor = false;
	$scope.audioPause = false;
	$scope.textContent = false;
	$scope.hint = false;

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.run = function ()
	{
		if (!$scope.isGameLesson)
		{
			options.isCodeRunning = true;

			if (current().result)
			{
				options.result = interpreter.execute(options.code);

				var result = current().result(options.result);

				$scope.botCss = result.css;

				if (result.status)
				{
					success(result.message);
				}
				else
				{
					error(result.message);
				}
			}

			options.isCodeRunning = false;
		}
		else
		{
			options.isCodeRunning = !options.isCodeRunning;

			options.update = function (s, w, t)
			{
				var result = current().handleUpdate(s, w, t);

				if (result && result.status)
				{
					success(result.message);
				}
			}
		}
	};

	$scope.toggleTextContent = function ()
	{
		$scope.textContent = !$scope.textContent;
	};

	$scope.toggleAudioPause = function ()
	{
		if ($scope.audioPause)
		{
			audio.play();
		}
		else
		{
			audio.pause();
		}

		$scope.audioPause = !$scope.audioPause;
	};

	$scope.previousAudio = function ()
	{
		if (audio.currentTime / 5 < 1)
		{
			audio.pause();
			audio.currentTime = 0;
			previous();
		}
		else
		{
			audio.currentTime = 0;
		}
	};


	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
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

		aceService.initializeAceSettings(editor, options.code);
	};
	function errorWrapper (value)
	{
		return '<p>### Неисправность!! EГГ0Г!!</p> ' +
			'<p>### Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">### 0шибка: ' + value + '</p>' +
			'<p>### Пожалуйста исправте ситуацию.</p>';
	}

	$scope.$watch('options.error', function (value)
	{
		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);
		$scope.textBot = value;

		if (value)
		{
			var foundedStringNumb = $scope.options.error.stack.split(':')[3] - 1;

			$scope.textBot = errorWrapper(value);

			markerId = markerService.setMarkerAndAnnotation(editorSession, foundedStringNumb, $scope.options.error);
		}
	});

	//===================================
	//============== AUDIO ==============
	//===================================

	var soundtrack = audioManager.createWithPlayList();

	$scope.$watch ('$viewContentLoaded', function()
	{
		soundtrack.play();
	});
}]);

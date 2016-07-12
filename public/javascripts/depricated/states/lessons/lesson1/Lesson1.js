/**
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
lessons[1] = function ()
{
	var that = {};

	that.preload =
	{
		'transport': 'images/sprites/spaceCraft/transport.png',
		'starField': 'images/sprites/starField.png',
		'meteor1': 'images/sprites/meteor/meteor1.png',
		'meteor2': 'images/sprites/meteor/meteor2.png',
		'turret': 'images/sprites/base/turret.png',
		'meteor3': 'images/sprites/meteor/meteor3.png',
		'meteor4': 'images/sprites/meteor/meteor4.png',
		'meteor5': 'images/sprites/meteor/meteor5.png',
		'meteor6': 'images/sprites/meteor/meteor6.png',
		'meteor7': 'images/sprites/meteor/meteor7.png',
		'greenBeam': 'images/sprites/beam/greenBeam.png',
		'userShield': 'images/sprites/shield2.png',
		'base': 'images/sprites/base/base.png',
		'fire': 'images/sprites/fire1.png'
	};

	that.lessonContent = {
		text: 'Первое занятие',
			label: 'Основы JavaScript',
		quote: 'Преодоление трудного начинается с легкого',
		startCode: '',
		isGameLesson: true,
		sub:
		[
			{
				title: 'Программа академии',
				defaultBBot: function () {
					return '<p>Приветствую, 62 69 74 65 20 6d 79 20 73 68 69 6e 79 20 6d 65 74 61 6c 20 61 73 73...</p>' +
						'<p>Упс! Дройд BBot - рестарт...</p>'
				},
				content: function ()
				{
					return '<p>Приятно вас видеть, кадет!</p>' +
						'<p>Сегодня вам будет предоставлен первый урок программы подготовки пилота-инженера.</p>' +
						'<p>Программы, направленной на выпуск настоящих профессионалов, которые будут готовы выполнять поставленные задачи в любой части вселенной.</p>'
				},
				// Похоже вас допустили к курсу учебных полетов. Ваш первый корабль - мелкая посудина.
				// Хах, а вы что думали? Вам доверят огромной технологичный крейсер?
				// Научитесь сначала управлять этим транспортником, а там уже и поговорим.
				// Только смотрите, не поцарапайте!
				instructions: '<ul>' +
				'<li>Нажмите "Далее" для продолжения.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						]
					}
				]
			},
			{
				title: 'JavaScript',
				content: function ()
				{
					return '<p>Все космические корабли нашего флота управляются с помощью древней земной технологии - <strong>JavaScript</strong>.</p>' +
						'<p><strong>JavaScript</strong> - язык программирования, который был создан в 1995, за 31 год до колонизации Марса компанией EnoSam.</p>' +
						'<p>Основная задача академии заключается в освоении кадетами данного инструмента.</p>'
				},
				// Справа показан пример управления транспортным кораблем с помощью JavaScript.
				// Функция run в бесконечном цикле последовательно раз за разом выполняет написанный код управления
				// в данном случае команду поворота налево.
				// Запустите код и увидите результат.
				instructions: '<ul>' +
				'<li>Функция <span class="under-label">run</span> в бесконечном цикле последовательно раз за разом выполняет написанный код управления. Являтеся одной из самых важных функций SpaceCraft.</li>' +
				'<li>Больше информации о JavaScript: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Introduction">клац</a>.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						],
						marker: {
							x1: 6,
							y2: Infinity,
							type: 'line'
						}
					}
				],
				handleUpdate: function ()
				{
					var botText = BBotText(
						{
							correct: '<p>Кадет это функция run, функция run это кадет!</p>' +
							'<p>Приятно познакомиться! </p>'
						});

					return botText.resultCorrect();
				}
			},
			{
				title: 'Команды',
				content: function ()
				{
					return '<p>Команды - это инструкции раздеяемые точкой с запятой, с помощью которых вы можете управлять кораблем и не только.</p>' +
						'<p>Команды сканируются слева направо, сверху вниз.</p>' +
						'<p>Вы уже знаете команду поворота влево: <pre>transport.rotateLeft();</pre></p>' +
						'<p>Давайте попробуем добавить новую, ранее не изученную.</p>'
				},
				instructions: '<ul>' +
				'<li><span class="red-label">transport.moveForward()</span> - команда, направляющая корабль вперед.</li>' +
				'<li>Добавте команду <span class="red-label">transport.moveForward()</span> на <strong>11</strong> строку.</li>' +
				'<li>Не забудьте про точку с запятой.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						],
						marker: {
							x1: 6,
							y2: Infinity,
							type: 'line'
						}
					}
				],
				handleUpdate: function (spaceCraft)
				{
					var botText = BBotText(
						{
							correct: '<p>Осуществляю подачу топлива!</p>' +
							'<p>3апускаю двигатели!</p>' +
							'<p>ПОЕХАЛИ!</p>'
						});


					if (spaceCraft.isMoveForwardCalled())
					{
						return botText.resultCorrect();
					}
				}
			},
			{
				title: 'What does BBot say?',
				isNotGameLesson: true,
				content: function ()
				{
					return '<p>Надеюсь вы не забыли о своем роботе-компаньоне?</p>' +
						'<p>Если вы хотите узнать какие-то данные от BBot\'а, можно вызвать команду:</p>' +
						'<pre>BBotDebug(\'то, что хотим сказать\');</pre>' +
						'<p>BBotDebug поможет нам с выводом нужных параметров и проверкой работоспособности системы.</p>';
				},
				// Давайте рассмотрим пример как это работает
				// На второй строке команда BBotDebug будет выводить 'Это BBot!'
				// Запустите и увидите результат.
				// Что ж теперь попробуем вывести 'Всем привет!' на пятой строке
				instructions: '<ul>' +
				'<li>Команда <span class="under-label">BBotDebug</span> на строке <strong>2</strong> выведет <span class="under-label">\'Это BBot!\'</span>.</li>' +
				'<li>Выведите текст <span class="under-label">\'Всем привет!\'</span> с помощью изученной команды.</li>'+
				'</ul>',
				hint: '<ul>' +
				'<li>Добавьте команду <span class="under-label-gray">BBotDebug(\'Всем привет!\');</span> на <strong>5</strong> строку.</li>'+
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						],
						marker: {
							x1: 6,
							y2: Infinity,
							type: 'line'
						}
					}
				],
				result: function (v)
				{
					var t = '';
					var r = false;

					v.forEach(function (e)
					{
						t += e + '</br>';
						r = (e === 'Всем привет!');
					});

					var botText = BBotText(
						{
							correct: '<p>Хах, я п0лучил нужные данные! Транслирую:</p>' +
							'<p class="bbot-output">' + t + '</p>',
							text: t
						});

					if (r)
					{
						return botText.resultCorrect();
					}

					return botText.text();
				}
			},
			{
				title: 'Комментарии',
				isNotGameLesson: true,
				content: function ()
				{
					return '<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, идем дальше.</p>' +
						'<p>Вы наверно уже заметили, что текст, который начинается с <span class="under-label">//</span>, является комментарием и преднзаначен для человека.</p>' +
						'<p>Комментарии делают код более понятным для вас и вашей команды. Поэтому, если вдруг корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>' +
						'<p><strong>JavaScript</strong> поддерживает два типа комментариев: однострочные и многострочныe.</p>';
				},
				// BBot - проказник, не позорься!
				// Нужно понизить его уровень юмора, а то этот Джордж Карлин переходит все границы.
				// Закомментируйте кусок кода в строке 8, пока никто не видет.
				instructions: '<ul>' +
				'<li>Закомментируйте кусок кода в строке <strong>8</strong>.</li>' +
				'<li>Для самостоятельного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Комментарии">клац</a>.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						],
						marker: {
							x1: 6,
							y2: Infinity,
							type: 'line'
						}
					}
				],
				result: function (value)
				{
					var botText = BBotText(
						{
							correct: '<p>Что-т0 преднозначенное для человека! Комментарии?</p>',

							unknownError: '<p>Эй, BBot не хочет уничтожать человекорасу! Наверно...</p>' +
							'<p>Похоже вы забыли поставитb //.</p>'
						});

					// При комментировании результат будет возвращен ввиде 'undefined'
					return botText.result(!value);
				}
			},
			{
				title: 'Комментарии',
				content: function ()
				{
					return '<p></p>';
				},
				// BBot - проказник, не позорься!
				// Нужно понизить его уровень юмора, а то этот Джордж Карлин переходит все границы.
				// Закомментируйте кусок кода в строке 8, пока никто не видет.
				instructions: '<ul>' +
				'<li>Закомментируйте кусок кода в строке <strong>8</strong>.</li>' +
				'<li>Для самостоятельного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Комментарии">клац</a>.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						],
						marker: {
							x1: 6,
							y2: Infinity,
							type: 'line'
						}
					}
				],
				handleUpdate: function (value)
				{
					var botText = BBotText(
						{
							correct: '<p>Что-т0 преднозначенное для человека! Комментарии?</p>',

							unknownError: '<p>Эй, BBot не хочет уничтожать человекорасу! Наверно...</p>' +
							'<p>Похоже вы забыли поставитb //.</p>'
						});

					// При комментировании результат будет возвращен ввиде 'undefined'
					return botText.result(!value);
				}
			}
		]
	};

	that.lessonPlayState = function (spec)
	{
		var t = RunScriptPlayState(spec);

		var game = t.game;
		var scope = t.scope;
		var sc = t.sc;

		var bBotText = '';
		var endLn = '</br>';
		var turret;

		//===================================
		//============== CYCLE ==============
		//===================================

		var superCreate = t.create;

		t.create = function ()
		{
			superCreate(function (userCode)
			{
				var Class = new Function('BBotDebug', userCode);

				return new Class(function BBotDebug (text)
				{
					bBotText += text + endLn;
				});
			});
		};

		t.update = function ()
		{
			var s = ApiLesson1(scope.spaceCraft);
			var w = WorldApi(sc.world, scope.spaceCraft.getId());

			t.tryRunScript(s, w);

			scope.$apply(function ()
			{
				var upd = scope.editorOptions.update;

				upd && upd({
					spaceCraft: scope.spaceCraft,
					world: sc.world,
					text: bBotText
				});
			});

			bBotText = '';
		};

		t.entitiesInit = function ()
		{
			var factory = sc.world.factory;

			turret = factory.createTurret({
				x: game.world.centerX,
				y: game.world.centerY - 500,
				strategy: function (args)
				{
					var that = args.spaceCraft;

					that.engine.rotateLeft(0.5);
					that.weapon.fire(scope.spaceCraft);
				}
			});

			scope.$apply(function createSpaceCraft()
			{
				scope.spaceCraft = factory.createTransport({
					x: game.world.centerX,
					y: game.world.centerY,
					spriteShield: 'userShield',
					spriteName: 'transport'
				});
			});

			var R = Phaser.Point.distance(scope.spaceCraft.sprite, new Phaser.Point(0, 0));
			var bounds = sc.world.getBounds();

			factory.createMeteorField({
				shift: 10,
				count: bounds.height,
				radius: R,
				start: bounds.y
			});

			scope.spaceCraft.sprite.bringToTop();
		};

		return t;
	};

	return that;
};

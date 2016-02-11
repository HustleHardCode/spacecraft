'use strict';

/**
 * Created by Ivan on 02.01.2016.
 */
var app = angular.module('spacecraft.lessonProvider', []);

app.service('lessonProvider', ['$storage', function ($storage)
{
	function isNumeric(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	function checkDebugLen(value, len)
	{
		return value == null || value.length != len;
	}

	function isContainString(string, undString)
	{
		return string.indexOf(undString) == -1;
	}

	/**
	 * Local storage
	 */
	var st =
	{
		set: function(name, value)
		{
			$storage.local.setItem(name, value);
		},
		get: function(name)
		{
			return $storage.local.getItem(name);
		}
	};

	var BBotText = function (text)
	{
		var that = {};

		function result(status, message)
		{
			return {
				status: status,
				message: message
			};
		}

		function getText(value)
		{
			return text[value];
		}

		that.resultCorrect = function()
		{
			return result(true, getText('correct'));
		};

		that.unknownError = function()
		{
			return that.resultNotCorrect('unknownError');
		};

		that.resultNotCorrect = function(messageType)
		{
			return result(false, getText(messageType));
		};

		that.result = function(v)
		{
			if (v)
			{
				return that.resultCorrect();
			}

			return that.unknownError();
		};


		return that;
	};

	var lessons =
	[
	/**
	 * Урок 1
	 */
		{
			text: 'Поступление в академию',
			label: 'Основы JavaScript',
			quote: 'Знания свет — путь укажет нам',
			startCode: '',
			sub:
			[
				{
					title: 'Добро пожаловать в академию!',
					defaultBBot: '<p>### Дройд BBot - инициализация...</p>' +
					'<p>### Настройка юм0ра на 75%</p>' +
					'<p>### Самоуничтожение через 10... 9... 8... 7...</p>',
					content: function ()
					{
						return '<p>Прежде, для управления космическим кораблем требовалась целая команда специалистов, однако это ' +
							'время прошло, теперь достаточно одного пилота-инженера.</p>' +
							'<p>Наша академия выпускает лучших пилотов во всей галактике, когда-нибудь и Вы, сможете стать одним из них.</p>' +
							'<p>Прежде чем начать обучение, необходимо уладить некоторые формальности.</p>'
					},
					instructions:
					'<ul>' +
					'<li>Справа находится редактор кода - это инструмент с помощью которого вы выполняете поставленные задачи.</li>' +
					'<li>Справа внизу находится робот - компаньон BBot. Он покажет ошибки и выведет всю необходимую информацию.</li>' +
					'<li>Нажмите "Далее" для продолжения.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Редактор кода',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .bbot-img': 'Bob Bot - ваш помощник',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .enjoy-hint-next': 'Нажмите для перехода к следующему уроку',
							'nextButton': false,
							'showSkip': false
						}
					]
				},
				{
					title: 'Ваше имя?',
					content: function ()
					{
						return '<p>Так, новенький, введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
						'<p>Высылаю вам инструкции по выполнению.</p>'
					},
					instructions:
					'<ul>' +
					'<li>Введите свое имя в кавычках, к примеру для меня код будет выглядеть так: <span class="red-label">«Джайна»</span>.</li>' +
					'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите свое имя в кавычках',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода, а <i class="glyphicon glyphicon-stop red"></i> для вызова паузы',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Ура! BBot понял челвек0-имя, транслирую:</p>'
							+ '<p>' + value + '</p>',

							unknownError: '<p>### Упс! BBot не разобрал ваше человеческ0е имя!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>',

							noQuotes: '<p>### Упс! BBot не разобрал ваше человеческ0е имя!</p>' +
							'<p>Похоже вы забыли использоватb кавычки.</p>',

							isNumeric: '<p>### Упс! BBot полагает, что человеческ0е имя не может быть 4ислом!</p>' +
							'<p>Если вы робот или имперский шtурмовик, обратитесb в учебный с0вет академии.</p>',

							emptyInput: '<p>### Упс! BBot не получил ваше человеческ0е имя!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						if (value)
						{
							// Если нет " ", будет выброшено исключение
							if (value.exception)
							{
								return botText.resultNotCorrect('noQuotes');
							}

							// Если введено число, то результат отрицательный
							if (isNumeric(value))
							{
								return botText.resultNotCorrect('isNumeric');
							}

							// "Ваше имя" - регулярка направлена
							// на поиск имени в скобках.
							var reg = new RegExp('(.+).*');

							st.set('userName', value);

							return botText.result(reg.test(value));

						}

						return botText.resultNotCorrect('emptyInput');
					}
				},
				{
					title: 'Галактическая единица',
					content: function ()
					{
						return '<p>Отлично кадет ' + st.get('userName') + ', я нашла вас в списках.</p>' +
						'<p>Нам нужно уладить еще пару ненужных бюрократических моментов.</p>' +
						'<p>Введите свой возраст в галактической единице измерения времени - <strong>GY</strong>.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Введите свой возраст и поделите на 250 (является периодом вращения систем вокруг центра нашей галактики в млн. лет).</li>' +
					'<li>Для деления используется оператор <span class="red-label">/</span>. ' +
						'Так же вы можете использовать <span class="red-label">+</span>, ' +
						'<span class="red-label">-</span>, <span class="red-label">*</span> ' +
						'для сложения, вычитания, умножения соответственно.</li>' +
					'<li>Например: <span class="red-label">21 / 250</span></li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите свой возраст и поделите на 250',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Уря! BBot понял челвек0-в0звраст, транслирую:</p>'
							+ '<p>' + value + 'GY</p>',

							unknownError: '<p>### Упс! BBot не разобрал ваш человеческий в0звраст!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>',

							emptyInput: '<p>### BBot ничег0 не получитb, похоже вы забыли воспользоватbся полем ввода или голов0й.</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						if (value)
						{
							if (value.exception)
							{
								return botText.unknownError();
							}

							st.set('userAge', value);

							// Если выведено число, то результат положительный
							return botText.result(isNumeric(value));
						}

						return botText.resultNotCorrect('emptyInput');
					}
				},
				{
					title: 'В4К',
					content: function ()
					{
						return '<p>Отлично! Теперь перейдем к действительно важным вещам.</p>' +
						'<p><strong>В4К</strong> (консоль ввода кода космического корабля) - это новая система интерпретации, которая находится на стадии тестирования и уже используется в академии.</p>' +
						'<p>Вам нужно проверить работоспособность В4К, а мы, в свою очередь, проверим ваши способности в космической инженерии.</p>'+
						'<p>В4К распознает язык программирования <strong>JavaScript</strong>. Если использовать слова, не входящие в этот язык, то система должна сообщить об ошибке. Проверим!</p>';
					},
					instructions:
					'<ul>' +
					'<li>Введите в интерпретатор В4К слово, не входящее в язык программирования JavaScript.</li>' +
					'<li>Например: <span class="red-label">BBotTheBest</span></li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите слово, не входящее в JavaScript.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var message = value && value.message;

						var botText = BBotText(
						{
							correct: '<p>### Ура! 0шибка найдена! 0шибка найдена! Транслирую:</p>' +
							'<p>' + message + '</p>',

							unknownError: '<p>### Что-т0 не так! BBot не видит 0шибок! Где же они?</p>' +
							'<p>### Ст0ит еще раз про4итатb инструкции и попроб0вать снова.</p>'
						});

						if (value)
						{
							// Должно быть выброшено исключение
							return botText.result(value.exception);
						}

						return botText.unknownError();
					}
				},
				{
					title: 'Комментарии',
					content: function ()
					{
						return '<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, идем дальше.</p>' +
						'<p>В В4К есть поддержка комментариев JavaScript. Комментарии начинаются с <strong>//</strong> и предназначены только для человека.</p>' +
						'<p>Комментарии делают ваш код более понятным для вас и вашей команды. Поэтому, если вдруг ваш корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Закомментируйте кусок кода в строке 1.</li>' +
					'<li>Пример комментария: <span class="red-label">// Комментарий</span>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Поставте в начале строки "//"',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .play-toggle .green': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Что-т0 преднозначенн0е для чел0века! Комментарии?</p>',

							unknownError: '<p>### Эй, BBot не х0тетb уничт0жать чел0векорасу! Наверно...</p>' +
							'<p>### Пох0же вы забыли поставитb //.</p>'
						});

						// При комментировании результат будет возвращен ввиде 'undefined'
						return botText.result(!value);
					}
				},
				{
					title: 'Много, много типов',
					content: function ()
					{
						return '<p>Итак, мы разобрались с комментариями. В языке JavaScript существует множество типов данных, с двумя из которых мы уже познакомились: </p>' +
						'<p><strong>string</strong> - строка или последовательность из символов. Например: "Я есть BBot!", "42", "JS".</p>' +
						'<p><strong>number</strong> - числа, с помощью которых ваш корабль будет делать вычисления. Заметим, что числа пишутся без кавычек.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Введите строку в редакторе кода.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Введите в редакторе кода "Я есть BBot!',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Слава Роботам! BBot нашел строку! Транслирую:</p>' +
							'<p>' + value + '</p>',

							unknownError: '<p>### BBot не смог найти строку! Он растроен!</p>' +
							'<p>### А нет, шучу, у BBot\'а нет чувств!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						// Если выброшено исключение
						if (value && value.exception)
						{
							return botText.unknownError();
						}

						// Проверка типа
						return botText.result(typeof value === 'string');
					}
				},
				{
					title: 'Истина, ложь, ложь…',
					content: function ()
					{
						return '<p>В космосе нельзя быть во всем уверенным! Запомните, любое высказывание надо проверять на правдивость! В этом нам поможет новый тип данных - <strong>boolean</strong>.</p>' +
						'<p>Boolean - это логический тип данных, который может принимать значения <strong>true</strong>, либо <strong>false</strong>, как вы уже наверное догадались «истина», «ложь» соответственно.</p>' +
						'<p>Например сравнение двух чисел может вернуть либо <strong>true</strong>, либо <strong>false</strong>:</p>' +
						'<ul>' +
						'<li>5 > 4 - <strong>true</strong></li>' +
						'<li>4 > 5 - <strong>false</strong></li>' +
						'</ul>' +
						'<p>Давайте теперь протестируем работу нашего интерпретатора В4К с логическим типом данных.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Введите логическое выражение, при котором система должна вернуть <span class="red-label">true</span>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Введите 4 > 1',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### В кажд0й шутейки естb д0ля шутейки! Транслирую:</p>' +
							'<p>' + value + '</p>',

							unknownError:  '<p>### Истина не найдена! Где же она?</p>' +
							'<p>### Пох0же вы не разобрались с л0гическим тип0м.</p>'
						});

						// Если выброшено исключение
						if (value && value.exception)
						{
							return botText.unknownError();
						}

						// Значение должно быть равно true
						return botText.result(value);
					}
				},
				{
					title: 'What does BBot say?',
					content: function ()
					{
						return '<p>Надеюсь вы не забыли о своем роботе-компаньоне?</p>' +
						'<p>Если вы хотите узнать какие-то данные от BBot\'а, можно вызвать <strong>BBotDebug("то, что хотим сказать")</strong>, это нам поможет с выводом нужных параметров и проверкой работоспособности системы.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Выведите значение <span class="red-label">5*3</span></li>' +
					'<li>На следующей строке выведите текст <span class="red-label">"SpaceCraft"</span></li>'+
					'<li>Например, если вы захотите вывести на экран "Я есть BBot!", то нужно выполнить команду: <span class="red-label">BBotDebug("Я есть BBot!");</span></li>'+
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Введите в редактор строку: BBotDebug(5*3);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'На следующей строке: BBotDebug("SpaceCraft");',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Да, я такой! Транслирую:</p>' +
							'<p>15</p>' +
							'<p>SpaceCraft</p>',

							unknownError: '<p>### BBot\'у кажется, чт0 вы впариваете галакти4ескую дичb!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						// Если выброшено исключение
						if (value)
						{
							if (value.exception)
							{
								return botText.unknownError();
							}

							// Первое значение 5*3 = 15, второе 'SpaceCraft'
							return botText.result(value[0] === 15 && value[1] === 'SpaceCraft');
						}

						return botText.unknownError();
					}
				},
				{
					title: 'Нужнооо больше операторов!',
					content: function ()
					{
						return '<p>Есть множество операторов сравнения:</p>' +
						'<ul>' +
						'<li><strong>></strong> - больше чем</li>' +
						'<li><strong><</strong> - меньше чем</li>' +
						'<li><strong><=</strong> - меньше либо равно</li>' +
						'<li><strong>>=</strong> - больше либо равно</li>' +
						'<li><strong>===</strong> - равенство</li>' +
						'<li><strong>!==</strong> - не равенство</li>' +
						'</ul>';
					},
					instructions:
					'<ul>' +
					'<li>Поменять в коде операторы и числа так, чтобы BBotDebug выводили во всех случаях true.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'В первой строке измените код на BBotDebug(4 === 4);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'Во второй строке измените код на BBotDebug(3 < 5);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'В третьей строке ничего не нужно менять.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'В четвертой строке измените код на BBotDebug(3 >= 2);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'В пятой строке измените код на BBotDebug(1 === 1);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'В шестой строке ничего не нужно менять.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>Испытание окончен0. Скушай т0ртик. Траслирую:</p>' +
							'<p>true</p>' +
							'<p>true</p>' +
							'<p>true</p>' +
							'<p>true</p>' +
							'<p>true</p>' +
							'<p>true</p>',

							unknownError: '<p>### Все в н0рме? Моей колонии р0ботов нужны умные рабы. Шучу.</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						// Если выброшено исключение
						if (value)
						{
							var result = true;

							if (value.exception)
							{
								return botText.unknownError();
							}

							// Проверка значений на равность true.
							value.forEach(function (v)
							{
								result &= v;
							});

							return botText.result(result);
						}

						return botText.unknownError();
					}
				},
				{
					title: 'Светлая или темная сторона?',
					content: function ()
					{
						return '<p>В космосе бывают ситуации, когда, в зависимсоти от условий, нужно принять определенные решения.</p>' +
							'<p>Для этого был создан оператор if, который использует в качестве условия хорошо известный нам тип данных - boolean:</p>' +
							'<p><strong>if ( УСЛОВИЕ ) { ДЕЙСТВИЯ }</strong></p>' +
							'<p>Если <strong>УСЛОВИЕ</strong> имеет значение true - "истина", то выполняются <strong>ДЕЙСТВИЯ</strong>.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Изменить условие так, чтобы система не была уничтожена.</li>' +
					'<li>Изменить условие так, чтобы BBot вывел сообщение о состоянии параметров.</li>' +
					'<li>Изучите комментарии к коду.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Поменяйте условие 2 === 2 на 2 === 3.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'Поменяйте условие 5 < 3 на 5 > 3.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Где правда пр0ступает скво3b туман, ' +
							'<p>### Там терпит п0ражение 0бман....</p>' +
							'<p>### Ой, чт0 это я. Траслирую:</p>' +
							'<p>Все параметры системы в норме!</p>',

							removeSystem: '<p>### Создаю резервную копию.</p>' +
							'<p>### Уничт0жение сисtемы через 3.. 2.. 1..</p>' +
							'<p>### В0сстанавливаю системY из ре3ервной копии.</p>' +
							'<p>### Не делайtе так б0льше. Ты ра3биваешb мое мета2лическое сердце!</p>',

							unknownError: '<p>### Чт0-то не так! Не могу найtи 3аданный выв0д!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						// Если выброшено исключение
						if (value)
						{
							if (value.exception)
							{
								return botText.unknownError();
							}

							var result;

							// Проверяем использовалось ли сообщение об уничтожении.
							value.forEach(function (v)
							{
								if (v === 'КОМ№4 - Выполнить уничтожение системы.')
								{
									result = botText.resultNotCorrect('removeSystem');
								}
							});

							if (result)
							{
								return result;
							}
							else
							{
								// Проверка значений.
								return botText.result(value[0] === 'Все параметры системы в норме!');
							}
						}

						return botText.unknownError();
					}
				}
			]
		},
	/**
	 * Урок 2
	 */
		{
			text: 'Анти-паттерны программирования',
			label: 'Анти-паттерны программирования',
			quote: 'Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живёте',
			startCode: '',
			sub:
				[
					{
						title: 'Анти-паттерны',
						content: function ()
						{
							return '<p>Здраствуй кадет! Рад снова тебя видеть. Судя по твоему личному делу, ты делаешь большие успехи.</p>' +
								   '<p>По этому, пришло узнать о том, чего стоит избегать в программирование, а именно анти-паттернов.</p>' +
								   '<p>Анти-паттерн - решение типово задачи наиболее неэффективным или непродуктивным способом.' +
								   ' Известно большое множество анти-паттернов и о самых из них мы поговорим чуть позже.' +
								   ' Прежде взгляни на редактор с кодом. В нем представлен код, который содержит множество анти-паттернов.</p>' +
								   '<p>Теперь будь храбр и не оглядывайся назад.</p>'
						},
						instructions: '<ul>' +
						              	'<li>Запусти код</li>' +
						              '</ul>',
						hint: [
							{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
							}
						],
						result: function (value)
						{
							var botText = BBotText(
								{
									correct: 'Бип-бип-биииип. Запуск механизмов экстренного охлаждения. Операция выполнена. Транслирую:<br>' + value
								});

							return botText.resultCorrect();
						}
					},
					{
						title: 'Комментарии.',
						content: function ()
						{
							return '<p>Получилось разобраться в прошлом примере?</p>' +
								   '<p> Ничего страшного если нет. Взгляни еще на один пример кода. ' +
								   'Этот код функционально аналогичен предыдущему, однако он значительно проще и лаконичней.' +
								   ' Однако в нем есть одно опущение - нахватает комментариев. А в реалиях космоса наличие комментариев может стоить жизни.' +
								   ' Например во время нападения космических пиратов, срочно потребовалось изменить код и наличие хороших' +
								   ' комментариев позволит сделать это максимально быстро и эффективно.</p>' +
								   '<p>Хороший комментарий обладает следующими качествами:</p>' +
								   '<ul>' +
								  	 '<li>Лаконичность</li>' +
								     '<li>Информативность</li>' +
								     '<li>Уместность</li>' +
								   '</ul>' +
								   '<p>Это означает, что комментарий должен быть краток, не нанося при этом ущерб содержащейся в нем информации.' +
								   ' А так-же наличие комментария должно быть обоснованно(Нет необходимсти комментировать каждую строчку,' +
								   ' только сложные или не очевидные места в коде).</p>' +
								   '<p>Чем лучше написан код, тем меньше нужно комментариев.</p>';
						},
						instructions: '<ul>' +
						              	'<li>Исправить комментарии</li>' +
									    '<li>Запустить код</li>' +
									  '</ul>',
						hint: [
							{
								'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
								'nextButton': false,
								'showSkip': false
							}
						],
						result: function (value, code)
						{
							var botText = BBotText(
								{
									correct: 'BBot доволен, такой код ему нраbится б0льше.<br>' + value,
									unknownError: 'Ошибка, ошибка обнаруженна ошибка.',
									manyCommentsError: 'Ошибка, ошибка этот чел0век слишком много гов0рит.'
								});

							if (value.exception)
							{
								return botText.unknownError();
							}
							var flag = 0;

							code.split('\n').forEach(function(value)
							{
								if (value[0] == '/' && value.length >= 5)
								{
									flag += 1;
								}
							});

							if (flag  >= 10)
							{
								return botText.resultNotCorrect('manyCommentsError');
							}
							else if (flag >= 3)
							{
								return botText.resultCorrect();
							}


							return botText.unknownError();
						}
					},
					{
						title: 'Наименнование переменных.',
						content: function ()
						{
							return '<p>Сложно представить достаточно большую программу, в которой нет переменных.' +
								' А неверное или не точное наименнование переменных являеться одним из расспрастранненых' +
								' анти-паттернов программирования.</p>' +
								'<p>И для того, что бы это избегать при именнование переменных следует соблюдать следующие правила:' +
								'<ul>' +
									'<li>Имя должно отражать суть содержимого</li>' +
								    '<li>Имя не должно быть слишком длинным</li>' +
								    '<li>Имя должно быть понятным, то есть не следует использовать сокращения</li>' +
								'</ul>' +
								'</p>';
						},
						instructions: '<ul>' +
										'<li>Исправте наименнование переменных.</li>' +
									  '</ul>',
						hint: [
							{
								'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
								'nextButton': false,
								'showSkip': false
							}
						],
						result: function (value, code)
						{
							var botText = BBotText(
								{
									correct: 'Хорошая работа, желание BBota убивать чел0веков снизилось на 5%.',
									unknownError: 'Чел0век не знает нужных слов? Чел0веку следует подарить словарь?'
								});

							var flag = true;
							var rule = new RegExp(' |\n', 'g');

							var checkSize = 'var p = 3.14159265;'.replace(rule, '').length;

							code.replace(rule, '').split(';').forEach(function(string)
							{
								var len = string.length;
								flag &= (len >= checkSize || len == 0);
							});

							return botText.result(flag);
						}
					},
					{
						title: 'Велосипед.',
						content: function ()
						{
							return '<p>Велосипед - разработка собственного решения задачи, для которой уже существует' +
								' готовое решение. К примеру когда требуеться возвести число в степень программист пишет' +
								' кучу строк, в место того что бы использовать уже готовую функцию.</p>';
						},
						instructions: '<ul>' +
										'<li>Исправте код так, что бы он не соответсвовал анти-паттерну магические числа.</li>' +
									  '</ul>',
						hint: [
							{
								'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
								'nextButton': false,
								'showSkip': false
							}
						],
						result: function (value, code)
						{
							var botText = BBotText(
								{
									correct: 'BBot любит велосипеды, не то что зануды чел0веки.Транслирую:<br>' + value,
									unknownError: 'Велосипеды, всем велосипеды, все же любят велосипеды?',
									notHaveDebug: 'BBot растроен, тем что чел0век забыл про BBotDebug.'
								});

							if (checkDebugLen(value, 2))
							{
								return botText.resultNotCorrect('notHaveDebug');
							}

							return botText.result(code.indexOf('Math.pow') != -1 && code.indexOf('Math.min') != -1);
						}
					},
					{
						title: 'Божественный объект.',
						content: function ()
						{
							return '<p>Божественный объект - анти-паттерн соответствующий ситуции, когда одна одна сущость выполняет несколько ролей.' +
								' Например, сущность собака, которая может гавкать, скулить, закапывать кость в саду и расчитывать налоги.' +
								' Разве собаки считают налоги?</p>';
						},
						instructions: '<ul>' +
						               '<li>Исправить код, так что бы код не соовтветствовал анти-паттерну божественный объект.</li>' +
						               '<li>Не нужный код можно удалить.</li>' +
									  '</ul>',
						hint: [
							{
								'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
								'nextButton': false,
								'showSkip': false
							}
						],
						result: function (value, code)
						{
							var botText = BBotText(
								{
									correct: 'Чел0век справляется, BBot испытывает притворную радость. Транслирую:<br>' + value,
									unknownError: 'BBot рад, что чел0век признает божественную природу BBot\'a, однако это не повод делать' +
									'задание не правильно.',
									notHaveDebug: 'BBot растроен, тем что чел0век забыл про BBotDebug.'
								});

							if (checkDebugLen(value, 3))
							{
								return botText.resultNotCorrect('notHaveDebug');
							}

							return botText.result(isContainString(code, 'goToShop') && code.indexOf('calculateNumber') == -1);
						}
					},
					{
						title: 'Лодочный якорь.',
						content: function ()
						{
							return '<p>Лодочный якорь - анти-паттерн соответствующий ситуации, когда программист оставляет' +
								' код, который не используеться.</p>';
						},
						instructions: '<ul>' +
										'<li>Исправте код так, что бы он не соответсвовал анти-паттерну лодочный якорь</li>' +
						              '</ul>',
						hint: [
							{
								'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
								'nextButton': false,
								'showSkip': false
							}
						],
						result: function (value, code)
						{
							var botText = BBotText(
								{
									correct: 'Чел0век справляется, BBot испытывает притворную радость. Транслирую:<br>' + value,
									unknownError: 'BBot рад, что чел0век признает божественную природу BBot\'a, однако это не повод делать' +
									'задание не правильно.',
									notHaveDebug: 'BBot растроен, тем что чел0век забыл про BBotDebug.'
								});

							if (checkDebugLen(value, 1))
							{
								return botText.resultNotCorrect('notHaveDebug');
							}

							return botText.result(isContainString(code, 'calculateNumber') &&
								                  isContainString(code, 'sumMinMax'));
						}
					}
				]
		}
	];

	return function (num)
	{
		return lessons[num];
	}
}]);

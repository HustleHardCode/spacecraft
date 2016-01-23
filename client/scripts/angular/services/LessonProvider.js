'use strict';

/**
 * Created by Ivan on 02.01.2016.
 */
var app = angular.module('spacecraft.lessonProvider', []);

app.service('lessonProvider', function ()
{
	function isNumeric(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

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
					content:
					'<p>Прежде, для управления космическим кораблем требовалась целая команда специалистов, однако это ' +
					'время прошло, теперь достаточно одного пилота-инженера.</p>' +
					'<p>Наша академия выпускает лучших пилотов во всей галактике, когда-нибудь и Вы, сможете стать одним из них.</p>' +
					'<p>Прежде чем начать обучение, необходимо уладить некоторые формальности.</p>',
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
					content:
					'<p>Так, новенький, введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
					'<p>Высылаю вам инструкции по выполнению.</p>',
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

							return botText.result(reg.test(value));
						}

						return botText.resultNotCorrect('emptyInput');
					}
				},
				{
					title: 'Галактическая единица',
					content:
					'<p>Отлично кадет «Имя», я нашла вас в списках.</p>' +
					'<p>Нам нужно уладить еще пару ненужных бюрократических моментов.</p>' +
					'<p>Введите свой возраст в галактической единице измерения времени - <strong>GY</strong>.</p>',
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

							// Если выведено число, то результат положительный
							return botText.result(isNumeric(value));
						}

						return botText.resultNotCorrect('emptyInput');
					}
				},
				{
					title: 'В4К',
					content:
					'<p>Отлично! Теперь перейдем к действительно важным вещам.</p>' +
					'<p><strong>В4К</strong> (консоль ввода кода космического корабля) - это новая система интерпретации, которая находится на стадии тестирования и уже используется в академии.</p>' +
					'<p>Вам нужно проверить работоспособность В4К, а мы, в свою очередь, проверим ваши способности в космической инженерии.</p>'+
					'<p>В4К распознает язык программирования <strong>JavaScript</strong>. Если использовать слова, не входящие в этот язык, то система должна сообщить об ошибке. Проверим!</p>',
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
					content:
					'<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, идем дальше.</p>' +
					'<p>В В4К есть поддержка комментариев JavaScript. Комментарии начинаются с <strong>//</strong> и предназначены только для человека.</p>' +
					'<p>Комментарии делают ваш код более понятным для вас и вашей команды. Поэтому, если вдруг ваш корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>',
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
					content:
					'<p>Итак, мы разобрались с комментариями. В языке JavaScript существует множество типов данных, с двумя из которых мы уже познакомились: </p>' +
					'<p><strong>string</strong> - строка или последовательность из символов. Например: "Я есть BBot!", "42", "JS".</p>' +
					'<p><strong>number</strong> - числа, с помощью которых ваш корабль будет делать вычисления. Заметим, что числа пишутся без кавычек.</p>',
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
					title: 'Правда, ложь, ложь…',
					content:
					'<p>В космосе нельзя быть во всем уверенным! Запомните, любое высказывание надо проверять на правдивость! В этом нам поможет новый тип данных - <strong>boolean</strong>.</p>' +
					'<p>Boolean - это логический тип данных, который может принимать значения <strong>true</strong>, либо <strong>false</strong>, как вы уже наверное догадались «правда», «ложь» соответственно.</p>' +
					'<p>Например сравнение двух чисел может вернуть либо <strong>true</strong>, либо <strong>false</strong>:</p>' +
					'<ul>' +
					'<li>5 > 4 - <strong>true</strong></li>' +
					'<li>4 > 5 - <strong>false</strong></li>' +
					'</ul>' +
					'<p>Давайте теперь протестируем работу нашего интерпретатора В4К с логическим типом данных.</p>',
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

							unknownError:  '<p>### Правда не найдена! Где же она?</p>' +
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
					content:
					'<p>Надеюсь вы не забыли о своем роботе-компаньоне?</p>' +
					'<p>Если вы хотите узнать какие-то данные от BBot\'а, можно вызвать <strong>BBotDebug("то, что хотим сказать")</strong>, это нам поможет с выводом нужных параметров и проверкой работоспособности системы.</p>',
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
				}
			]
		}
	];

	return function (num)
	{
		return lessons[num];
	}
});

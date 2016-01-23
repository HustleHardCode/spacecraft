/**
 * Created by vladthelittleone on 08.12.15.
 */
var slides = [
	{
		title: 'Приветствуем вас!',
		description: '<p>Это краткий экскурс в наш сервис</p>'
		+ '<div class="img-huge-center">'
		+ '<img src="resources/assets/logo3.png">'
		+ '</div> '
		+ '<p>Мы раскажем вам о рабочем месте капитана, об основных функциях корабля и интерфейсе.</p>'
		+ '<svg version="1.1" id="icon-keyboard" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="186px" height="60px" viewBox="0 0 186 60" enable-background="new 0 0 186 60" xml:space="preserve">'
		+ '<path fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" d="M119,59H67c-1.10457,0-2-0.89543-2-2V36'
		+ 'c0-1.10457,0.89543-2,2-2h52c1.10457,0,2,0.89543,2,2v21C121,58.10457,120.10457,59,119,59z"/>'
		+ '<path fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" d="M119,26H67c-1.10457,0-2-0.89543-2-2V3'
		+ 'c0-1.10457,0.89543-2,2-2h52c1.10457,0,2,0.89543,2,2v21C121,25.10457,120.10457,26,119,26z"/>'
		+ '<path fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" d="M55,59H3c-1.10457,0-2-0.89543-2-2V36'
		+ 'c0-1.10457,0.89543-2,2-2h52c1.10457,0,2,0.89543,2,2v21C57,58.10457,56.10457,59,55,59z"/>'
		+ '<path fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" d="M183,59h-52c-1.10457,0-2-0.89543-2-2V36'
		+ 'c0-1.10457,0.89543-2,2-2h52c1.10457,0,2,0.89543,2,2v21C185,58.10457,184.10457,59,183,59z"/>'
		+ '<path fill="#FFFFFF" d="M92.54309,49.97196l-3.23061-7.26889C89.16552,42.37243,89.40755,42,89.76938,42h6.46124'
		+ 'c0.36182,0,0.60386,0.37243,0.4569,0.70307l-3.23061,7.26889C93.28094,50.36787,92.71906,50.36787,92.54309,49.97196z"/>'
		+ '<path fill="#FFFFFF" d="M92.54309,10.02804l-3.23061,7.26889C89.16552,17.62757,89.40755,18,89.76938,18h6.46124'
		+ 'c0.36182,0,0.60386-0.37243,0.4569-0.70307l-3.23061-7.26889C93.28094,9.63213,92.71906,9.63213,92.54309,10.02804z"/>'
		+ '<path fill="#FFFFFF" d="M25.02804,46.04309l7.26889-3.23062C32.62757,42.66552,33,42.90755,33,43.26938v6.46124'
		+ 'c0,0.36183-0.37243,0.60386-0.70307,0.45691l-7.26889-3.23062C24.63213,46.78095,24.63213,46.21905,25.02804,46.04309z"/>'
		+ '<path fill="#FFFFFF" d="M160.97197,46.04309l-7.26891-3.23062C153.37242,42.66552,153,42.90755,153,43.26938v6.46124'
		+ 'c0,0.36183,0.37242,0.60386,0.70306,0.45691l7.26891-3.23062C161.36787,46.78095,161.36787,46.21905,160.97197,46.04309z"/>'
		+ '</svg>'
	},
	{
		title: 'Текущая стадия',
		subSlides:[
			{
				title: 'Текущий функционал',
				description: '<p>Далек от совершенства (сейчас перед вами первый прототип),' +
				' но мы упорно работаем над проектом и надеемся реализовать все наши идеи и задумки.</p>'
			},
			{
				title: 'Отзывы',
				description: '<div class="img-small-center">'
				+ '<a href="https://vk.com/spacecrafter" target="_blank">'
				+ '<img src="resources/assets/pages/astronaut6white.png" >'
				+ '</a>'
				+ '</div>'
				+ '<p class="text-center underline"><a href="https://vk.com/spacecrafter">Группа в ВКонтакте</a></p>'
				+ '<p class="text-center">Будем очень рады вашим отзывам и предложениям :)</p>'
			}
		]
	},
	{
		title: 'Режим игры',
		subSlides:[
			{
				title: 'Задача',
				description: '<p>Какая же основная задача этого режима?</p>'
			},
			{
				title: 'Уничтожить',
				description: '<p>Как можно больше врагов на карте, изменяя энергию блоков корабля, ' +
				'движение, цель для атаки в зависимости от ситуации и т.д.</p>'
			},
			{
				title: 'Запрограммировать',
				description: '<p>Свой корабль на языке программирования JavaScript и стать лучшим!</p>'
			}
		]
	},
	{
		title: 'Режим обучения',
		subSlides:[
			{
				title: 'Задача',
				description: '<p>Какая же основная задача этого режима?</p>'
			},
			{
				title: 'Обучение',
				description: '<p>Обучение программированию в игровом формате.</p>'
			}
		]
	},
	{
		title: 'Редактор кода',
		subSlides:[
			{
				title: 'Где находится?',
				description: '<p>Редактор кода находится в правой части.</p>'
			},
			{
				title: 'Как использовать?',
				description: '<p>Вы можете убрать редактор кода, нажав на <i class="glyphicon glyphicon-chevron-up"></i> в верхнем правом углу</p>'
				+ '<p>Для запуска кода нажмите на <i class="glyphicon glyphicon-play green"></i></p>'
				+ '<p>Для остановки кода нажмите на <i class="glyphicon glyphicon-stop red"></i></p>'
				+ '<p>Вы можете изменять размер редактора кода, используя слайдбар</p>'
			}
		]
	},
	{
		title: 'Документация',
		subSlides:[
			{
				title: 'Как открыть документацию?',
				description: '<p>Документация содержит информацию о всех функциях и объектах игры.</p>'
				+ '<p>Нажмите на <i class="glyphicon glyphicon-question-sign"></i> для получения документации.</p>'
			}
		]
	},
	{
		title: 'Отзывы и предложения',
		subSlides:[
			{
				title: 'Как оставить отзыв или предложение?',
				description: '<p>Хотите оставить отзыв или предложение? Нашли баг или ошибку?</p>'
				+ '<div class="img-small-center">'
				+ '<img src="resources/assets/pages/spacecraft2white.png">'
				+ '</div> '
				+ '<p>Нажмите <i class="glyphicon glyphicon-comment"></i> в левом верхнем углу.</p>'
				+ '<p>Либо отпишитесь в обсуждениях <a href="https://vk.com/spacecrafter">группы в вконтакте</a>.</p>'
			}
		]
	},
	//{
	//	title: 'Пример кода',
	//	description: '<p>Метод run() запускается системой, в нем вы можете изменять корабль.</p>'
	//	+ '<div class="img-huge-center">'
	//	+ '<img src="resources/assets/pages/code1.png" >'
	//	+ '</div> '
	//	+ '<p>Параметр i сохраняет свое значение для каждого вызова run().</p>',
	//},
	{
		title: 'Горячие клавишы',
		subSlides:[
			{
				title: 'SPACE + CTRL',
				description: '<p>Нажатая в редакторе кода, вызовет автодополнение кода.</p>'
			},
			{
				title: 'Стрелаками',
				description: '<p>Вы можете управлять камерой.</p>'
			},
			{
				title: 'SPACE',
				description: '<p>Вернет камеру к наблюдению за космическим кораблем.</p>'
			}
		]
	},
	{
		title: 'Метод run',
		subSlides:[
			{
				title: 'Описание',
				description:  '<p>В метод <b>run(spaceCraft, world)</b> передаются два параметра spaceCraft и world:</p>'
				+ '<p><b>spaceCraft</b> - отвечает за управление кораблем.</p>'
				+ '<p><b>world</b> - отвечает за получение информации о объектах мира и самом мире.</p>'
				+ '<p>Информацию о них вы можете посмотреть в документации, нажав <i class="glyphicon glyphicon-question-sign"></i>.</p>'
			},
			{
				title: 'Объект spaceCraft',
				description: '<p>С помощью данного объекта вы можете:</p>'
				+ '<p><b>Получать</b> координаты, угол корабля относительно мира, угол и дистанцию относительно других объектов.</p>'
				+ '<p><b>Управлять</b> двигателями корабля: поварачивать и увеличивать скорость.</p>'
				+ '<p><b>Атаковать</b> врага, получать информацию о врага в радиусе атаки.</p>'
				+ '<p><b>Переопределять</b> энергию между модулями.</p>'
			},
			{
				title: 'Объект world',
				description: '<p>С помощью данного объекта вы можете:</p>'
				+ '<p><b>Получать</b> информацию о бонусах (их координаты и тип).</p>'
				+ '<p><b>Получать</b> информацию о врагах.</p>'
				+ '<p><b>Получать</b> информацию о границах мира.</p>'
			}
		]
	},
	{
		title: 'Параметры корабля',
		subSlides:[
			{
				title: 'Как получитить?',
				description:  '<p>Вы можете получить текущие параметра корабля с помощью методов:</p>'
				+ '<p><i class="glyphicon glyphicon-heart red"></i> <b>getHealth()</b> - получить текущее здоровье корабля.</p>'
				+ '<p><i class="glyphicon glyphicon-screenshot green"></i> <b>getDamage()</b> - получить текущий урон оружия корабля. </p>'
				+ '<p><i class="glyphicon glyphicon-adjust blue"></i> <b>getShield()</b> - получить текущие щиты корабля.</p>'
				+ '<p>Информацию о них вы можете посмотреть в документации, нажав <i class="glyphicon glyphicon-question-sign"></i>.</p>'
			}
		]
	},
	{
		title: 'Блоки корабля',
		subSlides:[
			{
				title: 'Описание основных блоков',
				description:  '<p>Корабль состоит из 3 основных блоков:</p>'
				+ '<p>1. <b>WeaponBlock</b> - блок управления оружием космического корабля.</p>'
				+ '<p>2. <b>ProtectionBlock</b> - блок управления защитными системами корабля.</p>'
				+ '<p>3. <b>EngineBlock</b> - блок, отвечающий за двигатели корабля.</p>'
				+ '<p>У каждого блока есть свои подмодули, энергию которых можно изменять.</p>'
			}
		]
	},
	{
		title: 'Модули корабля',
		subSlides:[
			{
				title: 'Распределение',
				description:  '<p>Каждый блок содержит свои модули, между которыми вы можете распределять энергию.</p>'
				+ '<div class="img-small-center">'
				+ '<img src="resources/assets/pages/bar1.png">'
				+ '</div>'
				+ '<p>Чем выше количество энергии, тем выше параметры модуля.</p>'
			},
			{
				title: 'Описание основных модулей',
				description:  '<p><b>WeaponBlock</b> содержит три модуля: <i class="glyphicon glyphicon-screenshot green"></i> <b>damage</b>, <i class="glyphicon glyphicon-refresh green"></i> <b>rate</b>, <i class="glyphicon glyphicon-record green"></i> <b>range</b>.</p>'
				+ '<p><b>ProtectionBlock</b> содержит один модуль: <i class="glyphicon glyphicon-wrench green"></i> <b>regen</b>.</p>'
				+ '<p><b>EngineBlock</b> содержит один модуль: <i class="glyphicon glyphicon-forward green"></i> <b>moveSpeed</b>.</p>'
				+ '<p><i class="glyphicon glyphicon-flash green"></i>  показывает количество неиспользуемой энергии.</p>'
			}
		]
	},
	{
		title: 'Бонусы',
		subSlides:[
			{
				title: 'Как получить бонус?',
				description:  '<p>Из каждого корабля выпадают бонусы.</p>'
				+ '<div class="img-small-center">'
				+ '<img src="resources/assets/pages/glowtube.png">'
				+ '</div>'
				+ '<p>Если вы подлетите к нему, то автоматически заберете бонус.</p>'
			},
			{
				title: 'Типы бонусов',
				description:  '<p>Всего существует 3 типа бонуса:</p>'
				+ '<p><b>health</b> - добавляет здоровье</p>'
				+ '<p><b>damage</b> - добавляет урон</p>'
				+ '<p><b>shield</b> - добавляет щиты</p>'
				+ '<p>См. документацию по <b>Bonus</b>.</p>'
			}
		]
	},
	{
		title: 'Будущие изменения',
		subSlides:[
			{
				title: 'Над чем мы работаем в данный момент?',
				description: '<p>1. Полноценным мультиплеером</p>'
				+ '<p>2. Уроками по программированию</p>'
				+ '<p>3. Сохранением статистики текущей мини-игры</p>'
				+ '<p>4. Авторизацией пользователей</p>'
				+ '<p><b>Будем рады услышать ваши предложения!</b></p>'
			}
		]
	},
	{
		title: 'Отдельное спасибо',
		subSlides:[
			{
				title: 'MillionthVector',
				description: "<p xmlns:cc='http://creativecommons.org/ns#' about='http://millionthvector.blogspot.ru/p/free-sprites.html'>За предоставленные спрайты от <a rel='cc:attributionURL' property='cc:attributionName' href='http://millionthvector.blogspot.com/p/free-sprites.html'>MillionthVector</a> / <a rel='license' href='http://creativecommons.org/licenses/by/4.0/'>CC BY 4.0</a></p>"
			},
			{
				title: 'Freepik',
				description: '<p>За иконки от <a href="http://ru.freepik.com">Freepik</a></p>'
			},
			{
				title: 'Близким',
				description: '<p>Нашим друзьям и близки за их поддержку, комментарии и советы</p>'
			}
		]
	}
];

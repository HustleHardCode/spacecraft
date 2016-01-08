/**
 * Created by vladthelittleone on 08.12.15.
 */
var tips = [
	{
		title: 'Приветствуем вас!',
		description: '<p>Это краткий экскурс в наш сервис</p>'
		+ '<img src="resources/assets/pages/logo.png">'
		+ '<p>Мы раскажем вам о рабочем месте капитана, об основных функциях корабля и интерфейсе.</p>'
		+ '<p>Для продолжения нажмите <i class="glyphicon glyphicon-chevron-right"></i>.</p>'
		+ '<p>Для возврата на предыдущий слайд нажмите <i class="glyphicon glyphicon-chevron-left"></i>.</p>'
		+ '<p>Для получения дополнительной информации нажмите <i class="glyphicon glyphicon-info-sign"></i>.</p>'
	},
	{
		title: 'Предисловие от авторов',
		description: '<p>Цели, которые мы преследуем, создавая этот проект, интерактивное обучение людей, которым интересно программирование, и создание игровой площадки для более опытных it-специалистов.</p>'
		+ '<div class="img-medium-center">'
		+ '<img src="resources/assets/pages/gamePlay1.png">'
		+ '</div> '
		+ '<p>Изначально мы решили не делать ставку на обучающий материал и сделали мини-игру. Связано это с тем, что большинство наших друзей, которым мы покажем сервис, уже разбирается в программировании.</p>'
		+ '<p>Но обучение это основная цель на следующих стадиях!</p>'
	},
	{
		title: 'Текущая стадия',
		description: '<p>Текущий функционал далек от совершенства, но мы упорно работаем над проектом и надеемся реализовать все наши идеи и задумки.</p>'
		+ '<div class="img-small-center">'
		+ '<a href="https://vk.com/spacecrafter" target="_blank">'
		+ '<img src="resources/assets/pages/astronaut6.png">'
		+ '</a>'
		+ '</div>'
		+ '<p class="text-center"><a href="https://vk.com/spacecrafter">Группа в ВКонтакте</a></p>'
		+ '<p class="text-center">Будем очень рады вашим отзывам и предложениям :)</p>'
	},
	{
		title: 'Мини-игра',
		description: '<p>Какая же основная задача этой игры?</p>'
		+ '<div class="img-medium-center">'
		+ '<img src="resources/assets/pages/gamePlay4.png">'
		+ '</div> '
		+ '<p>Вам нужно уничтожить <b>как можно больше врагов</b> на карте, изменяя энергию блоков корабля, движение, цель для атаки в зависимости от ситуации и т.д.</p>'
		+ '<p>Запрограммируй свой корабль и стань лучшим!</p>'
	},
	{
		title: 'Редактор кода',
		description: '<p>Редактор кода находится в правой части.</p>'
		+ '<div class="img-medium-center">'
		+ '<img src="resources/assets/pages/gamePlay2.png">'
		+ '</div>'
		+ '<p>Вы можете убрать редактор кода, нажав на <i class="glyphicon glyphicon-chevron-up"></i> в верхнем правом углу</p>'
		+ '<p>Редактор кода, легко меняет свой размер, подведите курсор в левому краю и измените размер до удобного вам.</p>'
		+ '<p>Для запуска кода нажмите на <i class="glyphicon glyphicon-play green"></i></p>'
		+ '<p>Для остановки кода нажмите на <i class="glyphicon glyphicon-stop red"></i></p>',
		hint: [
			{
				'next .play-toggle .green': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода, а <i class="glyphicon glyphicon-stop red"></i> для вызова паузы',
				'nextButton': {text: 'Дальше'},
				'showSkip': false
			},
			{
				'next .editor-toggle': 'Нажмите <i class="glyphicon glyphicon-chevron-down"></i>  для вызова редактора кода, а <i class="glyphicon glyphicon-chevron-up"></i> для закрытия',
				'nextButton': {text: 'Дальше'},
				'showSkip': false
			}]
	},
	{
		title: 'Документация',
		description: '<p>Документация содержит информацию о всех функциях и объектах игры.</p>'
		+ '<div class="img-medium-center">'
		+ '<img src="resources/assets/pages/gamePlay3.png">'
		+ '</div>'
		+ '<p>Нажмите на <i class="glyphicon glyphicon-question-sign"></i> для получения документации.</p>',
		hint: [
			{
				'next .question-toggle': 'Нажмите <i class="glyphicon glyphicon-question-sign"></i> для вызова окна документации',
				'nextButton': {text: 'Дальше'},
				'showSkip': false
			}]
	},
	{
		title: 'Отзывы и предложения',
		description: '<p>Хотите оставить отзыв или предложение? Нашли баг или ошибку?</p>'
		+ '<div class="img-small-center">'
		+ '<img src="resources/assets/pages/spacecraft2.png">'
		+ '</div> '
		+ '<p>Нажмите <i class="glyphicon glyphicon-comment"></i> в левом верхнем углу.</p>'
		+ '<p>Либо отпишитесь в обсуждениях <a href="https://vk.com/spacecrafter">группы в вконтакте</a>.</p>',
		hint: [
			{
				'next .comment-toggle': 'Нажмите <i class="glyphicon glyphicon-comment"></i> для отправки отзывов, предложений или информации о багах',
				'nextButton': {text: 'Дальше'},
				'showSkip': false
			}]
	},
	{
		title: 'Пример кода',
		description: '<p>Метод run() запускается системой, в нем вы можете изменять корабль.</p>'
		+ '<div class="img-huge-center">'
		+ '<img src="resources/assets/pages/code1.png">'
		+ '</div> '
		+ '<p>Параметр i сохраняет свое значение для каждого вызова run().</p>'
	},
	{
		title: 'Горячие клавишы',
		description: '<p>Есть несколько горячих клавиш, о которых нужно знать:</p>'
		+ '<p><b>SPACE + CTRL</b>, нажатая в редакторе кода, вызовет автодополнение кода.</p>'
		+ '<p><b>Стрелочками</b> вы можете управлять камерой.</p>'
		+ '<p><b>SPACE</b> вернет камеру к наблюдению за космическим кораблем.</p>'
	},
	{
		title: 'Метод run(spaceCraft, world)',
		description: '<p>В метод <b>run(spaceCraft, world)</b> передаются два параметра spaceCraft и world:</p>'
		+ '<div class="img-huge-center">'
		+ '<img src="resources/assets/pages/code2.png">'
		+ '</div> '
		+ '<p><b>spaceCraft</b> - отвечает за управление кораблем.</p>'
		+ '<p><b>world</b> - отвечает за получение информации о объектах мира и самом мире.</p>'
		+ '<p>Информацию о них вы можете посмотреть в документации, нажав <i class="glyphicon glyphicon-question-sign"></i>.</p>'
	},
	{
		title: 'Объект spaceCraft',
		description: '<p>С помощью данного объекта вы можете:</p>'
		+ '<p>1. <b>Получать</b> координаты, угол корабля относительно мира, угол и дистанцию относительно других объектов.</p>'
		+ '<p>2. <b>Управлять</b> двигателями корабля: поварачивать и увеличивать скорость.</p>'
		+ '<p>3. <b>Атаковать</b> врага, получать информацию о врага в радиусе атаки.</p>'
		+ '<p>4. <b>Переопределять</b> энергию между модулями.</p>'
		+ '<div class="img-huge-center">'
		+ '<img src="resources/assets/pages/code3.png">'
		+ '</div>'
		+ '<p>Смотрите документацию по объекту <b>SpaceCraft</b>.</p>'
	},
	{
		title: 'Объект world',
		description: '<p>С помощью данного объекта вы можете:</p>'
		+ '<p>1. <b>Получать</b> информацию о бонусах (их координаты и тип).</p>'
		+ '<p>2. <b>Получать</b> информацию о врагах.</p>'
		+ '<p>3. <b>Получать</b> информацию о границах мира.</p>'
		+ '<div class="img-huge-center">'
		+ '<img src="resources/assets/pages/code3.png">'
		+ '</div>'
		+ '<p>Смотрите документацию по объекту <b>World</b>.</p>'
	},
	{
		title: 'Параметры корабля',
		description: '<div class="img-small-center">'
		+ '<img src="resources/assets/pages/tblue1.png">'
		+ '</div> '
		+ '<p>Вы можете получить текущие параметра корабля с помощью методов:</p>'
		+ '<p><i class="glyphicon glyphicon-heart red"></i> <b>getHealth()</b> - получить текущее здоровье корабля.</p>'
		+ '<p><i class="glyphicon glyphicon-screenshot green"></i> <b>getDamage()</b> - получить текущий урон оружия корабля. </p>'
		+ '<p><i class="glyphicon glyphicon-adjust blue"></i> <b>getShield()</b> - получить текущие щиты корабля.</p>'
		+ '<p>Информацию о них вы можете посмотреть в документации, нажав <i class="glyphicon glyphicon-question-sign"></i>.</p>',
		hint: [
			{
				'next .params-hint': 'Параметры корабля',
				'nextButton': {text: 'Дальше'},
				'showSkip': false
			}]
	},
	{
		title: 'Блоки корабля',
		description: '<p>Корабль состоит из 3 основных блоков:</p>'
		+ '<p>1. <b>WeaponBlock</b> - блок управления оружием космического корабля.</p>'
		+ '<p>2. <b>ProtectionBlock</b> - блок управления защитными системами корабля.</p>'
		+ '<p>3. <b>EngineBlock</b> - блок, отвечающий за двигатели корабля.</p>'
		+ '<p>У каждого блока есть свои подмодули, энергию которых можно изменять.</p>'
	},
	{
		title: 'Модули корабля',
		description: '<p>Каждый блок содержит свои модули между которыми вы можете распределять энергию.</p>'
		+ '<div class="img-small-center">'
		+ '<img src="resources/assets/pages/bar1.png">'
		+ '</div>'
		+ '<p>Чем выше количество энергии тем выше параметры модуля.</p>'
		+ '<p><b>WeaponBlock</b> содержит три модуля: <i class="glyphicon glyphicon-screenshot green"></i> <b>damage</b>, <i class="glyphicon glyphicon-refresh green"></i> <b>rate</b>, <i class="glyphicon glyphicon-record green"></i> <b>range</b>.</p>'
		+ '<p><b>ProtectionBlock</b> содержит один модуль: <i class="glyphicon glyphicon-wrench green"></i> <b>regen</b>.</p>'
		+ '<p><b>EngineBlock</b> содержит один модуль: <i class="glyphicon glyphicon-forward green"></i> <b>moveSpeed</b>.</p>'
		+ '<p><i class="glyphicon glyphicon-flash green"></i>  показывает количество неиспользуемой энергии.</p>',
		hint: [
			{
				'next .points-hint': 'Индикаторы энергии',
				'nextButton': {text: 'Дальше'},
				'showSkip': false
			}]
	},
	{
		title: 'Бонусы',
		description: '<p>Из каждого корабля выпадают бонусы.</p>'
		+ '<div class="img-small-center">'
		+ '<img src="resources/assets/pages/glowtube.png">'
		+ '</div>'
		+ '<p>Если вы подлетите к нему, то автоматически заберете бонус.</p>'
		+ '<p>Всего существует 3 типа бонуса:</p>'
		+ '<p>1. <b>health</b> - добавляет здоровье</p>'
		+ '<p>2. <b>damage</b> - добавляет урон</p>'
		+ '<p>3. <b>shield</b> - добавляет щиты</p>'
		+ '<p>См. документацию по <b>Bonus</b>.</p>'
	},
	{
		title: 'Будущие изменения',
		description: '<p>В текущий момент мы работаем над:</p>'
		+ '<div class="img-small-center">'
		+ '<img src="resources/assets/pages/saturn6.png">'
		+ '</div>'
		+ '<p>1. Полноценным мультиплеером</p>'
		+ '<p>2. Первыми уроками по программированию</p>'
		+ '<p>3. Сохранением статистики текущей мини-игры</p>'
		+ '<p>4. Авторизацией пользователей</p>'
		+ '<p><b>Будем рады услышать ваши предложения!</b></p>'
	},
	{
		title: 'Отдельное спасибо',
		description: "<p xmlns:cc='http://creativecommons.org/ns#' about='http://millionthvector.blogspot.ru/p/free-sprites.html'>За предоставленные спрайты от <a rel='cc:attributionURL' property='cc:attributionName' href='http://millionthvector.blogspot.com/p/free-sprites.html'>MillionthVector</a> / <a rel='license' href='http://creativecommons.org/licenses/by/4.0/'>CC BY 4.0</a></p>"
		+ '<p>За иконки от <a href="http://ru.freepik.com">Freepik</a></p>'
		+ '<p>Нашим друзьям за их поддержку, комментарии и советы</p>'
	}
];

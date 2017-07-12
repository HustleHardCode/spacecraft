const lodash = require('lodash');

module.exports = StateHistory();

/**
 * Модуль организации ведения истории state'ов.
 * Данный модуль внедряет индерфейс, позволяющий из вне вести историю посещения состояний.
 *
 * @since 28.04.17
 * @author iretd
 */
function StateHistory() {

	// Задает РАЗМЕР истории.
	const MAX_LENGTH = 5;

	let t = {};

	t.initialize = initialize;

	return t;
	
	function initialize($state) {

		$state.history = [];

		/**
		 * Последний элемент истории - это запись о текущем state'е, на который перешел пользователь
		 * в последний раз.
		 * Для нас актуально знать прошлый state (предпоследний в истории).
		 *
		 * @returns {Object} предпоследний элемент истории.
		 */
		$state.history.getPrevious = function() {

			const previousStateIndex = this.length - 2;

			return this[previousStateIndex];

		};

		/**
		 * Для избежания наличия дублежа состояний в истории, определяем свою логику метода push.
		 * Также, метод push контролирует поддержание ФИКСИРОВАННОЙ размерности истории.
		 *
		 * @param {Object} toState объект определения state'a;
		 * @param {Object} toParams параметры state'a;
		 * @returns {number} размер истории, как это и принято по соглашению метода push в JS.
		 */
		$state.history.push = function({toState, toParams}) {

			let lastElement = lodash.last(this);

			let lastStateName = lastElement && lastElement.toState.name;

			if (lastStateName !== toState.name) {

				let newLength = Array.prototype.push.call(this, {toState, toParams});

				// Удаляем первый элемент, если размер истории превышает заданный макс. размер.
				if (newLength === MAX_LENGTH) {

					this.shift();

				}

			}

			return this.length;

		}
	}
}

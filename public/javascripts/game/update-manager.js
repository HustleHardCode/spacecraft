'use strict';

// Экспорт
module.exports = UpdateManager();

/**
 * Сервис обмена кодом между игрой и ангуляровскими сервисами.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function UpdateManager() {

	// that / this
	var t = {};

	// Коллбек выполняющийся при обновлении игры.
	var postUpdate;

	// Коллбек выполняющийся перед обновлением.
	var preUpdate;

	// Номер подурока.
	var subIndex = 0;

	t.setPreUpdate = setPreUpdate;
	t.setPostUpdate = setPostUpdate;
	t.setSubIndex = setSubIndex;

	t.getSubIndex = getSubIndex;
	t.pre = pre;
	t.post = post;

	return t;

	function setPreUpdate(_preUpdate) {

		preUpdate = _preUpdate;

	}

	function setPostUpdate(_postUpdate) {

		postUpdate = _postUpdate;

	}

	function setSubIndex(_subIndex) {

		subIndex = _subIndex;

	}

	function post() {

		return postUpdate && postUpdate(arguments);

	}

	function pre() {

		return preUpdate && preUpdate(arguments);

	}

	function getSubIndex() {

		return subIndex;

	}

}
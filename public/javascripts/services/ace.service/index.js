'use strict';

var MarkerService = require('./marker-service');

var lodash = require('lodash');
var defaultDefs = require('./defs/spacecraft');

module.exports = AceService;

/**
 * Сервис работы с Ace-редактором.
 *
 * Created by Ivan on 09.05.2016.
 */
function AceService() {

	var that = {};

	var markerService;
	var editor;
	var beautifyOptions;

	var defs = [defaultDefs];
	var ternOptions = {

		/* http://ternjs.net/doc/manual.html#option_defs */
		defs: defs,

		/* http://ternjs.net/doc/manual.html#plugins */
		plugins: {
			doc_comment: {
				fullDocs: true
			}
		}

	};

	that.initialize = initialize;
	that.getMarkerService = getMarkerService;
	that.getSession = getSession;
	that.getBeautifyOptions = getBeautifyOptions;
	that.getValue = getValue;

	return that;

	/**
	 * Меняем шаблон с сохранением стандартного.
	 * @param _def - доп. шаблон.
	 */
	function resetDefs(_def) {

		defs.length = 0;

		defs.push(defaultDefs);

		_def && defs.push(_def);

	}

	/**
	 * Инициализация Ace
	 *
	 * @param edx Ace класс
	 * @param _def шаблон - множество описаний функций в формате tern. Можно использовать в уроках, так как там
	 * есть дополнительные объекты и классы (см. http://ternjs.net/doc/manual.html или
	 * https://github.com/ternjs/tern/blob/master/defs/browser.json). В будущем стоит парсить файлы API.
	 */
	function initialize(edx, _def) {

		editor = edx;

		resetDefs(_def);

		editor.$blockScrolling = Infinity;

		removeModules([
			'ace/tern/tern_server',
			'ace/snippets',
			'ace/autocomplete/text_completer',
			'ace/autocomplete/popup',
			'ace/autocomplete/util',
			'ace/autocomplete',
			'ace/tern/tern'
		]);

		ace.config.loadModule('ace/ext/tern', setEditorOptions);
		ace.config.loadModule('ace/ext/html_beautify', beautify);

		// Скрываем линию в редакторе
		editor.setShowPrintMargin(false);

		// Скролл до конца - скролл присутствует всегда.
		editor.setOption("scrollPastEnd", true);

		markerService = MarkerService(editor);

	}

	function removeModules(modules) {

		modules.forEach(function (e) {

			ace.define.modules[e] = null;
			delete ace.define.modules[e];

		})

	}

	function getMarkerService() {

		return markerService;

	}

	function setEditorOptions() {

		editor.setOptions({
			/**
			 * Either `true` or `false` or to enable with custom options pass object that
			 * has options for tern server: http://ternjs.net/doc/manual.html#server_api
			 * If `true`, then default options will be used
			 */
			enableTern: ternOptions,

			/**
			 * when using tern, it takes over Ace's built in snippets support.
			 * this setting affects all modes when using tern, not just javascript.
			 */
			enableSnippets: true,

			/**
			 * when using tern, Ace's basic text auto completion is enabled still by deafult.
			 * This settings affects all modes when using tern, not just javascript.
			 * For javascript mode the basic auto completion will be added to completion results if tern fails to find completions or if you double tab the hotkey for get completion (default is ctrl+space, so hit ctrl+space twice rapidly to include basic text completions in the result)
			 */
			enableBasicAutocompletion: true,
		});

	}

	/**
	 * @returns опции улучшения редактора кода.
	 */
	function getBeautifyOptions() {

		return beautifyOptions;

	}

	/**
	 * Визуальные настройки.
	 */
	function beautify(beautify) {

		editor.setOptions({
			// beautify when closing bracket typed in javascript or css mode
			autoBeautify: true,
			// this enables the plugin to work with hotkeys (ctrl+b to beautify)
			htmlBeautify: true,
		});

		// modify beautify options as needed:
		beautifyOptions = beautify.options;

	}

	/**
	 * Возвращаем сессию редактора.
	 */
	function getSession() {

		return editor.getSession();

	}

	function getValue() {

		return editor && editor.getValue();

	}

}

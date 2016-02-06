'use strict';

/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.autocompleter', []);

app.service('autocompleter', function ()
{
	var spaceCraftCompleter = function (editor)
	{
		return {
			getCompletions: function (edx, session, pos, prefix, callback)
			{
				var str = editor.session.getLine(editor.getCursorPosition().row);

				var check = [
					{regExps: [' *spaceCraft.weapon.$'], name: 'weaponBlock'},
					{regExps: [' *spaceCraft.engine.$'], name: 'engineBlock'},
					{regExps: [' *spaceCraft.protection.$'], name: 'protectionBlock'},
					{regExps: [' *spaceCraft.$'], name: 'spaceCraft'},
					{regExps: [' *world.$'], name: 'world'},
					{regExps: [' *enemy.$'], name: 'enemy'},
					{regExps: [' *bonus.$'], name: 'bonus'},
					{regExps: [' *enemy.weapon.$'], name: 'enemyWeapon'},
					{
						regExps: [
							' *spaceCraft.engine.moveSpeed.$',
							' *spaceCraft.weapon.rate.$',
							' *spaceCraft.weapon.range.$',
							' *spaceCraft.weapon.damage.$',
							' *spaceCraft.protection.regeneration.$'
						], name: 'module'
					}
				];

				callback(null, generateAutocomplete(check, str));
			}
		}
	};

	function test(string, value)
	{
		var name = value.name;
		var result = [];

		value.regExps.forEach(function (r)
		{
			var regExp = new RegExp(r);

			if (regExp.test(string))
			{
				result = result.concat(getMethodsFrom(name));
			}
		});

		return result;
	}

	function getMethodsFrom(name)
	{
		var array = [];

		var functionsFrom = documentation[name].functions;

		functionsFrom.forEach(function (value)
		{
			array = array.concat(createAutoCompleteElement(value.name, name));
		});

		return array;
	}

	function createAutoCompleteElement(value, meta)
	{
		return {value: value, meta: meta};
	}

	function generateAutocomplete(check, str)
	{
		var functionsName = [];

		check.forEach(function (value)
		{
			functionsName = functionsName.concat(test(str, value));
		});

		if (!functionsName.length)
		{
			check.forEach(function (value)
			{
				functionsName = functionsName.concat(getMethodsFrom(value.name));
			});

			functionsName.push(createAutoCompleteElement('spaceCraft', 'local'));
			functionsName.push(createAutoCompleteElement('world', 'local'));
		}

		return functionsName;
	}

	return spaceCraftCompleter;
});

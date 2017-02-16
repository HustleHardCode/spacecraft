'use strict';

var joint = require('jointjs');

// Экспорт
module.exports = DiagramHelp();

function DiagramHelp () {

	var t = {};

	t.createLink = createLink;
	t.block = block;

	return t;

}

function createLink(graph, elm1, elm2) {

	var erd = joint.shapes.erd;

	var myLink = new erd.Line({
		source: {id: elm1.id},
		target: {id: elm2.id}
	});

	myLink.attr({
		'.connection':    {stroke: '#fff', 'stroke-width': 4},
		'.marker-target': {stroke: '#fff', fill: '#fff', d: 'M 10 0 L 0 5 L 10 10 z'}
	});

	return myLink.addTo(graph);

}

function block(x, y, text, color) {

	var erd = joint.shapes.erd;

	return new erd.Entity({
		position: {x: x, y: y},
		attrs:    {
			text:             {
				fill:             '#ffffff',
				text:             text,
				'letter-spacing': 0
			},
			'.outer, .inner': {
				fill:   color || '#152B39',
				stroke: 'none'
			}
		}
	});

}

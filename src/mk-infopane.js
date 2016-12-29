/*
 * Kind of a status-bar or notifier. Sliding messages in area with limited height.
 * A library agnostic, mobile friendly, css animated UI widget.
 * demo and docs at http://mkant.ru/mink-js/mk-infopane

   Include script and style sheet into you page:
		<script src="path/to/plugin/mk-infopane.min.js"></script>
		<link href="path/to/plugin/mk-infopane.min.css" rel="stylesheet">
	Create html block you want to use as a pane for messages:
		<div id="paneElement"></div>
	Create infopane instance, binded to DOM element:
		var pane = new mk.Infopane( paneElement[, options] ) );
	Publish messages:
		pane.echo(text[,options]);
		pane.ok  (text[,options]);
		pane.info(text[,options]);
		pane.warn(text[,options]);
		pane.err (text[,options]);
 */

(function(){

//= utils.js
//= message.js
//= widget.js

	mk = window.mk || {};
	mk.Infopane = widget;

})();
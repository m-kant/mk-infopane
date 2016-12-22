mk-infopane
===============

A library agnostic, mobile friendly, css animated UI widget. Sliding messages in height-constrained pane.

[Demo](http://mkant.ru/mink-js/mk-infopane)

Inclusion
------------

Include script and style sheet into you page:
```HTML
<script src="path/to/plugin/mk-infopane.min.js"></script>
<link href="path/to/plugin/mk-infopane.min.css" rel="stylesheet">
```

Usage
-----------
```JavaScript
var pane = new mk.Infopane( document.getElementById('paneElement') );
pane.echo(text, duration, addCloseButton);
pane.ok  (text, duration, addCloseButton);
pane.info(text, duration, addCloseButton);
pane.warn(text, duration, addCloseButton);
pane.err (text, duration, addCloseButton);
```
text {string} text of message
duration {integer} duration of message in milliseconds, default is 3000
addCloseButton {boolean} if true - close button will be shown on message, default is true


[Details and Demo](http://mkant.ru/mink-js/mk-infopane)
--------------------------------------------------------
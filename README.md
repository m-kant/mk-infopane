mk-infopane
===============

Kind of a status-bar or notifier.
Sliding messages in area with limited height.
A library agnostic, mobile friendly, css animated UI widget.
Minimal restrictions on styling.

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
Create html block you want to use as an infopane.
```HTML
<div id="paneElement"></div>
```

Create infopane instance, binded to DOM element.
```JavaScript
var pane = new mk.Infopane( document.getElementById('paneElement') );
```

Publish messages with different styles to pane
```JavaScript
pane.echo(text[, options])
pane.ok  (text[, options])
pane.warn(text[, options])
pane.err (text[, options])
pane.info(text[, options])
```

Publish messages with custom styles
```JavaScript
pane.print(options);
```

Control published messages
```JavaScript
var message = pane.info (text, options); // create and print message
message.put(newText); // replace text in it
message.append(additionalText); // add text
setTimeout(function(){ message.unpublish(); },10000) // close it later
```

Pane options
------------
* height {integer}
* collapse {boolean}
* onMessage {function}
* onMessageRemove {function}


[Details and Demo](http://mkant.ru/mink-js/mk-infopane)
--------------------------------------------------------
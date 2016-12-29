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


//	var _counter = 0; // used to assign id's
//	var _que = []; // queue of message DOMElements



	var _createPane = function(){
		var target = document.createElement('div');
		target.className = 'infopane';
		document.body.appendNode(target);
		return target;
	};

	var _addClass = function(el,c){
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
		if (re.test(el.className)) {return;}
		el.className = (el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
		return el;
	};

	var _removeClass = function(el,c){
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
		el.className = el.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
	};

	// non recursive extend with priority of first arguments
	var _extend = function(target,mixin){
		if(undefined === target)target = {};
		for(var i=1; i<arguments.length; i++){
			mixin = arguments[i];
			for(var k in mixin){
				if(!mixin.hasOwnProperty(k)) continue;
				if(target[k] !== undefined) continue;
				target[k] = mixin[k];
			}
		}
		return target;
	};

	var _prepend = function(target,el){
		var firstEl = target.firstChild;
		if(firstEl){
			target.insertBefore(el,firstEl);
		}else{
			target.appendChild(el);
		}
	};

	/**
	 * object of pane message
	 * @param {type} options
	 * @returns {undefined}
	 */
	var Message = function(options){
		this.published = false;
		this.pane = null;
		this.options = options;
		this.element = this._newElement();
		this.body = this.element.querySelector('.msg-body');

	};

	Message.prototype = {

		publish:function(pane){
			if(this.published)return;

			this.pane = pane;
			_prepend(this.pane.paneEl,this.element);
			this.published = true;
			var self = this;
			if(this.options.duration){
				setTimeout(this.unpublish.bind(this),this.options.duration);
			}

			// remove appear animation
			setTimeout(function(){ _removeClass(self.element,'msg-appear') ; },1000);
			// callback of pane
			if(this.pane.options.onMessage) this.pane.options.onMessage.call(this.pane,this);
		},

		unpublish: function(){
			if(!this.published)return;
			this.published = false;

			var self = this;
			self.element.className += ' msg-hide';
			setTimeout(function(){
				self.element.parentNode.removeChild(self.element);
				delete self.element;
			},1000);

			// callback of pane
			if(this.pane.options.onMessageRemove) this.pane.options.onMessageRemove.call(this.pane,this);
		},

		put: function(text){
			this.body.innerHTML = text;
		},

		append: function(text){
			this.body.innerHTML += text;
		},

		suicide:  function(){
			this.unpublish();
			delete  this.published, this.pane, this.options, this.element;
			delete  this;
		},

		_newElement: function(){
			var msgEl = document.createElement('div');
			msgEl.className = 'infopane-msg msg-appear msg-'+this.options.type;
			msgEl.innerHTML = '<div class="msg-body">'+this.options.text+'</div>';

			if(this.options.closeBut){
				var closeBut = document.createElement('div');
				closeBut.className = 'msg-close';
				closeBut.onclick = this.unpublish.bind(this);
				msgEl.appendChild(closeBut);
			}

			return msgEl;
		},

	};



	var widget = function(paneEl,options){
		this.options = _extend(options,this.defaults);
		this.paneEl = (paneEl)? _addClass( paneEl, 'infopane' ) : _createPane();
		this.paneEl.style[ (this.options.collapse)?'max-height':'height' ] = this.options.height+'px';
	};

	widget.prototype = {

		defaults:{
			height:		36,		// pane height
			collapse:	false,	// pane can collapse to invisible when no messages
			onMessage:	null,	//callback on every message publish, 'this' - is a pane, argument is a message
			onMessageRemove:null,	//callback on every message publish, 'this' - is a pane, argument is a message
			text:		'',		// message default text
			type:		'echo',	// message default type
			duration:	3000,	// message duration, 0 means infinite
			closeBut:	true	// add close button to message
		},

		print: function(options){
			_extend(options,this.deafaults);
			options.pane = this;

			var message = new Message(options).publish(this);
			return message;
		},

		/**
		 * добавляет в панель сообщение в стиле по умолчанию
		 * @param {string} msg текст сообщения
		 * @param {object} options
		 * @property {boolean} options.closeBut add close button to message
		 * @property {integer} options.duration milliseconds of message life
		 */
		echo:function(msg,options){
			if(!options)options = {};
			options.type = 'echo';
			options.text = msg;
			return this.print(options);
		},


		/**
		 * добавляет в панель сообщение об успехе
		 * @param {string} msg текст сообщения
		 * @param {object} options
		 * @property {boolean} options.closeBut add close button to message
		 * @property {integer} options.duration milliseconds of message life
		 */
		ok:function(msg,options){
			if(!options)options = {};
			options.type = 'ok';
			options.text = msg;
			return this.print(options);
		},
		/**
		 * добавляет в панель сообщение с предупреждением
		 * @param {string} msg текст сообщения
		 * @param {object} options
		 * @property {boolean} options.closeBut add close button to message
		 * @property {integer} options.duration milliseconds of message life
		 */
		warn:function(msg,options){
			if(!options)options = {};
			options.type = 'warn';
			options.text = msg;
			return this.print(options);
		},
		/**
		 * добавляет в панель сообщение с ошибкой
		 * @param {string} msg текст сообщения
		 * @param {object} options
		 * @property {boolean} options.closeBut add close button to message
		 * @property {integer} options.duration milliseconds of message life
		 */
		err:function(msg,options){
			if(!options)options = {};
			options.type = 'err';
			options.text = msg;
			return this.print(options);
		},
		/**
		 * добавляет в панель информационное сообщение
		 * @param {string} msg текст сообщения
		 * @param {object} options
		 * @property {boolean} options.closeBut add close button to message
		 * @property {integer} options.duration milliseconds of message life
		 */
		info:function(msg,options){
			if(!options)options = {};
			options.type = 'info';
			options.text = msg;
			return this.print(options);
		},


		_prependPane: function(el){
			var firstEl = this.paneEl.firstChild;
			if(firstEl){
				this.paneEl.insertBefore(el,firstEl);
			}else{
				this.paneEl.appendChild(el);
			}

		}

	};

	widget.update = function(id,message){
		if(!_que[id])return; // already does not exist
		var msgEl = _que[id];
		msgEl.querySelector('.msg-body').innerHtml = message;
	};

	mk = window.mk || {};
	mk.Infopane = widget;

})();
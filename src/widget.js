


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

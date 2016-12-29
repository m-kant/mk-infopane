
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

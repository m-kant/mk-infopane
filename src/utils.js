
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


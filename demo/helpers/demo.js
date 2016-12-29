
var demoInit = function(){
	pane = new mk.Infopane(
		infopaneEl,
		{
			height:36,
		}
	);
};

info = function(){
	var options = $(demoFormEl).databridge();
	if(!options.text)options.text = 'Something interesting happened while you working';
	options.duration = Number(options.duration);

	pane[options.type](options.text,options);
	console.log(options);
};

randomEcho = function(){
	var options = {
		text: rndElement([
			'Wait some minutes and you will find some more interesting',
			'Something interesting happened while you working',
			'Look at me, here is important information',
			"Don't miss something important for you",
			"Yeah, not so important"
		]),
		type: rndElement(['echo','ok','info','warn','err']),
		duration: rndElement([2000,3000,4000,5000]),
		closeBut: rndElement([true,true,false])
	};
	$(demoFormEl).databridge(options);
	console.log(options);
	pane.print(options);
};

/* Returns a random number between min (inclusive) and max (exclusive) */
rnd = function(min, max) {
   return Math.random() * (max - min) + min;
};

rndElement = function(array){
	var i = Math.floor( rnd(0,array.length) );
	return array[i];
};
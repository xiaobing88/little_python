var Block = function(game, position){
	// positon 格式：	[0, 0]
	var p  = position
	// var image =imagefrompath('./image/block.png')
	var img = game.imagefromname('block')
	var o  = {
		x: p[0],
		y: p[1],
		// w: 50,
		// h: 20,
		alive: true,
		lifes: p[2] || 1
		// wid: 40,
		// hei: 40,
	}
	o.image = img.image
	o.w = img.w
	o.h = img.h
	o.kill = function(){
		o.lifes--
		if (o.lifes < 1){
			o.alive = false
		}
	}
	o.collide = function(b){
		return o.alive &&(rectIntersetcts(o,b) || rectIntersetcts(b,o))
	}
	return o
}
var Ball = function(game){
	var o = game.imagefromname('ball')
	o.x = 170
	o.y = 230
	o.speedX = 5
	o.speedY = 5
	o.fired = false
	// var o  = {
	// 	image: image,
	// 	x: 180,
	// 	y: 190,
	// 	wid: 40,
	// 	hei: 40,
	// 	speedX: 5,
	// 	speedY: 5,
	// 	fired: false,
	// }
	o.fire = function(){
		o.fired = true
	}
	o.move = function(){
		if (o.fired){
			// log('move')
			if (o.x < 0 || o.x > 450){
				o.speedX = -o.speedX
			}
			if (o.y < 0 || o.y > 300){
				o.speedY = -o.speedY
			}
			//move
			o.x += o.speedX
			o.y += o.speedY
		}
		
	}
	o.rebound = function(){
		o.speedY *= -1
	}
	return o
}
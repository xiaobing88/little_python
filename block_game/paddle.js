var Paddle = function(game){
	// var image =imagefrompath('./image/borad.png')
	// var o  = {
	// 	image: image,
	// 	x: 68,
	// 	y: 250,
	// 	wid: 250,
	// 	hei: 20,
	// 	speed: 10,
	// }
	var o = game.imagefromname('paddle')
	o.x = 150
	o.y = 270
	o.speed = 10
	var paddle = o
	o.move = function(x){
		if (x < 0){
			x =0
		}
		if (x > 450 - o.image.width){
			x = 450 - o.image.width
		}
		o.x = x
	}
	o.moveleft = function(){
		o.move(paddle.x - paddle.speed)
	}
	o.moveright = function(){
		o.move(paddle.x + paddle.speed)
	}
	o.collide = function(ball){
		if (ball.y + ball.image.height  > o.y){
			if (ball.x > o.x && ball.x < o.x + o.image.width){
				// log('相撞')
				return true
			}
		}
		return false
	}
	return o
}
var loadlevel = function(game, n){
	n = n - 1
	var level = levels[n]
	var blocks = []
	for (var i = 0; i < level.length; i++) {
		var p = level[i]
		var b = Block(game, p)
		blocks.push(b)
	}
	return blocks
}

var blocks = []
var enabledebugMode = function(game, enable){
	if (!enable) {
		return
	}
	window.paused = false
	// debug 功能 选择关卡
	window.addEventListener('keydown', function(event){
		var k = event.key
		if (k == 'Control'){
			// 暂停 
			window.paused = !window.paused
		} else if ('1234567'.includes(k)) {
			// debug 关卡
			blocks = loadlevel(game, Number(k))
		}
	})
	// 滑条 速度
	document.querySelector('#id-input-speed').addEventListener('input', function(event){
		var input = event.target
		// log(event, input.value)
		window.fps = Number(input.value)
	})
}

var __main__ = function(){
	var images = {
		ball: './image/ball.png',
		block: './image/block.png',
		// paddle: 'broad.png',
		paddle: './image/broad.png',
	}
	var game = little_game(10, images, function(g){
		
		var paddle = Paddle(game)
		var ball = Ball(game)

		var score = 0
		blocks = loadlevel(game, 1)
		
		var paused = false
		// 注册事件
		game.registerAction('a', function(){
			paddle.moveleft()
		})
		game.registerAction('ArrowLeft', function(){
			paddle.moveleft()
		})
		game.registerAction('d', function(){
			paddle.moveright()
		})
		game.registerAction('ArrowRight', function(){
			paddle.moveright()
		})
		// 球的事件
		game.registerAction(' ', function(){
			ball.fire()
		})

		game.update = function(){
			//暂停
			if (window.paused){
				return
			}
			ball.move()
			// 判断相撞
			if (paddle.collide(ball)){
				ball.rebound()
			}
			// 判断ball和blocks碰撞
			for (var i = 0; i <  blocks.length; i++) {
				var block = blocks[i]
				if (block.collide(ball)){
					// log('block bengbeng')
					block.kill()
					ball.rebound()
					// 更新分数
					score += 100
				}
			}
			//lose
			if ((ball.y - ball.image.height) > paddle.y){
				log('you lose')
				// alert('game over')
			}
		}
		game.draw = function(){
			// 画 背景
			game.context.fillStyle = '#354'
			game.context.fillRect(0, 0, 450,300)
			//draw
			game.drawImage(paddle)
			game.drawImage(ball)
			// draw blocks
			for (var i = 0; i <  blocks.length; i++) {
				var block = blocks[i]
				if (block.alive) {
					game.drawImage(block)
				}
			}
			// draw labels 
			game.context.fillText('分数：' + score, 10, 290)
		}
	})
	
	enabledebugMode(game, true)
	log('enabledebugMode(true)')
}

__main__()
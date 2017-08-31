var little_game = function(fps, images, runCallback){
	// images 是一个对象，里面是图片的引用名字 路径
	// 程序在所有图片 载入成功之后 运行
	var g = {
		actions: {},
		keydowns: {},
		images: {},
	}
	var canvas = document.querySelector('#id-canvas')
	var context = canvas.getContext('2d')
	g.canvas = canvas
	g.context = context
	//draw
	g.drawImage = function(llgame){
		//drawImage(img,0,0，你想拉伸为的宽度，你想要拉伸为的高度)
		// g.context.drawImage(llgame.image, llgame.x, llgame.y, llgame.wid, llgame.hei)
		g.context.drawImage(llgame.image, llgame.x, llgame.y)
	}
	// evrnts
	window.addEventListener('keydown', function(event){
		// 获取键 代码------------
		// log(event)
		g.keydowns[event.key] = true
	})
	window.addEventListener('keyup', function(event){
		g.keydowns[event.key] = false
	})
	g.registerAction = function(key, callback){
		g.actions[key] = callback
	}
	// timer
	window.fps = 30
	var runloop = function(fps){
		// log(window.fps)
		var actions = Object.keys(g.actions)
		for (var i = 0; i < actions.length; i++){
			var key = actions[i]
			if(g.keydowns[key]){
				// 按键
				g.actions[key]()
			}
		}
		// 刷新x和y
		g.update()
		// clear	渲染页面
		context.clearRect(0, 0, canvas.width, canvas.height)
		// draw
		g.draw()
		// next one
		setTimeout(function(){
			runloop()
		}, 1000/window.fps)
	}
	// 预先载入所有图片
	var loads = []
	var names = Object.keys(images)
	for (var i = 0; i < names.length; i++) {
		let name = names[i]
		var path = images[name]
		let img = new Image()
		img.src = path
		img.onload = function() {
			// 所有图片载入成功 运行 run
			// 存入 g.images当中
			g.images[name] = img
			loads.push(1)
			log('load images')
			if (loads.length == names.length) {
				log('g.run run', g.images)
				g.run()
			}
		}
	}
	g.imagefromname = function(name) {
		var img = g.images[name]
		var image = {
			w: img.width,
			h: img.height,
			image: img,
		}
		return image
	}
	g.run = function() {
		runCallback(g)
		// 程序运行
		// 定时器
		setTimeout(function(){
			runloop()
		}, 1000/fps)
	}
	return g
} 
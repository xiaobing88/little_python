// console.log为系统自带
// var log = console.log.bind(console)
// log 自定义函数
var e = sel => document.querySelector(sel)
var log = console.log.bind(console)
// var log = function(s){
// 	e('#id-text-log').value += '\n' + s
// }
var imagefrompath =function(path){
	var img = new Image()
	img.src = path
	// log(img)
	return img
}


var rectIntersetcts = function(a,b){
	var o = a
	if (b.y > o.y && b.y < o.y + o.image.height){
		if (b.x > o.x && b.x < o.x + o.image.width){
			log('碰撞')
			return true
		}
	}
	return false
}
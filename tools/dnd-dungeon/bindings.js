window.get = (e) => document.getElementById(e)

let mouse = {
	x: 0,
	y: 0,
	data_x: 0,
	data_y: 0,
	isLeft: false,
	isRight: false,
	isMiddle: false
}

let keyboard = {
	ctrl: false,
	space: false,
	shift: false,
	delete: false,
	z: false,
	x: false,
	c: false,
	v: false,
	r: false,
	w: false,
	a: false,
	s: false,
	d: false,
	set: function(key, value) {
		if(key == "Control") this.ctrl = value;
		if(key == "Shift") this.shift = value;
		if(key == "Delete") this.delete = value;
		if(key.toLowerCase() == "z") this.z = value;
		if(key.toLowerCase() == "x") this.x = value;
		if(key.toLowerCase() == "c") this.c = value;
		if(key.toLowerCase() == "v") this.v = value;
		if(key.toLowerCase() == "r") this.r = value;

		if(key.toLowerCase() == "w") this.w = value;
		if(key.toLowerCase() == "a") this.a = value;
		if(key.toLowerCase() == "s") this.s = value;
		if(key.toLowerCase() == "d") this.d = value;
	}
}

let topLayer = get("input_layer")

get("save-btn").onclick = (e) => {

}

get("load-btn").onclick = (e) => {

}

get("clear-btn").onclick = (e) => {

}

get("save-img-btn").onclick = (e) => {

}

topLayer.oncontextmenu = (x) => false

topLayer.onmousedown = (x) => {

}

topLayer.onmouseup = (x) => {

}

topLayer.onmousemove = (x) => {

}

document.onkeydown = (x) => {

}

document.onkeyup = (x) => {

}

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

topLayer.onmouseupdate = (x) => {
  if(mouse.isRight) {
    if(currentType == "wall") {
      map.add("wall", mouse.data_x, mouse.data_y)
    }
    else {
      map.remove("object", mouse.data_x, mouse.data_y)
    }
  }
  if(mouse.isLeft) {
    if(currentType == "wall") {
      map.remove("wall", mouse.data_x, mouse.data_y)
    }
    else {
      map.add(currentType, mouse.data_x, mouse.data_y)
    }
  }
  if(mouse.isMiddle) {

  }

  display.mouse.draw()
}

topLayer.onmousedown = (x) => {
  document.activeElement.blur()
	if(x.button == 0) mouse.isLeft = true;
	if(x.button == 1) mouse.isMiddle = true;
	if(x.button == 2) mouse.isRight = true;
	x.preventDefault()
  topLayer.onmouseupdate()
}

topLayer.onmouseup = (x) => {
  if(x.button == 0) mouse.isLeft = false;
	if(x.button == 1) mouse.isMiddle = false;
	if(x.button == 2) mouse.isRight = false;
	x.preventDefault()
  topLayer.onmouseupdate()
}

topLayer.onmousemove = (x) => {
  mouse.x = x.offsetX
	mouse.y = x.offsetY
	let newDataX = Math.floor((mouse.x - camera.x) / cellSize)
	let newDataY = Math.floor((mouse.y - camera.y) / cellSize)
  if(mouse.data_x != newDataX | mouse.data_y != newDataY)
  {
    mouse.data_x = newDataX
    mouse.data_y = newDataY
    topLayer.onmouseupdate()
  }
}

document.onkeyupdate = (x) => {
  if(keyboard.r) {

    display.mouse.draw()
  }
}

document.onkeydown = (x) => {
  if(document.activeElement.tagName != "TEXTAREA")
	{
		keyboard.set(x.key, true)
    document.onkeyupdate()
	}
}

document.onkeyup = (x) => {
  if(document.activeElement.tagName != "TEXTAREA")
	{
		keyboard.set(x.key, false)
    document.onkeyupdate()
	}
}

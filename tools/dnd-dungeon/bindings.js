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
  get("save-entry-form").value = saveHandler.save(map)
}

get("load-btn").onclick = (e) => {
  let val = get("save-entry-form").value
  saveHandler.load(val, val[0])
}

get("clear-btn").onclick = (e) => {
  map.clear()
  get("save-entry-form").value = ""
  get("notes").value = ""
}

get("save-img-btn").onclick = (e) => {
  let exportCanvas = make("canvas")
  exportCanvas.width = get("input_layer").width
  exportCanvas.height = get("input_layer").height
  let exportContext = exportCanvas.getContext("2d")
  exportContext.width = exportCanvas.width
  exportContext.height = exportCanvas.height

  exportContext.drawImage(display.background.canvas.canvas, 0, 0)

  if(render_stripes.value) exportContext.drawImage(display.stripes.canvas.canvas, 0, 0)
  if(render_grid.value) exportContext.drawImage(display.grid.canvas.canvas, 0, 0)
  if(render_walls.value) exportContext.drawImage(display.emptyCells.canvas.canvas, 0, 0)
  if(render_shadows.value) exportContext.drawImage(display.shadows.canvas.canvas, 0, 0)
  exportContext.drawImage(display.features.canvas.canvas, 0, 0)

  let dataURL = exportCanvas.toDataURL()
  let link = make("a")
  let linkEvent = document.createEvent("HTMLEvents")
  linkEvent.initEvent("click")
  link.download = "image.png"
  link.href = dataURL
  link.click()
}

topLayer.oncontextmenu = (x) => false

let hasSelected = false

topLayer.onmouseupdate = (x) => {
  if(selection.isSelecting) {
    if(mouse.isLeft) {
      if(hasSelected) {
        selection.x2 = mouse.data_x + (camera.x / cellSize)
        selection.y2 = mouse.data_y + (camera.y / cellSize)
      }
      else {
        hasSelected = true
        selection.x = mouse.data_x + (camera.x / cellSize)
        selection.y = mouse.data_y + (camera.y / cellSize)
        selection.x2 = mouse.data_x + (camera.x / cellSize)
        selection.y2 = mouse.data_y + (camera.y / cellSize)
      }
    }
    else {
      hasSelected = false
    }
    display.selection.draw()
  }
  else {
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
        map.add(currentType, mouse.data_x, mouse.data_y, rotation)
      }
    }
    if(mouse.isMiddle) {

    }
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
    rotation = (rotation + 1) % 4
    display.mouse.draw()
  }
  if(selection.isSelecting) {
    if(keyboard.delete) {
      selection.forEach((x, y) => {
        map.remove("all", x, y, "REDRAW")
      })
      localStorage.map = saveHandler.save(map)
      display.redrawOnChange("all")
    }
    if(keyboard.ctrl & keyboard.x) {
      selection.clipboard = []
      selection.forEach((x, y) => {
        selection.clipboard.push(map.get("all", x, y))
        map.remove("all", x, y)
      })
      selection.trimClipboard()
    }
    if(keyboard.ctrl & keyboard.c) {
      selection.clipboard = []
      selection.forEach((x, y) => {
        selection.clipboard.push(map.get("all", x, y))
      })
      selection.trimClipboard()
    }
  }
  if(keyboard.ctrl & keyboard.v) {
    for(let i = 0; i < selection.clipboard.length; i++) {
      let currentTile = selection.clipboard[i]
      map.add(currentTile.type, currentTile.x + mouse.data_x, currentTile.y + mouse.data_y, currentTile.rotation)
    }
  }


  if(keyboard.w) camera.y -= cellSize
  if(keyboard.s) camera.y += cellSize
  if(keyboard.a) camera.x -= cellSize
  if(keyboard.d) camera.x += cellSize
  if(keyboard.w | keyboard.s | keyboard.a | keyboard.d) {
    display.emptyCells.draw()
    display.shadows.draw()
    display.features.draw()
    display.mouse.draw()
  }
  display.draw()
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

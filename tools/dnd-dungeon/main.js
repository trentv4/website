var _c = document.getElementById("dungeon_creator");
_c.width = _c.clientWidth; _c.height = _c.clientHeight;
var c2 = _c.getContext("2d")
c2.width = _c.clientWidth; c2.height = _c.clientHeight;

///////////////////////// Assigning and interacting with the DOM /////////////////////////

var _q = document.getElementsByClassName("checkbox")
for(var i = 0; i < _q.length; i++)
{
	var elm = _q[i]
	elm.onclick = function(e)
	{
		render_walls = document.getElementById("render_walls").checked
		render_corner_dots = document.getElementById("render_corner_dots").checked
		render_grid = document.getElementById("render_grid").checked
		render_stripes = document.getElementById("render_stripes").checked
 		render_shadows = document.getElementById("render_shadows").checked
		layers.fullRedraw()
		window.draw();
	}
}

document.getElementById("save-btn").addEventListener("click", function(e){
	document.getElementById("save-entry-form").value = getSaveData()
	message("green", "Success: saved!")
})

document.getElementById("load-btn").addEventListener("click", function(e){
	loadData(document.getElementById("save-entry-form").value)
	layers.fullRedraw()
	draw()
})

document.getElementById("clear-btn").addEventListener("click", function(e){
	data = []

	render_walls =       true
	render_corner_dots = true
	render_grid =        true
	render_stripes =     true
	render_shadows =     true

	document.getElementById("render_walls").checked = render_walls
	document.getElementById("render_corner_dots").checked = render_corner_dots
	document.getElementById("render_grid").checked = render_grid
	document.getElementById("render_stripes").checked = render_stripes
	document.getElementById("render_shadows").checked = render_shadows
	layers.fullRedraw()
	draw()
	message("green", "Success: cleared!")
})

document.getElementById("save-img-btn").addEventListener("click", function(e){
    var image = _c.toDataURL();

    aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click");
    aLink.download = 'image.png';
    aLink.href = image;
	aLink.click()
})

_c.oncontextmenu = function(x)
{
	return false
}

_c.onmousedown = function(x)
{
	if(x.button == 0) mouse.isLeft = true;
	if(x.button == 1) mouse.isMiddle = true;
	if(x.button == 2) mouse.isRight = true;
	x.preventDefault()
	updateMouse()
}
_c.onmouseup = function(x)
{
	if(x.button == 0) mouse.isLeft = false;
	if(x.button == 1) mouse.isMiddle = false;
	if(x.button == 2) mouse.isRight = false;
	x.preventDefault()
	updateMouse()
}

_c.onmousemove = function(x)
{
	mouse.x = x.offsetX
	mouse.y = x.offsetY
	var newDataX = Math.floor(mouse.x / cellSize)
	var newDataY = Math.floor(mouse.y / cellSize)
	if(mouse.data_x != newDataX | mouse.data_y != newDataY)
	{
		mouse.data_x = newDataX
		mouse.data_y = newDataY
		updateMouse()
		layers.mouse.redraw()
		draw()
	}
}

document.addEventListener("keydown", function(x){
	var value = true;
	if(x.key == "Control") keyboard.ctrl = value;
	if(x.code == "Space") keyboard.space = value;
	if(x.key == "Shift") keyboard.shift = value;
	if(x.code == "Delete") keyboard.delete = value;
	if(x.code == "KeyZ") keyboard.z = value;
	if(x.code == "KeyX") keyboard.x = value;
	if(x.code == "KeyC") keyboard.c = value;
	if(x.code == "KeyV") keyboard.v = value;
	updateKeyboard()
})

document.addEventListener("keyup", function(x){
	var value = false;
	if(x.key == "Control") keyboard.ctrl = value;
	if(x.code == "Space") keyboard.space = value;
	if(x.key == "Shift") keyboard.shift = value;
	if(x.code == "Delete") keyboard.delete = value;
	if(x.code == "KeyZ") keyboard.z = value;
	if(x.code == "KeyX") keyboard.x = value;
	if(x.code == "KeyC") keyboard.c = value;
	if(x.code == "KeyV") keyboard.v = value;
	updateKeyboard()
})

///////////////////////// Creating objects and the tool list /////////////////////////

var objects = [
	{
		catname: "Objects:",
		objects: [
			{	name: "Wall",
				id:   0,
				file: "wall" },

			{	name: "Wall (tile)",
				id:   1,
				file: "images/wall.png" },

			{	name: "Boxes",
				id:   2,
				file: "images/boxes.png" },

			{	name: "Crate",
				id:   3,
				file: "images/crate.png" },
		],
	},
	{
		catname: "Traps:",
		objects: [
			{	name: "Spike Pit",
				id:   4,
				file: "images/spike-pit.png" },

			{	name: "Pressure Plate",
				id:   5,
				file: "images/pressure-plate.png" },
		],
	},
]

var obj_ids = []
for(var i = 0; i < objects.length; i++)
{
	var category = objects[i]
	var div = document.createElement("div")
	div.className = "feature-list"
	var pr = document.createElement("pre")
	pr.innerText = category.catname
	div.appendChild(pr)
	for(var g = 0; g < category.objects.length; g++)
	{
		var current_object = category.objects[g]
		obj_ids[current_object.id] = current_object
		var pre = document.createElement("pre")
		var img = document.createElement("img")
		img.className = "tool"
		img.id = current_object.id
		img.src = current_object.file
		if(current_object.id == 0) img.src = "images/wall.png"
		img.addEventListener("click", function(e){
			console.log("Setting to: " + obj_ids[this.id].name)
			currentType = this.id
			if(this.id == 0) currentType = "wall"
			document.getElementById("current-tool").innerHTML = `Current tool: <img src="` + obj_ids[this.id].file + `"> `+obj_ids[this.id].name+``
		})
		pre.appendChild(img)
		pre.appendChild(document.createTextNode(" " + current_object.name))
		div.appendChild(pre)
	}
	document.getElementById("tool-list").appendChild(div)
}

///////////////////////// Various objects /////////////////////////

var currentType = "wall"

var data = []

var prevData = []
var prevDataIndex = -1

var mouse = {
	x: 0,
	y: 0,
	data_x: 0,
	data_y: 0,
	isLeft: false,
	isRight: false,
	isMiddle: false
}

var keyboard = {
	ctrl: false,
	space: false,
	shift: false,
	delete: false,
	z: false,
	x: false,
	c: false,
	v: false,
}

///////////////////////// Manipulating history (undo/redo) /////////////////////////

function addPrevData()
{
	if(prevData.length != prevDataIndex + 1)
	{
		prevData.splice(prevDataIndex+1, Infinity)
	}
	prevData.push(JSON.parse(JSON.stringify(data)))
	prevDataIndex++
}

function historyGoBack()
{
	if(prevDataIndex <= 0) return;
	prevDataIndex--
	data = JSON.parse(JSON.stringify(prevData[prevDataIndex]))
	layers.fullRedraw()
	draw()
}

function historyGoForward()
{
	if(prevDataIndex >= prevData.length - 1) return
	prevDataIndex++
	data = JSON.parse(JSON.stringify(prevData[prevDataIndex]))
	layers.fullRedraw()
	draw()
}

///////////////////////// Interaction /////////////////////////

// Adds a single object
function add(type, xx, yy)
{
	if(get(type, xx, yy) != null) return;

	var obj = {
		x:xx,
		y:yy,
		type: currentType
	}

	data.push(obj)
	addPrevData()
	if(type == "wall")
	{
		layers.shadows.redraw()
		layers.emptyCells.redraw()
	}
	else
	{
		layers.features.redraw()
	}
	draw()
}

// Adds a collection of objects
function addAll(dataIn, x, y)
{
	for(var i = 0; i < dataIn.length; i++)
	{
		var obj = dataIn[i]
		if(get(obj.type, obj.x, obj.y) != null) continue;

		var cloneObj = {
			x: dataIn[i].x + x,
			y: dataIn[i].y + y,
			type: dataIn[i].type
		}
		data.push(cloneObj)
	}
	addPrevData()
	layers.shadows.redraw()
	layers.emptyCells.redraw()
	layers.features.redraw()
	draw()
}

// Gets the object at x, y that matches type. If type is all, it'll pull everything.
function get(type, x, y)
{
	var newData = []
	for(var q = 0; q < data.length; q++)
	{
		var i = data[q]
		if(i.x == x & i.y == y & (i.type == type | type == "all")) newData.push(i);
	}
	if(newData.length == 1) return newData[0]
	if(newData.length == 0) return null
	return newData
}

// Gets every object that matches type within fX, fY, tX, tY
function getFrom(type, fromX, fromY, toX, toY)
{
	var newData = []
	for(var q = 0; q < data.length; q++)
	{
		var i = data[q]

		if(i.x >= fromX & i.x <= toX & i.y >= fromY & i.y <= toY)
		{
			if(type == "object" & i.type != "wall") newData.push(i)
			if(type == "all") newData.push(i)
			if(type == i.type) newData.push(i)
		}
	}
	return newData
}

function remove(type, x, y)
{
	var newData = []
	for(var q = 0; q < data.length; q++)
	{
		var i = data[q]

		if(i.x == x & i.y == y)
		{
			if(type == "object" & i.type != "wall") continue
			if(type == "all") continue
			if(type == i.type) continue
		}
		newData.push(i)
	}
	data = newData
	addPrevData()
	if(type == "wall")
	{
		layers.shadows.redraw()
		layers.emptyCells.redraw()
	}
	else
	{
		layers.features.redraw()
	}
	draw()
}

function removeFrom(type, fromX, fromY, toX, toY)
{
	var newData = []
	for(var q = 0; q < data.length; q++)
	{
		var i = data[q]

		if(i.x >= fromX & i.x <= toX & i.y >= fromY & i.y <= toY)
		{
			if(type == "object" & i.type != "wall") continue
			if(type == "all") continue
			if(type == i.type) continue
		}
		newData.push(i)
	}
	data = newData
	addPrevData()
	layers.shadows.redraw()
	layers.emptyCells.redraw()
	layers.features.redraw()
	draw()
}

///////////////////////// Drawing functions /////////////////////////

function drawGrid(c)
{
	c.translate(0.5, 0.5) //to de-alias shit
	for(var x = 0; x < c.width/cellSize; x++)
	{
		for(var y = 0; y < c.height/cellSize; y++)
		{
			c.strokeStyle = colors.borders_grid
			c.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize)
		}
	}
	c.translate(-0.5, -0.5) //to de-alias shit
}

function drawEmptyCells(c)
{
	if(data == null) return;
	for(var i = 0; i < data.length; i++)
	{
		var obj = data[i]

		if(obj.type != "wall") continue;

		c.translate(obj.x * cellSize, obj.y * cellSize)

		c.fillStyle = colors.background
		c.fillRect(1, 1, cellSize - 1, cellSize - 1)
		if(!render_grid)
		{
			c.fillRect(0, 0, cellSize, cellSize)
		}

		if(render_corner_dots)
		{
			c.fillStyle = colors.borders_room
			if(render_grid) c.fillStyle = colors.borders_grid
			c.fillRect(0,0,1,1)
		}

		if(render_walls)
		{
			c.fillStyle = colors.borders_room
			if(get("wall", obj.x - 1, obj.y) == null) c.fillRect(0,0,          1,cellSize + 1)
			if(get("wall", obj.x + 1, obj.y) == null) c.fillRect(cellSize,0,   1,cellSize + 1)
			if(get("wall", obj.x, obj.y - 1) == null) c.fillRect(0,0,          cellSize + 1,1)
			if(get("wall", obj.x, obj.y + 1) == null) c.fillRect(0,cellSize,   cellSize + 1,1)
		}

		c.translate(-obj.x * cellSize, -obj.y * cellSize)
	}
}

function drawFeatures(c)
{
	if(data == null) return;
	for(var i = 0; i < data.length; i++)
	{
		var obj = data[i]
		if(obj.type != "wall")
		{
			var img = new Image()
			img.src = obj_ids[obj.type].file
			c.fillStyle = "#FF00FF"
			c.drawImage(img, obj.x*cellSize, obj.y * cellSize, cellSize+1, cellSize+1)
		}
	}
}

function drawStripes(c)
{
	for(var x = 0; x < c.width/stripeDistance*2; x++)
	{
		c.strokeStyle = colors.wall_stripes
		c.beginPath();
		c.moveTo(x * stripeDistance, 0)
		c.lineTo(0,x * stripeDistance)
		c.stroke();
	}
}

function drawMouse(c)
{
	if(mouse.data_y >= 0)
	{
		c.strokeStyle = colors.mouse_outline
		if(mouse.isRight | mouse.isLeft) c.strokeStyle = "#FFFF00"
		c.strokeRect(mouse.data_x * cellSize, mouse.data_y * cellSize, cellSize, cellSize)
	}
}

function drawShadows(c)
{
	for(var i = 0; i < data.length; i++)
	{
		var obj = data[i]

		if(obj.type == "wall")
		{
			c.fillStyle = colors.shadow
			if(get("wall", obj.x, obj.y - 1) == null)
			{
				c.fillRect(obj.x*cellSize+3, obj.y*cellSize+1, cellSize-5, 3)
				if(get("wall", obj.x - 1, obj.y - 1) == null)
				{
					c.fillRect(obj.x*cellSize+1, obj.y*cellSize+1, 3, 3)
				}
				if(get("wall", obj.x + 1, obj.y - 1) == null)
				{
					c.fillRect(obj.x*cellSize + cellSize - 2, obj.y*cellSize+1, 2, 3)
					if(get("wall", obj.x + 1, obj.y) != null)
					{
						c.fillRect(obj.x * cellSize + cellSize, obj.y * cellSize + 1, 1, 3)
					}
				}
			}
		}
	}
}

function drawSelection(c)
{
	if(selection != null)
	{
		c.strokeStyle = colors.select_outline
		c.fillStyle = colors.select_fill

		c.translate(0.5, 0.5) //to de-alias shit
		var lowX = selection.data_x < selection.data_x2 ? selection.data_x : selection.data_x2
		var highX = selection.data_x > selection.data_x2 ? selection.data_x : selection.data_x2
		var lowY = selection.data_y < selection.data_y2 ? selection.data_y : selection.data_y2
		var highY = selection.data_y > selection.data_y2 ? selection.data_y : selection.data_y2
		for(var x = lowX; x <= highX; x++)
		{
			for(var y = lowY; y <= highY; y++)
			{
				c.globalAlpha = 0.2;
				c.fillRect(x*cellSize, y*cellSize, cellSize, cellSize)
				c.globalAlpha = 1;
				c.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize)
			}
		}
		c.translate(-0.5, -0.5) //to de-alias shit
	}
}

///////////////////////// Interactions (mouse and keyboard) /////////////////////////

var selection = null
var clipboard = null
var isSelecting = false;

function updateKeyboard()
{
	if(selection != null)
	{
		var lowX = selection.data_x < selection.data_x2 ? selection.data_x : selection.data_x2
		var highX = selection.data_x > selection.data_x2 ? selection.data_x : selection.data_x2
		var lowY = selection.data_y < selection.data_y2 ? selection.data_y : selection.data_y2
		var highY = selection.data_y > selection.data_y2 ? selection.data_y : selection.data_y2

		if(keyboard.ctrl)
		{
			if(keyboard.c | keyboard.x)
			{
				var nd = getFrom("all", lowX, lowY, highX, highY)
				var newD = []
				var diffX = nd[0].x
				var diffY = nd[0].y
				for(var i = 0; i < nd.length; i++)
				{
					if(nd[i].x < diffX) diffX = nd[i].x
					if(nd[i].y < diffY) diffY = nd[i].y
				}
				for(var i = 0; i < nd.length; i++)
				{
					newD.push({
						x: nd[i].x - diffX,
						y: nd[i].y - diffY,
						type: nd[i].type
					})
				}
				clipboard = {
					sizeX: highX - lowX,
					sizeY: highY - lowY,
					data: newD
				}
				if(keyboard.x)
				{
					removeFrom("all",lowX, lowY, highX, highY)
				}
			}
		}
		if(keyboard.delete)
		{
			removeFrom("all", lowX, lowY, highX, highY)
		}
	}
	if(keyboard.ctrl & keyboard.v & clipboard != null)
	{
		addAll(clipboard.data, mouse.data_x, mouse.data_y)
	}
	if(keyboard.ctrl & keyboard.z)
	{
		if(keyboard.shift)
		{
			historyGoForward()
		}
		else
		{
			historyGoBack()
		}
	}
	if(keyboard.space)
	{
		isSelecting = !isSelecting
		if(!isSelecting) selection = null
	}

}

function updateMouse()
{
	if(mouse.data_y >= 0)
	{
		if(isSelecting) // Selection mode
		{
			if(mouse.isLeft)
			{
				if(selection == null || selection.active == false)
				{
					selection = {
						data_x: mouse.data_x,
						data_y: mouse.data_y,
						data_x2: 0,
						data_y2: 0,
						active: true
					}
				}
				selection.data_x2 = mouse.data_x
				selection.data_y2 = mouse.data_y
			}
			if(!mouse.isLeft)
			{
				if(selection != null) selection.active = false
			}
		}
		else
		{
			if(mouse.isRight)
			{
				if(currentType == "wall")
				{
					add(currentType, mouse.data_x, mouse.data_y)
				}
				else
				{
					remove("object", mouse.data_x, mouse.data_y);
				}
			}
			if(mouse.isLeft)
			{
				if(currentType == "wall" & get(currentType, mouse.data_x, mouse.data_y) != null)
				{
					remove(currentType, mouse.data_x, mouse.data_y);
				}
				else if(get(currentType, mouse.data_x, mouse.data_y) == null & currentType != "wall")
				{
					add(currentType, mouse.data_x, mouse.data_y)
				}
			}
			if(mouse.isMiddle)
			{
				//I dunno. Pan or something.
			}
		}
	}
}

///////////////////////// Saving and loading /////////////////////////

var save_format = {
	bool: {
		decode: function(a) { if(a == "T") {return true} if(a == "F") {return false}},
		encode: function(a) { if(a == true) {return "T"} if(a == false) {return "F"}}
	},
	map: {
		decode: function(str) {
			if(str == null) return []
			var d = []
			var data = str.split(";")

			for(var i = 0; i < data.length-1; i++)
			{
				var obj = data[i].split("*")
				var ntype = obj[2]
				if(ntype == "0") ntype = "wall"
				d.push({
					x: JSON.parse(obj[0]),
					y: JSON.parse(obj[1]),
					type: ntype
				})
			}
			return d;
		},
		encode: function(data) {
			var str = ""
			if(data == null) return "[]"
			for(var i = 0; i < data.length; i++)
			{
				var obj = data[i]
				str += obj.x + "*"
				str += obj.y + "*"
				if(obj.type == "wall") str += "0;"
				if(obj.type != "wall") str += obj.type + ";"
			}
			return str
		}
	}
}

function getSaveData()
{
	var save = ""
	save += save_format.bool.encode(render_walls)
	save += save_format.bool.encode(render_corner_dots)
	save += save_format.bool.encode(render_grid)
	save += save_format.bool.encode(render_stripes)
	save += save_format.bool.encode(render_shadows)
	save += " "

	save += save_format.map.encode(data)
	return save
}

function loadData(str)
{
	try
	{
		var a = str.split(" ")
		data = save_format.map.decode(a[1])

		render_walls =       save_format.bool.decode(a[0][0])
		render_corner_dots = save_format.bool.decode(a[0][1])
		render_grid =        save_format.bool.decode(a[0][2])
		render_stripes =     save_format.bool.decode(a[0][3])
		render_shadows =     save_format.bool.decode(a[0][4])

		document.getElementById("render_walls").checked = render_walls
		document.getElementById("render_corner_dots").checked = render_corner_dots
		document.getElementById("render_grid").checked = render_grid
		document.getElementById("render_stripes").checked = render_stripes
		document.getElementById("render_shadows").checked = render_shadows
		addPrevData()
		message("green", "Success: loaded!")
	}
	catch (e)
	{
		console.log(e)
		message("red", "Error: malformed save data! Check console for details.")
	}
}

///////////////////////// Misc /////////////////////////

function message(color, str)
{
	document.getElementById("message").innerHTML = ""
	setTimeout(function(){
		document.getElementById("message").style = "color: " + color
		document.getElementById("message").innerHTML = str
	}, 500)
}

function getCanvas(width, height)
{
	var canvas = document.createElement("canvas")
	canvas.width = width
	canvas.height = height
	var context = canvas.getContext("2d")
	context.width = width
	context.height = height
	return context
}

var layers = {
	fullRedraw: function() {
		this.background.redraw()
		this.stripes.redraw()
		this.grid.redraw()
		this.emptyCells.redraw()
		this.shadows.redraw()
		this.features.redraw()
		this.mouse.redraw()
		this.selection.redraw()
		draw()
	},
	draw: function() {
		var canvas = c2
		var time0 = performance.now()
		this.background.draw(canvas)
		if(render_stripes) this.stripes.draw(canvas)
		if(render_grid) this.grid.draw(canvas)
		this.emptyCells.draw(canvas)
		if(render_shadows) this.shadows.draw(canvas)
		this.features.draw(canvas)
		this.mouse.draw(canvas)
		this.selection.draw(canvas)
		var time1 = performance.now()
		console.log("Frame redrawn in " + (time1 - time0) + "ms")
	},
	background: {
		cache: null,
		draw: function(c) {
			if(this.cache == null) this.redraw()
			c.drawImage(this.cache, 0, 0)
		},
		redraw: function() {
			var c = getCanvas(c2.width, c2.height)

			c.fillStyle = colors.background
			c.fillRect(0,0,c.width, c.height)

			this.cache = c.canvas
			console.log("Background redraw")
		}
	},
	stripes: {
		cache: null,
		draw: function(c) {
			if(this.cache == null) this.redraw()
			c.drawImage(this.cache, 0, 0)
		},
		redraw: function() {
			var c = getCanvas(c2.width, c2.height)

			drawStripes(c)

			this.cache = c.canvas
			console.log("Stripes redraw")
		}
	},
	grid: {
		cache: null,
		draw: function(c) {
			if(this.cache == null) this.redraw()
			c.drawImage(this.cache, 0, 0)
		},
		redraw: function() {
			var c = getCanvas(c2.width, c2.height)

			drawGrid(c)

			this.cache = c.canvas
			console.log("Grid redraw")
		}
	},
	emptyCells: {
		cache: null,
		draw: function(c) {
			if(this.cache == null) this.redraw()
			c.drawImage(this.cache, 0, 0)
		},
		redraw: function() {
			var c = getCanvas(c2.width, c2.height)

			drawEmptyCells(c)

			this.cache = c.canvas
			console.log("Empty cell redraw")
		}
	},
	shadows: {
		cache: null,
		draw: function(c) {
			if(this.cache == null) this.redraw()
			c.drawImage(this.cache, 0, 0)
		},
		redraw: function() {
			var c = getCanvas(c2.width, c2.height)

			drawShadows(c)

			this.cache = c.canvas
			console.log("Shadows redraw")
		}
	},
	features: {
		cache: null,
		draw: function(c) {
			if(this.cache == null) this.redraw()
			c.drawImage(this.cache, 0, 0)
		},
		redraw: function() {
			var c = getCanvas(c2.width, c2.height)

			drawFeatures(c)

			this.cache = c.canvas
			console.log("Features redraw")
		}
	},
	mouse: {
		cache: null,
		draw: function(c) {
			if(this.cache == null) this.redraw()
			c.drawImage(this.cache, 0, 0)
		},
		redraw: function() {
			var c = getCanvas(c2.width, c2.height)

			drawMouse(c)

			this.cache = c.canvas
			console.log("Mouse redraw")
		}
	},
	selection: {
		cache: null,
		draw: function(c) {
			if(this.cache == null) this.redraw()
			c.drawImage(this.cache, 0, 0)
		},
		redraw: function() {
			var c = getCanvas(c2.width, c2.height)

			drawSelection(c)

			var image = new Image()
			image.src = c.canvas.toDataURL()
			this.cache = image
			console.log("Selection redraw")
		}
	},
}

function draw()
{
	layers.draw()
	localStorage.map = getSaveData()
}

if(localStorage.map != undefined) loadData(localStorage.map)
window.onload = function() {
	draw()
}

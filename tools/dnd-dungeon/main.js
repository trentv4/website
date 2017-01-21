var _c = document.getElementById("input_layer");
_c.width = _c.clientWidth; _c.height = _c.clientHeight;
var c2 = _c.getContext("2d")
c2.width = _c.clientWidth; c2.height = _c.clientHeight;

///////////////////////// Assigning and interacting with the DOM /////////////////////////

function val(inp)
{
	if(inp == false) return "none"
	if(inp == true) return "inline"
}

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
		localStorage.map = getSaveData()
		display.fullRedraw()
	}
}

document.getElementById("save-btn").addEventListener("click", function(e){
	document.getElementById("save-entry-form").value = getSaveData()
	localStorage.map = getSaveData()
	message("green", "Success: saved!")
})

document.getElementById("load-btn").addEventListener("click", function(e){
	loadData(document.getElementById("save-entry-form").value)
	localStorage.map = getSaveData()
	display.fullRedraw()
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
	localStorage.map = getSaveData()
	display.fullRedraw()
	message("green", "Success: cleared!")
})

document.getElementById("save-img-btn").addEventListener("click", function(e){

	var canvas2 = document.createElement("canvas")
	canvas2.width = _c.width
	canvas2.height = _c.height
	var context2 = canvas2.getContext("2d")
	context2.width = _c.width
	context2.height = _c.height
	context2.drawImage(display.layers.background.canvas.canvas, 0, 0)
	if(render_stripes) context2.drawImage(display.layers.stripes.canvas.canvas, 0, 0)
	if(render_grid) context2.drawImage(display.layers.grid.canvas.canvas, 0, 0)
	if(render_walls) context2.drawImage(display.layers.emptyCells.canvas.canvas, 0, 0)
	if(render_shadows) context2.drawImage(display.layers.shadows.canvas.canvas, 0, 0)
	context2.drawImage(display.layers.features.canvas.canvas, 0, 0)

	var image = canvas2.toDataURL();
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
		localStorage.map = getSaveData()
		display.layers.mouse.draw(display.layers.mouse.canvas)
 	}
}

document.addEventListener("keydown", function(x){
	var value = true;
	if(x.key == "Control") keyboard.ctrl = value;
	if(x.key == "Shift") keyboard.shift = value;
	if(x.code == "Delete") keyboard.delete = value;
	if(x.code == "KeyZ") keyboard.z = value;
	if(x.code == "KeyX") keyboard.x = value;
	if(x.code == "KeyC") keyboard.c = value;
	if(x.code == "KeyV") keyboard.v = value;
	if(x.code == "KeyR") keyboard.r = value;
	updateKeyboard()
})

document.addEventListener("keyup", function(x){
	var value = false;
	if(x.key == "Control") keyboard.ctrl = value;
	if(x.key == "Shift") keyboard.shift = value;
	if(x.code == "Delete") keyboard.delete = value;
	if(x.code == "KeyZ") keyboard.z = value;
	if(x.code == "KeyX") keyboard.x = value;
	if(x.code == "KeyC") keyboard.c = value;
	if(x.code == "KeyV") keyboard.v = value;
	if(x.code == "KeyR") keyboard.r = value;
	updateKeyboard()
})

///////////////////////// Creating objects and the tool list /////////////////////////

var objects = [
	{
		catname: "Tools:",
		objects: [
			{	name: "Wall Tool",
				id:   0,
				file: "images/wall.png",
				func: function() {
					console.log("Setting to: " + obj_ids[this.id].name)
					currentType = "wall"
					document.getElementById("current-tool").innerHTML = `Current tool: <img src="` + obj_ids[this.id].file + `"> `+obj_ids[this.id].name+``
					isSelecting = false
					selection = null
					display.layers.selection.draw(display.layers.selection.canvas)
				}
			},
			{	name: "Selection Tool",
				id:   14,
				file: "images/selection.png",
				func: function() {
					console.log("Setting to: " + obj_ids[this.id].name)
					isSelecting = true
					document.getElementById("current-tool").innerHTML = `Current tool: <img src="` + obj_ids[this.id].file + `"> `+obj_ids[this.id].name+``
					selection = null
					display.layers.selection.draw(display.layers.selection.canvas)
				}
			},
			{	name: "Text Tool",
				id:   15,
				file: "images/text.png",
				func: function() {
					isSelecting = false
					selection = null
					display.layers.selection.draw(display.layers.selection.canvas)
				}
			},
			{	name: "Wall (tile)",
				id:   1,
				file: "images/wall.png"
			},
			{	name: "Empty space",
				id:   10,
				file: "images/empty-space.png"
			},
		],
	},
	{
		catname: "Decorations",
		objects: [
			{	name: "Boxes",
				id:   2,
				file: "images/boxes.png"
			},
			{	name: "Crate",
				id:   3,
				file: "images/crate.png"
			},
			{	name: "Door",
				id:   7,
				file: "images/door.png"
			},
			{	name: "Stairs",
				id:   9,
				file: "images/stairs.png"
			},
		]
	},
	{
		catname: "Creatures",
		objects: [
			{	name: "Small creature",
				id: 11,
				file: "images/creature-small.png"
			},
			{	name: "Medium creature",
				id: 12,
				file: "images/creature-medium.png"
			},
			{	name: "Large creature",
				id: 6, //was previously 'enemy'
				file: "images/creature-large.png"
			},
			{	name: "NPC",
				id: 13, //was previously 'enemy'
				file: "images/npc.png"
			},
		]
	},
	{
		catname: "Traps:",
		objects: [
			{	name: "Spike Pit",
				id:   4,
				file: "images/spike-pit.png"
			},
			{	name: "Pressure Plate",
				id:   5,
				file: "images/pressure-plate.png"
			},
			{	name: "Water Pit",
				id:   8,
				file: "images/water-pit.png"
			},
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
		if(current_object.func != null)
		{
			img.addEventListener("click", current_object.func)
		}
		else
		{
			img.addEventListener("click", function(e){
				console.log("Setting to: " + obj_ids[this.id].name)
				currentType = this.id
				document.getElementById("current-tool").innerHTML = `Current tool: <img src="` + obj_ids[this.id].file + `"> `+obj_ids[this.id].name+``
				isSelecting = false
				selection = null
				display.layers.selection.draw(display.layers.selection.canvas)
			})
		}
		pre.appendChild(img)
		pre.appendChild(document.createTextNode(" " + current_object.name))
		div.appendChild(pre)
	}
	document.getElementById("tool-list").appendChild(div)
}

///////////////////////// Various objects /////////////////////////

var currentType = "wall"

var data = []
var currentRotation = 0

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
	r: false,
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
	display.fullRedraw()
}

function historyGoForward()
{
	if(prevDataIndex >= prevData.length - 1) return
	prevDataIndex++
	data = JSON.parse(JSON.stringify(prevData[prevDataIndex]))
	display.fullRedraw()
}

///////////////////////// Interaction /////////////////////////

// Adds a single object
function add(type, xx, yy, rotation)
{
	if(get(type, xx, yy) != null) return;

	var obj = {
		x:xx,
		y:yy,
		type: currentType,
		rotation: rotation
	}

	data.push(obj)
	addPrevData()
	if(type == "wall")
	{
		display.layers.shadows.draw(display.layers.shadows.canvas)
		display.layers.emptyCells.draw(display.layers.emptyCells.canvas)
	}
	else
	{
		display.layers.features.draw(display.layers.features.canvas)
	}
}

// Adds a collection of objects
function addAll(dataIn, x, y)
{
	for(var i = 0; i < dataIn.length; i++)
	{
		var obj = dataIn[i]
		if(get(obj.type, obj.x + x, obj.y + y) != null) continue;

		var cloneObj = {
			x: dataIn[i].x + x,
			y: dataIn[i].y + y,
			type: dataIn[i].type,
			rotation: dataIn[i].rotation
		}
		data.push(cloneObj)
	}
	addPrevData()
	display.layers.shadows.draw(display.layers.shadows.canvas)
	display.layers.emptyCells.draw(display.layers.emptyCells.canvas)
	display.layers.features.draw(display.layers.features.canvas)
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
		display.layers.shadows.draw(display.layers.shadows.canvas)
		display.layers.emptyCells.draw(display.layers.emptyCells.canvas)
	}
	else
	{
		display.layers.features.draw(display.layers.features.canvas)
	}
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
	display.layers.features.draw(display.layers.features.canvas)
	display.layers.shadows.draw(display.layers.shadows.canvas)
	display.layers.emptyCells.draw(display.layers.emptyCells.canvas)
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
	if(keyboard.r)
	{
		currentRotation = (currentRotation + 1) % 4
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
					display.layers.selection.draw(display.layers.selection.canvas)
				}
				selection.data_x2 = mouse.data_x
				selection.data_y2 = mouse.data_y
				display.layers.selection.draw(display.layers.selection.canvas)
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
					add(currentType, mouse.data_x, mouse.data_y, currentRotation)
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
	encode: function(data) {
		var str = ""
		if(data == null) return "[]"
		for(var i = 0; i < data.length; i++)
		{
			var obj = data[i]
			if(obj.rotation == null) obj.rotation = 0
			str += obj.x + "*"
			str += obj.y + "*"
			str += obj.rotation + "*"
			if(obj.type == "wall") str += "0;"
			if(obj.type != "wall") str += obj.type + ";"
		}
		return str
	},
	decoders: [
		function(str) { // Version 1
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
		function(str) { // Version 2
			if(str == null) return []
			var d = []
			var data = str.split(";")

			for(var i = 0; i < data.length-1; i++)
			{
				var obj = data[i].split("*")
				var ntype = obj[3]
				if(ntype == "0") ntype = "wall"
				d.push({
					x: JSON.parse(obj[0]),
					y: JSON.parse(obj[1]),
					rotation: JSON.parse(obj[2]),
					type: ntype
				})
			}
			return d;
		},
	]
}

function getSaveData()
{
	var save = ""
	save += "2 "
	save += save_format.bool.encode(render_walls)
	save += save_format.bool.encode(render_corner_dots)
	save += save_format.bool.encode(render_grid)
	save += save_format.bool.encode(render_stripes)
	save += save_format.bool.encode(render_shadows)
	save += " "

	save += save_format.encode(data)
	return save
}

function loadData(str)
{
	try
	{
		var a = str.split(" ")
		console.log("Save version: " + a[0])
		data = save_format.decoders[a[0]-1](a[2])

		render_walls =       save_format.bool.decode(a[1][0])
		render_corner_dots = save_format.bool.decode(a[1][1])
		render_grid =        save_format.bool.decode(a[1][2])
		render_stripes =     save_format.bool.decode(a[1][3])
		render_shadows =     save_format.bool.decode(a[1][4])

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

var display = {
	fullRedraw: function() {
		document.getElementById("emptyCells").style.display = val(render_walls)
		document.getElementById("grid").style.display = val(render_grid)
		document.getElementById("stripes").style.display = val(render_stripes)
		document.getElementById("shadows").style.display = val(render_shadows)

		this.layers.background.draw(this.layers.background.canvas)
		this.layers.stripes.draw(this.layers.stripes.canvas)
		this.layers.grid.draw(this.layers.grid.canvas)
		this.layers.emptyCells.draw(this.layers.emptyCells.canvas)
		this.layers.shadows.draw(this.layers.shadows.canvas)
		this.layers.features.draw(this.layers.features.canvas)
		this.layers.mouse.draw(this.layers.mouse.canvas)
		this.layers.selection.draw(this.layers.selection.canvas)
	},
	layers: {
		background: {
			canvas: document.getElementById("background").getContext("2d"),
			draw: function(c) {
				c.clearRect(0, 0, c.canvas.width, c.canvas.height)
				c.fillStyle = colors.background
				c.fillRect(0, 0, c.canvas.width, c.canvas.height)
				console.log("Background drawn")
			}
		},
		stripes: {
			canvas: document.getElementById("stripes").getContext("2d"),
			draw: function(c) {
				c.clearRect(0, 0, c.canvas.width, c.canvas.height)
				for(var x = 0; x < c.canvas.width/stripeDistance*2; x++)
				{
					c.strokeStyle = colors.wall_stripes
					c.beginPath();
					c.moveTo(x * stripeDistance, 0)
					c.lineTo(0,x * stripeDistance)
					c.stroke();
				}
				console.log("Stripes drawn")
			}
		},
		grid: {
			canvas: document.getElementById("grid").getContext("2d"),
			draw: function(c) {
				c.clearRect(0, 0, c.canvas.width, c.canvas.height)
				c.translate(0.5, 0.5) //to de-alias shit
				for(var x = 0; x < c.canvas.width/cellSize; x++)
				{
					for(var y = 0; y < c.canvas.height/cellSize; y++)
					{
						c.strokeStyle = colors.borders_grid
						c.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize)
					}
				}
				c.translate(-0.5, -0.5) //to de-alias shit
				console.log("Grid drawn")
			}
		},
		emptyCells: {
			canvas: document.getElementById("emptyCells").getContext("2d"),
			draw: function(c) {
				c.clearRect(0, 0, c.canvas.width, c.canvas.height)
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
				console.log("Empty cells drawn")
			}
		},
		shadows: {
			canvas: document.getElementById("shadows").getContext("2d"),
			draw: function(c) {
				c.clearRect(0, 0, c.canvas.width, c.canvas.height)
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
				console.log("Shadows drawn")
			}
		},
		features: {
			canvas: document.getElementById("features").getContext("2d"),
			draw: function(c) {
				c.clearRect(0, 0, c.canvas.width, c.canvas.height)
				if(data == null) return;
				for(var i = 0; i < data.length; i++)
				{
					var obj = data[i]
					if(obj.type != "wall")
					{
						var img = new Image()
						img.src = obj_ids[obj.type].file
						c.fillStyle = "#FF00FF"
						var rotation = (obj.rotation*90) * Math.PI/180
						var translateX = obj.x * cellSize
						var translateY = obj.y * cellSize
						c.translate(translateX, translateY)
						c.rotate(rotation)
						c.drawImage(img, 0, 0, cellSize+1, cellSize+1)
						c.rotate(-rotation)
						c.translate(-translateX, -translateY)
					}
				}
				console.log("Features drawn")
			}
		},
		mouse: {
			canvas: document.getElementById("mouse").getContext("2d"),
			draw: function(c) {
				c.clearRect(0, 0, c.canvas.width, c.canvas.height)
				if(mouse.data_y >= 0)
				{
					c.strokeStyle = colors.mouse_outline
					if(mouse.isRight | mouse.isLeft) c.strokeStyle = "#FFFF00"
					c.strokeRect(mouse.data_x * cellSize, mouse.data_y * cellSize, cellSize, cellSize)
				}
				console.log("Mouse drawn")
			}
		},
		selection: {
			canvas: document.getElementById("selection").getContext("2d"),
			draw: function(c) {
				c.clearRect(0, 0, c.canvas.width, c.canvas.height)
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
				console.log("Selection drawn")
			}
		},
	}
}

if(localStorage.map != undefined) loadData(localStorage.map)
window.onload = function() {
	display.fullRedraw()
}

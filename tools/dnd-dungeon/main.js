var _c = document.getElementById("dungeon_creator");
_c.width = _c.clientWidth; _c.height = _c.clientHeight;
var c = _c.getContext("2d")
c.width = _c.clientWidth; c.height = _c.clientHeight;

var currentType = "wall"

var _tools = document.getElementsByClassName("tool")
for(var i = 0; i < _tools.length; i++)
{
	var obj = _tools[i]
	if(obj.id == "Wall")
	{
		obj.addEventListener("click", function(){
			currentType = "wall"
			console.log("setting type to: wall")
			document.getElementById("current-tool").innerHTML = `Current tool: <img src="images/wall.png"> Wall`
		})
	}
	else
	{
		obj.addEventListener("click", function(e){
			var uri = this.src.replace(this.baseURI, "")

			currentType = uri
			console.log("setting type to: " + uri)
			document.getElementById("current-tool").innerHTML = `Current tool: <img src="`+uri+`"> `+this.id+``
		})
	}
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
		window.draw();
	}
}

document.getElementById("save-btn").addEventListener("click", function(e){
	document.getElementById("save-entry-form").value = getSaveData()
	message("green", "Success: saved!")
})

document.getElementById("load-btn").addEventListener("click", function(e){
	loadData(document.getElementById("save-entry-form").value)
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

var data = []

var mouse = {
	x: 0,
	y: 0,
	data_x: 0,
	data_y: 0,
	isLeft: false,
	isRight: false,
	isMiddle: false
}

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
	mouse.data_x = Math.floor(mouse.x / cellSize),
	mouse.data_y = Math.floor((mouse.y) / cellSize)
	updateMouse()
	draw()
}

function add(type, xx, yy)
{
	var obj = {
		x:xx,
		y:yy,
		type: currentType
	}
	data.push(obj)
	draw()
}

function get(type, x, y)
{
	for(var q = 0; q < data.length; q++)
	{
		var i = data[q]
		if(i.x == x & i.y == y & i.type == type)
		{
			return i;
		}
	}
}

function remove(type, x, y)
{
	var newData = []
	for(var q = 0; q < data.length; q++)
	{
		var i = data[q]
		if(type == "object")
		{
			if(i.x == x & i.y == y & i.type != "wall")
			{
				continue
			}
		}
		if(i.x == x & i.y == y & i.type == type)
		{
			continue
		}
		else {
			newData.push(i)
		}
	}
	data = newData
	draw()
}

function drawGrid()
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

function drawEmptyCells()
{
	if(data == null) return;
	for(var i = 0; i < data.length; i++)
	{
		var obj = data[i]

		if(obj.type == "wall")
		{
			if(!render_walls & render_corner_dots)
			{
				c.fillStyle = colors.borders_room
				c.fillRect(obj.x * cellSize, obj.y * cellSize, 1, 1)
				c.fillRect(obj.x * cellSize + cellSize, obj.y * cellSize, 1, 1)
				c.fillRect(obj.x * cellSize + cellSize, obj.y * cellSize + cellSize, 1, 1)
				c.fillRect(obj.x * cellSize, obj.y * cellSize + cellSize, 1, 1)
			}

			if(render_walls)
			{
				c.fillStyle = colors.borders_room
				c.fillRect(obj.x*cellSize, obj.y*cellSize, cellSize+1, cellSize+1)
			}

			c.fillStyle = colors.background
			c.fillRect(obj.x*cellSize+1, obj.y*cellSize+1, cellSize-1, cellSize-1)

			if(render_walls) //render walls
			{
				if(get("wall", obj.x, obj.y - 1) != null) c.fillRect(obj.x*cellSize+1, obj.y*cellSize-1, cellSize-1, 5)
				if(get("wall", obj.x, obj.y + 1) != null) c.fillRect(obj.x*cellSize+1, obj.y*cellSize-1+cellSize, cellSize-1, 5)
				if(get("wall", obj.x - 1, obj.y) != null) c.fillRect(obj.x*cellSize-1, obj.y*cellSize+1, 5, cellSize-1)
				if(get("wall", obj.x + 1, obj.y) != null) c.fillRect(obj.x*cellSize-1 + cellSize, obj.y*cellSize+1, 5, cellSize-1)
			}

			if(!render_corner_dots) //render corner dots
			{
				if(get("wall", obj.x - 1, obj.y - 1) != null) c.fillRect(obj.x*cellSize, obj.y*cellSize, 1, 1)
				if(get("wall", obj.x + 1, obj.y - 1) != null) c.fillRect(obj.x*cellSize + cellSize, obj.y*cellSize, 1, 1)
				if(get("wall", obj.x + 1, obj.y + 1) != null) c.fillRect(obj.x*cellSize + cellSize, obj.y*cellSize + cellSize, 1, 1)
				if(get("wall", obj.x - 1, obj.y + 1) != null) c.fillRect(obj.x*cellSize, obj.y*cellSize + cellSize, 1, 1)
			}
		}
	}
}

function drawFeatures()
{
	if(data == null) return;
	for(var i = 0; i < data.length; i++)
	{
		var obj = data[i]
		if(obj.type != "wall")
		{
			var img = new Image()
			img.src = obj.type
			c.drawImage(img, obj.x*cellSize, obj.y * cellSize, cellSize+1, cellSize+1)
		}
	}
}

function drawStripes()
{
	c.translate(0.5, 0.5) //to de-alias shit
	for(var x = 0; x < c.width/stripeDistance*2; x++)
	{
		c.strokeStyle = colors.wall_stripes
		c.beginPath();
		c.moveTo(x * stripeDistance, 0)
		c.lineTo(0,x * stripeDistance)
		c.stroke();
	}
	c.translate(-0.5, -0.5) //to de-alias shit
}

function updateMouse()
{
	if(mouse.data_y >= 0)
	{
		if(mouse.isRight)
		{
			if(currentType == "wall")
			{
				if(get(currentType, mouse.data_x, mouse.data_y) == null)
				{
					add(currentType, mouse.data_x, mouse.data_y)
				}
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

function drawMouse()
{
	if(mouse.data_y >= 0)
	{
		c.strokeStyle = colors.mouse_outline
		if(mouse.isRight | mouse.isLeft) c.strokeStyle = "#FFFF00"
		c.strokeRect(mouse.data_x * cellSize, mouse.data_y * cellSize, cellSize, cellSize)
	}
}

function message(color, str)
{
	document.getElementById("message").innerHTML = ""
	setTimeout(function(){
		document.getElementById("message").style = "color: " + color
		document.getElementById("message").innerHTML = str
	}, 500)
}

var save_format = {
	bool: {
		decode: function(a) { if(a == "T") {return true} if(a == "F") {return false}},
		encode: function(a) { if(a == true) {return "T"} if(a == false) {return "F"}}
	},
	map: {
		decode: function(str) {
			var d = []
			var data = str.split(";")

			for(var i = 0; i < data.length-1; i++)
			{
				var obj = data[i].split("*")
				var ntype = "images/" + obj[2]
				if(obj[2] == "wall") ntype = "wall"
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
				str += obj.type.replace("images/", "") + ";"
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
		message("green", "Success: loaded!")
	}
	catch (e)
	{
		console.log(e)
		message("red", "Error: malformed save data! Check console for details.")
	}
}

function drawShadows()
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

function draw()
{
	c.fillStyle = colors.background
	c.fillRect(0,0,c.width, c.height)
	c.lineWidth = 1;
	if(render_grid) drawGrid()
	if(render_stripes) drawStripes()
	drawEmptyCells()
	if(render_shadows) drawShadows()
	drawFeatures()
	drawMouse()
	localStorage.map = getSaveData()
}

if(localStorage.map != undefined)
{
	loadData(localStorage.map)
}
draw()

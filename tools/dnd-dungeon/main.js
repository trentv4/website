var _c = document.getElementById("dungeon_creator");
_c.width = _c.clientWidth; _c.height = _c.clientHeight;
var c = _c.getContext("2d")
c.width = _c.clientWidth; c.height = _c.clientHeight;

currentType = "wall"

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
			currentType = this.src
			console.log("setting type to: " + this.src)
			document.getElementById("current-tool").innerHTML = `Current tool: <img src="`+this.src+`"> `+this.id+``
		})
	}
}

document.getElementById("save-btn").addEventListener("click", function(e){
	document.getElementById("save-entry-form").value = getSaveData()
	message("green", "Success: saved!")
})

document.getElementById("load-btn").addEventListener("click", function(e){
	loadData(document.getElementById("save-entry-form").value)
})

var data = []

var mouse = {
	x: 0,
	y: 0,
	data_x: 0,
	data_y: 0,
	isDown: false
}

var baseObject = {
	x:0,
	y:0,
	type:"wall"
}

_c.onmousedown = function(x) { mouse.isDown = true; }
_c.onmouseup = function(x) { mouse.isDown = false; }
_c.onmousemove = function(x)
{
	mouse.x = x.offsetX
	mouse.y = x.offsetY
	mouse.data_x = Math.floor(mouse.x / cellSize),
	mouse.data_y = Math.floor((mouse.y) / cellSize)
}

function clone(obj)
{
	return JSON.parse(JSON.stringify(obj))
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
		if(i.x == x & i.y == y & i.type == type)
		{
			continue
		}
		else {
			newData.push(i)
		}
	}
	data = newData
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
	for(var i = 0; i < data.length; i++)
	{
		var obj = data[i]
		if(obj.type != "wall")
		{
			var img = new Image()
			img.src = obj.type
			c.drawImage(img, obj.x*cellSize, obj.y * cellSize, cellSize, cellSize)
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

var isDownStatus = null;
function drawMouse()
{
	if(mouse.data_y >= 0)
	{
		c.strokeStyle = colors.mouse_outline
		if(mouse.isDown)
		{
			c.strokeStyle = "#FFFF00"
			if(isDownStatus == null) isDownStatus = (get(currentType, mouse.data_x, mouse.data_y) != null)
			if(isDownStatus)
			{
				remove(currentType, mouse.data_x, mouse.data_y);
			}
			else
			{
				if(get(currentType, mouse.data_x, mouse.data_y) == null)
				{
					obj = clone(baseObject)
					obj.type = currentType;
					obj.x = mouse.data_x
					obj.y = mouse.data_y
					data.push(obj)
				}
			}
		}
		else
		{
			isDownStatus = null;
		}
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

function getSaveData()
{
	var save = ""
	save += render_walls + ";"
	save += render_corner_dots + ";"
	save += render_grid + ";"
	save += render_stripes + ";"
	save += render_shadows + ";"
	save += JSON.stringify(data)
	return save
}

function loadData(str)
{
	var d = str.split(';')
	try
	{
		render_walls = JSON.parse(d[0])
		render_corner_dots = JSON.parse(d[1])
		render_grid = JSON.parse(d[2])
		render_stripes = JSON.parse(d[3])
		render_shadows = JSON.parse(d[4])
		data = JSON.parse(d[5])
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
	docCookies.setItem("map", getSaveData())
}

setInterval(draw, 10);
loadData(docCookies.getItem("map"))

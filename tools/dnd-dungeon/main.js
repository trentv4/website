var _c = document.getElementById("dungeon_creator");
_c.width = _c.clientWidth; _c.height = _c.clientHeight;
var c = _c.getContext("2d")
c.width = _c.clientWidth; c.height = _c.clientHeight;

currentType = "wall"

var _tools = document.getElementsByClassName("tool")
for(var i = 0; i < _tools.length; i++)
{
	var obj = _tools[i]
	if(obj.id == "wall")
	{
		obj.addEventListener("click", function(){
			currentType = "wall"
			console.log("setting type to: wall")
			document.getElementById("current-tool").innerHTML = `<img src="images/wall.png"> Wall`
		})
	}
	else
	{
		obj.addEventListener("click", function(e){
			currentType = this.src
			console.log("setting type to: " + this.src)
			console.log(document.getElementById("current-tool").innerHTML)
			document.getElementById("current-tool").innerHTML = `<img src="`+this.src+`"> `+this.id+``
		})
	}
}

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
	mouse.data_y = Math.floor((mouse.y - 58) / cellSize)
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

function drawInterface()
{
	function drawBigBox(x, y, xSize, ySize)
	{
		c.beginPath()
		c.fillStyle="#1E1F2D"
		c.strokeStyle="#3A3D56"
		c.lineWidth = 6;
		c.rect(x, y, xSize, ySize)
		c.stroke()
		c.fill()
		c.closePath()
	}

	function drawTextBox(x, y, text)
	{
		c.beginPath()
		c.fillStyle="#424464"
		c.strokeStyle="#53557E"
		c.lineWidth = 6;
		var length = c.measureText(text).width + 10
		c.rect(x, y, length, 27)
		c.stroke()
		c.fill()
		c.closePath()
		c.font = "15px Arial"
		c.fillStyle="#EBEBEE"
		c.fillText(text, x + 5, y + 18)
	}

	drawBigBox(0,0,285,50)
	drawTextBox(15,15,"Load Map")
	drawTextBox(40 + c.measureText("Load Map").width ,15,"Save Map")
	drawTextBox(65 + c.measureText("Save Map").width + c.measureText("Load Map").width ,15,"Export Map")
}

function draw()
{
	c.fillStyle = colors.background
	c.fillRect(0,0,c.width, c.height)
	drawInterface()
	c.translate(0, 58)
	c.lineWidth = 1;
	if(render_grid) drawGrid()
	if(render_stripes) drawStripes()
	drawEmptyCells()
	drawFeatures()
	drawMouse()

	c.translate(0, -58)
}

setInterval(draw, 10);

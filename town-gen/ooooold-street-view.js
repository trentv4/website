var width = 800;
var height = 800;
var c = document.getElementById("c").getContext("2d");

function isWithinBounds(x, y)
{
	if(x > 0 & x < width)
	{
		if(y > 0 & y < height)
		{
			return true;
		}
	}
	return false;
}

function dist(x, y, x2, y2)
{
	return Math.hypot(x - x2, y - y2);
}

function dist(obj1, obj2)
{
	return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
}

function checkRange(x, y)
{
	for(var i = 0; i < nodes.length; i++)
	{
		if(Math.hypot(x - nodes[i].x, y - nodes[i].y) < min_dist)
		{
			return true;
		}
	}
	return false;
}

c.fillStyle = "#FFFFFF"
c.fillRect(0,0,width,height);

var nodes = [];


var node_size = 300;
var connection_variance = 2;
var connection_avg = 4;
var resolution = 40;
var min_dist = 50;

for(var i = 0; i < node_size; i++)
{
	var newX
	var newY
	var iterations =  0;
	do {
		iterations++
		newX = Math.floor(Math.random()*(width/resolution))*resolution
		newY = Math.floor(Math.random()*(height/resolution))*resolution
	} while(checkRange(newX, newY) & iterations < 200)
	nodes.push(
		{ x:newX, y:newY }
	)
}

for(var i = 0; i < nodes.length; i++)
{
	var list = [];
	for(var g = 0; g < nodes.length; g++)
	{
		list.push(nodes[g])
	}
	list.sort(function(a,b){return dist(nodes[i], a) - dist(nodes[i],b)})
	nodes[i].connections = list.splice(0,
		Math.floor(connection_avg + (Math.random()*(connection_variance/2))));
}

c.fillStyle = "#FFFFFF"
for(var i = 0; i < nodes.length; i++)
{
	if(false)
	{
		c.lineWidth="1";
		c.beginPath();
		c.arc(nodes[i].x, nodes[i].y, 10, 2*Math.PI, false)
		c.fill();
		c.stroke();
	}
	if(true)
	{
		for(var g = 0; g < nodes[i].connections.length; g++)
		{
			c.lineWidth="10";
			c.moveTo(nodes[i].x, nodes[i].y);
			c.lineTo(nodes[i].connections[g].x,
					 nodes[i].connections[g].y);
			c.stroke(); // Draw it
			c.moveTo(0,0);
			c.closePath();
		}
	}
}

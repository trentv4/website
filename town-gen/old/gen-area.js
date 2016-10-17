var width = 800;
var height = 800;
var c = document.getElementById("c").getContext("2d");
var mousex = 0;
var mousey = 0;
document.getElementById("c").addEventListener("mousemove", function(event){
	mousex = event.offsetX;
	mousey = event.offsetY;
})
c.strokeStyle = "black"
c.font = "15px sans-serif"
c.fillStyle = "white"
c.fillRect(0,0,width,height);

function generate_area()
{
	var nodes = []

	for(var i = 0; i < 5; i++)
	{
		createNode(undefined)
	}
}













function checkIfNothingInMaxDistance(node, maxDist, existingNodes)
{
	var a = true;
	for(var i = 0; i < existingNodes.length; i++)
	{
//		console.log(dist(node.x, node.y, existingNodes[i].x, existingNodes[i].y), maxDist)
		var d = dist(node.x, node.y, existingNodes[i].x, existingNodes[i].y);
		if(d != 0 && d < maxDist)
		{
			a = false
			return false
		}
	}
	return true;
}

function avg(x, x2)
{
	return (x+x2)/2
}

function distN(node1, node2)
{
	return dist(node1.x, node1.y, node2.x, node2.y)
}

function dist(x, y, x2, y2)
{
	return Math.hypot(x-x2, y-y2)
}

function ru(rangeUpper)
{
	return Math.floor(Math.random() * rangeUpper)
}

function r(rangeLower, rangeUpper)
{ //inclusive both ways
	return rangeLower + (Math.floor(Math.random() * (rangeUpper - rangeLower + 1)))
}

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

function generate_town(district_maxDistanceBetweenDistricts, district_maxDistrictSize, buildings_numberPerDistrict, buildings_distanceBetweenBuildings, road_maxDistanceBetweenBuildings, road_maxDistanceBetweenRoadNodes)
{
	c.fillStyle = "white"
	c.fillRect(0,0,width,height)
	var q = ["Shops", "Working", "Government", "Residential (high)", "Residental (low)"]

	var nodes = []
	var districts = []
	var road = []

	//pregenerate 1, then we can run the regular calculation
	districts.push({
		x: r(width/8, width - width/8),
		y: r(height/8, height - height/8)
	})
	for(var i = 1; i < q.length; i++)
	{
		var n = {}
		do {
			n.x = r(width/8, width - width/8)
			n.y = r(height/8, height - height/8)
		} while(!checkIfNothingInMaxDistance(n, district_maxDistanceBetweenDistricts*2, districts))

		districts.push(n)
		districts[i].text = q[i]
	}

	for(var i = 0; i < districts.length; i++)
	{
		for(var g = 0; g < buildings_numberPerDistrict; g++)
		{
			nodes.push(generateNode(nodes, districts[i].x, districts[i].y, district_maxDistrictSize, buildings_distanceBetweenBuildings))
		}
	}

	for(var i = 0; i < nodes.length; i++)
	{
		for(var g = i; g < nodes.length; g++)
		{
			var dist_nodes = distN(nodes[i], nodes[g])
			if(dist_nodes < road_maxDistanceBetweenBuildings && dist_nodes > 10)
			{
				road.push(
					{
						x: avg(nodes[i].x, nodes[g].x),
						y: avg(nodes[i].y, nodes[g].y)
					}
				)
			}
		}
	}

	c.fillStyle = "rgba(255, 0, 0, 0.25)" //red
	draw(districts, district_maxDistrictSize)
	c.fillStyle = "black"
	draw(road, 5)
//	drawRoad(road, 5, road_maxDistanceBetweenRoadNodes)
	c.fillStyle = "red"
	draw(nodes, 5)
}

function generateNode(existingNodes, centerX, centerY, distFromCenter, distanceBetweenBuildings)
{
	var n = {}
	do {
		n.x = r(centerX - distFromCenter, centerX + distFromCenter)
		n.y = r(centerY - distFromCenter, centerY + distFromCenter)
	} while(!checkIfNothingInMaxDistance(n, distanceBetweenBuildings, existingNodes))

	n.text = gasdf();


	return n
}

function gasdf()
{
	var type = [
		["'s Home", "Shawna Moreno", "Ernestine Ford", "Ethel Sullivan", "Melody Beck", "Lorian Andrews", "Josh Gregory", "Monique Palmer"],
		["Shop", "Alchemist ", "Tanner's ", "Blacksmith's ", "Mage's ", "General "]
	]
	var building_type = ru(type.length)
	var selection = ru(type[building_type].length)
	return type[building_type][selection] + type[building_type][0]
}

function draw(list, radius)
{
	for(var i = 0; i < list.length; i++)
	{
		c.lineWidth="1";
		c.beginPath();
		c.arc(list[i].x, list[i].y, radius, 2*Math.PI, false)
		c.fill();
		var prevStyle = c.fillStyle;
		c.fillStyle = "black"
		//c.fillText(list[i].text, list[i].x+15, list[i].y+5)
		c.fillStyle = prevStyle
	}
}

function drawRoad(roads, lineWidth, roadMaxDistance)
{
	c.lineWidth = lineWidth;
	for(var i = 0; i < roads.length; i++)
	{
		for(var g = i; g < roads.length; g++)
		{
			var dist_nodes = distN(roads[i], roads[g])
			if(dist_nodes < roadMaxDistance && dist_nodes > 0)
			{
				console.log("drawing road: " + i + "/"+roads.length, roads[i].x, roads[i].y, roads[g].x, roads[g].y)
				c.moveTo(roads[i].x, roads[i].y)
				c.lineTo(roads[g].x, roads[g].y)
				c.fill()
				c.stroke()
				c.closePath()
			}
		}
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

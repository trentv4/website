var width = 800;
var height = 800;
var c = document.getElementById("c").getContext("2d");
c.fillStyle = "white"
c.strokeStyle = "black"
c.fillRect(0,0,width,height);

function generate()
{
	var nodes = []

	draw(nodes)
}

function draw(list)
{
	for(var i = 0; i < list.length; i++)
	{
		c.lineWidth="1";
		c.beginPath();
		c.arc(list[i].x, list[i].y, 10, 2*Math.PI, false)
		c.fill();
		c.stroke();
	}
}

generate();

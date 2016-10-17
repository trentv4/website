var width = 800;
var height = 800;
var c = document.getElementById("c").getContext("2d");
c.strokeStyle = "black"
c.font = "15px sans-serif"

c.fillStyle = "white"
c.fillRect(0,0,width,height);

var tileSize = 25;

function generate_building()
{
	/*     Creating the map object     */
	var map = {
		data: [],
		get: function(x,y) {
			if(x < 0 | y < 0 | x >= this.sizeX | y >= this.sizeX) {
				return
			}
			return this.data[x][y]
		},
		set: function(x,y,obj) {
			if(x < 0 | y < 0 | x >= this.sizeX | y >= this.sizeX) {
				return
			}
			else {
				this.data[x][y] = obj;
			}
		},
		sizeX: width/tileSize,
		sizeY: height/tileSize
	}
	console.log(width/tileSize, tileSize, width)

	map.data = Array.apply(null, new Array(map.sizeX)).map(function(a,b){return Array.apply(null, new Array(map.sizeY)).map(function(c,d){ return {
		x: b,
		y: d,
		color: "green"
	}})})

	generate(map)

	for(var x = 0; x < map.sizeX; x++)
	{
		for(var y = 0; y < map.sizeY; y++)
		{
			var tile = map.get(x,y)
			c.fillStyle = "black"
			c.fillRect(tile.x*tileSize, tile.y*tileSize, tileSize, tileSize)
			c.fillStyle = tile.color
			var borderSize = 1;
			c.fillRect(tile.x*tileSize+borderSize, tile.y*tileSize+borderSize, tileSize-borderSize, tileSize-borderSize)
		}
	}
	console.log("Function exited. Logging pertinent information...")
	console.log(map)
}

/*     Generate!     */

function generate(map)
{

}

function set(x,y,xs,ys, map)
{

}

/*     Map Analysis Utilities     */

function doesTileExist(x, y, map)
{
	if(map.get(x,y) != undefined)
	{
		if(map.get(x,y).type == "open")
		{
			return false;
		}
	}
	return true;
}

function ru(rangeUpper)
{
	return Math.floor(Math.random() * rangeUpper)
}

function r(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var width = 800;
var height = 800;
var c = document.getElementById("c").getContext("2d");
c.strokeStyle = "black"
c.font = "15px sans-serif"

c.fillStyle = "white"
c.fillRect(0,0,width,height);

function generate_town()
{
	var tileSize = 10;
	var map = {
		isValid: function(x,y) {
			if(x < 0 | y < 0 | x >= this.sizeX | y >= this.sizeX) return false
			return true
		},
		get: function(x,y) {
			if(this.isValid(x,y)) return this.data[x][y]
		},
		set: function(x,y,obj) {
			if(this.isValid(x,y)) this.data[x][y] = obj
		},
		sizeX: width/tileSize,
		sizeY: height/tileSize
	}
	map.data = Array.apply(null, new Array(map.sizeX)).map(function(a,b){return Array.apply(null, new Array(map.sizeY)).map(function(c,d){ return getTile(0, b, d)})})
	createTile(map)
	draw(map, tileSize, 1)
}



/*     Tile creation     */

function createTile(map)
{
	var tileShapes = [
		[
			[0,0,1,1,1,1,0],
			[0,0,1,4,3,4,4],
			[0,0,1,3,2,2,4],
			[4,4,4,4,2,2,4],
			[4,2,2,2,2,2,4],
			[4,4,3,4,4,4,4],
			[0,1,1,1,0,0,0]
		],
		[
			[0,1,1,1,0],
			[4,4,3,4,4],
			[4,2,2,2,4],
			[4,2,2,2,4],
			[4,2,2,2,4],
			[4,4,4,4,4]
		],
		[
			[4,4,4,4,4,1,0],
			[4,2,2,2,4,1,1],
			[4,3,4,2,4,3,4],
			[1,1,4,2,2,2,4],
			[0,1,4,4,3,4,4]
		],
		[
			[4,4,4,4,4,1],
			[4,2,2,2,4,1],
			[4,2,4,4,4,1],
			[4,2,3,1,1,1],
			[4,2,3,1,1,1],
			[4,2,4,4,4,1],
			[4,2,2,2,4,1],
			[4,4,4,4,4,1]
		]
		//4: wall
		//3: door
		//2: interior
		//1: mandated empty
		//0: can be overwritten
	]
	var tileShape = tileShapes[ru(tileShapes.length)]
	tileShape = rotateShape(tileShape, ru(4))
	var xRand = r(0, map.sizeX-1)
	var yRand = r(0, map.sizeY-1)
	var iterations = 0
	do {
		iterations++
		var xRand = r(0, map.sizeX-1)
		var yRand = r(0, map.sizeY-1)
	} while(isTileSetAreaFull(tileShape, xRand, yRand, map) & iterations < 200)
	if(iterations == 200)
	{
		console.log("Iterations over max!")
		return
	}
	for(var x = 0; x < tileShape.length; x++)
	{
		for(var y = 0; y < tileShape[x].length; y++)
		{
			if(tileShape[x][y] == 1)
			{
				map.set(x + xRand, y + yRand,{
					x:x + xRand,
					y:y + yRand,
					color: "white",
					type: "open-space"
				})
			}
			if(tileShape[x][y] == 2)
			{
				map.set(x + xRand, y + yRand,{
					x:x + xRand,
					y:y + yRand,
					color: "green",
					type: "building"
				})
			}
			if(tileShape[x][y] == 3)
			{
				map.set(x + xRand, y + yRand,{
					x:x + xRand,
					y:y + yRand,
					color: "grey",
					type: "door"
				})
			}
			if(tileShape[x][y] == 4)
			{
				map.set(x + xRand, y + yRand,{
					x:x + xRand,
					y:y + yRand,
					color: "black",
					type: "wall"
				})
			}
		}
	}
}

var width = 800;
var height = 800;
var c = document.getElementById("c").getContext("2d");
c.strokeStyle = "black"
c.font = "15px sans-serif"

c.fillStyle = "white"
c.fillRect(0,0,width,height);

var tileSize = 10;


function generate_town()
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

	/*     Populating the map data     */
	for(var x = 0; x < map.sizeX; x++)
	{
		map.data[x] = []
		for(var y = 0; y < map.sizeY; y++)
		{
			map.set(x,y,{
				x: x,
				y: y,
				color: "white",
				type: "open"
			})
		}
	}

	/*     Creating nodes     */
	var randomNodeCount = 275;
	for(var i = 0; i < randomNodeCount; i++)
	{
		createTile(map)
	}


	/*     Drawing     */

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

function rotateShape(shape, rotateNumber)
{
	var s = shape;
	for(var i = 0; i < rotateNumber; i++)
	{
		var newArray = s[0].map(function(col, i) {
			return s.map(function(row) {
				return row[i]
			})
		});
		s = newArray
	}
	return s
}

function isTileSetAreaFull(shape, xBase, yBase, map)
{
	for(var x = 0; x < shape.length; x++)
	{
		for(var y = 0; y < shape[x].length; y++)
		{
			if(shape[x][y] != 0)
			{
				if(map.get(x + xBase, y + yBase) != undefined)
				{
					if(doesTileExist(x + xBase,y + yBase,map))
					{
						return true;
					}
				}
			}
		}
	}
	return false
}

/*     Utilities     */

function dist(x, y, x2, y2)
{
	return Math.hypot(x-x2, y-y2)
}

function ru(rangeUpper)
{
	return Math.floor(Math.random() * rangeUpper)
}

function r(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw(map, tileSize, borderSize)
{
	for(var x = 0; x < map.sizeX; x++)
	{
		for(var y = 0; y < map.sizeY; y++)
		{
			var tile = map.get(x,y)
			c.fillStyle = "black"
			c.fillRect(tile.x*tileSize, tile.y*tileSize, tileSize, tileSize)
			c.fillStyle = tile.color
			c.fillRect(tile.x*tileSize+borderSize, tile.y*tileSize+borderSize, tileSize-borderSize, tileSize-borderSize)
		}
	}
}

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

function getTile(number, x, y)
{
	switch(number)
	{
		case 0: return {
			x: x,
			y: y,
			color: "white",
			type: "open"
		}
		case 1: return {
			x: x,
			y: y,
			color: "white",
			type: "mandated-open"
		}
		case 2: return {
			x: x,
			y: y,
			color: "#ededed",
			type: "building-interior"
		}
		case 3: return {
			x: x,
			y: y,
			color: "grey",
			type: "door"
		}
		case 4: return {
			x: x,
			y: y,
			color: "black",
			type: "wall"
		}
	}
}

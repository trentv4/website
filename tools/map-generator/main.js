let display = {
  register: (id, x, y, drawFunc) => {
    let object = document.createElement("canvas")
    object.id = id
    object.width = x
    object.height = y
    document.getElementById("page").appendChild(object)
    display[id] = {
      canvas: object.getContext("2d"),
      draw: drawFunc
    }
  }
}

let mapX = 600
let mapY = 800

let mapData = {
  data: new Array(mapX).fill(new Array(mapY).fill({r: 128, g: 0, b: 128})),
  populate: () => {
    for(let x = 0; x < mapX; x++) {
      for(let y = 0; y < mapY; y++) {
        mapData.data[x][y] = getPixel(x, y, mapData.data[x][y])
      }
    }
  }
}

display.register("main", mapX, mapY, () => {
  let c = display.main.canvas

  let imageData = c.getImageData(0, 0, mapX, mapY)

  for(let nx = 0; nx < mapX; nx++) {
    for(let ny = 0; ny < mapY; ny++) {
      let i = (ny * mapX + nx) * 4 - 1
      let d = mapData.data[nx][ny]
      if(d.b != 0) console.log(i)
      imageData.data[++i]   = d.r
      imageData.data[++i] = d.g
      imageData.data[++i] = d.b
      imageData.data[++i] = 255
    }
  }

  c.putImageData(imageData, 0, 0)
})

// Actual generation goes here

noise.seed(0)

noise1 = (x, y) => noise.simplex2(x,y)/2 + 0.5

function getPixel(x, y, initial) {
  let value = noise1(x, y)

  let color = {
    r: 0,
    g: 0,
    b: 0
  }

  if(x % 16 == 0) {
    color.b = 255
  }
  if(y % 16 == 0) {
    color.g = 255
  }

  return color
}

greyscale = (i) => {
  return {r: i*255, g: i*255, b: i*255};
}

mapData.populate()
display.main.draw()

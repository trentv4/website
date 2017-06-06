let display = {
  register: (id, x, y, drawFunc) => {
    let object = document.createElement("canvas")
    object.id = id
    object.width = x
    object.height = y
    document.getElementById("page").appendChild(object)
    let ctx = object.getContext("2d")
    ctx.width = x
    ctx.height = y
    display[id] = {
      canvas: ctx,
      draw: drawFunc
    }
  }
}

let mapX = 10
let mapY = 20

let mapData = {
  data: new Array(mapX).fill(new Array(mapY).fill({r: 128, g: 0, b: 128})),
  populate: () => {
    for(let nx = 0; nx < mapX; nx++) {
      for(let ny = 0; ny < mapY; ny++) {
        mapData.data[nx][ny] = getPixel(nx, ny, mapData.data[nx][ny])
      }
    }
  }
}

display.register("main", mapX, mapY, (mapData) => {
  let c = display.main.canvas

  let imageData = c.getImageData(0, 0, mapX, mapY)
  for(let nx = 0; nx < mapX; nx++) {
    for(let ny = 0; ny < mapY; ny++) {
      let i = (ny * mapX + nx) * 4 - 1
      let d = mapData.data[nx][ny]

      imageData.data[++i] = d.r
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

function getPixel(xIn, yIn, initial) {
  let newColor = {
    r: 0,
    g: 0,
    b: 0
  }

  if(yIn % 2 == 0) {
    newColor.r = 255
  }
  if(xIn % 2 == 0) {
    newColor.g = 255
  }

  return newColor
}

greyscale = (i) => {
  return {r: i*255, g: i*255, b: i*255};
}

mapData.populate()
display.main.draw(mapData)

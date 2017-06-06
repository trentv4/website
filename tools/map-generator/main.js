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

let mapX = 600
let mapY = 800

let mapData = {
  data: [],
  populate: () => {
    for(let nx = 0; nx < mapX; nx++) {
      if(mapData.data[nx] == null) mapData.data[nx] = []
      for(let ny = 0; ny < mapY; ny++) {
        if(mapData.data[nx][ny] == null) mapData.data[nx][ny] = {r: 128, g: 0, b: 128}
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
      imageData.data[++i] = mapData.data[nx][ny].r
      imageData.data[++i] = mapData.data[nx][ny].g
      imageData.data[++i] = mapData.data[nx][ny].b
      imageData.data[++i] = 255
    }
  }

  c.putImageData(imageData, 0, 0)
})

// Actual generation goes here

noise.seed(0)

noise1 = (x, y) => noise.simplex2(x,y)/2 + 0.5

function getPixel(x, y, initial) {
  return greyscale(noise1(x, y))
}

greyscale = (i) => {
  return {r: i*255, g: i*255, b: i*255};
}

mapData.populate()
display.main.draw(mapData)

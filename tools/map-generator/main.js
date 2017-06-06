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

noise.seed(Math.random())

n = (x, y, frequency, amplitude) => noise.perlin2(x * frequency, y *  frequency) * amplitude

function getPixel(x, y, initial) {
  let nx = x / mapX - 0.5
  let ny = y / mapY - 0.5

  let pixel = 0
  pixel += n(nx, ny, 4, 0.5)
  pixel += n(nx, ny, 8, 0.25)
  pixel += n(nx, ny, 16, 0.125)
  pixel += n(nx, ny, 32, 0.125)

  pixel = pixel + 1 / 2

  pixel = Math.pow(pixel, 2.0)

  let c = greyscale(pixel)
  if(pixel < 0.6) c.g += 64
  if(pixel < 0.2) c.b += 128

//  c = greyscale(pixel)
  return c
}

color = (r,g,b) => ({r: r, g: g, b: b})
greyscale = (i) => ({r: i*255, g: i*255, b: i*255})

mapData.populate()
display.main.draw(mapData)

perlin = (x, y, frequency, amplitude) => noise.perlin2(x * frequency, y *  frequency) * amplitude
simplex = (x, y, frequency, amplitude) => noise.simplex2(x * frequency, y *  frequency) * amplitude
color = (r,g,b) => ({r: r, g: g, b: b})
greyscale = (i) => ({r: i*255, g: i*255, b: i*255})

let display = {
  register: (id, x, y, drawFunc, context, z) => {
    let object = document.createElement("canvas")
    object.id = id
    object.width = x
    object.height = y
    object.style = "z-index: " + z
    object.setZIndex = (e) => {
      object.style = "z-index: " + e
    }
    document.getElementById("page").appendChild(object)
    let ctx = object.getContext(context)
    ctx.width = x
    ctx.height = y
    display[id] = {
      canvas: ctx,
      element: object,
      draw: drawFunc
    }
  }
}

let mapX = 600
let mapY = 800

let mapData = {
  data: [],
  populate: () => {
    for(let x = 0; x < mapX; x++) {
      if(mapData.data[x] == null) mapData.data[x] = []
      for(let y = 0; y < mapY; y++) {
        if(mapData.data[x][y] == null) mapData.data[x][y] = {r: 128, g: 0, b: 128}

        let nx = x / mapX - 0.5
        let ny = y / mapY - 0.5

        let pixel = 0
        pixel += perlin(nx, ny, 4, 0.5)
        pixel += perlin(nx, ny, 8, 0.25)
        pixel += perlin(nx, ny, 16, 0.125)
        pixel += perlin(nx, ny, 32, 0.125)

        pixel = pixel + 1 / 2

        pixel = Math.pow(pixel, 2.0)

        let c = greyscale(pixel)
        if(pixel < 0.6) c.g += 64
        if(pixel < 0.2) c.b += 128

        mapData.data[x][y] = c
      }
    }
  }
}

/* This is the 2D heightmap version */

display.register("terrain2D", mapX, mapY, (mapData) => {
  let c = display.terrain2D.canvas

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
}, "2d", 0)

/* This is the 3D heightmap / terrain view version */

display.register("terrain3D", mapX, mapY, (mapData) => {
  let c = display.terrain3D.canvas

  
}, "webgl", 0)

noise.seed(Math.random()*0)
mapData.populate()
display.terrain3D.draw(mapData)

perlin = (x, y, frequency, amplitude) => noise.perlin2(x * frequency, y *  frequency) * amplitude
simplex = (x, y, frequency, amplitude) => noise.simplex2(x * frequency, y *  frequency) * amplitude
color = (r,g,b) => ({r: r, g: g, b: b})
greyscale = (i) => ({r: i*255, g: i*255, b: i*255})
normalize = (i) => {
  if(i > 1) return 1
  if(i <= 0) return 0
  return i
}

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

let mapX = 1000
let mapY = 800
let rand = Math.random()

let mapData = {
  terrainData: [],
  climateData: [],
  riverData: [],
  forAll: (data, func) => {
    for(let x = 0; x < mapX; x++) {
      if(data[x] == null) {
        data[x] = []
      }
      for(let y = 0; y < mapY; y++) {
        if(data[x][y] == null) {
          data[x][y] = 0
        }
        let nx = x / mapX - 0.5
        let ny = y / mapY - 0.5

        func(x, y, nx, ny, data)
      }
    }
  },
  populate: () => {
    noise.seed(rand)
    mapData.forAll(mapData.terrainData, (x, y, nx, ny, data) => {
      let pixel = 0
      pixel += perlin(nx, ny, 4, 0.5)
      pixel += perlin(nx, ny, 8, 0.25)
      pixel += perlin(nx, ny, 16, 0.125)
      pixel += perlin(nx, ny, 32, 0.125)

      pixel = pixel + 1 / 2

      pixel = Math.pow(pixel, 2.0)

      data[x][y] = pixel
    })
    noise.seed(rand + 1)
    mapData.forAll(mapData.riverData, (x, y, nx, ny, data) => {
      let pixel = 0

      data[x][y] = pixel
    })
    noise.seed(rand + 2)
    mapData.forAll(mapData.climateData, (x, y, nx, ny, data) => {
      let pixel = 0
      pixel += perlin(nx, ny, 2, 0.5)
      pixel += perlin(nx, ny, 2, 0.25)
      pixel += perlin(nx, ny, 4, 0.25)

      pixel = pixel + 1 / 2

      data[x][y] = pixel
    })
  }
}

/* This is the 2D heightmap version */
let track = 0
display.register("terrain2D", mapX, mapY, (mapData) => {
  let c = display.terrain2D.canvas

  let imageData = c.getImageData(0, 0, mapX, mapY)
  for(let nx = 0; nx < mapX; nx++) {
    for(let ny = 0; ny < mapY; ny++) {
      let i = (ny * mapX + nx) * 4 - 1

      let terrain = mapData.terrainData[nx][ny]
      let river = normalize(1-mapData.riverData[nx][ny])
      let climate = mapData.climateData[nx][ny]

      let waterLevel = 0.2
      let mtnLevel = 0.6
      let rounding = 20;

      let c = greyscale(Math.round(terrain * rounding)/rounding)
      if(rounding == 0) c = greyscale(terrain)

      if(terrain < mtnLevel & terrain > waterLevel) {
        c.g += 64
      }
      if(terrain < waterLevel) {
        c.b += 180
        c.g += 64
      }

      //c = greyscale(climate)

      imageData.data[++i] = c.r
      imageData.data[++i] = c.g
      imageData.data[++i] = c.b
      imageData.data[++i] = 255
    }
  }

  c.putImageData(imageData, 0, 0)
}, "2d", 0)

/* This is the 3D heightmap / terrain view version */

display.register("terrain3D", mapX, mapY, (mapData) => {
  let c = display.terrain3D.canvas


}, "webgl", 0)

mapData.populate()
display.terrain2D.draw(mapData)

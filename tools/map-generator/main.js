get = (e) => document.getElementById(e)
make = (e) => document.createElement(e)

let display = {
  colors: {
    background: "#FFFFFF"
  },
  index: 0,
  register: (id, x, y, drawFunc) => {
    let object = make("canvas")
    object.id = id
    object.width = x
    object.height = y
    object.style = "z-index: " + display.index
    display.index++
    get("canvas-container").appendChild(object)
    if(display[id] == null) display[id] = {}
    display[id].canvas = object.getContext("2d")
    if(drawFunc != null) display[id].draw = drawFunc
  },
  draw: () => {
    display.background.draw(mapData)
  }
}

let mapX = 600,
    mapY = 800

display.register("background", mapX, mapY, (mapData) => {
  let c = display.background.canvas
  c.fillStyle = display.colors.background
  c.fillRect(0, 0, c.canvas.width, c.canvas.height)

  let imageData = c.getImageData(0, 0, mapX, mapY)
  let dat = imageData.data

  for(let i = 0; i < dat.length; i += 4) {
    let f = (i / dat.length) * 255
    if(mapData.get(i) == null) console.log(i)
    dat[i]     = mapData.get(i).r
    dat[i + 1] = mapData.get(i).g
    dat[i + 2] = mapData.get(i).b
    dat[i + 3] = 255
  }

  c.putImageData(imageData, 0, 0)
})

let mapData = {
  data: new Array(mapX).fill(new Array(mapY).fill({r: 128, g: 0, b: 128})),
  get: (i) =>  mapData.data[i % mapX][i % mapY],
  populate: () => {
    for(let x = 0; x < mapX; x++) {
      for(let y = 0; y < mapY; y++) {
        mapData.data[x][y] = getPixel(x, y, mapData.data[x][y])
      }
    }
  }
}

function getPixel(x, y, initial) {
  let pixel = {
    r: 0,
    g: 0,
    b: 0
  }
  return initial
}

mapData.populate()
display.draw()

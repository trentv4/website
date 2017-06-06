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

let mapX = 800
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

  let i = 0;
  for(let x = 0; x < mapX; x++) {
    for(let y = 0; y < mapY; y++) {
      i = ((x * mapX) + y) * 4
      imageData.data[i]     = mapData.data[x][y].r
      imageData.data[i + 1] = mapData.data[x][y].g
      imageData.data[i + 2] = mapData.data[x][y].b
      imageData.data[i + 3] = 255
    }
  }

  c.putImageData(imageData, 0, 0)
})

// Actual generation goes here

function getPixel(x, y, initial) {
  let pixel = {
    r: 0,
    g: 0,
    b: 0
  }
  return pixel
}

mapData.populate()
display.main.draw()

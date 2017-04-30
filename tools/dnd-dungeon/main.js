var _c = document.getElementById("input_layer")
_c.width = _c.clientWidth; _c.height = _c.clientHeight
var c2 = _c.getContext("2d")
c2.width = _c.clientWidth; c2.height = _c.clientHeight

let currentType = "wall"
let rotation = 0

let camera = {
  x: 0,
  y: 0
}

let map = {
  data: [[]],
  verifyArrayFits: (x, y) => {
    let data = map.data

    if(data.length <= x) {
      let missingDataLength = x - data.length + 1
      for(let i = 0; i < missingDataLength; i++) {
        data.push([])
      }
    }
    if(data[x].length <= y) {
      let missingDataLength = y - data[x].length + 1
      for(let i = 0; i < missingDataLength; i++) {
        data[x].push([])
      }
    }
  },
  get: (type, x, y) => {
    if(x < 0 | y < 0) return null
    let data = map.data
    map.verifyArrayFits(x, y)
    if(type == "all") return data[x][y]

    let position = data[x][y]
    for(let i = 0; i < position.length; i++)
    {
      if(position[i] != null)
      {
        if(position[i].type == type) return position[i]
      }
    }
  },
  add: (type, x, y, rotation) => {
    let data = map.data
    map.verifyArrayFits(x, y)

    if(map.get(type, x, y) != null) return

    if(rotation == null) rotation = 0

    let newObject = {
      x: x,
      y: y,
      type: type,
      rotation: rotation
    }

    data[x][y].push(newObject)
  },
  remove: (type, x, y) => {
    let data = map.data
    map.verifyArrayFits(x, y)

    if(map.get(type, x, y) == null & type != "object") return

    let position = data[x][y]

    if(type == "all")
    {
      data[x][y] = []
      return
    }

    for(let i = 0; i < position.length; i++)
    {
      if(position[i] != null)
      {
        if(position[i].type != "wall" & type == "object") {
          data[x][y][i] = null
        }
        else if(position[i].type == type) {
          data[x][y][i] = null
          return
        }
      }
    }
  },
  getMapAsList: () => {
    let data = map.data
    let list = []
    for(let x = 0; x < data.length; x++) {
      for(let y = 0; y < data[x].length; y++) {
        let instance = data[x][y]
        if(instance.length == 0) continue
        for(let i = 0; i < instance.length; i++)
        {
          if(instance[i] == null) continue
          list.push(instance[i])
        }
      }
    }
    return list
  }
}

map.add("wall", 5, 5)
map.add("wall", 0, 0)
map.add("wall", 4, 5)
map.add("wall", 5, 4)
map.add("wall", 5, 6)
map.add("wall", 7, 6)
map.add("wall", 6, 6)
map.add("wall", 4, 6)
map.add("wall", 3, 6)
map.add("wall", 2, 6)
map.add("wall", 2, 5)

map.add(23, 4, 5)
map.add(23, 1, 0)

function enableStressTest() {
  for(let x = 0; x < 45; x++) {
    for(let y = 0; y < 25; y++) {
      map.add("wall", x, y)
      for(let i = 5; i < 20; i++) {
        map.add(i, x, y)
      }
    }
  }
}

setInterval(() => {
  let start = new Date().getMilliseconds()
  display.draw()
  get("frametime").innerHTML = "Frame time: " + (new Date().getMilliseconds() - start) + " ms"
}, 16)

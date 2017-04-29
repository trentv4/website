var _c = document.getElementById("input_layer")
_c.width = _c.clientWidth; _c.height = _c.clientHeight
var c2 = _c.getContext("2d")
c2.width = _c.clientWidth; c2.height = _c.clientHeight

init(objects)

let currentType = ""

let display = {

}

let map = {
  data: [[]],
  verifyArrayFits: (x, y) => {
    let data = map.data

    if(data.length < x) {
      let missingDataLength = x - data.length + 1
      for(let i = 0; i < missingDataLength; i++) {
        data.push([])
      }
    }
    if(data[x].length < y) {
      let missingDataLength = y - data[x].length + 1
      for(let i = 0; i < missingDataLength; i++) {
        data[x].push([])
      }
    }
  },
  get: (type, x, y) => {
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
  remove: (type, x, y, rotation) => {
    let data = map.data
    map.verifyArrayFits(x, y)

    if(map.get(type, x, y) == null) return

    let position = data[x][y]

    if(type == "all")
    {
      data[x][y] = []
      return
    }

    for(let i = 0; i < position.length; i++)
    {
      if(position[i].type == type)
      {
        data[x][y][i] = null
        return
      }
    }
  }
}

map.add("asdf", 5, 5)
map.remove("asdf", 5, 5)
map.add("asdf", 5, 5)
console.log(map.get("asdf", 5, 5))

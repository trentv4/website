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
    if(data.length < x) {
      let missingDataLength = x - data.length
      for(let i = 0; i < missingDataLength; i++) {
        data.push([])
      }
    }
  },
  get: (type, x, y) => {
    let data = map.data

    return data[x - 1][y - 1]
  },
  add: (type, x, y, rotation) => {
    let data = map.data

    if(rotation == null) rotation = 0
    let newObject = {
      x: x,
      y: y,
      type: currentType,
      rotation: rotation
    }

    console.log(data[x - 1][y - 1])
  },
  remove: (type, x, y, rotation) => {

  }
}

map.add("asdf", 5, 5)
map.get(null, 5, 5)
console.log(map.data)

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

let selection = {
  x: 0,
  y: 0,
  x2: 0,
  y2: 0,
  isSelecting: false,
  clear: () => {
    selection.x = 0
    selection.y = 0
    selection.x2 = 0
    selection.y2 = 0
    selection.isSelecting = false
    display.selection.draw()
  },
  forEach: (func) => {
    let smallX = selection.x < selection.x2 ? selection.x : selection.x2
    let smallY = selection.y < selection.y2 ? selection.y : selection.y2
    let width = Math.abs(selection.x - selection.x2)
    let height = Math.abs(selection.y - selection.y2)
    for(let x = 0; x <= width; x++) {
      for(let y = 0; y <= height; y++) {
        func(smallX + x, smallY + y)
      }
    }
  }
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
  add: (type, x, y, rotation, redraw) => {
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
    if(redraw == undefined) {
      display.redrawOnChange(type)
      localStorage.map = saveHandler.save(map)
    }
  },
  remove: (type, x, y, isSav) => {
    let data = map.data
    map.verifyArrayFits(x, y)

    if(map.get(type, x, y) == null & type != "object") return

    let position = data[x][y]

    if(type == "all") {
      data[x][y] = []
      return
    }
    else {
      for(let i = 0; i < position.length; i++)
      {
        if(position[i] != null)
        {
          if(position[i].type != "wall" & type == "object") {
            data[x][y][i] = null
          }
          else if(position[i].type == type) {
            data[x][y][i] = null
          }
        }
      }
    }

    localStorage.map = saveHandler.save(map)
    display.redrawOnChange(type)
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
  },
  clear: () => {
    let list = map.getMapAsList()
    list.forEach((value, index, array) => {
      map.remove(value.type, value.x, value.y)
    })
    localStorage.map = saveHandler.save(map)
  }
}

let saveHandler = {
  save: (map) => {
    let saveEncoded = "3 "
    saveEncoded += render_walls.value ? "T" : "F"
    saveEncoded += render_corner_dots.value ? "T" : "F"
    saveEncoded += render_grid.value ? "T" : "F"
    saveEncoded += render_stripes.value ? "T" : "F"
    saveEncoded += render_shadows.value ? "T" : "F"
    saveEncoded += " "

    let list = map.getMapAsList()
    list.forEach((value, index, array) => {
      saveEncoded += value.x + "*"
      saveEncoded += value.y + "*"
      saveEncoded += value.rotation + "*"
      if(value.type == "wall") {
        saveEncoded += "0;"
      } else {
        saveEncoded += value.type + ";"
      }
    })

    saveEncoded += " "
    saveEncoded += encodeURI(get("notes").value)
    return saveEncoded
  },
  load: (data, version) => {
    map.clear()
    if(data != null) {
      saveHandler.loaders["version_" + version](data)
    } else {
      saveHandler.loaders.version_3("TFTTT  ")
    }
  },
  loaders: {
    version_1: (data) => {
      console.log(data)
      localStorage.backup = data
    },
    version_2: (data) => {
      console.log(data)
      localStorage.backup2 = data
    },
    version_3: (data) => {
      let spaceSplitData = data.split(" ")
      render_walls.set(spaceSplitData[1][0])
      render_corner_dots.set(spaceSplitData[1][1])
      render_grid.set(spaceSplitData[1][2])
      render_stripes.set(spaceSplitData[1][3])
      render_shadows.set(spaceSplitData[1][4])
      let mapData = spaceSplitData[2].split(";")
      mapData.forEach((value, index, array) => {
        if(value != "") {
          let obj = value.split("*")
          let type = obj[3] == "0" ? "wall" : obj[3]
          map.add(type, JSON.parse(obj[0]), JSON.parse(obj[1]), JSON.parse(obj[2]), false)
        }
      })
      get("notes").value = decodeURI(spaceSplitData[3])
      localStorage.map = saveHandler.save(map)
      display.draw()
    },
  }
}

if(localStorage.map != null) {
  saveHandler.load(localStorage.map, localStorage.map[0])
}
else {
  display.draw()
}

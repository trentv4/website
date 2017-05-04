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
  },
  clear: () => {
    let list = map.getMapAsList()
    list.forEach((value, index, array) => {
      map.remove(value.type, value.x, value.y)
    })
  }
}

let saveHandler = {
  save: (map) => {
    let saveEncoded = "3 "
    saveEncoded += render_walls ? "T" : "F"
    saveEncoded += render_corner_dots ? "T" : "F"
    saveEncoded += render_grid ? "T" : "F"
    saveEncoded += render_stripes ? "T" : "F"
    saveEncoded += render_shadows ? "T" : "F"
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
    },
    version_2: (data) => {
      console.log(data)
    },
    version_3: (data) => {
      let spaceSplitData = data.split(" ")
      let mapData = spaceSplitData[2].split(";")
      mapData.forEach((value, index, array) => {
        let obj = value.split("*")
        let type = obj[3] == "0" ? "wall" : obj[3]
        map.add(type, JSON.parse(obj[0]), JSON.parse(obj[1]), JSON.parse(obj[2]))
      })
    },
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














saveHandler.load(`3 TFFTT 15*30*0*0;15*29*0*0;15*28*0*0;15*27*0*0;6*28*0*0;6*29*0*0;7*29*0*0;7*28*0*0;8*28*0*0;9*28*0*0;10*28*0*0;8*29*0*0;9*29*0*0;10*29*0*0;7*29*0*7;7*28*0*7;6*27*0*0;5*27*0*0;5*26*0*0;5*25*0*0;4*25*0*0;4*24*0*0;0*16*0*0;0*15*0*0;0*29*0*0;0*30*0*0;1*30*0*0;2*30*0*0;3*30*0*0;4*30*0*0;5*30*0*0;5*29*0*0;6*30*0*0;4*31*0*0;3*31*0*0;3*32*0*0;2*32*0*0;2*33*0*0;1*33*0*0;1*34*0*0;1*35*0*0;0*35*0*0;0*36*0*0;0*37*0*0;0*38*0*0;0*39*0*0;5*31*0*0;5*32*0*0;4*32*0*0;4*33*0*0;3*33*0*0;3*34*0*0;2*34*0*0;2*35*0*0;2*36*0*0;2*37*0*0;1*37*0*0;1*38*0*0;1*39*0*0;1*40*0*0;0*40*0*0;0*41*0*0;0*42*0*0;0*43*0*0;1*36*0*0;0*33*0*0;0*34*0*0;1*32*0*0;1*31*0*0;0*31*0*0;0*32*0*0;2*31*0*0;2*29*0*0;3*29*0*0;3*28*0*0;4*28*0*0;4*27*0*0;6*26*0*0;4*29*0*0;5*28*0*0;4*26*0*0;3*24*0*0;3*23*0*0;3*22*0*0;2*22*0*0;2*21*0*0;2*20*0*0;1*19*0*0;1*18*0*0;0*17*0*0;0*18*0*0;0*19*0*0;0*20*0*0;1*20*0*0;1*21*0*0;1*22*0*0;1*23*0*0;1*24*0*0;2*24*0*0;2*25*0*0;2*26*0*0;2*27*0*0;1*27*0*0;1*28*0*0;1*29*0*0;1*26*0*0;1*25*0*0;0*23*0*0;0*22*0*0;0*21*0*0;0*24*0*0;0*25*0*0;0*26*0*0;0*27*0*0;0*28*0*0;3*26*0*0;3*25*0*0;2*23*0*0;2*28*0*0;3*27*0*0;11*29*0*0;12*29*0*0;13*29*0*0;14*29*0*0;14*28*0*0;13*28*0*0;12*28*0*0;12*27*0*0;11*27*0*0;11*28*0*0;8*27*0*0;9*27*0*0;10*27*0*0;13*27*0*0;14*27*0*0;8*30*0*0;9*30*0*0;10*30*0*0;11*30*0*0;12*30*0*0;13*30*0*0;14*30*0*0;15*27*0*2;15*28*0*2;14*27*0*2;12*26*0*0;12*25*0*0;12*24*0*0;12*23*0*0;12*22*0*0;11*22*0*0;11*23*0*0;11*24*0*0;11*25*0*0;11*26*0*0;11*31*0*0;11*32*0*0;11*33*0*0;11*34*0*0;11*35*0*0;11*36*0*0;12*36*0*0;12*35*0*0;12*34*0*0;12*33*0*0;12*32*0*0;12*31*0*0;15*36*0*0;16*36*0*0;17*36*0*0;18*36*0*0;19*36*0*0;14*36*0*0;13*36*0*0;13*35*0*0;14*35*0*0;15*35*0*0;16*35*0*0;17*35*0*0;18*35*0*0;19*35*0*0;19*34*0*0;20*34*0*0;17*34*0*0;17*33*0*0;18*33*0*0;19*33*0*0;20*33*0*0;20*35*0*0;20*36*0*0;20*37*0*0;19*37*0*0;19*38*0*0;18*38*0*0;17*38*0*0;17*37*0*0;18*37*0*0;20*38*0*0;18*34*0*0;18*39*0*0;18*40*0*0;18*41*0*0;17*42*0*0;18*42*0*0;19*42*0*0;20*42*0*0;17*43*0*0;18*43*0*0;19*43*0*0;20*43*0*0;18*43*0*3;13*23*0*0;14*23*0*0;15*23*0*0;16*23*0*0;17*23*0*0;16*22*0*0;15*22*0*0;14*22*0*0;17*22*0*0;13*22*0*0;17*21*0*0;16*21*0*0;15*21*0*0;15*20*0*0;14*20*0*0;13*20*0*0;12*20*0*0;12*21*0*0;11*21*0*0;11*20*0*0;13*21*0*0;14*21*0*0;16*20*0*0;17*20*0*0;17*23*0*3;17*22*0*3;16*22*0*3;16*23*0*3;17*21*0*3;12*26*0*7;11*26*0*7;11*31*0*7;12*31*0*7;19*32*0*0;19*31*0*0;19*30*0*0;18*31*0*0;20*31*0*0;20*30*0*0;18*30*0*0;18*30*0*2;18*31*0*2;20*30*0*3;21*36*0*0;22*36*0*0;23*36*0*0;24*36*0*0;26*36*0*0;27*36*0*0;28*36*0*0;29*36*0*0;30*36*0*0;31*36*0*0;21*35*0*0;22*35*0*0;23*35*0*0;24*35*0*0;26*35*0*0;27*35*0*0;28*35*0*0;29*35*0*0;31*35*0*0;24*37*0*0;25*37*0*0;26*37*0*0;27*37*0*0;28*37*0*0;29*37*0*0;31*37*0*0;26*34*0*0;27*34*0*0;28*34*0*0;29*34*0*0;31*34*0*0;24*38*0*0;25*38*0*0;26*38*0*0;27*38*0*0;28*38*0*0;29*38*0*0;31*38*0*0;31*33*0*0;29*33*0*0;28*33*0*0;27*33*0*0;26*33*0*0;25*33*0*0;32*33*0*0;32*35*0*0;32*38*0*0;32*37*0*0;32*36*0*0;29*33*0*8;29*34*0*8;29*35*0*8;28*35*0*8;27*35*0*8;26*35*0*8;26*34*0*8;26*33*0*8;27*33*0*8;27*34*0*8;28*34*0*8;28*33*0*8;26*37*0*8;26*38*0*8;27*38*0*8;27*37*0*8;28*37*0*8;28*38*0*8;29*37*0*8;29*38*0*8;33*33*0*0;33*34*0*0;33*35*0*0;33*36*0*0;33*37*0*0;33*38*0*0;34*38*0*0;34*37*0*0;35*37*0*0;35*36*0*0;35*35*0*0;35*34*0*0;35*33*0*0;34*34*0*0;34*35*0*0;34*36*0*0;34*33*0*0;35*38*0*0;36*36*0*0;37*36*0*0;38*36*0*0;36*36*0*7;38*35*0*0;37*35*0*0;37*37*0*0;38*37*0*0;39*35*0*0;39*36*0*0;39*37*0*0;37*37*0*3;38*37*0*3;39*37*0*3;39*36*0*3;39*35*0*3;38*35*0*2;35*38*3*16;35*33*2*16;12*37*0*0;12*38*0*0;12*39*0*0;12*37*1*20;11*39*0*0;10*39*0*0;9*39*0*0;9*40*0*0;12*41*0*0;12*42*0*0;12*43*0*0;11*43*0*0;11*42*0*0;11*41*0*0;10*41*0*0;9*41*0*0;10*41*0*20;19*32*0*1;19*37*0*12;19*34*0*12;20*35*0*12;20*36*0*12;12*42*0*13;25*32*0*9;25*32*0*0;25*26*0*9;25*26*0*0;25*25*0*0;24*25*0*0;24*23*0*0;25*23*0*0;25*24*0*0;24*24*0*0;26*25*0*0;26*24*0*0;26*23*0*0;27*23*0*0;27*22*0*0;26*22*0*0;25*22*0*0;24*22*0*0;25*23*0*6;24*23*0*12;26*23*0*12;25*21*0*7;25*20*0*0;25*19*0*0;25*21*0*0;26*19*0*0;26*20*0*0;27*20*0*0;28*20*0*0;27*19*0*0;28*19*0*0;28*20*0*3;27*20*0*3;28*19*0*3;27*24*0*0;27*25*0*0;25*36*0*0;25*35*0*0;25*34*0*0;24*34*0*0;24*33*0*0;14*23*0*11;16*20*0*11;15*22*0*11;13*21*0*12;31*38*0*16;31*33*1*16;18*40*1*21;18*42*1*10;33*35*1*18;33*36*1*18;34*36*1*6;11*29*0*24;12*22*0*25;11*42*0*26;18*36*0*27;20*43*0*28;19*31*0*29;25*38*0*30;32*36*0*32;38*33*0*10;37*33*0*10;38*33*0*23;37*33*0*24;26*24*0*31;26*36*0*17;27*36*0*17;28*36*0*17;29*36*0*17;32*34*0*0;3*35*0*0;1*41*0*0;1*42*0*0;0*44*0*0;4*23*0*0;1*17*0*0;2*19*0*0;3*21*0*0;4*22*0*0;2*18*0*0;1*16*0*0;1*15*0*0;0*14*0*0;11*39*0*4;9*40*0*4;6*17*0*0;5*17*0*0;7*17*0*0;7*16*0*0;5*16*0*0; 1.%20Entrance%20hall%20with%20some%20boxes,%20bags,%20and%20discarded%20clothes%20in%20the%20back.%20Evidence%20of%20recent%20activity%0A%0A2.%20Room%20with%20three%20goblins%20searching%20boxes%20being%20ordered%20by%201%20cultist.%0A%0A3.%20*CRUCIAL%20NPC*%20Locked%20up%20behind%20two%20doors%20and%20spike%20traps.%0A%0A4.%20Four%20cultists%20guarding%20the%20entrance%20to%20boss's%20chambers.%20Room%20is%20ornate%20with%20banners%20hanging%20from%20the%20wall%20(where%205%20is%20hidden%20behind)%0A%0A5.%20%20Room%20behind%20a%20pit%20(dc12%20jump).%20The%20box%20is%20a%20mimic.%20So%20is%20the%20carpet%20in%20front%20of%20it.%20%0A%0A6.%20Room%20hidden%20behind%20banner.%20~250%20gold%20worth%20of%20misc%20loot.%0A%0A7.%20Large%20water%20pit%20with%20rope%20bridge%20leading%20to%20boss%20chambers.%0A%0A8.%20Room%20up%20a%20level,%20with%202%20cultists%20commanding%20stone%20golem.%20Inside%20the%20locked%20(dc15)%20door%20is%20a%20room%20with%20some%20silver%20equipment.%0A%0A9.%20Boss%20room.%20Lich%20is%20currently%20sacrificing%20an%20old%20mage%20on%20altar.%20%0A%0A10.%20Loot:%20misc%20magical%20supplies%20and%20valuables%20worth%20~1000%20gold`, 3)

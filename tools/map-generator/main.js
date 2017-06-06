get = (e) => document.getElementById(e)
make = (e) => document.createElement(e)

let display = {
  colors: {
    background: "#FFFFFF"
  },
  index: 0,
  register: (id, x, y) => {
    let object = make("canvas")
    object.id = id
    object.width = 1000
    object.height = 700
    object.style = "z-index: " + display.index
    display.index++
    get("canvas-container").appendChild(object)
    if(display[id] != null) {
      display[id].canvas = object.getContext("2d")
    }
  },
  draw: () => {
    display.background.draw()
  },
  background: {
    draw: () => {
      let c = display.background.canvas
      c.fillStyle = display.colors.background
      c.fillRect(0, 0, c.canvas.width, c.canvas.height)
    }
  }
}

display.register("background", 1000, 700)
display.draw()

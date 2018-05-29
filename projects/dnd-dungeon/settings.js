let cellSize = 15
let stripeDistance = 10

class Setting {
  constructor(name, default_value, redraw_function) {
    this.domElement = get(name)
    this.value = default_value
    this.default_value = default_value
    this.redraw_function = redraw_function
    this.domElement.onchange = (x) => this.set(x.target.checked)
  }

  set(newValue) {
    let trueValue = true
    if(newValue == "T" | newValue == "F") {
      trueValue = newValue == "T" ? true : false
    } else {
      trueValue = newValue;
    }
    this.value = trueValue
    this.domElement.checked = trueValue
    this.redraw_function()
    localStorage.map = saveHandler.save(map)
  }
}

let render_walls = new Setting("render_walls", true, display.emptyCells.draw)
let render_corner_dots = new Setting("render_corner_dots", false, display.emptyCells.draw)
let render_grid = new Setting("render_grid", false, display.grid.draw)
let render_stripes = new Setting("render_stripes", true, display.stripes.draw)
let render_shadows = new Setting("render_shadows", true, display.shadows.draw)

let colors = {
	background: "#ECE7E1",
	borders_grid: "#C8BDB1",
	borders_room: "#786249",
	wall_stripes: "#B49E84",
	mouse_outline: "#967654",
	shadow: "#B4A797",
	select_fill: "#2D354D",
	select_outline: "#9EA9C7"
}

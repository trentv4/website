var cellSize = 15
var stripeDistance = 10

var render_walls = true
var render_corner_dots = true
var render_grid = true
var render_stripes = true

var colors = {
	background: "#ECE7E1",
	borders_grid: "#C8BDB1",
	borders_room: "#786249",
	wall_stripes: "#B49E84",
	mouse_outline: "#967654",
	shadow: "#B4A797"
}

function update()
{
	render_walls = document.getElementById("render_walls").checked
	render_corner_dots = document.getElementById("render_corner_dots").checked
	render_grid = document.getElementById("render_grid").checked
	render_stripes = document.getElementById("render_stripes").checked
}
setInterval(update, 10)

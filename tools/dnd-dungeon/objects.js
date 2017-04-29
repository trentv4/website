const objects = [
	{
		catname: "Tools:",
		objects: [
			{	name: "Wall Tool",
				id:   0,
				file: "images/wall.png",
				func: function() {
					console.log("Setting to: " + obj_ids[this.id].name)
					currentType = "wall"
					document.getElementById("current-tool").innerHTML = `Current tool: <br><img src="` + obj_ids[this.id].file + `"> `+obj_ids[this.id].name+``
					isSelecting = false
					selection = null
					display.layers.selection.draw(display.layers.selection.canvas)
				}
			},
			{	name: "Selection Tool",
				id:   14,
				file: "images/selection.png",
				func: function() {
					console.log("Setting to: " + obj_ids[this.id].name)
					isSelecting = true
					document.getElementById("current-tool").innerHTML = `Current tool: <br><img src="` + obj_ids[this.id].file + `"> `+obj_ids[this.id].name+``
					selection = null
					display.layers.selection.draw(display.layers.selection.canvas)
				}
			}/*,
			{	name: "Text Tool",
				id:   15,
				file: "images/text.png",
				func: function() {
					isSelecting = false
					selection = null
					display.layers.selection.draw(display.layers.selection.canvas)
				}
			},*/
		],
	},
	{
		catname: "Decorations:",
		objects: [
			{	name: "Boxes",
				id:   2,
				file: "images/boxes.png"
			},
			{	name: "Crate",
				id:   3,
				file: "images/crate.png"
			},
			{	name: "Door",
				id:   7,
				file: "images/door.png"
			},
			{	name: "Stairs",
				id:   9,
				file: "images/stairs.png"
			},
			{	name: "Statue",
				id:   22,
				file: "images/statue.png"
			},
			{	name: "Wall (tile)",
				id:   1,
				file: "images/wall.png"
			},
			{	name: "Wall (triangle)",
				id:   16,
				file: "images/triangle-wall.png"
			},
			{	name: "Wall (thin)",
				id:   20,
				file: "images/thin-wall.png"
			},
		]
	},
	{
		catname: "Shades:",
		objects: [
			{	name: "Shaded space 1",
				id:   10,
				file: "images/shaded-space-1.png"
			},
			{	name: "Shaded space 2",
				id:   17,
				file: "images/shaded-space-2.png"
			},
			{	name: "Shaded space 3",
				id:   18,
				file: "images/shaded-space-3.png"
			},
			{	name: "Shaded space 4",
				id:   19,
				file: "images/shaded-space-4.png"
			},
		]
	},
	{
		catname: "Creatures:",
		objects: [
			{	name: "Small creature",
				id: 11,
				file: "images/creature-small.png"
			},
			{	name: "Medium creature",
				id: 12,
				file: "images/creature-medium.png"
			},
			{	name: "Large creature",
				id: 6, //was previously 'enemy'
				file: "images/creature-large.png"
			},
			{	name: "NPC",
				id: 13, //was previously 'enemy'
				file: "images/npc.png"
			},
		]
	},
	{
		catname: "Traps:",
		objects: [
			{	name: "Spike Pit",
				id:   4,
				file: "images/spike-pit.png"
			},
			{	name: "Pit",
				id:   21,
				file: "images/pit.png"
			},
			{	name: "Pressure Plate",
				id:   5,
				file: "images/pressure-plate.png"
			},
			{	name: "Water",
				id:   8,
				file: "images/water-pit.png"
			},
		],
	},
	{
		catname: "Numbers:",
		objects: [
			{ 	name: "",
				id: 23,
				file: "images/num_0.png"
			},
			{ 	name: "",
				id: 24,
				file: "images/num_1.png"
			},
			{ 	name: "",
				id: 25,
				file: "images/num_2.png"
			},
			{ 	name: "",
				id: 26,
				file: "images/num_3.png"
			},
			{ 	name: "",
				id: 27,
				file: "images/num_4.png"
			},
			{ 	name: "",
				id: 28,
				file: "images/num_5.png"
			},
			{ 	name: "",
				id: 29,
				file: "images/num_6.png"
			},
			{ 	name: "",
				id: 30,
				file: "images/num_7.png"
			},
			{ 	name: "",
				id: 31,
				file: "images/num_8.png"
			},
			{ 	name: "",
				id: 32,
				file: "images/num_9.png"
			},
		]
	}
]

function init(objects)
{
  var obj_ids = []
  for(var i = 0; i < objects.length; i++)
  {
  	var category = objects[i]

  	var div = document.createElement("div")
  	div.className = "feature-list"
  	var pr = document.createElement("h2")
  	pr.innerText = category.catname
  	div.appendChild(pr)

  	for(var g = 0; g < category.objects.length; g++)
  	{
  		var current_object = category.objects[g]
  		obj_ids[current_object.id] = current_object
  		var pre = document.createElement("pre")
  		if(category.catname == "Numbers:") pre.className = "inline"
  		var img = document.createElement("img")
  		img.className = "tool"
  		img.id = current_object.id
  		img.src = current_object.file
  		if(current_object.func != null)
  		{
  			img.addEventListener("click", current_object.func)
  		}
  		else
  		{
  			img.addEventListener("click", function(e){
  				console.log("Setting to: " + obj_ids[this.id].name)
  				currentType = this.id
  				document.getElementById("current-tool").innerHTML = `Current tool: <br><img src="` + obj_ids[this.id].file + `"> `+obj_ids[this.id].name+``
  			})
  		}
  		pre.appendChild(img)
  		pre.appendChild(document.createTextNode(" " + current_object.name))
  		div.appendChild(pre)
  	}
  	document.getElementById("sidebar").appendChild(div)
  }
}

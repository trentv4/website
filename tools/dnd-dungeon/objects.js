const objects = [
	{
		catname: "Tools:",
		objects: [
			{	name: "Wall Tool",
				id:   0,
				file: "images/wall.png",
				func: function() {
          let obj = objects[0].objects[0]
					currentType = "wall"
          setTool(obj)
          console.log("Setting to: " + obj_ids[obj.id].name)
          selection.clear()
			  }
			},
			{	name: "Selection Tool",
				id:   14,
				file: "images/selection.png",
				func: function() {
          let obj = objects[0].objects[1]
          selection.isSelecting = true;
          setTool(obj)
          console.log("Setting to: " + obj_ids[obj.id].name)
          display.selection.draw()
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

function setTool(object) {
  let str = "Current tool: <br>"
  str += `<pre><img src="` + object.file + `"></img> ` + object.name + `</pre>`
  get("current-tool").innerHTML = str;
}

let obj_ids = []

function getToolContainer(className, object) {
  let objectContainer = make("pre")
  if(className == "Numbers:") objectContainer.className = "inline"

  let objectImage = make("img")
  objectImage.className = "tool"
  objectImage.id = object.id
  objectImage.src = object.file
  objectContainer.appendChild(objectImage)
  objectContainer.appendChild(document.createTextNode(" " + object.name))
  return objectContainer
}

objects.forEach((valueCategory, indexCategory, arrayCategory) => {
  let featureList = make("div")
  featureList.className = "feature-list"
  let header = make("h2")
  header.innerText = valueCategory.catname
  featureList.appendChild(header)

  valueCategory.objects.forEach((valueObjects, indexObjects, arrayObjects) => {
    let objectContainer = getToolContainer(valueCategory.catname, valueObjects)

    objectContainer.onclick = (e) => {
      console.log("Setting to: " + valueObjects.name)
      currentType = valueObjects.id
      setTool(valueObjects)
      selection.clear()
    }
    if(valueObjects.func != null) objectContainer.onclick = valueObjects.func

    featureList.appendChild(objectContainer)

    obj_ids[valueObjects.id] = valueObjects
  })

  get("sidebar").appendChild(featureList)
})

let masterImage = new Image()
masterImage.onload = () => {
  display.features.draw()
}
masterImage.src = "images/objects.png"
/*
for(var i = 0; i < objects.length; i++)
{
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

    let cachedimage = new Image()
    cachedimage.object = current_object
    cachedimage.src = current_object.file
    cachedimage.onload = () => {
      cachedimage.object.cachedimage = cachedimage
      display.features.draw()
    };
  }
  document.getElementById("sidebar").appendChild(div)
}
*/

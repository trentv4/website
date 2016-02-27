var __canvas = $("canvas")[0]
var c = __canvas.getContext("2d")
var width = __canvas.clientWidth;
var height = __canvas.clientHeight;

var r_textures = []

function r_clear()
{
    c.fillStyle = "rgb(0,0,0)"
    c.fillRect(0,0,width, height)
}

function r_import(name)
{
    if(r_textures[name] == null)
    {
        var img = new Image();
        img.src = "images/" + name + ".png";
        r_textures.push({key: name, value: img})
        console.log("r_import: " + name)
    }
}

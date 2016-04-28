var __canvas = $("canvas")[0]
var c = __canvas.getContext("2d")
__canvas.width = __canvas.clientWidth;
__canvas.height = __canvas.clientHeight;
var width = __canvas.width
var height = __canvas.height

var r_textures = {}

function r_init()
{
    c.imageSmoothingEnabled = false;
}

function r_clear()
{
    c.fillStyle = "rgb(255,255,255)"
    c.fillRect(0,0,width, height)
}

function r_draw(texture, x, y, xs, ys, direction)
{
    if(r_textures[texture] == null) r_import(texture);
    if(direction == 0)
    {
        c.scale(-1,1)
        c.drawImage(r_textures[texture], -x-xs, y, xs, ys)
        c.scale(-1,1)
    }
    else
    {
        c.drawImage(r_textures[texture], x, y, xs, ys)
    }
}

function r_import(name)
{
    if(r_textures[name] == null)
    {
        var img = new Image();
        img.src = "images/" + name + ".png";
        r_textures[name] = img
        console.log("r_import: " + name)
    }
}
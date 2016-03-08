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

function r_draw_entities(entities)
{
    for(var i = 0; i < entities.length; i++)
    {
        var e = entities[i];
		var c = e.children;
		for(var g = 0; g < c.length; g++)
		{
			if(e.direction == 0)
			{
				r_draw_ent(c[g], c[g].x + e.x, c[g].y + e.y, c[g].xs, c[g].ys, c[g].direction)
			}
			else
			{
				r_draw_ent(c[g], c[g].x + e.x + e.xs/2, c[g].y + e.y, c[g].xs, c[g].ys, c[g].direction)				
			}
		}
		r_draw_ent(e, e.x, e.y, e.xs, e.ys, e.direction)
    }
}

function r_draw_ent(e, x, y, xs, ys, direction)
{
	if(e.current_anim != "")
	{
		r_draw(e.texture + "_" + e.current_anim + "_" + e.anims[e.current_anim].frame, x, y, xs, ys, direction)
	}
	else
	{
		r_draw(e.texture, x, y, xs, ys, direction)
	}
}

function r_clear()
{
    c.fillStyle = "rgb(50,50,50)"
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

function r_advance_frame(anim)
{
	if(anim.delay < anim.delay_length)
	{
		anim.delay++;
	}
	else
	{
		anim.delay = 0;
		if(anim.frame < anim.frame_length)
		{
			anim.frame++;
		}
		else
		{
			anim.frame = 0
		}
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

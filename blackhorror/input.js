var i_keys = {}
var i_mouse = {
	x:0,
	y:0,
	buttons: [{down: false}, {down: false}, {down: false}]
}

var __i_rect = __canvas.getBoundingClientRect()

function i_key_status(key)
{
    return i_keys[key]
}

function i_mouse(button)
{
	return i_mouse.buttons[button].down
}

function i_init()
{
    $("body").on("keydown", function(e){
        i_set_status(e.keyCode, true)
    })
    $("body").on("keyup", function(e){
        i_set_status(e.keyCode, false)
    })
	$("canvas").on("mousemove", function(e){
		i_mouse.x = Math.ceil(e.clientX - __i_rect.left) + 1
		i_mouse.x = Math.ceil(e.clientX - __i_rect.top)
	})
	$("canvas").on("mousedown", function(e){
		i_mouse.buttons[e.button].down = true
	})
	$("canvas").on("mouseup", function(e){
		i_mouse.buttons[e.button].down = false
	})
}

function i_set_status(keycode, status)
{
    i_keys[String.fromCharCode(keycode)] = status;
}

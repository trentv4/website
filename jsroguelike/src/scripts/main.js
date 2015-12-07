var _ = document.getElementById("canvas").getContext("2d");

//setup proper resolution
var height = _.canvas.clientHeight;
var width = _.canvas.clientWidth;
_.canvas.height = height;
_.canvas.width = width;

//input callbacks
function clickCallback(event)
{
	console.log(event);
}

function mouseCallback(event)
{
//	console.log(event);
}

function keyUpCallback(event)
{
	console.log(event);
}

function keyDownCallback(event)
{
	console.log(event);
}

function mouseCallbackRight(event)
{
	console.log(event);
}

//event listeners
_.canvas.addEventListener("click", clickCallback);
_.canvas.addEventListener("mousemove", mouseCallback);
_.canvas.addEventListener("onkeyup", keyUpCallback);
_.canvas.addEventListener("onkeydown", keyDownCallback);
_.canvas.oncontextmenu = function(e){e.preventDefault(); mouseCallbackRight(e);};
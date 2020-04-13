window.onload = function() {
	const gl = document.getElementById("render").getContext("webgl")
	if(gl == null) document.getElementById("content").innerHTML = "<p>WebGL is unavailable on this system. Please update your browser or hardware.</p>"

	gl.clearColor(0,0,0,1);
	gl.clear(gl.COLOR_BUFFER_BIT);
};

// Last place: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
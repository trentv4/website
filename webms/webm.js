function setVideo(name)
{
	var a = new XMLHttpRequest();
	a.open("GET", "/api/webm/?v=" + name, true)
	a.send();
	a.onreadystatechange = function() {
		if(a.readyState == 4 && a.status == 200)
		{
			var b = JSON.parse(a.responseText)
			player.src = b.path;
		}
	}
}

function set(name)
{
	player.src = name;
}

var c = new XMLHttpRequest();
c.open("GET", "/api/webm/all" + name, true)
c.send();
c.onreadystatechange = function() {
	if(c.readyState == 4 && c.status == 200)
	{
		var d = JSON.parse(c.responseText)
		var f = document.getElementById("related");
		var s = "";
		for(var i = 0; i < d.length; i++)
		{
			var q = "set('"+d[i].path+"')"
			s += '<div onclick="'+q+'" class="related-video"><div class="related-video-text">' + d[i].name + '</p><p>'+ d[i].tags + '</p></div></div>'
		}
		f.innerHTML = s;
	}
}
setVideo("hack2")

function setVideo(src)
{
	if(src != "")
	{
		$.get("/api/webm/request?v=" + src, function(d, status){
			$("#player")[0].src = "/webm/" + d.path + "video.webm";
			$("#title")[0].innerHTML = d.name;
			$("#description")[0].innerHTML = d.description
			$("#tags")[0].innerHTML = "Tags: " + (d.tags.join(", "))
		})
	}
	else
	{
		setVideo("Keyboard Warrior")
	}
}
var a = localStorage.getItem("trentv-webms-volume");
if(a != "undefined")
{
	$("#player")[0].volume = a;
}

$("#player")[0].onvolumechange = function() {
	localStorage.setItem("trentv-webms-volume", $("#player")[0].volume)
}

//this sets the sidebar
$.get("/api/webm/all", function(d, status){
	var sidebar = $("#sidebar")
	for(var i = 0; i < d.length; i++)
	{
		var obj = d[i]
		sidebar.append(
			`<a id="link" href="/webm?v=` + obj.name + `"><img class="recommended-video" src="/webm/` + obj.path + `thumbnail.png"></img></a>`
		)
	}
})

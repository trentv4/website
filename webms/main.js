function setVideo(src)
{
	if(src != null)
	{
		$.get("/webm/api/request?v=" + src, function(d, status){
			$("#player")[0].src = "/webms/" + d.path + "video.webm";
			$("#title")[0].innerHTML = d.name;
			$("#description")[0].innerHTML = d.description
			$("#tags")[0].innerHTML = d.tags
		})
	}
	else
	{
		setVideo("Keyboard Warrior")
	}
}

//this sets the sidebar
$.get("/webm/api/all", function(d, status){
	var sidebar = $("#sidebar")
	for(var i = 0; i < d.length; i++)
	{
		var obj = d[i]
		sidebar.append(
			`<a id="link" href="/webm?v=` + obj.name + `"><img class="recommended-video" src="/webms/` + obj.path + `thumbnail.png"></img></a>`
		)
	}
})

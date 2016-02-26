function setVideo(name)
{
	if(name != "")
	{
		$.get("/webms/req/?v="+name, function(d, status){
			$("#player")[0].src = "/views/webms/" + d.path + "video.webm"
			$("#title")[0].innerHTML = d.name;
			$("#description")[0].innerHTML = d.description;
			$("#tags")[0].innerHTML = "Tags: " + d.tags;
		})
	}
}

function set(name)
{
	player.src = name;
}

var c = new XMLHttpRequest();
c.open("GET", "/webms/all/", true)
c.send();
c.onreadystatechange = function() {
	if(c.readyState == 4)
	{
		var d = JSON.parse(c.responseText)
		var f = document.getElementById("related");
		var s = "";
		for(var i = 0; i < d.length; i++)
		{
			var tags = d[i].tags[0];
			for(var g = 1; g < d[i].tags.length; g++)
			{
				tags += ", " + d[i].tags[g];
			}
			s +=`
			<div style="cursor: pointer" onclick="setVideo('`+d[i].name+`')" class="related-video">
				<img src="/views/webms/` + d[i].path + `thumbnail.png"/>
				<div class="related-video-text">
					<p>` + d[i].name + `</p>
				</div>
			</div>`
		}
		f.innerHTML = s;
	}
}

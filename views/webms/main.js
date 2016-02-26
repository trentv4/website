function setVideo(name)
{
	if(name != "")
	{
		var a = new XMLHttpRequest();
		a.open("GET", "/webms/req/?v=" + name, true)
		console.log("Sending request for: " + name)
		a.send();
		a.onreadystatechange = function() {
			if(a.readyState == 4)
			{
				var b = JSON.parse(a.responseText)
				player.src = "/views/webs/" + b.path + "video.webm";
				var t = document.getElementById("tags");
				t.innerHTML = "<p>Tags: " + b.tags + "</p>"
			}
		}
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
			<div onclick="set('/views/webms/` + d[i].path + `video.webm')" class="related-video">
				<img src="/views/webms/` + d[i].path + `thumbnail.png"/>
				<div class="related-video-text">
					<p>` + d[i].name + `</p>
					<p>` + d[i].tags + `</p>
				</div>
			</div>`
		}
		f.innerHTML = s;
	}
}

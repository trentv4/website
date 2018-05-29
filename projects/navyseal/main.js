let request = new XMLHttpRequest()
request.open("get", "/api/navyseal/", true)

request.onreadystatechange = () => {
	if(request.readyState == 4 & request.status == 200)
	{
		let pastas = JSON.parse(request.responseText)
		let toc = ""
		let content = ""

		for(let i = 0; i < pastas.length; i++)
		{
			toc += "<a href='#" + pastas[i].title + "'><p>" + pastas[i].title + "</p></a>"
			content += 
				`
				<div class="separator">
					<h1 id="` + pastas[i].title + `">` + pastas[i].title + `</h1>
				</div>
				<p>` + pastas[i].content + `</p>
				<a href="#table-of-contents"><p>Back to the table of contents</p></a>
				`
		}

		document.getElementById("table-of-contents").innerHTML += toc
		document.getElementById("content").innerHTML += content
	}
}
request.setRequestHeader('Content-type', 'application/json');
request.send()

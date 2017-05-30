$.get("/api/navyseal/", function(d, status){
	for(var i = 0; i < d.length; i++)
    {
		var obj = d[i];
        $("#table-of-contents")
            .append(`<a href="#`+d[i].name+`"><p>`+d[i].name+`</p></a>`)
        $("#page")
            .append(`
				<div class="separator">
					<h1>` + obj.name + `</h1>
				</div>
				<p id="`+obj.name+`">` + obj.content + `</p>
				<a href="#table-of-contents"><p>Back to the table of contents</p></a>
				`)
    }
})

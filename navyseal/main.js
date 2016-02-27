$.get("/navyseal/api/", function(d, status){
    for(var i = 0; i < d.length; i++)
    {
        $("#table")
            .append(`<a href="#`+d[i].name+`"><p>`+d[i].name+`</p></a>`)
        $("body")
            .append("<div class='spacer'></div>")
            .append(`
                <div class="container">
                    <h2 id="`+d[i].name+`">`+d[i].name+`</h2>
                    <p>`+d[i].content+`</p>
                    <a href="#table"><p style="float:left">Back to Table of Contents</p></a>
                </div>
            `)
    }
})

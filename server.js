// Imports
const express = require("express")
const fs = require("fs")
const bodyparser = require("body-parser")
const less = require("less")
const sql = require("./global/sql.js")

const excludedUrls = ["/server.js", "/package.json", "/package-lock.json", "/.build.sh"]
let gitignore = fs.readFileSync(".gitignore").toString().split("\n")
for(let i = 0; i < gitignore.length; i++)
	excludedUrls.push("/" + gitignore[i])

// Useful functions
console.write = (input) => process.stdout.write(input)

function loadRoute(app, directory, routeFile) {
	console.write("Loading route: " + routeFile + "... ")
	if(fs.existsSync(routeFile)) {
		app.use(directory, require(routeFile))
		console.log("loaded.")
	}
	else {
		console.log("route file not found.")
	}
}

//Express app

let app = express()
app.set("view engine", "ejs")
app.set("views", "./")
app.get("*.less", (req, res) => {
	var path = __dirname + req.url;
	fs.readFile(path, "utf8", function(err, data) {
		less.render(data, (err, css) => {
			if(err) console.log(err)
			res.header("Content-type", "text/css");
			if(css != null) {
				res.send(css.css)
			}
			else
			{
				res.send("")
			}
		});
	});
});
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use("*", (req, res, next) => {
	let url = req.originalUrl

	//403 forbidden
	if(excludedUrls.indexOf(url) != -1)
	{
		res.status("403")
		res.render("global/403")
		res.end()
		console.write("Serving: " + url + ": 403 forbidden.")
		return
	}

	if(fs.existsSync("." + url) && fs.statSync("." + url).isFile() && url != "/")
	{
		next()
		return
	}

	console.write("\nServing: " + url)

	sql.query("select * from stats where page='" + url + "'", (e, rows, fields) => {
		if(rows.length != 0)
			sql.query("update stats set count='" + (rows[0].count + 1) + "' where page='" + url + "'")
		else
			sql.query("insert into stats values('" + url + "', 1)")
	})
	
	next()
})

app.use(express.static("./"))

loadRoute(app, "/api/navyseal", "./routes/navyseal.js")
loadRoute(app, "/api/villagers", "./routes/minecraft/villagers.js")
loadRoute(app, "/api/webm", "./routes/webm.js")
//loadRoute(app, "/api/character-sheet", "./routes/character-sheet.js")
loadRoute(app, "/", "./routes/global.js")

app.use((error, req, res, next) => {
	console.write(": unable to serve.")
	res.status("404")
	res.render("global/404")
})

app.listen(80)
console.log("Web server started, running.")

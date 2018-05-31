// Imports
const express = require("express")
const fs = require("fs")
const bodyparser = require("body-parser")
const less = require("less")
const sql = require("./global/sql.js")
const htmljs = require("./global/htmljs.js")

const excludedUrls = []
let gitignore = fs.readFileSync(".gitignore").toString().split("\n")
for(let i = 0; i < gitignore.length; i++)
	excludedUrls.push("/" + gitignore[i])
let forbidden = fs.readFileSync(".forbidden").toString().split("\n")
for(let i = 0; i < forbidden.length; i++)
	excludedUrls.push("/" + forbidden[i])

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

app.engine("htmljs", (path, options, callback) => {
	let output = htmljs.parse(path)
	callback(null, output)
})

app.set("view engine", "htmljs")
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

	// 403 forbidden
	if(excludedUrls.indexOf(url) != -1)
	{
		res.status("403")
		res.render("global/403")
		res.end()
		console.write("Serving: " + url + ": 403 forbidden.")
		return
	}

	// static file, skip over statistics and serving notice
	if(fs.existsSync("." + url) && fs.statSync("." + url).isFile() && url != "/")
	{
		next()
		return
	}

	if(url.charAt(url.length-1) == "/" && url.length != 1)
		url = url.substring(0, url.length-1)

	console.write("\nServing: " + url)
	next()
	return
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
loadRoute(app, "/", "./routes/global.js")

app.use((error, req, res, next) => {
	res.status("404")
	res.render("global/404")
	console.write(": unable to serve.")
})

app.listen(80)
console.log("Web server started, running.")

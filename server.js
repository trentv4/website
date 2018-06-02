// Imports
const express = require("express")
const fs = require("fs")
const bodyparser = require("body-parser")
const less = require("less")
const sql = require("./global/sql.js")
const htmljs = require("./global/htmljs.js")

const excludedUrls = []
let forbidden = fs.readFileSync(".forbidden").toString().split("\n")
for(let i = 0; i < forbidden.length; i++)
	excludedUrls.push("/" + forbidden[i])
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

function sendQuery(url_unsafe, state) {
	let url = sql.mysql.escape(url_unsafe)
	console.log("\nSQL: " + url)
	sql.query("select * from traffic where page="+ url +"").then(rows => {
		let query = ""
		if(rows == undefined || rows.length == 0)
			query = "insert into traffic values ("+ url +", 1, '"+ state +"')"
		else
			query = (`update traffic set hits=`+ (rows[0].hits+1) +`, state='`+ state +`' where page=`+ url +``)

		console.log(query)
		sql.query(query, (e, rows, fields) => {
			console.error(e)
		})
	})
}

//Express app
let app = express()

app.engine("htmljs", htmljs.engine)
app.set("view engine", "htmljs")
app.set("views", "./")

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get("*.less", (req, res) => {
	let path = __dirname + req.url;
	let data = fs.readFileSync(path, "utf8")
	less.render(data, (err, css) => {
		if(err) console.log(err)
		res.header("Content-type", "text/css");
		res.send(css != null ? css.css : "")
	});
});

app.use("*", (req, res, next) => {
	if(req.originalUrl.charAt(req.originalUrl.length-1) == "/" && req.originalUrl.length != 1)
		req.originalUrl = req.originalUrl.substring(0, req.originalUrl.length-1)

	let url = req.originalUrl

	console.write("\nServing: " + url)

	// 403 forbidden
	if(excludedUrls.indexOf(url) != -1)
	{
		res.status("403")
		res.render("global/403.htmljs")
		res.end()
		console.write(": 403 forbidden.")
		sendQuery(url, "forbidden")
		return
	}

	// static file, skip over statistics and serving notice
	if(fs.existsSync("." + url) && fs.statSync("." + url).isFile() && url != "/")
	{
		sendQuery(url, "file")
		next()
		return
	}

	sendQuery(url, "valid")

	sql.query("select * from stats where page='" + url + "'", (e, rows, fields) => {
		if(e) console.log(e)
		if(rows.length != 0)
			sql.query("update stats set count='" + (rows[0].count + 1) + "' where page='" + url + "'", (e) => {
				if(e) console.log(e)
			})
		else
			sql.query("insert into stats values('" + url + "', 1)", (e) => {
				if(e) console.log(e)
			})
	})
	
	next()
})

app.use(express.static("./"))

loadRoute(app, "/api/navyseal", "./routes/navyseal.js")
loadRoute(app, "/api/villagers", "./routes/minecraft/villagers.js")
loadRoute(app, "/", "./routes/global.js")

app.use((error, req, res, next) => {
	res.status("404")
	res.render("global/404.htmljs")
	console.write(": unable to serve.")
	sendQuery(req.originalUrl, "missing")
	sql.query("delete from traffic where page=" + sql.mysql.escape(req.originalUrl) + ' and state="valid"')
})

app.listen(80)
console.log("Web server started, running.")

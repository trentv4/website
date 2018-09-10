// Imports
const express = require("express")
const fs = require("fs")
const bodyparser = require("body-parser")
const less = require("less")
const sql = require("./global/sql.js")
const htmljs = require("./global/htmljs.js")
const https = require("https")

const isLive = fs.existsSync("./ssl/fullchain.pem")

let ssl = isLive? {
	cert: fs.readFileSync("./ssl/fullchain.pem"),
	key: fs.readFileSync("./ssl/privkey.pem")
} : undefined

let forbiddenUrls = []

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


function loadForbiddenUrls() {
	sql.query("select * from forbidden;").then(rows => {
		let newUrls = []
		rows.forEach(e => {
			newUrls.push(e.page)
		})
		forbiddenUrls = newUrls
	}).catch(e => { console.error(e) })
}

function sendQuery(url_unsafe, state) {
	if(!isLive) return
	let url = sql.mysql.escape(url_unsafe)
	try {
		sql.query("select * from traffic where page="+ url +"").then(rows => {
			let query = ""
			if(rows == undefined || rows.length == 0)
				query = "insert into traffic values ("+ url +", 1, '"+ state +"')"
			else
				query = (`update traffic set hits=hits+1, state='`+ state +`' where page=`+ url +``)

			sql.query(query).then(rows => {
				sql.query("select * from traffic where page="+ url).then(rows => {
					if(rows != 0 && rows.length == 2) {
						sql.query("delete from traffic where page=" + url + ' and state="valid"')
						sql.query("delete from traffic where page=" + url + ' and state="api"')
					}
				}).catch(e => console.error)
			}).catch(e => console.error)
		}).catch(e => console.error)
	} catch(e) { console.error(e)}
}

//Express app
loadForbiddenUrls()

let app = express()

app.engine("htmljs", htmljs.engine)
app.set("view engine", "htmljs")
app.set("views", "./")

app.enable("trust proxy")

app.use(bodyparser.urlencoded({ extended: true }))
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
	if(isLive && !req.secure)
	{
		res.redirect("https://" + req.headers.host + req.url)
		return
	}
	if(req.originalUrl.charAt(req.originalUrl.length-1) == "/" && req.originalUrl.length != 1)
		req.originalUrl = req.originalUrl.substring(0, req.originalUrl.length-1)

	let url = req.originalUrl

	console.write("\nServing: " + url)

	// 403 forbidden
	if(forbiddenUrls.indexOf(url) != -1)
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
		console.write(": file.")
		next()
		return
	}

	if(url.substring(0, 5) == "/api/") {
		sendQuery(url, "api")
	} else {
		sendQuery(url, "valid")
	}

	next()
})

app.get("/api/reload-forbidden", (req, res, next) => {
	loadForbiddenUrls()
	res.end()
})

app.use(express.static("./"))

loadRoute(app, "/api/navyseal", "./routes/navyseal.js")
loadRoute(app, "/api/traffic", "./routes/traffic.js")
loadRoute(app, "/api/villagers", "./routes/minecraft/villagers.js")
loadRoute(app, "/", "./routes/global.js")

app.use((error, req, res, next) => {
	if(req.originalUrl.substring(0, 5) == "/api/") return
	res.status("404")
	res.render("global/404.htmljs")
	console.write(": unable to serve.")
	sendQuery(req.originalUrl, "missing")
})

app.listen(80)
https.createServer(ssl, app).listen(443)
console.log("Web server started, running.")

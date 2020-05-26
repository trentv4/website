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

console.write = (input) => process.stdout.write(input)

sql.query("select * from forbidden;").then(rows => {
	let newUrls = []
	rows.forEach(e => {
		newUrls.push(e.page)
	})
	forbiddenUrls = newUrls
}).catch(e => { console.error(e) })

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
	if(isLive && !req.secure && req.originalUrl.substring(0, 13) != "/.well-known/")
	{
		res.redirect("https://" + req.headers.host + req.originalUrl)
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
		return
	}

	// static file, skip over statistics and serving notice
	if(fs.existsSync("." + url) && fs.statSync("." + url).isFile() && url != "/")
		console.write(": file.")

	next()
})

app.use(express.static("./"))

app.use("/api/navyseal/", (req, res) => {
	sql.query("select title,content from navyseal").then(rows => {
		let out = []
		rows.forEach(e => {
			out.push({
				title: e.title,
				content: e.content
			})
		})
		res.send(out)
	}).error(console.error)
})

app.use("*", (req, res) => {
	res.render(req.originalUrl.substring(1), {req: req, res: res})
})

app.use((error, req, res, next) => {
	res.status("404")
	res.render("global/404.htmljs")
	console.write(": unable to serve.")
})

app.listen(80)
https.createServer(ssl, app).listen(443)
console.log("Web server started, running.")

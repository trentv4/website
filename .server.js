var express = require('express');
var fs = require('fs')
var markdown = require('marked')

var webm = JSON.parse(fs.readFileSync("data", "utf-8")).webm;
var forge_tutorial = JSON.parse(fs.readFileSync("forge_tutorial/data", "utf-8"))
var navyseal = JSON.parse(fs.readFileSync("data", "utf-8")).navyseal;

var siteStats = JSON.parse(fs.readFileSync("site-stats.json", "utf-8"))

var app = express()
var router = express.Router();
app.set('view engine', 'ejs');
app.set('views', __dirname + "")
app.use(express.static(__dirname + ""))

app.use(function(err, res, res, next) {
	res.render("404")
})

router.route('/navyseal/api/')
.get(function(req, res){
	res.send(navyseal);
})

router.route('/webm/api/request')
.get(function(req, res){
	if(req.query.v != "")
	{
		process.stdout.write("Webm request: " + req.query.v + ". Searching...");
		var found = false;
		for(var i = 0; i < webm.length; i++)
		{
			if(webm[i].name == (req.query.v))
			{
				process.stdout.write(" found.")
				res.send(webm[i]);
				res.end();
				found = true;
			}
		}
		if(found == false)
		{
			process.stdout.write(" cannot find.")
			res.send({name: "Unavailable", path:"", tags:[]});
			res.end();
		}
		process.stdout.write("\n")
	}
	else
	{
		res.end()
	}
})

router.route('/webm/api/all/')
.get(function(req, res){
	console.log("Webm request: ALL");
	res.send(webm);
})

router.route('/forge_tutorial/')
.get(function(req, res){
	if(req.query.p != undefined)
	{
		if(req.query.p == "edit")
		{
			res.render("forge_tutorial/edit",{})
		}
		else {
			process.stdout.write("Forge tutorial page request: " + req.query.p + ". Searching...")
			var page = forge_tutorial[req.query.p];
			if(page != undefined)
			{
				process.stdout.write(" found.\n")
				res.render("forge_tutorial", {
					content: fs.readFileSync("forge_tutorial/pages/" + page.content, "utf-8")
				})
			}
			else {
				process.stdout.write(" not found. Returning 404.\n")
				page = forge_tutorial["404"]
				res.render("forge_tutorial", {
					content: fs.readFileSync("forge_tutorial/pages/" + page.content, "utf-8")
				})
			}
		}
	}
	else
	{
		page = forge_tutorial["mainpage"]
		res.render("forge_tutorial", {
			content: fs.readFileSync("forge_tutorial/pages/" + page.content, "utf-8")
		})
		process.stdout.write("Forge tutorial page request: mainpage. Searching... found.\n")
	}
})

router.route("/webm/")
.get(function(req, res){
	console.log(req.originalUrl)
	res.render("webm", {
		req: req,
		res: res
	})
})

router.get("*", function(req, res)
{
	console.log("Serving: " + req.url)
	res.render(req._parsedUrl.pathname.substring(1), {
		req: req,
		res: res
	})
	if(siteStats[req.url] == null)
	{
		siteStats[req.url] = {}
	}
	var currentDate = new Date()

	var datestr = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate()
	if(siteStats[req.url][datestr] == null)
	{
		siteStats[req.url][datestr] = 1
	}
	else
	{
		siteStats[req.url][datestr]++;
	}

	fs.writeFileSync("site-stats.json", JSON.stringify(siteStats), "utf-8")
});

app.use('/', router);
app.listen(3000);
console.log("Trentv.net NodeJS server running");

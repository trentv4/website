var express = require('express');
var fs = require('fs')

let webm = []
let navyseal = []
let siteStats = {}
if(fs.existsSync("data")) {
  webm = JSON.parse(fs.readFileSync("data", "utf-8")).webm;
  navyseal = JSON.parse(fs.readFileSync("data", "utf-8")).navyseal;
}
if(fs.existsSync("site-stats.json")) {
  siteStats = JSON.parse(fs.readFileSync("site-stats.json", "utf-8"))
}

var app = express()
var router = express.Router();
app.set('view engine', 'ejs');
app.set('views', __dirname + "")
app.use(express.static(__dirname + ""))

app.use(function(err, res, res, next) {
	res.render("404")
})

app.use((req, res, next) => {
	console.log("Serving: " + req.url)

	if(siteStats[req.url] == null) siteStats[req.url] = {}

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

	fs.writeFile("site-stats.json", JSON.stringify(siteStats), "utf8", (err) => {
		if(err) throw err;
	})

	next()
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
	res.send(webm);
})

router.route('/api/site-stats')
.get( (req, res) => {
  res.send(siteStats)
})

router.get("*", function(req, res)
{
	res.render(req._parsedUrl.pathname.substring(1), {
		req: req,
		res: res
	})
});

app.use('/', router);
app.listen(3000);
console.log("Trentv.net NodeJS server running");

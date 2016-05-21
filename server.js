var http = require('http');
var express = require('express');
var app = express()
var watchr = require("watchr")
var fs = require('fs')

var webm;
var navyseal;

function update_data()
{
	webm = JSON.parse(fs.readFileSync("webm.data", "utf-8"))
	navyseal = JSON.parse(fs.readFileSync("navyseal.data", "utf-8"))
}
update_data();
watchr.watch(
	{
		paths: ["navyseal.data", "webm.data"],
		listeners: {change: function(a,b,c,d){update_data()}}
	});

var port = 3000;
var router = express.Router();
app.set('view engine', 'ejs');
app.set('views', __dirname + "/")
////API ROUTES////
router.route('/navyseal/api/')
.get(function(req, res){
	if(req.query.n != null)
	{
		for(var i = 0; i < navyseal.length; i++)
		{
			if(navyseal[i].name == req.query.n)
			{
				res.send(navyseal[i])
			}
		}
	}
	else
	{
		res.send(navyseal)
	}
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

router.route('/webm/api/refresh/')
.get(function(req, res){
	update_data();
	res.send(webm);
})

////REDIRECT ROUTES////
router.route('/webm/')
.get(function(req, res){
	res.render("webms/index.ejs", {
		video: req.query.v
	})
})
////LISTEN////
app.use('/', router);
app.listen(port);
console.log("Trentv.net NodeJS server running");

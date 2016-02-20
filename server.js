var http = require('http');
var express = require('express');
var app = express()

var port = 3000;
var api_router = express.Router();
var video_router = express.Router();

/////DATA/////
var webm = [
	{name: "hack", path: "hack.webm", img: "hack.png", tags:["leet", "dank", "4chin"]},
	{name: "hack2", path: "hack2.webm", img: "hack2.png", tags:["leet", "dank", "4chin"]},
	{name: "hack3", path: "hack3.webm", img: "hack3.png", tags:["leet", "dank", "4chin"]},
	{name: "hack4", path: "hack4.webm", img: "hack4.png", tags:["leet", "dank", "4chin"]},
	{name: "hack5", path: "hack5.webm", img: "hack5.png", tags:["leet", "dank", "4chin"]},
	{name: "hack6", path: "hack6.webm", img: "hack6.png", tags:["leet", "dank", "4chin"]},
	{name: "hack7", path: "hack7.webm", img: "hack7.png", tags:["leet", "dank", "4chin"]}
]
////ROUTES////
api_router.route('/navyseal/')
.get(function(req, res){
	console.log("Navy seal request obtained.");
	res.end()
})

api_router.route('/webm/')
.get(function(req, res){
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
})

api_router.route('/webm/all/')
.get(function(req, res){
	console.log("Webm request: ALL");
	res.send(webm);
	res.end();
})
////ROUTES////
video_router.route('/')
.get(function(req, res){
	res.end()
});
////LISTEN////
app.use('/api/', api_router);
app.use('/video/', video_router);
app.listen(port);
console.log("NodeJS Backend API running.");

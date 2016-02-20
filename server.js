var http = require('http');
var express = require('express');
var app = express()

var port = 3000;
var api_router = express.Router();

/////DATA/////
var webm = [
	{name: "The Corn Cob hacker", path: "hack.webm", img: "hack.png", tags:["black mask", "food", "terminal"]},
	{name: "The Hacker 4chan", path: "hack2.webm", img: "hack2.png", tags:["black mask", "loud", "4chin"]},
	{name: "MORE TIME", path: "hack4.webm", img: "hack4.png", tags:["loud", "encrypted"]},
	{name: "darude", path: "hack5.webm", img: "hack5.png", tags:["anonymous", "1337", "/b/"]},
	{name: "Keyboard Warrior", path: "hack6.webm", img: "hack6.png", tags:["beard", "loud", "green"]},
	{name: "what", path: "hack7.webm", img: "hack7.png", tags:["strange"]}
]
//store in a database!
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
////LISTEN////
app.use('/api/', api_router);
app.listen(port);
console.log("NodeJS Backend API running.");

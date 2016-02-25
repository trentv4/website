var http = require('http');
var express = require('express');
var app = express()

var port = 3000;
var router = express.Router();
app.set('view engine', 'ejs');

/////DATA/////
var webm = [
	{name: "The Corn Cob hacker", path: "hack.webm", img: "hack.png", tags:["food"]},
	{name: "The Hacker 4chan", path: "hack2.webm", img: "hack2.png", tags:["black mask", "loud", "4chin"]},
	{name: "MORE TIME", path: "hack4.webm", img: "hack4.png", tags:["loud", "encrypted"]},
	{name: "darude", path: "hack5.webm", img: "hack5.png", tags:["anonymous", "1337", "/b/"]},
	{name: "Keyboard Warrior", path: "hack6.webm", img: "hack6.png", tags:["beard", "loud", "green"]},
	{name: "what", path: "hack7.webm", img: "hack7.png", tags:["strange"]}
]
//store in a database!
////ROUTES////
router.route('/webms/req')
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

router.route('/webms/all/')
.get(function(req, res){
	console.log("Webm request: ALL");
	res.send(webm);
})

router.route('/webms/')
.get(function(req, res){
	res.render("webms", {
		video: req.query.v
	})
})
////LISTEN////
app.use('/', router);
app.listen(port);
console.log("NodeJS Backend API running.");

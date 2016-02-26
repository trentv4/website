var http = require('http');
var express = require('express');
var app = express()

var port = 3000;
var router = express.Router();
app.set('view engine', 'ejs');

/////DATA/////
var webm = [
	{name: "The Corn Cob hacker", path: "corncob/", tags:["food"]},
	{name: "The Hacker 4chan", path: "thehacker4chan/", tags:["black mask", "loud", "4chin"]},
	{name: "MORE TIME", path: "moretime/", tags:["loud", "encrypted"]},
	{name: "darude", path: "darude/", tags:["anonymous", "1337", "/b/"]},
	{name: "Keyboard Warrior", path: "keyboardwarrior/", tags:["beard", "loud", "green"]},
	{name: "what", path: "strange/", tags:["strange"]}
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
	res.render("webms/index.ejs", {
		video: req.query.v
	})
})
////LISTEN////
app.use('/', router);
app.listen(port);
console.log("NodeJS Backend API running.");

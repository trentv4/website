var http = require('http');
var express = require('express');
var app = express()

var port = 3000;
var router = express.Router();
app.set('view engine', 'ejs');

/////DATA/////
var webm = [
	{name: "The Corn Cob hacker", description: "This webm makes me hungry.", path: "corncob/", tags:["food"]},
	{name: "The Hacker 4chan", description: "Who is this 4 chin?", path: "thehacker4chan/", tags:["black mask", "loud", "4chin"]},
	{name: "MORE TIME", description: "Webm seller, I require your strongest webms.", path: "moretime/", tags:["loud", "encrypted"]},
	{name: "darude", description: "DUDUDUDUDUUDUDUDUDUDUDUUDUDUDUUU", path: "darude/", tags:["anonymous", "1337", "/b/"]},
	{name: "Keyboard Warrior", description: "I AM GREEN INCARNATE", path: "keyboardwarrior/", tags:["beard", "loud", "green"]},
	{name: "what", description: "I don't even know what the hell is going on in this webm.", path: "strange/", tags:["strange"]}
	{name: "Curtain Call", description: "From: JonTron Clocktower episode. SCI-SCI-SCISSORMANNN", path: "joncorn/", tags:["BLURHURGHRUGHRGH", "JonTron", "Clocktower"]}
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

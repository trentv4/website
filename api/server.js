var http = require('http');
var express = require('express');
var app = express()

var port = 3000;
var router = express.Router();


/////DATA/////
var webm = [
	{name: "hack", path: "hack.webm", tags:["leet", "dank", "4chin"]},
	{name: "hack2", path: "hack2.webm", tags:["leet", "dank", "4chin"]},
	{name: "hack3", path: "hack3.webm", tags:["leet", "dank", "4chin"]},
	{name: "hack4", path: "hack4.webm", tags:["leet", "dank", "4chin"]},
	{name: "hack5", path: "hack5.webm", tags:["leet", "dank", "4chin"]},
	{name: "hack6", path: "hack6.webm", tags:["leet", "dank", "4chin"]},
]
////ROUTES////
router.route('/navyseal/')
.get(function(req, res){
	console.log("Navy seal request obtained.");
	res.send();
	res.end();
})


router.route('/webm/')
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

router.route('/webm/all/')
.get(function(req, res){
	res.send(webm);
	res.end();
})
////LISTEN////
app.use('/api/', router);
app.listen(port);
console.log("NodeJS Backend API running.");

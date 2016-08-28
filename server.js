var express = require('express');
var fs = require('fs')

var webm = JSON.parse(fs.readFileSync("data", "utf-8")).webm;
var navyseal = JSON.parse(fs.readFileSync("data", "utf-8")).navyseal;

var app = express()
var router = express.Router();
app.set('view engine', 'ejs');
app.set('views', __dirname + "/")
app.use(express.static(__dirname + "/"))

////API ROUTES////
router.route('/')
.get(function(req, res) {
	res.render("index")
})



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
	res.render("webm/index.ejs", {
		video: req.query.v
	})
})
router.route('/review/')
.get(function(req, res){
	console.log(req.query.id)
	res.render("review2/index.ejs", {
		id: req.query.id
	})
})
////LISTEN////
app.use('/', router);
app.listen(3000);
console.log("Trentv.net NodeJS server running");

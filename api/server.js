var http = require('http');
var express = require('express');
var app = express()

var port = 3000;
var router = express.Router();

///////////////////


///////////////////
router.route('/navyseal/')
.get(function(req, res){
	console.log("Navy seal request obtained.");
	res.send();
	res.end();
})
///////////////////
app.use('/api/', router);
app.listen(port);
console.log("NodeJS Backend API running.");

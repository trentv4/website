var http = require('http');
var express = require('express');
var app = express()

var port = 80;
var router = express.Router();

///////////////////
router.route('/navyseal/')
.get(function(req, res){
	res.status(404).end();
})
///////////////////
app.use('/api/', router);
app.listen(port);
console.log("NodeJS Backend API running.");

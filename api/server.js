var http = require('http');
var express = require('express');
var app = express()

var port = process.env.PORT || 8080;
var router = express.Router();

///////////////////
router.route('/navyseal/')
.get(function(req, res){
	console.log("Navy Seal request")
	res.status(404).end();
})
///////////////////
app.use('/api', router);
app.listen(port);
console.log("running");

var http = require('http');
var express = require('express');
var app = express()
var bodyParser = require('body-parser')


var port = process.env.PORT || 8080;
var router = express.Router();

///////////////////
router.route('/test/')
.post(function(req, res){
  console.log(req);
})
.get(function(req, res){

})
///////////////////

app.use('/api', router);
app.listen(port);
console.log("running");

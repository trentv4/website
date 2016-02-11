var http = require('http');
var express = require('express');
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'horray'});
})

router.route('/').post(function(req, res){
  console.log(req);
})
app.use('/api', router);

app.listen(port);
console.log("running");

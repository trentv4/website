var http = require('http');
var express = require('express');
var app = express();
app.get('/api/watch', function (req, res) {
  res.end("fuck off");
  console.log("Request handled.")
})
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

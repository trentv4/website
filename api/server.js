var http = require('http');
var express = require('express');
<<<<<<< HEAD
var app = express();
=======
var app = express()
>>>>>>> 977fee71c426193c5a373756baa13bf18555d971

app.get('/api/watch', function (req, res) {
  res.end("fuck off");
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

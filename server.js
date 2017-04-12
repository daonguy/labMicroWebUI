var express = require("express");
var app = express();
var http = require('http')
var config = require('./config');


/******************************
* APIs - Proxy to Gateway API
*******************************/
app.all("/api/:cmd", function (request, response) {
  // Proxy the API request to the test stand
  try {
    var options = {
      host: config.api.host,
      path: config.api.path + request.params.cmd,
      method: request.method,
      headers: {
          "Content-Type" : "application/json"
      }
    };
    console.log(options);

    var demo_req = http.request(options, function(demo_res) {
      var str = '';
      demo_res.on('data', function(chunk) {
        str += chunk;
      });
      demo_res.on('end', function() {
        response.status(demo_res.statusCode).send(str);
      });
    }).on('error', function(e) {
      console.log(e);
      var statusCode = e.statusCode;
      if (!statusCode) {
        statusCode = 404;
      }
      response.status(statusCode).send(e);
    });
    demo_req.end();
  } catch (err) { console.log(err); }
});
/**************
* Views
***************/
//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('App started on port:' + port);
});


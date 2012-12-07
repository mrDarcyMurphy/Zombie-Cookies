var http = require('http');
var Cookies = require('cookies')

http.createServer(function (req, res) {
  // set a complex cookie
  var cookies = new Cookies(req, res)
  cookies.set("s", JSON.stringify({"foo":"bar"}))
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

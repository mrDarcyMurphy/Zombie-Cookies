Zombie-Cookies
==============

Zombie quotes complex cookies improperly which causes errors when reloading them.

See issue [#451](https://github.com/assaf/zombie/issues/451)

### Tip

Install the modules and install mocha globally

```
npm install && npm install mocha -g
```

### Run The Test

```
node server.js &
mocha
```

### The Server

```javascript
var http = require('http');
var Cookies = require('cookies')

http.createServer(function (req, res) {
  // set a complex cookie
  var cookies = new Cookies(req, res)
  cookies.set("s", JSON.stringify({"foo":"bar"}))
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
```


### The Test

```javascript
var Browser = require("zombie");
var assert = require("assert");

describe("visit", function() {

  var browser = new Browser()

  it("should load the test page", function(done) {
    browser
      .visit('http://localhost:1337/')
      .then(function(){
        assert.equal(browser.lastRequest.headers.cookie, undefined)
      })
      .then(done, done)
  })

  it("should reload the test page with the busted cookie", function(done) {
    browser
      .visit('http://localhost:1337/')
      .then(function(){
        // this fails
        assert.equal(browser.lastRequest.headers.cookie, 's={"foo":"bar"}')
      })
      .then(done, done)
  })

})
```

#### Expected Output

```
 ..

  ✖ 1 of 2 tests failed:

  1) visit should reload the test page with the busted cookie:

      actual expected

      s="{"foo":"bar"}"

  AssertionError: "s=\"{\"foo\":\"bar\"}\"" == "s={\"foo\":\"bar\"}"
```

Note the extra quotes around `{"foo":"bar"}`, they shouldn't be there.

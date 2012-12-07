Zombie-Cookies
==============

Zombie quotes cookies improperly which causes errors when reloading them.

### Tip
Install the modules and install mocha globally

```
npm install && npm install mocha -g
```

### Run The Test
```
mocha
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

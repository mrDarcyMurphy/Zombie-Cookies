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
        assert.equal(browser.lastRequest.headers.cookie, 's={"foo":"bar"}')
      })
      .then(done, done)
  })

})

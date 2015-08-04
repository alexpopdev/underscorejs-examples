require("babel/register")({
  // Optional only regex - if any filenames **don't** match this regex then they
  // aren't compiled
  only: /es6/
});

var getExampleOutput = require("./es6/example");

console.log(getExampleOutput());
require("babel/register")({
  // Optional only regex - if any filenames **don't** match this regex then they
  // aren't compiled
  only: /es6/
});

var example = require("./es6/example");
var getExampleOutput = example.default;

console.log(example.name + " - " + getExampleOutput());
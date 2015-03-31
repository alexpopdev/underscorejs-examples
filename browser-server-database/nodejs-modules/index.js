// module1 exports an object instance
var module1 = require('./module1.js');
// module2 exports an object property
var module2 = require('./module2.js');
// module3 located in node_modules
var module3 = require('module3');
console.log("module1:" + JSON.stringify(module1));
console.log("module2:" + JSON.stringify(module2));
console.log("module3:" + JSON.stringify(module3));
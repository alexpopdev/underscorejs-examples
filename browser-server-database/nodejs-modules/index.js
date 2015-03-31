// module1 exports an object instance
var module1 = require('./module1.js');
// module2 exports an object property
var module2 = require('./module2.js');
// module3 located in a folder with a default file
var module3 = require('./shared/module3');
// module4 located in a folder with a package.json file
var module4 = require('./shared/module4');

console.log("module1:" + JSON.stringify(module1));
console.log("module2:" + JSON.stringify(module2));
console.log("module3:" + JSON.stringify(module3));
console.log("module4:" + JSON.stringify(module4));

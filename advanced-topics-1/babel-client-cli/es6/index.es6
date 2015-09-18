/*jshint esnext: true */

let aGreeter = new DerivedGreeter("Hello world");
let message = aGreeter.getMessage();

var aSet = new Set([10, 20, 30, 40, 50, 10, 20, 30]);
$("#output").html(message + "<br /> The example set size is " + aSet.size);
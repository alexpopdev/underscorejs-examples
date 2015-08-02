System.register(["DerivedGreeter"], function (_export) {
  /*jshint esnext: true */
  "use strict";

  var DerivedGreeter;

  _export("default", getExampleOutput);

  function getExampleOutput() {
    var aGreeter = new DerivedGreeter("Hello world");
    var message = aGreeter.getMessage();

    var aSet = new Set([10, 20, 30, 40, 50, 10, 20, 30]);
    return message + "<br /> The example set size is " + aSet.size;
  }

  return {
    setters: [function (_DerivedGreeter) {
      DerivedGreeter = _DerivedGreeter["default"];
    }],
    execute: function () {}
  };
});
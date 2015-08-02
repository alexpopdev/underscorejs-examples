System.register([], function (_export) {
  /*jshint esnext: true */

  "use strict";

  var Greeter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      Greeter = (function () {
        function Greeter(message) {
          _classCallCheck(this, Greeter);

          this.message = message;
        }

        _createClass(Greeter, [{
          key: "getMessage",
          value: function getMessage() {
            return "An instance of class " + this.constructor.name + " says: " + this.message;
          }
        }]);

        return Greeter;
      })();

      _export("default", Greeter);
    }
  };
});
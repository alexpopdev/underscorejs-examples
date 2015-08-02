System.register(["Greeter"], function (_export) {
  /*jshint esnext: true */
  "use strict";

  var Greeter, DerivedGreeter;

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_Greeter2) {
      Greeter = _Greeter2["default"];
    }],
    execute: function () {
      DerivedGreeter = (function (_Greeter) {
        _inherits(DerivedGreeter, _Greeter);

        function DerivedGreeter(message) {
          _classCallCheck(this, DerivedGreeter);

          _get(Object.getPrototypeOf(DerivedGreeter.prototype), "constructor", this).call(this, message + " !");
        }

        return DerivedGreeter;
      })(Greeter);

      _export("default", DerivedGreeter);
    }
  };
});
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

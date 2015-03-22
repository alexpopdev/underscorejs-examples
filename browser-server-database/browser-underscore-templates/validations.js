var validations = (function() {
  "use strict";

  return {
    validateArgsLength: function(argsLength, argsArray) {
      if (argsArray.length != argsLength) {
        throw {
          name: "ArgumentsException",
          message: "The arguments length is incorrect."
        };
      }
    },
    validateArgsTypes: function(argsArray, argumentValidatorArray) {
      _.each(argsArray, function(argument, index) {
        if (!argumentValidatorArray[index](argument)) {
          throw {
            name: "ArgumentsException",
            message: "One of the arguments does not have the expected type."
          };
        }
      });
    },
    validateContactArgs: function(argsArray) {
      this.validateArgsTypes(
        argsArray, [_.isNumber, _.isString, _.isString, _.isString, _.isString, _.isString, _.isString]);
    },
    validateClientArgs: function(argsArray) {
      this.validateContactArgs(_.first(argsArray, 7));
      this.validateArgsTypes(
        _.rest(argsArray, 7), [_.isDate, _.isString, _.isNumber, _.isString]);
    }
  };
}());

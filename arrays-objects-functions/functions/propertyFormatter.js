var propertyFormatter = (function() {
  "use strict";

  var extractDataPropertiesForDisplayAsArray = function(source, ignoreId) {
    var propertiesForDisplay = [];
    if (_.isNull(source) || _.isUndefined(source) || _.isEmpty(source) || (!ignoreId && !_.isNumber(source.id))) {
      return propertiesForDisplay;
    }

    _.each(_.pairs(source), function(keyValue) {
      var key = keyValue[0];
      var value = keyValue[1];
      if (_.isDate(value) || _.isBoolean(value) || _.isNumber(value) || _.isString(value)) {
        propertiesForDisplay.push("Property '" + key + "' of type: " + typeof value + " has value: " + value);
      } else if (!_.isFunction(value)) {
        propertiesForDisplay.push("Property: " + keyValue[0] + " cannot be displayed.");
      }
    });

    return propertiesForDisplay;
  };

  var extractDataPropertiesForDisplayForAnyObject = _.partial(extractDataPropertiesForDisplayAsArray, _, true);

  return {
    extractPropertiesForDisplayAsArray: function(source, ignoreId) {
      var propertiesForDisplay = [];
      if (_.isNull(source) || _.isUndefined(source) || _.isEmpty(source) || (!ignoreId && !_.isNumber(source.id))) {
        return propertiesForDisplay;
      }

      _.each(_.pairs(source), function(keyValue) {
        var key = keyValue[0];
        var value = keyValue[1];
        if (_.isDate(value) || _.isBoolean(value) || _.isNumber(value) || _.isString(value)) {
          propertiesForDisplay.push("Property '" + key + "' of type: " + typeof value + " has value: " + value);
        } else {
          propertiesForDisplay.push("Property '" + key + "' cannot be displayed.");
        }
      });

      return propertiesForDisplay;
    },
    extractDataPropertiesForDisplayAsArray: extractDataPropertiesForDisplayAsArray,
    extractDataPropertiesForDisplayForAnyObject: extractDataPropertiesForDisplayForAnyObject,
    extractPropertiesForDisplayAsString: function(source, ignoreId) {
      if (_.isNull(source) || _.isUndefined(source) || _.isEmpty(source) || (!ignoreId && !_.isNumber(source.id))) {
        return [];
      }

      return _.reduce(source, function(memo, value, key) {
          if (memo && memo !== "") {
            memo += "<br/>";
          }
          var isDate = typeof value === 'object' && value instanceof Date;
          if (_.isDate(value) || _.isBoolean(value) || _.isNumber(value) || _.isString(value)) {
            return memo + "Property: " + key + " of type: " + typeof value + " has value: " + value;
          }
          return memo + "Property: " + key + " cannot be displayed.";
        },
        "");
    }
  };
}());
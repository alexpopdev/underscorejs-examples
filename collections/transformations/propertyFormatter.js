var propertyFormatter = (function() {
  "use strict";

  return {
    extractPropertiesForDisplayAsArray: function(source) {
      if (!source || source.id !== +source.id) {
        return [];
      }

      return _.map(source, function(value, key) {
        var isDate = typeof value === 'object' && value instanceof Date;
        if (isDate || typeof value === 'boolean' || typeof value === 'number' ||
          typeof value === 'string') {
          return "Property: " + key + " of type: " + typeof value + " has value: " + value;
        }
        return "Property: " + key + " cannot be displayed.";
      });
    },
    extractPropertiesForDisplayAsString: function(source, ignoreId) {
      if (!source || (!ignoreId && source.id !== +source.id)) {
        return [];
      }

      return _.reduce(source, function(memo, value, key) {
          if (memo && memo !== "") {
            memo += "<br/>";
          }
          var isDate = typeof value === 'object' && value instanceof Date;
          if (isDate || typeof value === 'boolean' || typeof value === 'number' ||
            typeof value === 'string') {
            return memo + "Property: " + key + " of type: " + typeof value + " has value: " + value;
          }
          return memo + "Property: " + key + " cannot be displayed.";
        },
        "");
    }
  };
}());
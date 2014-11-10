var propertyExtractor = (function() {
  "use strict";

  return {
    extractStorableProperties: function(source) {
      var storableProperties = {};
      if (!source || source.id !== +source.id) {
        return storableProperties;
      }

      _.each(source, function(value, key) {
        var isDate = typeof value === 'object' && value instanceof Date;
        if (isDate || typeof value === 'boolean' || typeof value === 'number' ||
          typeof value === 'string') {
            storableProperties[key] = value;
          }
      });

      return storableProperties;
    },
    extractStorablePropertiesWithThis: function(source) {
      var storableProperties = {};
      if (!source || source.id !== +source.id) {
        return storableProperties;
      }

      _.each(source, function(value, key) {
        var isDate = typeof value === 'object' && value instanceof Date;
        if (isDate || typeof value === 'boolean' || typeof value === 'number' ||
          typeof value === 'string') {
            this[key] = value;
          }
      },
      storableProperties);

      return storableProperties;
    }
  };
}());

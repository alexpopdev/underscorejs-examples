var contribSamples = (function() {
  "use strict";

  return {
    concatenateArrays: function(args) {
      var concatResult = _.cat.apply(this, arguments);
      var filteredResult = _.chain(concatResult)
                            .filter(_.existy)
                            .sortBy(_.identity)
                            .unique(true)
                            .value();
      return filteredResult;
    }
  };
}());

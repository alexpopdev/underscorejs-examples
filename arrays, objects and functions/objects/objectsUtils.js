var objectsUtils = (function() {
  "use strict";

  var clients = dataProvider.getClients();
  return {
    getNewestClients: function(count) {
      return _.last(_.sortBy(clients, 'registered'), count);
    }
  };
}());
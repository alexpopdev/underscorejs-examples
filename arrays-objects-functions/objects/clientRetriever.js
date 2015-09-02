var clientRetriever = (function() {
  "use strict";

  var clients = dataProvider.getClients();
  return {
    getClientsIdAndName: function() {
      return _.map(clients, function(client) {
        return _.pick(client, 'id', 'name');
      });
    },
    getClientsContactInfo: function() {
      return _.map(clients, function(client) {
        return _.omit(client, 'registered', 'preferredBike', 'bikePoints', 'isActive', 'notes');
      });
    },
  };
}());
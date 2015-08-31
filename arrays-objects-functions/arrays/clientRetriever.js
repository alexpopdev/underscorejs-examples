var clientRetriever = (function() {
  "use strict";

  var clients = dataProvider.getClients();
  return {
    getNewestClients: function(count) {
      return _.last(_.sortBy(clients, function(client) {
        return new Date(client.registered);
      }), count);
    },
    getOldestClients: function(count) {
      return _.first(_.sortBy(clients, function(client) {
        return new Date(client.registered);
      }), count);
    },
    getOlderClients: function(skipLastCount) {
      return _.initial(_.sortBy(clients, function(client) {
        return new Date(client.registered);
      }), skipLastCount);
    },
    getNewerClients: function(skipFirstCount) {
      return _.rest(_.sortBy(clients, function(client) {
        return new Date(client.registered);
      }), skipFirstCount);
    },
    getOldestOrBestClients: function(count) {
      var oldestClients = _.first(_.sortBy(clients, function(client) {
          return new Date(client.registered);
        }),
        count);
      var bestClients = _.last(_.sortBy(clients, 'bikePoints'), count);
      var oldestOrBestClients = _.union(oldestClients, bestClients);
      return oldestOrBestClients;
    },
    getOldestOrBestClientsWithuniq: function(count) {
      var oldestClients = _.first(_.sortBy(clients, function(client) {
          return new Date(client.registered);
        }),
        count);
      var bestClients = _.last(_.sortBy(clients, 'bikePoints'), count);
      var oldestOrBestClientsWithDuplicates = oldestClients.concat(bestClients);
      return _.uniq(oldestOrBestClientsWithDuplicates);
    },
    getOldestAndBestClients: function(count) {
      var oldestClients = _.first(_.sortBy(clients, function(client) {
          return new Date(client.registered);
        }),
        count);
      var bestClients = _.last(_.sortBy(clients, 'bikePoints'), count);
      var oldestAndBestClients = _.intersection(oldestClients, bestClients);
      return oldestAndBestClients;
    },
    getOldestOrBestClientsThatAreNotBoth: function(count) {
      var oldestClients = _.first(_.sortBy(clients, function(client) {
          return new Date(client.registered);
        }),
        count);
      var bestClients = _.last(_.sortBy(clients, 'bikePoints'), count);
      var oldestOrBestClients = _.union(oldestClients, bestClients);
      var oldestAndBestClients = _.intersection(oldestClients, bestClients);
      return _.difference(oldestOrBestClients, oldestAndBestClients);
    },
    getClientsAndOrdersAsArrays: function() {
      var clientIds = _.pluck(clients, 'id');
      var clientNames = _.pluck(clients, 'name');

      var clientOrders = dataProvider.getClientOrders();
      var ordersCount = _.map(clientOrders, function(clientOrder) {
        return clientOrder.orders.length;
      });

      var clientAndOrders = _.zip(clientIds, clientNames, ordersCount);
      return clientAndOrders;
    }
  };
}());
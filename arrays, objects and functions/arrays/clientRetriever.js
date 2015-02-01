var clientRetriever = (function() {
  "use strict";

  var clients = dataProvider.getClients();
  return {
    getNewestClients: function(count) {
      return _.last(_.sortBy(clients, 'registered'), count);
    },
    getOldestClients: function(count) {
      return _.first(_.sortBy(clients, 'registered'), count);
    },
    getOlderClients: function(skipLastCount) {
      return _.initial(_.sortBy(clients, 'registered'), skipLastCount);
    },
    getNewerClients: function(skipFirstCount) {
      return _.rest(_.sortBy(clients, 'registered'), skipFirstCount);
    },
    getOldestOrBestClients: function(count) {
      var oldestClients = _.first(_.sortBy(clients, 'registered'), count);
      var bestClients = _.last(_.sortBy(clients, 'bikePoints'), count);
      var oldestOrBestClients = _.union(oldestClients, bestClients);
      return oldestOrBestClients;
    },
    getOldestAndBestClients: function(count) {
      var oldestClients = _.first(_.sortBy(clients, 'registered'), count);
      var bestClients = _.last(_.sortBy(clients, 'bikePoints'), count);
      var oldestAndBestClients = _.intersection(oldestClients, bestClients);
      return oldestAndBestClients;
    }
  };
}());

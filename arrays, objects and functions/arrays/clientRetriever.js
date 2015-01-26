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
  };
}());

var contribSamples = (function() {
  "use strict";

  return {
    getArrayFromArguments: function() {
      var contacts = getContacts();
      return _.filter(contacts, function(contact) {
        return contact.constructor === Client;
      });
    },
    getOldestClients: function(count) {
      return _.first(_.sortBy(this.getClients(), 'registered'), count);
    },
    getBestClients: function(count) {
      return _.first(_.sortBy(this.getClients(), 'bikePoints'), count);
    }
  };
}());

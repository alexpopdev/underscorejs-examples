var clientRetriever = (function() {
  "use strict";

  var getContacts = function() {
    var clientObjects = dataProvider.getClients();
    return _.map(clientObjects, function(clientObject) {
      if (!clientObject.isActive) {
        return new Contact(
          clientObject.id,
          clientObject.name,
          clientObject.gender,
          clientObject.company,
          clientObject.email,
          clientObject.phone,
          clientObject.address);
      }
      return new Client(
        clientObject.id,
        clientObject.name,
        clientObject.gender,
        clientObject.company,
        clientObject.email,
        clientObject.phone,
        clientObject.address,
        new Date(clientObject.registered),
        clientObject.preferredBike,
        clientObject.bikePoints,
        clientObject.notes
      );
    });
  };

  return {
    getContacts: getContacts,
    getClients: function() {
      var contacts = getContacts();
      return _.filter(contacts, function(contact) {
        return contact instanceof Client;
      });
    }
  };
}());
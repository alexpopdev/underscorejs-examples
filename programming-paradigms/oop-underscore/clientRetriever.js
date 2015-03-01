var clientRetriever = (function() {
  "use strict";

  var clientObjects = dataProvider.getClients();
  return {
    getContacts: function() {
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
          clientObject.registered,
          clientObject.preferredBike,
          clientObject.bikePoints,
          clientObject.notes
        );
      });
    },
  };
}());
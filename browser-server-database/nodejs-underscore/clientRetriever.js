var _ = require("underscore");
var dataProvider = require("./dataProvider");
var Contact = require("./contact");
var Client = require("./client");

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

exports.getContacts = getContacts;
exports.getClients = function() {
  var contacts = getContacts();
  return _.filter(contacts, function(contact) {
    return contact instanceof Client;
  });
};
exports.getOldestClients = function(count) {
  return _.first(_.sortBy(this.getClients(), 'registered'), count);
};
exports.getBestClients = function(count) {
  return _.first(_.sortBy(this.getClients(), 'bikePoints'), count);
};
var _ = require("underscore");
var dataProvider = require("./dataProvider.js");
var Contact = require("./contact.js");
var Client = require("./client.js");

var getContacts = function(callback) {
  dataProvider.getClients(function(clientObjects) {
    var contacts = _.map(clientObjects, function(clientObject) {
      if (!clientObject.isActive) {
        return new Contact(
          clientObject._id,
          clientObject.name,
          clientObject.gender,
          clientObject.company,
          clientObject.email,
          clientObject.phone,
          clientObject.address);
      }
      return new Client(
        clientObject._id,
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
    callback(contacts);
  });
};

getClients = function(callback) {
  getContacts(function(contacts) {
    var clients = _.filter(contacts, function(contact) {
      return contact.constructor === Client;
    });
    callback(clients);
  });
};

exports.getContacts = getContacts;
exports.getClients = getClients;
exports.getOldestClients = function(count, callback) {
  getClients(function(clients) {
    var oldestClients = _.first(_.sortBy(clients, 'registered'), count);
    callback(oldestClients);
  });
};
exports.getBestClients = function(count, callback) {
  getClients(function(clients) {
    var bestClients = _.first(_.sortBy(clients, 'bikePoints'), count);
    callback(bestClients);
  });
};

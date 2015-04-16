var _ = require("underscore");
var Contact = require("./contact.js");
var validations = require("./validations.js");

function Client(_id, name, gender, company, email, phone, address, registered, preferredBike, bikePoints, notes) {
  var argsArray = _.toArray(arguments);

  validations.validateArgsLength(11, argsArray);

  validations.validateClientArgs(argsArray);

  Contact.call(this, _id, name, gender, company, email, phone, address);
  this.type = 'client';
  this.registered = registered;
  this.preferredBike = preferredBike;
  this.bikePoints = bikePoints;
  this.notes = notes;
}

Client.prototype = Object.create(Contact.prototype);
Client.prototype.constructor = Client;

module.exports = Client;

var _ = require("underscore");
var Contact = require("./contact");
var validations = require("./validations");

function Client(id, name, gender, company, email, phone, address, registered, preferredBike, bikePoints, notes) {
  var argsArray = _.toArray(arguments);

  validations.validateArgsLength(11, argsArray);

  validations.validateClientArgs(argsArray);

  Contact.call(this, id, name, gender, company, email, phone, address);
  this.type = 'client';
  this.registered = registered;
  this.preferredBike = preferredBike;
  this.bikePoints = bikePoints;
  this.notes = notes;
}

Client.prototype = Object.create(Contact.prototype);
Client.prototype.constructor = Client;

module.exports = Client;
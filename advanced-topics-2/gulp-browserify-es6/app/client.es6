/*jshint esnext: true */
import _ from "underscore";
import Contact from "./contact.es6";
import validations from "./validations.es6";

export default function Client(id, name, gender, company, email, phone, address, registered, preferredBike, bikePoints, notes) {
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

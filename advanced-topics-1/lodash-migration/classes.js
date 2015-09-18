var Contact = (function() {
  "use strict";

  function Contact(id, name, gender, company, email, phone, address) {
    var argsArray = _.toArray(arguments);
    if (argsArray.length != 7) {
      throw {
        name: "ArgumentsException",
        message: "The arguments length is incorrect."
      };
    }

    if (!_.isNumber(id) || !_.isString(name) || !_.isString(gender) || !_.isString(company) || !_.isString(email) || !_.isString(phone) || !_.isString(address)) {
      throw {
        name: "ArgumentsException",
        message: "One of the arguments does not have the expected type."
      };
    }

    this.id = id;
    this.name = name;
    this.gender = gender;
    this.company = company;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.type = "contact";
  }

  Contact.prototype.getContactNameIdAndType = function() {
    return this.name + " (" + this.id + " - " + this.type + ")";
  };

  return Contact;
}());

var Client = (function() {
  "use strict";

  function Client(id, name, gender, company, email, phone, address, registered, preferredBike, bikePoints, notes) {
    var argsArray = _.toArray(arguments);
    if (argsArray.length != 11) {
      throw {
        name: "ArgumentsException",
        message: "The arguments length is incorrect."
      };
    }

    if (!_.isDate(registered) || !_.isString(preferredBike) || !_.isNumber(bikePoints) || !_.isString(notes)) {
      throw {
        name: "ArgumentsException",
        message: "One of the arguments does not have the expected type."
      };
    }

    Contact.call(this, id, name, gender, company, email, phone, address);
    this.type = 'client';
    this.registered = registered;
    this.preferredBike = preferredBike;
    this.bikePoints = bikePoints;
    this.notes = notes;
  }

  Client.prototype = Object.create(Contact.prototype);
  Client.prototype.constructor = Client;

  return Client;
}());
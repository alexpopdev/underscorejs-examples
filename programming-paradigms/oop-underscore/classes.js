var Contact = (function() {
  "use strict";

  function Contact(id, name, gender, company, email, phone, address) {
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

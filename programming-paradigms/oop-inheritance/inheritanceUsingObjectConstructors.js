/* jshint proto: true */
(function() {
  "use strict";
  var exampleTitle = "Inheritance using object constructors - ";

  var originalClient = {
    "id": 1,
    "name": "Baxter Brooks",
    "gender": "male",
    "type": "client",
    "email": "baxterbrooks@dymi.com",
    "registered": "2014-03-15T10:52:05 -00:00",
    "isActive": false
  };

  function Contact(id, name, gender, email) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.type = "contact";
    this.email = email;
  }
  var contact = new Contact(
    1,
    "Baxter Brooks",
    "male",
    "baxterbrooks@dymi.com"
  );

  console.log(exampleTitle + "Assert that [[Prototype]] for 'contact' instance is the object constructor prototype: " + (contact.__proto__ === Contact.prototype));
  var assertContactIsInstanceOfContact = contact instanceof Contact;
  console.log(exampleTitle + "Assert that 'contact' is an instance of Contact: " + assertContactIsInstanceOfContact);

  function Client(id, name, gender, email, registered, isActive) {
    Contact.call(this, id, name, gender, email);
    this.type = 'client';
    this.registered = registered;
    this.isActive = isActive;
  }

  Client.prototype = Object.create(Contact.prototype);
  Client.prototype.constructor = Client;

  var client = new Client(
    1,
    "Baxter Brooks",
    "male",
    "baxterbrooks@dymi.com",
    "2014-03-15T10:52:05 -00:00",
    false
  );

  console.log(exampleTitle + "Assert that [[Prototype]] for 'client' inherits from the [[Prototype]] for 'contact': " + (client.__proto__.__proto__ === contact.__proto__));

  var assertClientIsInstanceOfContact = client instanceof Contact;
  console.log(exampleTitle + "Assert that 'client' is an instance of Contact: " + assertClientIsInstanceOfContact);

  Contact.prototype.getContactIdAndName = function() {
    return this.name + " (" + this.id + ")";
  };
  console.log(exampleTitle + "Assert that all objects inheriting from 'Contact' or that are 'Contact' have the same value for getContactIdAndName(): " + (contact.getContactIdAndName() === client.getContactIdAndName()));
}());
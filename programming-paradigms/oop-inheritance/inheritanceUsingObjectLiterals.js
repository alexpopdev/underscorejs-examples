/* jshint proto: true */
(function() {
  "use strict";
  var exampleTitle = "Inheritance using object literals - ";

  var originalClient = {
    "id": 1,
    "name": "Baxter Brooks",
    "gender": "male",
    "type": "client",
    "email": "baxterbrooks@dymi.com",
    "registered": "2014-03-15T10:52:05 -00:00",
    "isActive": false,
  };

  var contact = {
    "id": 1,
    "name": "Baxter Brooks",
    "gender": "male",
    "type": "contact",
    "email": "baxterbrooks@dymi.com",
  };

  var assertObjectLiteralPrototype = originalClient.__proto__ === contact.__proto__ && contact.__proto__ === {}.__proto__;
  console.log(exampleTitle + "Assert that the default [[Prototype]] property of any object literal is the same object instance: " + assertObjectLiteralPrototype);

  var client1 = {
    __proto__: contact,
    "type": "client",
    "registered": "2014-03-15T10:52:05 -00:00",
    "isActive": false,
  };

  var assertClient1Prototype = client1.__proto__ === Object.getPrototypeOf(client1) && client1.__proto__ === contact;
  console.log(exampleTitle + "Assert that [[Prototype]] for object 'client1' is 'contact': " + assertClient1Prototype);

  var client2 = Object.create(contact);
  _.extend(client2, {
    "type": "client",
    "registered": "2014-03-15T10:52:05 -00:00",
    "preferredBike": "A clown bike",
    "isActive": false,
  });

  var assertClient2Prototype = client2.__proto__ === Object.getPrototypeOf(client2) && client2.__proto__ === contact;
  console.log(exampleTitle + "Assert that [[Prototype]] for object 'client2' is 'contact': " + assertClient2Prototype);

  client1.__proto__.emailSubscriber = true;
  console.log(exampleTitle + "Assert that all objects inheriting from 'contact' and 'contact' itself have emailSubscriber set to true: " + (contact.emailSubscriber && client1.emailSubscriber && client2.emailSubscriber));

  client1.__proto__.getContactIdAndName = function() {
    return this.name + " (" + this.id + ")";
  };
  console.log(exampleTitle + "Assert that all objects inheriting from 'contact' and 'contact' itself have the same value for getContactIdAndName(): " + (contact.getContactIdAndName() === client1.getContactIdAndName() && contact.getContactIdAndName() === client2.getContactIdAndName()));
}());
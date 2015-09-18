/*jshint esnext: true */
import Contact from '../app/Contact.es6';
describe("Given Contact class", () => {

  describe("when calling new Contact() with too few arguments", () => {
    var createContact = function() {
      new Contact(1, " A contact name");
    };
    it("then throws the correct exception", () => {
      expect(createContact).toThrow({
        name: 'ArgumentsException',
        message: 'The arguments length is incorrect.'
      });
    });
  });

  describe("when calling new Contact() with an argument of the wrong type", () => {
    var createContact = function() {
      new Contact(1, " A contact name", 4, "Company2", "An email", "Phone1", "An address");
    };
    it("then throws the correct exception", () => {
      expect(createContact).toThrow({
        name: "ArgumentsException",
        message: "One of the arguments does not have the expected type."
      });
    });
  });
});
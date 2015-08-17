/*jshint esnext: true */
import * as clientRetriever from "../app/clientRetriever.es6";
describe("Given clientRetriever", () => {

  describe("when calling getContacts()", () => {
    var contacts = clientRetriever.getContacts();

    it("then it returns an array of the correct length", () => {
      expect(contacts).toBeTruthy();
      expect(contacts.length).toEqual(250);
    });
  });

  describe("when calling getClients()", () => {
    var clients = clientRetriever.getClients();

    it("then it returns an array of the correct length", () => {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(121);
    });
  });

});
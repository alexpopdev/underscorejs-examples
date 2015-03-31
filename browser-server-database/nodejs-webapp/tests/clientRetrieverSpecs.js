describe("Given clientRetriever", function() {

  describe("when calling getContacts()", function() {
    var contacts = clientRetriever.getContacts();

    it("then it returns an array of the correct length", function() {
      expect(contacts).toBeTruthy();
      expect(contacts.length).toEqual(250);
    });
  });

  describe("when calling getClients()", function() {
    var clients = clientRetriever.getClients();

    it("then it returns an array of the correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(121);
    });
  });

});
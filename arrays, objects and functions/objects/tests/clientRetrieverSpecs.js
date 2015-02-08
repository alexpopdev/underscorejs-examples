describe("Given clientRetriever", function() {

  describe("when calling getClientsIdAndName()", function() {
    var clients = clientRetriever.getClientsIdAndName();

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(250);
    });

    it("then the first client should be correct", function() {
      expect(clients[0]).toBeTruthy();
      expect(_.keys(clients[0]).length).toEqual(2);
    });
  });

  describe("when calling getClientsContactInfo()", function() {
    var clients = clientRetriever.getClientsContactInfo();

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(250);
    });

    it("then the first client should be correct", function() {
      expect(clients[0]).toBeTruthy();
      expect(_.keys(clients[0]).length).toEqual(7);
    });
  });
});
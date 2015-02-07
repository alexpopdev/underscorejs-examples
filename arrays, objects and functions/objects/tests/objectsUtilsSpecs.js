describe("Given clientRetriever", function() {

  describe("when calling getNewestClients()", function() {
    var clients = clientRetriever.getNewestClients(5);

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(5);
    });

    it("then the first client should be correct", function() {
      expect(clients[0]).toBeTruthy();
      expect(clients[0].id).toEqual(15);
    });

    it("then the last client should be correct", function() {
      expect(clients[clients.length - 1]).toBeTruthy();
      expect(clients[clients.length - 1].id).toEqual(69);
    });
  });

});
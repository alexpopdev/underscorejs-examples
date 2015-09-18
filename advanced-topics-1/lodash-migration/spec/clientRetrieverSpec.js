describe("Given clientRetriever", function() {

  describe("when calling getClients()", function() {
    var clients = clientRetriever.getClients();

    it("then returns an array of the correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(121);
    });
  });

});
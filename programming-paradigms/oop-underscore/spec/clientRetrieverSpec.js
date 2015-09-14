describe("Given clientRetriever", function() {

  describe("when calling getClientsUsingTypeProperty()", function() {
    var clients = clientRetriever.getClientsUsingTypeProperty();

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(121);
    });
  });

  describe("when calling getClientsUsingConstructorType()", function() {
    var clients = clientRetriever.getClientsUsingConstructorType();

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(121);
    });
  });

  describe("when calling getClientsUsingInstanceof()", function() {
    var clients = clientRetriever.getClientsUsingInstanceof();

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(121);
    });
  });

});
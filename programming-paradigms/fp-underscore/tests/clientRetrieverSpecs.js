describe("Given clientRetriever", function() {

  describe("when calling getClientsUsingConstructorInfo() and getClientsUsingTypeProperty", function() {
    var clientsForConstructorInfo = clientRetriever.getClientsUsingConstructorInfo();
    var clientsForTypeProperty = clientRetriever.getClientsUsingTypeProperty();

    it("then they both returns an array of the same correct length", function() {
      expect(clientsForConstructorInfo).toBeTruthy();
      expect(clientsForConstructorInfo.length).toEqual(121);

      expect(clientsForTypeProperty).toBeTruthy();
      expect(clientsForTypeProperty.length).toEqual(121);
    });
  });

});

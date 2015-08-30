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

  describe("when calling getOldestClients()", function() {
    var clients = clientRetriever.getOldestClients(5);

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(5);
    });

    it("then the first client should be correct", function() {
      expect(clients[0]).toBeTruthy();
      expect(clients[0].id).toEqual(150);
    });

    it("then the last client should be correct", function() {
      expect(clients[clients.length - 1]).toBeTruthy();
      expect(clients[clients.length - 1].id).toEqual(243);
    });
  });

  describe("when calling getOlderClients()", function() {
    var clients = clientRetriever.getOlderClients(5);

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(245);
    });

    it("then the first client should be correct", function() {
      expect(clients[0]).toBeTruthy();
      expect(clients[0].id).toEqual(150);
    });

    it("then the last client should be correct", function() {
      expect(clients[clients.length - 1]).toBeTruthy();
      expect(clients[clients.length - 1].id).toEqual(200);
    });
  });

  describe("when calling getNewerClients()", function() {
    var clients = clientRetriever.getNewerClients(5);

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(245);
    });

    it("then the first client should be correct", function() {
      expect(clients[0]).toBeTruthy();
      expect(clients[0].id).toEqual(85);
    });

    it("then the last client should be correct", function() {
      expect(clients[clients.length - 1]).toBeTruthy();
      expect(clients[clients.length - 1].id).toEqual(69);
    });
  });

  describe("when calling getOldestOrBestClients()", function() {
    var clients = clientRetriever.getOldestOrBestClients(50);

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(89);
    });
  });

  describe("when calling getOldestOrBestClientsWithuniq()", function() {
    var clients = clientRetriever.getOldestOrBestClientsWithuniq(50);

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(89);
    });
  });

  describe("when calling getOldestAndBestClients()", function() {
    var clients = clientRetriever.getOldestAndBestClients(50);

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(11);
    });
  });

  describe("when calling getOldestOrBestClientsThatAreNotBoth()", function() {
    var clients = clientRetriever.getOldestOrBestClientsThatAreNotBoth(50);

    it("then it returns an array of correct length", function() {
      expect(clients).toBeTruthy();
      expect(clients.length).toEqual(78);
    });
  });

  describe("when calling getClientsAndOrdersAsArrays()", function() {
    var clientsAndOrders = clientRetriever.getClientsAndOrdersAsArrays();

    it("then it returns an array of correct length", function() {
      expect(clientsAndOrders).toBeTruthy();
      expect(clientsAndOrders.length).toEqual(250);
    });
    it("then the first element is correct", function() {
      expect(clientsAndOrders[0].length).toEqual(3);
      expect(clientsAndOrders[0][0]).toEqual(1);
      expect(clientsAndOrders[0][1]).toEqual('Baxter Brooks');
      expect(clientsAndOrders[0][2]).toEqual(1);
    });
  });
});
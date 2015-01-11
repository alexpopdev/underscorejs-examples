describe("Given bicycleTransformer", function() {

  describe("when calling getBicyclesSortedByRentPrice()", function() {
    var sortedBicycles = bicycleTransformer.getBicyclesSortedByRentPrice();

    it("then it returns an array of correct length", function() {
      expect(sortedBicycles).toBeTruthy();
      expect(sortedBicycles.length).toEqual(12);
    });
    it("then the first bicycle should be correct", function() {
      expect(sortedBicycles[0]).toEqual('A blue bike - Children Bike : 10');
    });
  });

});
describe("bicycleAggregator", function() {

  describe("when calling getAverageRentalPrice()", function() {
    var averageRentalPrice = bicycleAggregator.getAverageRentalPrice();

    it("then it should be correct", function() {
      expect(averageRentalPrice).toBeCloseTo(16.83);
    });

  });

  describe("when calling getAverageRentalPrice() for urban bicycles", function() {
    var averageRentalPrice = bicycleAggregator.getAverageRentalPrice("Urban Bike");

    it("then it should be correct", function() {
      expect(averageRentalPrice).toBeCloseTo(15.33);
    });

  });

});

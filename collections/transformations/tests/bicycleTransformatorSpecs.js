describe("Given bicycleTransformator", function() {

  describe("when calling getBicyclesSortedByRentPrice()", function() {
    var sortedBicycles = bicycleTransformator.getBicyclesSortedByRentPrice();

    it("then it should be correct", function() {
      expect(averageRentalPrice).toBeCloseTo(16.83);
    });
  });

});
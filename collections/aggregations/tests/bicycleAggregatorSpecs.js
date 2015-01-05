describe("Given bicycleAggregator", function() {

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

  describe("when calling getMostRecentlyAddedBicycle()", function() {
    var bicycle = bicycleAggregator.getMostRecentlyAddedBicycle();

    it("then it should be correct", function() {
      expect(bicycle).toBeTruthy();
      expect(bicycle.id).toEqual(2);
    });
  });

  describe("when calling getMostRecentlyAddedBicycle() for urban bicycles", function() {
    var bicycle = bicycleAggregator.getMostRecentlyAddedBicycle("Urban Bike");

    it("then it should be correct", function() {
      expect(bicycle).toBeTruthy();
      expect(bicycle.id).toEqual(7);
    });
  });

  describe("when calling getLowestPricedBicycle() for urban bicycles", function() {
    var bicycle = bicycleAggregator.getLowestPricedBicycle("Urban Bike");

    it("then it should be correct", function() {
      expect(bicycle).toBeTruthy();
      expect(bicycle.id).toEqual(8);
    });
  });
});
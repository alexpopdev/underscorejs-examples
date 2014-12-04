describe("bicycleFinder", function() {

  describe("when calling findBicycle()", function() {
    var bicycle;

    beforeEach(function() {
      bicycle = bicycleFinder.findBicycle("Urban Bike", 16);
    });

    it("then it should return an object", function() {
      expect(bicycle).toBeDefined();
    });

    it("then the 'type' property should be correct", function() {
      expect(bicycle.type).toEqual("Urban Bike");
    });

    it("then the 'rentPrice' property should be correct", function() {
      expect(bicycle.rentPrice).toEqual(15);
    });

  });
});

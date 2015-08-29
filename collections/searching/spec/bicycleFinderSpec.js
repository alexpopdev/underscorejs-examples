describe("Given bicycleFinder", function() {

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

  describe("when calling findBicycleById()", function() {
    var bicycle;

    beforeEach(function() {
      bicycle = bicycleFinder.findBicycleById(6);
    });

    it("then it should return an object", function() {
      expect(bicycle).toBeDefined();
    });

    it("then the 'id' property should be correct", function() {
      expect(bicycle.id).toEqual(6);
    });

  });

  describe("when calling hasBicycle()", function() {
    var isFound;

    beforeEach(function() {
      isFound = bicycleFinder.hasBicycle("Urban Bike", 16);
    });

    it("then it should return true", function() {
      expect(isFound).toBe(true);
    });

  });

  describe("when calling hasBicycleWithId()", function() {
    var isFound;

    beforeEach(function() {
      isFound = bicycleFinder.hasBicycleWithId(6);
    });

    it("then it should return true", function() {
      expect(isFound).toBe(true);
    });

  });
});

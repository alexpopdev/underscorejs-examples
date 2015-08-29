describe("Given bicycleFinder", function() {

  describe("when calling filterBicycles()", function() {
    var bicycles;

    beforeEach(function() {
      bicycles = bicycleFinder.filterBicycles("Urban Bike", 16);
    });

    it("then it should return two objects", function() {
      expect(bicycles).toBeDefined();
      expect(bicycles.length).toEqual(2);
    });

    it("then the 'type' property should be correct", function() {
      expect(bicycles[0].type).toEqual("Urban Bike");
      expect(bicycles[1].type).toEqual("Urban Bike");
    });

    it("then the 'rentPrice' property should be correct", function() {
      expect(bicycles[0].rentPrice).toEqual(15);
      expect(bicycles[1].rentPrice).toEqual(14);
    });

  });

  describe("when calling filterBicyclesByType()", function() {
    var bicycles;

    beforeEach(function() {
      bicycles = bicycleFinder.filterBicyclesByType("Urban Bike");
    });

    it("then it should return three objects", function() {
      expect(bicycles).toBeDefined();
      expect(bicycles.length).toEqual(3);
    });

    it("then the 'id' property should be correct", function() {
      expect(bicycles[0].id).toEqual(6);
      expect(bicycles[1].id).toEqual(7);
      expect(bicycles[2].id).toEqual(8);
    });

  });

  describe("when calling getAllBicyclesForSetRentPrice()", function() {
    var bicycles;

    beforeEach(function() {
      bicycles = bicycleFinder.getAllBicyclesForSetRentPrice(15);
    });

    it("then it should return 6 objects", function() {
      expect(bicycles).toBeDefined();
      expect(bicycles.length).toEqual(6);
    });

  });

});

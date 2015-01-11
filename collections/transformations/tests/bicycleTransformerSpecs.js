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

    it("then the last bicycle should be correct", function() {
      expect(sortedBicycles[sortedBicycles.length - 1]).toEqual('An all-terain bike - Mountain Bike : 27');
    });
  });

  describe("when calling getBicyclesGroupedByYear()", function() {
    var groupedBicycles = bicycleTransformer.getBicyclesGroupedByYear();

    it("then it returns an object with two properties", function() {
      expect(groupedBicycles).toBeTruthy();
      expect(_.size(groupedBicycles)).toEqual(2);
    });

    it("then the bicycle count for year 2014 should be correct", function() {
      expect(groupedBicycles['2014'].length).toEqual(8);
    });

    it("then the bicycle count for year 2015 should be correct", function() {
      expect(groupedBicycles['2015'].length).toEqual(4);
    });
  });
});
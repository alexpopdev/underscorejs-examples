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

  describe("when calling getBicyclesGroupedByPrice()", function() {
    var groupedBicycles = bicycleTransformer.getBicyclesGroupedByPrice();

    it("then it returns an object with 10 properties", function() {
      expect(groupedBicycles).toBeTruthy();
      expect(_.size(groupedBicycles)).toEqual(10);
    });

    it("then the bicycle count for lowest price should be correct", function() {
      expect(groupedBicycles['10'].length).toEqual(2);
    });

    it("then the bicycle count for highest price should be correct", function() {
      expect(groupedBicycles['27'].length).toEqual(1);
    });
  });

  describe("when calling getBicyclesIndexedById()", function() {
    var indexedBicycles = bicycleTransformer.getBicyclesIndexedById();

    it("then it returns an object with 12 properties", function() {
      expect(indexedBicycles).toBeTruthy();
      expect(_.size(indexedBicycles)).toEqual(12);
    });

    it("then the first indexed bicycle should be correct", function() {
      expect(indexedBicycles['1'].name).toEqual('A fast bike');
    });

    it("then the last indexed bicycle count should be correct", function() {
      expect(indexedBicycles['12'].name).toEqual('A clown bike');
    });
  });

  describe("when calling getBicyclesCountByType()", function() {
    var bicyclesCount = bicycleTransformer.getBicyclesCountByType();

    it("then it returns an object with 4 properties", function() {
      expect(bicyclesCount).toBeTruthy();
      expect(_.size(bicyclesCount)).toEqual(4);
    });

    it("then the bicycle count for 'Urban Bike' should be correct", function() {
      expect(bicyclesCount['Urban Bike']).toEqual(3);
    });

    it("then the bicycle count for 'Road Bike' should be correct", function() {
      expect(bicyclesCount['Road Bike']).toEqual(2);
    });
  });
});
describe("Given propertyFormatter", function() {

  describe("when calling extractPropertiesForDisplayAsArray()", function() {
    var propertiesForDisplayAsArray;

    beforeEach(function() {
      var source = {
        id: 2,
        name: "Blue lamp",
        description: null,
        ui: undefined,
        price: 10,
        purchaseDate: new Date(2014, 10, 1),
        isInUse: true,
      };

      propertiesForDisplayAsArray = propertyFormatter.extractPropertiesForDisplayAsArray(source);
    });

    it("then the returned property count should be correct", function() {
      expect(propertiesForDisplayAsArray.length).toEqual(7);
    });

    it("then the 'price' property should be displayed", function() {
      expect(propertiesForDisplayAsArray[4]).toMatch("price.+10");
    });

    it("then the 'description' property should not be displayed", function() {
      expect(propertiesForDisplayAsArray[2]).toMatch("cannot be displayed");
    });
  });

  describe("when calling extractPropertiesForDisplayAsString()", function() {
    var propertiesForDisplayAsString;

    beforeEach(function() {
      var source = {
        id: 2,
        name: "Blue lamp",
        description: null,
        ui: undefined,
        price: 10,
        purchaseDate: new Date(2014, 10, 1),
        isInUse: true,
      };

      propertiesForDisplayAsString = propertyFormatter.extractPropertiesForDisplayAsString(source);
    });

    it("then the returned string has expected length", function() {
      expect(propertiesForDisplayAsString.length).toBeGreaterThan(0);
    });

    it("then the 'price' property should be displayed", function() {
      expect(propertiesForDisplayAsString).toMatch("<br/>Property: price of type: number has value: 10<br/>");
    });
  });
});
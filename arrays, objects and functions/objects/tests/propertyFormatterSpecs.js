describe("Given propertyFormatter", function() {

  describe("when calling extractPropertiesForDisplay(object)", function() {
    var propertiesForDisplay;

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

      propertiesForDisplay = propertyFormatter.extractPropertiesForDisplay(source);
    });

    it("then the returned property count should be correct", function() {
      expect(propertiesForDisplay.length).toEqual(7);
    });

    it("then the 'price' property should be displayed", function() {
      expect(propertiesForDisplay[4]).toMatch("price.+10");
    });

    it("then the 'description' property should not be displayed", function() {
      expect(propertiesForDisplay[2]).toMatch("cannot be displayed");
    });
  });

  describe("when calling extractPropertiesForDisplay({}, true) (for an empty object)", function() {
    var propertiesForDisplay;

    beforeEach(function() {
      propertiesForDisplay = propertyFormatter.extractPropertiesForDisplay({}, true);
    });

    it("then the returned property count should be correct", function() {
      expect(propertiesForDisplay.length).toEqual(0);
    });
  });

  describe("when calling extractAllPropertiesForDisplay(object)", function() {
    var allPropertiesForDisplay;

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

      allPropertiesForDisplay = propertyFormatter.extractAllPropertiesForDisplay(source);
    });

    it("then the returned string has expected length", function() {
      expect(allPropertiesForDisplay.length).toBeGreaterThan(0);
    });

    it("then the 'price' property should be displayed", function() {
      expect(allPropertiesForDisplay).toMatch("<br/>Property: price of type: number has value: 10<br/>");
    });
  });
});
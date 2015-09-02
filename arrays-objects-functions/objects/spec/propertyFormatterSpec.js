describe("Given propertyFormatter", function() {

  describe("when calling extractPropertiesForDisplayAsArray(object)", function() {
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

      propertiesForDisplay = propertyFormatter.extractPropertiesForDisplayAsArray(source);
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

  describe("when calling extractPropertiesForDisplayAsArray({}, true) (for an empty object)", function() {
    var propertiesForDisplay;

    beforeEach(function() {
      propertiesForDisplay = propertyFormatter.extractPropertiesForDisplayAsArray({}, true);
    });

    it("then the returned property count should be correct", function() {
      expect(propertiesForDisplay.length).toEqual(0);
    });
  });

  describe("when calling extractDataPropertiesForDisplayAsArray(object)", function() {
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
        getProfit: function() {
          return this.price * 0.25;
        }
      };

      propertiesForDisplay = propertyFormatter.extractDataPropertiesForDisplayAsArray(source);
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

  describe("when calling extractPropertiesForDisplayAsString(object)", function() {
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
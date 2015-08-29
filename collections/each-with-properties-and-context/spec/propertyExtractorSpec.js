describe("Given propertyExtractor", function() {

  describe("when calling extractStorableProperties()", function() {
    var storableProperties;

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

      storableProperties = propertyExtractor.extractStorableProperties(source);
    });

    it("then the property count should be correct", function() {
      expect(Object.keys(storableProperties).length).toEqual(5);
    });

    it("then the 'price' property should be correct", function() {
      expect(storableProperties.price).toEqual(10);
    });

    it("then the 'description' property should not be defined", function() {
      expect(storableProperties.description).toBeUndefined();
    });
  });

  describe("when calling extractStorablePropertiesWithThis()", function() {
    var storableProperties;

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

      storableProperties = propertyExtractor.extractStorablePropertiesWithThis(source);
    });

    it("then the property count should be correct", function() {
      expect(Object.keys(storableProperties).length).toEqual(5);
    });

    it("then the 'price' property should be correct", function() {
      expect(storableProperties.price).toEqual(10);
    });

    it("then the 'description' property should not be defined", function() {
      expect(storableProperties.description).toBeUndefined();
    });
  });
});

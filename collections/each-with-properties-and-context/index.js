$(document).ready(function() {
  var source = {
    id: 2,
    name: "Blue lamp",
    description: null,
    ui: undefined,
    price: 10,
    purchasePrice: 6,
    purchaseDate: new Date(2014, 10, 1),
    isInUse: true,
    getProfit: function() {
      return this.price - this.purchasePrice;
    }
  };

  var storableProperties = propertyExtractor.extractStorableProperties(source);
  var outputContent = "<br />Object properties:";

  _.each(storableProperties, function(value, key, list) {
    outputContent += "<br />";
    outputContent += "Property: " + key + " of type: " + typeof value + " has value: " + value;
  });

  $("#output").html(outputContent);
});
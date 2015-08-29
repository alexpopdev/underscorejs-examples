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

  var propertiesForDisplayAsArray = propertyFormatter.extractPropertiesForDisplayAsArray(source);

  var outputContent = "<h2>Object properties using propertyFormatter.extractPropertiesForDisplayAsArray:</h2>";
  _.each(propertiesForDisplayAsArray, function(line) {
    outputContent += "<br />" + line;
  }, source);

  var propertiesForDisplayAsString = propertyFormatter.extractPropertiesForDisplayAsString(source);
  outputContent += "<h2>Object properties using propertyFormatter.extractPropertiesForDisplayAsString:</h2>" +
    propertiesForDisplayAsString;
  $("#output").html(outputContent);
});
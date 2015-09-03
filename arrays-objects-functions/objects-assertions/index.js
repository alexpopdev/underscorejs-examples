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

  var propertiesForDisplay = propertyFormatter.extractPropertiesForDisplayAsArray(source);

  $("#output").html("<h2>Object properties using propertyFormatter.extractDataPropertiesForDisplayAsArray:</h2>");

  _.each(propertiesForDisplay, function(line) {
    var existingContent = $("#output").html();
    $("#output").html(existingContent + "<br />" + line);
  }, source);

  var allPropertiesForDisplay = propertyFormatter.extractPropertiesForDisplayAsString(source);

  var outputContent = $("#output").html();
  $("#output").html(
    outputContent +
    "<h2>Object properties using propertyFormatter.extractPropertiesForDisplayAsString:</h2>" +
    allPropertiesForDisplay);

});
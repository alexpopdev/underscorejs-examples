$(document).ready(function() {

  var bicycle = bicycleFinder.findBicycle("Urban Bike", 16);

  var outputContent = propertyFormatter.extractPropertiesForDisplayAsString(bicycle);

  $("#output").html(
    "<h2>Found bicycle properties:</h2>" +
    outputContent);
});
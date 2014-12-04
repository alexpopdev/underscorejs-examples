$(document).ready(function() {

  var bicycle = bicycleFinder.findBicycle("Urban Bike", 16);

  var displayContent = propertyFormatter.extractAllPropertiesForDisplay(bicycle);

  $("#output").html(
    "<h2>Bicycle properties:</h2>" +
    displayContent);

});

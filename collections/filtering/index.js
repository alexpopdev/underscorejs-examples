$(document).ready(function() {

  var bicycles = bicycleFinder.filterBicycles("Urban Bike", 16);

  var outputContent = null;
  _.each(bicycles, function(bicycle) {
    if (outputContent) {
      outputContent += "<br/><br/>";
    } else {
      outputContent = "";
    }
    outputContent += propertyFormatter.extractPropertiesForDisplayAsString(bicycle);
  });

  $("#output").html(
    "<h2>Filtered bicycles properties:</h2>" +
    outputContent);
});
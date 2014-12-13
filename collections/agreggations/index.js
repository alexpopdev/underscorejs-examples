$(document).ready(function() {

  var bicycles = bicycleFinder.filterBicycles("Urban Bike", 16);

  var displayContent = null;
  _.each(bicycles, function(bicycle) {
    if (displayContent) {
      displayContent += "<br/><br/>";
    } else {
      displayContent = "";
    }
    displayContent += propertyFormatter.extractAllPropertiesForDisplay(bicycle);
  });

  $("#output").html(
    "<h2>Filtered bicycles properties:</h2>" +
    displayContent);
});

$(document).ready(function() {

  var displayContent = "Average rental price for all bicycles: " + bicycleAggregator.getAverageRentalPrice().toFixed(2);

  displayContent += "<br/><br/>Average rental price for urban bicycles: " + bicycleAggregator.getAverageRentalPrice("Urban Bike").toFixed(2);

  var bicycle = bicycleAggregator.getMostRecentlyAddedBicycle();

  displayContent += "<br/><br/>Most recently added bicycle: '" + bicycle.name + "' on: " + bicycle.dateAdded.toISOString();

  bicycle = bicycleAggregator.getMostRecentlyAddedBicycle("Urban Bike");

  displayContent += "<br/><br/>Most recently added urban bicycle: '" + bicycle.name + "' on: " + bicycle.dateAdded.toISOString();

  bicycle = bicycleAggregator.getLowestPricedBicycle("Urban Bike");

  displayContent += "<br/><br/>Lowest priced urban bicycle: '" + bicycle.name + "' with rental price: " + bicycle.rentPrice;

  $("#output").html(
    "<h2>Aggregations over bicycles:</h2>" +
    displayContent);
});

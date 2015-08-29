$(document).ready(function() {

  var outputContent = "Average rental price for all bicycles: " + bicycleAggregator.getAverageRentalPrice().toFixed(2);

  outputContent += "<br/><br/>Average rental price for urban bicycles: " + bicycleAggregator.getAverageRentalPrice("Urban Bike").toFixed(2);

  var bicycle = bicycleAggregator.getMostRecentlyAddedBicycle();

  outputContent += "<br/><br/>Most recently added bicycle: '" + bicycle.name + "' on: " + bicycle.dateAdded.toISOString();

  bicycle = bicycleAggregator.getMostRecentlyAddedBicycle("Urban Bike");

  outputContent += "<br/><br/>Most recently added urban bicycle: '" + bicycle.name + "' on: " + bicycle.dateAdded.toISOString();

  bicycle = bicycleAggregator.getLowestPricedBicycle("Urban Bike");

  outputContent += "<br/><br/>Lowest priced urban bicycle: '" + bicycle.name + "' with rental price: " + bicycle.rentPrice;

  $("#output").html(
    "<h2>Aggregations over bicycles:</h2>" +
    outputContent);
});
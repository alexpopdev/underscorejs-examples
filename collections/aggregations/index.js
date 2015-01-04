$(document).ready(function() {

  var displayContent = "Average rental price for all bicycles: " + bicycleAggregator.getAverageRentalPrice().toFixed(2);
  displayContent += "<br/><br/>Average rental price for urban bicycles: " + bicycleAggregator.getAverageRentalPrice("Urban Bike").toFixed(2);
  $("#output").html(
    "<h2>Aggregations over bicycles:</h2>" +
    displayContent);
});
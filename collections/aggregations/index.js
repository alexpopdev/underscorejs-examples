$(document).ready(function() {

  var displayContent = "Average rental price for all bicycles: " + bicycleAggregator.getAverageRentalPrice();
  displayContent += "<br/><br/>Average rental price for urban bicycles: " + bicycleAggregator.getAverageRentalPrice("Urban Bike");
  $("#output").html(
    "<h2>Aggregations over bicycles:</h2>" +
    displayContent);
});

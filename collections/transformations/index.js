$(document).ready(function() {

  var displayContent = "Bicycles sorted by rent price: <ul><li>" + bicycleTransformer.getBicyclesSortedByRentPrice().join('</li><li>') + "</li></ul>";

  var bicyclesGroupedByYear = bicycleTransformer.getBicyclesGroupedByYear();
  displayContent += "<br/><br/>Bicycles grouped by year 2014: <ul><li>" + _.pluck(bicyclesGroupedByYear["2014"], 'name').join('</li><li>') + "</li></ul>";
  displayContent += "<br/><br/>Bicycles grouped by year 2015: <ul><li>" + _.pluck(bicyclesGroupedByYear["2015"], 'name').join('</li><li>') + "</li></ul>";

  var bicyclesGroupedByPrice = bicycleTransformer.getBicyclesGroupedByPrice();
  displayContent += "<br/><br/>Bicycles grouped by lowest price: <ul><li>" + _.pluck(bicyclesGroupedByPrice["10"], 'name').join('</li><li>') + "</li></ul>";

  // var bicycle = bicycleAggregator.getMostRecentlyAddedBicycle();
  //
  // displayContent += "<br/><br/>Most recently added bicycle: '" + bicycle.name + "' on: " + bicycle.dateAdded.toISOString();
  //
  // bicycle = bicycleAggregator.getMostRecentlyAddedBicycle("Urban Bike");
  //
  // displayContent += "<br/><br/>Most recently added urban bicycle: '" + bicycle.name + "' on: " + bicycle.dateAdded.toISOString();
  //
  // bicycle = bicycleAggregator.getLowestPricedBicycle("Urban Bike");
  //
  // displayContent += "<br/><br/>Lowest priced urban bicycle: '" + bicycle.name + "' with rental price: " + bicycle.rentPrice;

  $("#output").html(
    "<h2>Transformations with bicycles:</h2>" +
    displayContent);
});

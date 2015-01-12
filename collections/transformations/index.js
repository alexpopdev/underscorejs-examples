$(document).ready(function() {

  var displayContent = "Bicycles sorted by rent price: <ul><li>" + bicycleTransformer.getBicyclesSortedByRentPrice().join('</li><li>') + "</li></ul>";

  var bicyclesGroupedByYear = bicycleTransformer.getBicyclesGroupedByYear();
  displayContent += "Bicycles grouped by year 2014: <ul><li>" + _.pluck(bicyclesGroupedByYear["2014"], 'name').join('</li><li>') + "</li></ul>";
  displayContent += "Bicycles grouped by year 2015: <ul><li>" + _.pluck(bicyclesGroupedByYear["2015"], 'name').join('</li><li>') + "</li></ul>";

  var bicyclesGroupedByPrice = bicycleTransformer.getBicyclesGroupedByPrice();
  displayContent += "Bicycles grouped by lowest price: <ul><li>" + _.pluck(bicyclesGroupedByPrice["10"], 'name').join('</li><li>') + "</li></ul>";

  var bicyclesIndexedById = bicycleTransformer.getBicyclesIndexedById();
  displayContent += "Bicycles indexes by id: <ul><li>" + _.pluck(bicyclesIndexedById, 'id').join('</li><li>') + "</li></ul>";

  var bicyclesCountByType = bicycleTransformer.getBicyclesCountByType();
  displayContent += "Bicycles count by type: <br/>" + propertyFormatter.extractAllPropertiesForDisplay(bicyclesCountByType, true);

  $("#output").html(
    "<h2>Transformations with bicycles:</h2>" +
    displayContent);
});

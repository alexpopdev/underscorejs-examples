$(document).ready(function() {

  var result = contribSamples.concatenateArrays(1, [5, , 64], null, [5, 6, 7], [1, , 2, null, 3], 99);
  var displayContent = "Function concatenateArrays() returns " + result.length + " elements.<br />";
  $("#output").html(
    "<h2>Underscore-contrib examples:</h2>" +
    displayContent);
});
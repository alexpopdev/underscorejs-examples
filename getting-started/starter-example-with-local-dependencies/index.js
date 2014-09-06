$(document).ready(function() {
  $("#output").html("There are " + bicycles.length + " bycicles:");
  var result = _.countBy(bicycles, function(bicycle) {
    return bicycle.type;
  });
  _.pairs(result).forEach(function(typeCountPair) {
    var key = typeCountPair[0];
    var value = typeCountPair[1];
    var existingContent = $("#output").html();
    var newContent = " - " + value + " of type: " + key;
    $("#output").html(existingContent + "<br />" + newContent);
  });
});

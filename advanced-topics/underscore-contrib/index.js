$(document).ready(function() {

  var result = contribSamples.concatenateArrays(1, [5, , 64], null, [5,6,7], [1, , 2, null, 3], 99);
  var displayContent = "Function concatenateArrays() returns " + result.length + " elements.<br />";
  //
  // displayContent += "First 4 contacts with name, id and type: <ul><li>" +
  //   _.map(_.first(contacts, 4), function(contact) {
  //     return contact.getContactNameIdAndType();
  //   }).join('</li><li>') +
  //   "</li></ul>";
  //
  // var clients = clientRetriever.getClientsUsingConstructorInfo();
  // displayContent += "There are " + clients.length + " active clients.<br />";
  $("#output").html(
    "<h2>Underscore-contrib examples:</h2>" +
    displayContent);
});

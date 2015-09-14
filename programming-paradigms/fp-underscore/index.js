$(document).ready(function() {

  var contacts = clientRetriever.getContacts();
  var displayContent = "There are " + contacts.length + " contacts.<br />";

  displayContent += "First 4 contacts with name, id and type: <ul><li>" +
    _.map(_.first(contacts, 4), function(contact) {
      return transformations.getContactNameIdAndType(contact);
    }).join('</li><li>') +
    "</li></ul>";

  var clients = clientRetriever.getClients();
  displayContent += "There are " + clients.length + " active clients.<br />";
  $("#output").html(
    "<h2>FP with Underscore examples:</h2>" +
    displayContent);
});
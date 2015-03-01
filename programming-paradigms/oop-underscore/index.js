$(document).ready(function() {

  var contacts = clientRetriever.getContacts();
  var displayContent = "There are " + contacts.length + " contacts.<br />";

  displayContent += "First 4 contacts with name, id and type: <ul><li>" +
    _.map(_.first(contacts, 4), function(contact) {
      return contact.getContactNameIdAndType();
    }).join('</li><li>') +
    "</li></ul>";

  $("#output").html(
    "<h2>OOP with Underscore examples:</h2>" +
    displayContent);
});

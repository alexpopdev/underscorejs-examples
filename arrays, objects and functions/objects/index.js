$(document).ready(function() {

  var clients = _.first(clientRetriever.getClientsIdAndName(), 5);
  var displayContent = "First 5 clients with id and name: <ul><li>" +
    _.map(clients, function(client) {
      return JSON.stringify(client);
    }).join('</li><li>') +
    "</li></ul>";

  $("#output").html(
    "<h2>Objects examples:</h2>" +
    displayContent);
});
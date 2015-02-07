$(document).ready(function() {

  var clients = clientRetriever.getOldestClients(5);
  var displayContent = "Top 5 oldest clients: <ul><li>" +
    _.map(clients, function(client) {
      return client.id + ": " + client.name + ", registered on " + client.registered;
    }).join('</li><li>') +
    "</li></ul>";

  $("#output").html(
    "<h2>Objects examples:</h2>" +
    displayContent);
});

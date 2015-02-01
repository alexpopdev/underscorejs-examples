$(document).ready(function() {

  var clients = clientRetriever.getOldestClients(5);
  var displayContent = "Top 5 oldest clients: <ul><li>" +
    _.map(clients, function(client) {
      return client.id + ": " + client.name + ", registered on " + client.registered;
    }).join('</li><li>') +
    "</li></ul>";

  clients = clientRetriever.getNewestClients(5);
  displayContent += "Top 5 newest clients: <ul><li>" +
    _.map(clients, function(client) {
      return client.id + ": " + client.name + ", registered on " + client.registered;
    }).join('</li><li>') +
    "</li></ul>";

  clients = clientRetriever.getOldestOrBestClients(50);

  displayContent += "The union of top 50 oldest or best clients has a count of : " + clients.length + ".<br/>";

  clients = clientRetriever.getOldestAndBestClients(50);

  displayContent += "The intersection of top 50 oldest and best clients has a count of : " + clients.length + ".<br/>";

  $("#output").html(
    "<h2>Array examples:</h2>" +
    displayContent);
});

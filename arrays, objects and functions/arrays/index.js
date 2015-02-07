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

  var clientsAndOrders = clientRetriever.getClientsAndOrdersAsArrays();

  displayContent += "The client with id " + clientsAndOrders[0][0] + " and name '" + clientsAndOrders[0][1] + "' has placed " + clientsAndOrders[0][2] + " order(s).";

  $("#output").html(
    "<h2>Arrays examples:</h2>" +
    displayContent);
});

$(document).ready(function() {

  var oldestClients = clientRetriever.getOldestClients(5);
  var bestClients = clientRetriever.getBestClients(5);
  var clients = clientRetriever.getClients();

  var onSelectHome = function() {
    $(".panel-heading").html("Welcome");
    $(".panel-body").html("<p>There are " + clients.length + " clients.</p>");
  };

  $("#home-btn").click(onSelectHome);

  $("#oldest-clients-btn").click(function() {
    $(".panel-heading").html("Top 5 oldest clients with name, id and type");
    var displayContent = "<ul><li>" +
      _.map(oldestClients, function(client) {
        return transformations.getContactNameIdAndType(client);
      }).join('</li><li>') +
      "</li></ul>";
    $(".panel-body").html(displayContent);
  });
  $("#best-clients-btn").click(function() {
    $(".panel-heading").html("Top 5 best clients with name, id and type");

    var displayContent = "<ul><li>" +
      _.map(bestClients, function(client) {
        return transformations.getContactNameIdAndType(client);
      }).join('</li><li>') +
      "</li></ul>";
    $(".panel-body").html(displayContent);
  });

  onSelectHome();
});

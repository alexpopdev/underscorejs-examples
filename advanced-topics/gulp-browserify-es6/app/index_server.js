var _ = require("underscore");
var clientRetriever = require("./clientRetriever.js");
var transformations = require("./transformations.js");

var oldestClients = clientRetriever.getOldestClients(5);
var bestClients = clientRetriever.getBestClients(5);
var clients = clientRetriever.getClients();

console.log("There are " + clients.length + " clients.");

var getContactsOutput = function(clients) {
  var outputText = "";
  _.forEach(clients, function(client, index) {
    if (index > 0) {
      outputText += ", ";
    }
    outputText += transformations.getContactNameIdAndType(client);
  });
  return outputText;
};

console.log("Top 5 oldest clients with name, id and type: " + getContactsOutput(oldestClients));
console.log("Top 5 best clients with name, id and type: " + getContactsOutput(bestClients));
/*jshint esnext: true */
import _ from "underscore";
import * as clientRetriever from "./clientRetriever.es6";
import * as transformations from "./transformations.es6";

var oldestClients = clientRetriever.getOldestClients(5);
var bestClients = clientRetriever.getBestClients(5);
var clients = clientRetriever.getClients();

console.log("There are " + clients.length + " clients.");

var getContactsOutput = (clients) => {
  var outputText = "";
  _.forEach(clients, (client, index) => {
    if (index > 0) {
      outputText += ", ";
    }
    outputText += transformations.getContactNameIdAndType(client);
  });
  return outputText;
};

console.log("Top 5 oldest clients with name, id and type: " + getContactsOutput(oldestClients));
console.log("Top 5 best clients with name, id and type: " + getContactsOutput(bestClients));
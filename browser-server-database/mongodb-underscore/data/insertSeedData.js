db = db.getSiblingDB('underscorejs-examples');
print("Current database is set to: " + tojson(db));

load("data/generateSeedData.js");

if (db.bicycles.count() === 0) {
  var bicycles = getBicycles();
  print("Inserting " + bicycles.length + " bicycles ...");
  var result = db.bicycles.insert(bicycles);
  printjson(result);
} else {
  print("The bicycles collection is not empty. Skipping seed data insertion for bicycles.");
}

if (db.clients.count() === 0) {
  var clients = getClients();
  print("Inserting " + clients.length + " clients ...");
  var result = db.clients.insert(clients);
  printjson(result);
} else {
  print("The clients collection is not empty. Skipping seed data insertion for clients.");
}

if (db.clientOrders.count() === 0) {
  var clientOrders = getClientOrders();
  print("Inserting " + clientOrders.length + " client orders ...");
  var result = db.clientOrders.insert(clientOrders);
  printjson(result);
} else {
  print("The client orders collection is not empty. Skipping seed data insertion for client orders.");
}

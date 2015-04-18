var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/underscorejs-examples';

var getBicycles = function(callback) {
  MongoClient.connect(dbUrl, function(err, db) {
    var collection = db.collection('bicycles');
    collection.find({}).toArray(function(err, bicycles) {
      callback(bicycles);
      db.close();
    });
  });
};

var getClients = function(callback) {
  MongoClient.connect(dbUrl, function(err, db) {
    var collection = db.collection('clients');
    collection.find({}).toArray(function(err, clients) {
      callback(clients);
      db.close();
    });
  });
};

var getClientOrders = function(callback) {
  MongoClient.connect(dbUrl, function(err, db) {
    var collection = db.collection('clientOrders');
    collection.find({}).toArray(function(err, clientOrders) {
      callback(clientOrders);
      db.close();
    });
  });
};

exports.getBicycles = getBicycles;
exports.getClients = getClients;
exports.getClientOrders = getClientOrders;

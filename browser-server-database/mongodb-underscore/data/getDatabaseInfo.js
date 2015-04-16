db = db.getSiblingDB('underscorejs-examples');
print("Current database is set to: " + tojson(db));
load("node_modules/underscore/underscore.js");

print("Showing enumerable database properties using Underscore: ");
_.each(db, function(value, key) {
  print("key: " + key + ", value: " + value);
});
print("Showing all database properties using JSON.stringify(): " + JSON.stringify(db));

var collectionNames = db.getCollectionNames();
print('Collection list: ' + tojson(collectionNames));

_.each(collectionNames, function(collectionName) {
  print("Collection " + collectionName + " has " + db.getCollection(collectionName).count() + " documents.");
});

db = db.getSiblingDB('underscorejs-examples');
print("Current database is set to: " + tojson(db));
load("node_modules/underscore/underscore.js");

print("Showing current database properties using Underscore: ");
_.each(db, function(value, key) {
  print("key: " + key + ", value: " + value);
});
print("Showing current database properties using tojson(): " + tojson(db));

print('Collection list: ' + tojson(db.getCollectionNames()));

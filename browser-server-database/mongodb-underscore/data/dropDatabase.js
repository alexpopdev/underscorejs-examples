db = db.getSiblingDB('underscorejs-examples');
print("Current database is set to: " + tojson(db));
var result = db.dropDatabase();
print("Database delete result: " + tojson(result));

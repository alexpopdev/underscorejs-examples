var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  'mongodb://127.0.0.1:27017/accounting',
  function(err, connection) {
    var collection = connection.collection('customers');

    var doFind = function(callback) {
      collection.find({}, {
        'sort': '_id'
      }).each(function(err, document) {
        if (document === null) {
          callback();
        } else {
          console.dir(document);
        }
      });
    };

    var doInsert = function(i) {
      if (i < 20) {
        var value = Math.floor(Math.random() * 10);
        collection.insert({
            'n': '#' + i,
            'v': value
          },
          function(err, count) {
            doInsert(i + 1);
          });
      } else {
        console.log();
        console.log('Inserted', i, 'documents:');
        doFind(function() {
          doUpdate();
        });
      }
    };

    var doUpdate = function() {
      collection.update({
          'n': /^#1/
        }, {
          '$mul': {
            'v': 2
          }
        }, {
          'multi': true
        },
        function(err, count) {
          console.log();
          console.log('Updated', count, 'documents:');
          doFind(function() {
            collection.remove({}, function() {
              connection.close();
            });
          });
        });
    };

    doInsert(0);

  });

CREATE TABLE IF NOT EXISTS bicycles(
   id int primary key,
   body jsonb not null
);

CREATE TABLE IF NOT EXISTS js_files(
    id varchar(255) primary key,
    content text not null
);

\set underscore_content `cat node_modules/underscore/underscore.js`

INSERT INTO js_files
SELECT 'underscore', :'underscore_content' WHERE NOT EXISTS(SELECT id FROM js_files WHERE id = 'underscore');

DO LANGUAGE plv8 $$
  var files = plv8.execute("SELECT content FROM js_files;");
  for (var i = 0; i < files.length; i++)
  {
    var file = files[i].content;
    eval("(function() { " + file + "})")();
  }

  var getBicycles = function() {
    return [{
      id: 1,
      name: "A fast bike",
      type: "Road Bike",
      quantity: 10,
      rentPrice: 20,
      dateAdded: new Date(2015, 1, 2)
    }, {
      id: 2,
      name: "An even faster bike",
      type: "Road Bike",
      quantity: 4,
      rentPrice: 25,
      dateAdded: new Date(2015, 2, 25)
    }, {
      id: 3,
      name: "A springy bike",
      type: "Mountain Bike",
      quantity: 20,
      rentPrice: 18,
      dateAdded: new Date(2014, 10, 1)
    }, {
      id: 4,
      name: "A springier bike",
      type: "Mountain Bike",
      quantity: 10,
      rentPrice: 22,
      dateAdded: new Date(2014, 4, 1)
    }, {
      id: 5,
      name: "An all-terain bike",
      type: "Mountain Bike",
      quantity: 5,
      rentPrice: 27,
      dateAdded: new Date(2014, 8, 14)
    }, {
      id: 6,
      name: "A classy bike",
      type: "Urban Bike",
      quantity: 30,
      rentPrice: 15,
      dateAdded: new Date(2014, 6, 27)
    }, {
      id: 7,
      name: "A modern bike",
      type: "Urban Bike",
      quantity: 20,
      rentPrice: 17,
      dateAdded: new Date(2015, 1, 19)
    }, {
      id: 8,
      name: "A commuter bike",
      type: "Urban Bike",
      quantity: 12,
      rentPrice: 14,
      dateAdded: new Date(2014, 8, 2)
    }, {
      id: 9,
      name: "A blue bike",
      type: "Children Bike",
      quantity: 25,
      rentPrice: 10,
      dateAdded: new Date(2014, 10, 20)
    }, {
      id: 10,
      name: "A pink bike",
      type: "Children Bike",
      quantity: 25,
      rentPrice: 10,
      dateAdded: new Date(2015, 2, 5)
    }, {
      id: 11,
      name: "A noisy bike",
      type: "Children Bike",
      quantity: 3,
      rentPrice: 12,
      dateAdded: new Date(2014, 8, 23)
    }, {
      id: 12,
      name: "A clown bike",
      type: "Children Bike",
      quantity: 2,
      rentPrice: 12,
      dateAdded: new Date(2014, 11, 1)
    }];
  };

  if (plv8.execute("SELECT COUNT(*) FROM bicycles;")[0].count === 0) {
    var bicycles = getBicycles();
    plv8.elog(NOTICE,"Inserting " + bicycles.length + " bicycles ...");
    var sqlScript = "INSERT INTO bicycles VALUES ";
    _.each(bicycles, function (bicycle, index) {
      if(index > 0) {
        sqlScript += ", ";
      }
      sqlScript += "(" + bicycle.id + ", " + "'" + JSON.stringify(bicycle) + "')";
    });
    plv8.execute(sqlScript + ";");
  } else {
    plv8.elog(NOTICE,"The bicycles collection is not empty. Skipping seed data insertion for bicycles.");
  }
$$;

SELECT COUNT(*) FROM bicycles;
SELECT * FROM bicycles;

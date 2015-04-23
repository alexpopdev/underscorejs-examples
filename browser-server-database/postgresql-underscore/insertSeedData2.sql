CREATE TABLE IF NOT EXISTS bicycles(
   id int primary key,
   body jsonb not null
);

CREATE TABLE IF NOT EXISTS js_files(
    id varchar(255) primary key,
    content text not null
);

\set underscore_content `cat node_modules/underscore/underscore.js`
\set generateseeddata_content `cat generateSeedData.js`

INSERT INTO js_files
SELECT 'underscore', :'underscore_content' WHERE NOT EXISTS(SELECT id FROM js_files WHERE id = 'underscore');

INSERT INTO js_files
SELECT 'generateSeedData', :'generateseeddata_content' WHERE NOT EXISTS(SELECT id FROM js_files WHERE id = 'generateSeedData');

DO LANGUAGE plv8 $$
  var myScript = {};
  var files = plv8.execute("SELECT content FROM js_files;");
  for (var i = 0; i < files.length; i++)
  {
    var file = files[i].content;
    eval(file)();
  }

  //if (plv8.execute("SELECT COUNT(*) FROM bicycles;").count === 0) {
    var bicycles = getBicycles();
    plv8.elog(NOTICE,"Inserting " + bicycles.length + " bicycles ...");
    var sqlScript = "INSERT INTO bicycles VALUES ";
    _.each(bicycles, function (bicycle, index) {
      if(index > 0) {
        sqlScript += ", ";
      }
      sqlScript += "(" + bicycle.id + ", " + "'" + JSON.stringify(bicycle) + ")";
    };
    plv8.elog(NOTICE, sqlScript);
    plv8.execute(sqlScript + ";");
  //} else {
  //  plv8.elog(NOTICE,"The bicycles collection is not empty. Skipping seed data insertion for bicycles.");
  //}
$$;

SELECT COUNT(*) FROM bicycles;
SELECT * FROM bicycles;

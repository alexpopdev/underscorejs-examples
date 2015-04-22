CREATE TABLE IF NOT EXISTS bicycles(
   id int primary key,
   body jsonb not null
);

CREATE TABLE IF NOT EXISTS clients(
   id int primary key,
   body jsonb not null
);

CREATE TABLE IF NOT EXISTS client_orders(
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
  var files = plv8.execute("SELECT content FROM js_files;");
  plv8.elog(NOTICE,JSON.stringify(files));
$$;

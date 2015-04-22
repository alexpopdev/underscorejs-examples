CREATE EXTENSION IF NOT EXISTS plv8;

CREATE OR REPLACE FUNCTION plv8_test(keys text[], vals text[]) RETURNS text AS $$
    var o = {};
    for(var i=0; i<keys.length; i++){
        o[keys[i]] = vals[i];
    }
    return JSON.stringify(o);
$$ LANGUAGE plv8 IMMUTABLE STRICT;
SELECT plv8_test(ARRAY['name', 'age'], ARRAY['Alex', '37']);

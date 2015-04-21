CREATE TABLE bicycles(
   id int primary key,
   body jsonb not null
);
INSERT INTO bicycles (id, body)
VALUES
(1, '{
        "id": 1,
        "name": "A fast bike",
        "type": "Road Bike",
        "quantity": 10,
        "rentPrice": 20,
        "dateAdded": "2015-02-02T00:00:00.000Z"
      }');
SELECT * FROM bicycles;
EXPLAIN SELECT converted.id, name, type, quantity, "rentPrice","dateAdded" from bicycles, jsonb_to_record(body) as
  converted (
    id int,
    name text,
    type varchar(255),
    quantity smallint,
    "rentPrice" numeric,
    "dateAdded" timestamp);
DROP TABLE bicycles;

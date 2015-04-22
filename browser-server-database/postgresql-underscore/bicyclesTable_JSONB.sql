CREATE TABLE bicycles(
   id int primary key,
   body jsonb not null
);
INSERT INTO bicycles (id, body)
VALUES
(1, '{ "id": 1,
       "name": "A fast bike",
       "type": "Road Bike",
       "quantity": 10,
       "rentPrice": 20,
      "dateAdded": "2015-02-02T00:00:00.000Z" }'),
(2, '{ "id": 2,
       "name": "An even faster bike",
       "type": "Road Bike",
       "quantity": 4,
       "rentPrice": 25,
       "dateAdded": "2015-03-25T00:00:00.000Z" }'),
(3, '{ "id": 3,
       "name": "A springy bike",
       "type": "Mountain Bike",
       "quantity": 20,
       "rentPrice": 18,
       "dateAdded": "2014-11-01T00:00:00.000Z" }');

SELECT 'Get bicycles as documents:' AS "Log message";
SELECT * FROM bicycles;

SELECT 'Get bicycles as rows converted from jsonb with jsonb_to_record(body):' AS "Log message";
SELECT converted.id, name, type, quantity, "rentPrice","dateAdded" FROM bicycles, jsonb_to_record(body) AS
  converted (
    id int,
    name text,
    type varchar(255),
    quantity smallint,
    "rentPrice" numeric,
    "dateAdded" timestamp);

SELECT 'Get bicycles as rows converted from jsonb using field selectors:' AS "Log message";
SELECT  body->'id' AS id,
        body->'name' AS name,
        body->'type' AS type,
        (body->>'quantity')::smallint AS quantity,
        body->'rentPrice' AS rent_price,
        (body->>'dateAdded')::timestamp AS date_added
FROM bicycles;

DROP TABLE bicycles;

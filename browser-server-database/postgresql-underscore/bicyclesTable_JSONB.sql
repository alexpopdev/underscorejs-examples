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

SELECT 'Get bicycles:';
SELECT * FROM bicycles;

SELECT 'Get bicycles as rows converted from jsonb with jsonb_to_record(body):';
SELECT converted.id, name, type, quantity, "rentPrice","dateAdded" FROM bicycles, jsonb_to_record(body) AS
  converted (
    id int,
    name text,
    type varchar(255),
    quantity smallint,
    "rentPrice" numeric,
    "dateAdded" timestamp);

SELECT 'Get bicycles as rows converted from jsonb with field selectors:';
SELECT  body->'id' AS id,
        body->'name' AS name,
        body->'type' AS type,
        body->'quantity' AS quantity,
        body->'rentPrice' AS rent_price,
        (body->>'dateAdded')::timestamp AS date_added
FROM bicycles;

DROP TABLE bicycles;

CREATE TABLE bicycles_sql(
   id serial primary key,
   name text not null,
   type varchar(255) not null,
   quantity smallint,
   rent_price numeric,
   date_added timestamp
);
INSERT INTO bicycles_sql (name, type, quantity, rent_price, date_added)
VALUES
  ('A fast bike', 'Road Bike', 10, 20,'2015-02-02'),
  ('An even faster bike', 'Road Bike', 4, 25, '2015-03-25'),
  ('A springy bike', 'Mountain Bike', 20, 18, '2014-11-01');
SELECT * FROM bicycles_sql;
DROP TABLE bicycles_sql;

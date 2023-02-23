-- INSERTS -----------------------------------------------------------------------------

INSERT INTO Sneakers (name, price) 
VALUES (:name, :price);

INSERT INTO Customers (email, password)
VALUES (:email, :password);

INSERT INTO StoreLocations (store_name, physical_address, staff_size)
VALUES (:store_name, :physical_address, :staff_size);

INSERT INTO Employees (email, password, position_rank)
VALUES (:email, :password, :position_rank);

INSERT INTO Sales (sid, cid, time_of_sale, eid)
VALUES (:storeID, :customerID, :time_of_sale, :employeeID);

INSERT INTO SneakerToLocations (productID, storeID, inventory_size, sizeAvailable)
VALUES ((SELECT productID FROM Sneakers WHERE name = :name), (SELECT storeID FROM StoreLocations WHERE store_name = :store_name), :inventory_size, :sizeAvailable);


-- SELECTs -----------------------------------------------------------------------------

SELECT * FROM Sneakers;

SELECT * FROM Customers;

SELECT * FROM StoreLocations;

SELECT * FROM Employees;

SELECT * FROM Sales;

SELECT * FROM SneakerToLocations;

-- get store id and name for the sales drop down

SELECT storeID, store_name FROM StoreLocations;

-- get customer email for the sales drop down

SELECT customerID, email FROM Customers;

-- get employee name and email for sales drop down

SELECT employeeID, email FROM Employees;

-- get store id and name for the SneakerToLocations drop down

SELECT storeID, store_name FROM StoreLocations;

-- get productID and name for sales drop down

SELECT productID, name FROM Sneakers;

-- data used to prepopulate update form for Sneakers

SELECT name, price FROM Sneakers;

-- data used to prepopulate update form for Customers

SELECT name, email FROM Customers;

-- data used to prepopulate update form for StoreLocations

SELECT store_name, physical_address, staff_size FROM Sneakers;

-- data used to prepopulate update form for Employees

SELECT name, email FROM Employees;

-- data used to prepopulate update form for Sales

SELECT time_of_sale FROM Sales;

-- data used to prepopulate update form for SneakerToLocations

SELECT inventory_size FROM Sneakers;


-- UPDATES -----------------------------------------------------------------------------
/*Foreing keys are not allowed to be edited*/

UPDATE Sneakers 
SET name = :name, price = :price
WHERE productID = :productID;

UPDATE Customers 
SET email = :email, password = :password
WHERE customerID = :customerID;

UPDATE StoreLocations 
SET store_name = :store_name, physical_address = :physical_address, staff_size = :staff_size
WHERE storeID = :storeID;

UPDATE Employees
SET email = :email, password = :password, position_rank = :position_rank
WHERE employeeID = :employeeID

UPDATE Sales
SET time_of_sale = :time_of_sale
WHERE saleID = :employeeID

UPDATE SneakerToLocations 
SET inventory_size = :inventory_size, sizeAvailable = :sizeAvailable
WHERE storeID = :storeID AND productID = :productID;

-- DELETES -----------------------------------------------------------------------------

DELETE FROM Sneakers 
WHERE productID = :productID

DELETE FROM Customers 
WHERE customerID = :customerID

DELETE FROM StoreLocations 
WHERE storeID = :storeID

DELETE FROM Employees 
WHERE employeeID = :employeeID

DELETE FROM Sales 
WHERE saleID = :saleID

DELETE FROM SneakerToLocations 
WHERE productID = :productID AND storeID = :storeID
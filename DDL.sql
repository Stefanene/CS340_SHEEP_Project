-- sheep schema
-- by Victor G Poetra and Stefan ene
-- This SQL file will create and insert data into the database we created for sheep to use for daily operation

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
DROP TABLE IF EXISTS Sneakers;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS StoreLocations;
DROP TABLE IF EXISTS SneakerToLocations;
DROP TABLE IF EXISTS Employees;

-- Sneakers entity

CREATE TABLE Sneakers (
	productID int NOT NULL AUTO_INCREMENT UNIQUE,
	name varchar(50) NOT NULL,
	price int NOT NULL,
	PRIMARY KEY (productID)
);

-- Customers entity

CREATE TABLE Customers (
	customerID int NOT NULL AUTO_INCREMENT UNIQUE,
	email varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
	PRIMARY KEY (customerID)
);

-- Employees entity

CREATE TABLE Employees (
	employeeID int NOT NULL AUTO_INCREMENT UNIQUE,
	email varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
	position_rank int NOT NULL,
	PRIMARY KEY (employeeID)
);

-- Sales entity

CREATE TABLE Sales (
	saleID int NOT NULL AUTO_INCREMENT UNIQUE,
	sid int NOT NULL,
	cid int NOT NULL,
	time_of_sale datetime NOT NULL,
	eid int NOT NULL,
	PRIMARY KEY (saleID),
	-- sale is not deleted when FKs are deleted, because they're used to keep record
	FOREIGN KEY (sid) REFERENCES StoreLocations(storeID) ON DELETE NO ACTION,
	FOREIGN KEY (cid) REFERENCES Customers(customerID) ON DELETE NO ACTION,
	-- eid is nullable
	FOREIGN KEY (eid) REFERENCES Employees(employeeID) ON DELETE NO ACTION
);

-- StoreLocations entity

CREATE TABLE StoreLocations (
	storeID int NOT NULL AUTO_INCREMENT UNIQUE,
	store_name varchar(50) NOT NULL,
	physical_address varchar(100) NOT NULL,
	staff_size int NOT NULL,
	PRIMARY KEY (storeID)
);

-- SneakerToLocations entity

CREATE TABLE SneakerToLocations (
	productID int NOT NULL,
	storeID int NOT NULL,
	inventory_size int,
	-- I made size availble a string so we can put a list of sizes available
	sizeAvailable varchar(255),  
	PRIMARY KEY (productID, storeID),
	FOREIGN KEY (productID) REFERENCES Sneakers(productID) ON DELETE CASCADE,
	FOREIGN KEY (storeID) REFERENCES StoreLocations(storeID) ON DELETE CASCADE
);


-- sample data inserts

INSERT INTO Sneakers (name, price) 
VALUES ('Nike Air Force 1 07', 100),
('Jordan 1 Hyper Royals', 400),
('Nike SB Dunk Low Pro Black Gum', 126),
('Kobe 6 the grinch', 1000);

INSERT INTO Customers (email, password)
VALUES ('sneakers@goat.com', 'bestbusinesseva10'),
('realemail@fake.com', 'wesellfakeshoes'),
('dwight@theoffice.com', 'bearsbeetsbattlestargalactica'),
('notfakes@amazon.com', 'sellinshoesallday123');

INSERT INTO StoreLocations (store_name, physical_address, staff_size)
VALUES ('OSU Beaver Store', '663 SW 26th St, Corvallis, OR 97331', 3),
('NewBury Mall', '45th avenue North, Seattle, OR 94881', 6),
('KoreaTown', '199 SE 444 St, Newport, OR 98111', 4),
('SHEEP Headquarters Store', '4720 NW Bethany Blvd, Portland, OR 97229', 5);

INSERT INTO Employees (email, password, position_rank)
VALUES ('poetrav@oregonstate.edu' ,'sneakerhead!OSU1', 5),
('enes@oregonstate.edu', '!ilikemotorcycles123', 5),
('dobbyTheClerk@oregonstate.edu', 'socks4213', 1);

INSERT INTO Sales (sid, cid, time_of_sale, eid)
VALUES ((SELECT storeID FROM StoreLocations WHERE store_name = 'OSU Beaver Store'), (SELECT customerID FROM Customers WHERE email = 'sneakers@goat.com'), '2015-07-19', (SELECT employeeID FROM Employees WHERE email = 'poetrav@oregonstate.edu')),
((SELECT storeID FROM StoreLocations WHERE store_name = 'OSU Beaver Store'), (SELECT customerID FROM Customers WHERE email = 'sneakers@goat.com'), '2015-05-14', (SELECT employeeID FROM Employees WHERE email = 'poetrav@oregonstate.edu')),
((SELECT storeID FROM StoreLocations WHERE store_name = 'SHEEP Headquarters Store'), (SELECT customerID FROM Customers WHERE email = 'realemail@fake.com'), '2015-06-1', (SELECT employeeID FROM Employees WHERE email = 'enes@oregonstate.edu')),
((SELECT storeID FROM StoreLocations WHERE store_name = 'NewBury Mall'), (SELECT customerID FROM Customers WHERE email = 'dwight@theoffice.com'), '2015-07-24', (SELECT employeeID FROM Employees WHERE email = 'poetrav@oregonstate.edu'));

INSERT INTO SneakerToLocations (productID, storeID, inventory_size, sizeAvailable)
VALUES ((SELECT productID FROM Sneakers WHERE name = 'Nike Air Force 1 07'), (SELECT storeID FROM StoreLocations WHERE store_name = 'KoreaTown'), 40, '5,6,7,8,9'),
((SELECT productID FROM Sneakers WHERE name = 'Nike Air Force 1 07'), (SELECT storeID FROM StoreLocations WHERE store_name = 'OSU Beaver Store'), 0, '7,8,9'),
((SELECT productID FROM Sneakers WHERE name = 'Kobe 6 the grinch'), (SELECT storeID FROM StoreLocations WHERE store_name = 'KoreaTown'), 20, '5,6,7,9,11');

-- Select statements used to test.
-- SELECT * FROM Sneakers;
-- SELECT * FROM Customers;
-- SELECT * FROM Employees;
-- SELECT * FROM StoreLocations;
-- SELECT * FROM SneakerToLocations;
-- SELECT * FROM Sales;

SET FOREIGN_KEY_CHECKS = 0;
COMMIT;
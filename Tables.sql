-- 
-- Table dumps and data dumps
-- 

-- 
-- Creates Customers table
-- 
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
	`customerID` INT(11) NOT NULL AUTO_INCREMENT,
	`customerFirst` VARCHAR(255) NOT NULL,
	`customerLast` VARCHAR(255) NOT NULL,
	`phone` INT(11) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`street` VARCHAR(255) NOT NULL,
	`city` VARCHAR(255) NOT NULL,
	`state` VARCHAR(255) NOT NULL,
	`zip` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 
-- Data for Customers table
-- 
INSERT INTO `customers` (`customerID`, `customerFirst`, `customerLast`, `phone`, `email`, `street`, `city`, `state`, `zip`) VALUES
(1, 'Hank', 'Yensen', 3116748976, 'HYensen@yahoo.com', '1421 Bravo Ave', 'Hansen', 'VA', '34141'),
(2, 'Jim', 'Perez', 2335664198, 'jimmyp@gmail.com', '6160 Overlook Dr', 'South Crest', 'NV', '56123'),
(3, 'Michael', 'Sherman', 6778929991, 'ShermanFarm@mail.com', '883 Wyoming Pl', 'Rockville', 'UT', '88765'),
(4, 'Jenny', 'Thomas', 4115567834, 'JennyLaw@gmail.com', '6160 3rd St', 'Hollywood', 'FL', '26203');

-- 
-- Creates Bodies table
-- 
DROP TABLE IF EXISTS `bodies`;
CREATE TABLE `bodies` (
	`bodyID` INT(11) NOT NULL,
	`type` VARCHAR(255) NOT NULL,
	`ratePerDay` DECIMAL(6, 2) NOT NULL,
	PRIMARY KEY (`bodyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 
-- Data for Bodies table
-- 
INSERT INTO `bodies` (`bodyID`, `type`, `ratePerDay`) VALUES
(1, 'Sedan', 35.50),
(2, 'Van', 50.25),
(3, 'Truck', 75.20),
(4, 'SUV', 70.10);

-- 
-- Creates Cars table
-- 
DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars` (
	`carID` INT(11) NOT NULL AUTO_INCREMENT,
	`bodyID` INT(11),
	`make` VARCHAR(255) NOT NULL,
	`model` VARCHAR(255) NOT NULL,
	`year` CHAR(4) NOT NULL,
	`mileage` INT(11) NOT NULL,
	`available` BOOLEAN NOT NULL,
	PRIMARY KEY (`carID`),
	CONSTRAINT `cars_bodyID_fk` FOREIGN KEY (`bodyID`) REFERENCES `bodies` (`bodyID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 
-- Data for Cars table
-- 
INSERT INTO `cars` (`carID`, `bodyID`, `make`, `model`, `year`, `mileage`, `available`) VALUES
(1, 1, 'Honda', 'Civic', '2006', 67344, TRUE),
(2, 3, 'Ford', 'F-150', '2012', 71201, TRUE),
(3, 4, 'Toyota', 'RAV4', '2018', 31988, TRUE),
(4, 2, 'Dodge', 'Grand Caravan', '2016', 42100, TRUE);

-- 
-- Creates Rentals table
-- 
DROP TABLE IF EXISTS `rentals`;
CREATE TABLE `rentals` (
	`carID` INT(11) NOT NULL,
	`customerID` INT(11) NOT NULL,
	`start` DATETIME NOT NULL,
	`end` DATETIME NOT NULL,
	`creditCardNum` INT(20) NOT NULL,
	`expDate` DATE NOT NULL,
	`cvv` INT(11) NOT NULL,
	`cardZip` VARCHAR(255) NOT NULL,
	`totalCost` DECIMAL(9, 2) NOT NULL,
	CONSTRAINT `rentals_carID_fk` FOREIGN KEY (`carID`) REFERENCES `cars` (`carID`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `rentals_customerID_fk` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 
-- Data for Rentals table
-- 
INSERT INTO `rentals` (`carID`, `customerID`, `start`, `end`, `creditCardNum`, `expDate`, `cvv`, `cardZip`, `totalCost`) VALUES
(1, 1, '2020-12-23 11:15:21', '2020-12-26 11:15:21', 8993836726471988, '2024-01-01', 357, 76231, 102.65),
(2, 2, '2021-02-15 09:09:56', '2021-02-16 09:09:56', 1211563378661332, '2026-06-01', 571, 89067, 65.45),
(3, 3, '2021-04-01 01:29:34', '2021-04-03 01:29:34', 9090567478789013, '2021-03-01', 819, 12128, 189.95),
(4, 4, '2021-06-06 06:59:18', '2021-06-08 06:59:18', 6333214590802021, '2022-10-01', 314, 34346, 151.44);

-- 
-- Creates Maintenance table
-- 
DROP TABLE IF EXISTS `maintenance`;
CREATE TABLE `maintenance` (
	`maintID` INT(11) NOT NULL AUTO_INCREMENT,
	`carID` INT(11) NOT NULL,
	`service` VARCHAR(255) NOT NULL,
	`date` DATETIME NOT NULL,
	`mCost` DECIMAL(9, 2) NOT NULL,
	PRIMARY KEY (`maintID`),
	CONSTRAINT `maintenance_carID_fk` FOREIGN KEY (`carID`) REFERENCES `cars` (`carID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 
-- Data for Maintenance table
-- 
INSERT INTO `maintenance` (`maintID`, `carID`, `service`, `date`, `mCost`) VALUES
(1, 1, 'oil change', '2020-11-25 09:20:23', 72.50),
(2, 2, 'detailing', '2020-12-01 09:40:18', 105.00),
(3, 3, 'tire patch', '2021-01-23 10:16:56', 45.60),
(4, 4, 'window servo replacement', '2021-04-22 08:05:40', 196.56);

-- 
-- Creates Preferences table
-- 
DROP TABLE IF EXISTS `preferences`;
CREATE TABLE `preferences` (
	`customerID` INT(11) NOT NULL,
	`bodyID` INT(11) NOT NULL,
	CONSTRAINT `preferences_customerID_fk` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `preferences_bodyID_fk` FOREIGN KEY (`bodyID`) REFERENCES `bodies` (`bodyID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 
-- Data for Preferences table
-- 
INSERT INTO `preferences` (`customerID`, `bodyID`) VALUES
(1, 1),
(2, 3),
(3, 4),
(4, 2);
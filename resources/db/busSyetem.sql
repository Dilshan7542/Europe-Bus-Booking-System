-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bussystem
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `bookingID` varchar(45) NOT NULL,
  `seat` int NOT NULL,
  `bookingDate` varchar(250) DEFAULT NULL,
  `bookingTime` varchar(250) DEFAULT NULL,
  `routeID` varchar(45) DEFAULT NULL,
  `cusID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookingID`),
  KEY `routeID` (`routeID`),
  KEY `cusID` (`cusID`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`routeID`) REFERENCES `route` (`routeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`cusID`) REFERENCES `customer` (`cusID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
REPLACE  IGNORE INTO `booking` VALUES ('BK000',25,'2023-03-14','16:16','RT002','C001'),('BK002',4,'2023-03-09','13:22','RT001','C002'),('BK004',17,'2023-03-09','14:20','RT001','C004'),('BK005',38,'2023-03-07','02:17','RT002','C003');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus`
--

DROP TABLE IF EXISTS `bus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus` (
  `busID` varchar(45) NOT NULL,
  `busNumber` varchar(250) NOT NULL,
  `busSeat` int NOT NULL,
  PRIMARY KEY (`busID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus`
--

LOCK TABLES `bus` WRITE;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
REPLACE  IGNORE INTO `bus` VALUES ('B000','BGO-2907',50),('B001','FGD-8456',25),('B003','GHT-5847',50),('B004','NGT-8555',35),('B005','ASD-0560',40),('B006','EFD-5455',45),('B007','HRD-8729',32);
/*!40000 ALTER TABLE `bus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `cusID` varchar(45) NOT NULL,
  `nic` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `surname` varchar(250) NOT NULL,
  `email` varchar(400) NOT NULL,
  `pwd` text NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `tel` varchar(250) DEFAULT NULL,
  `dob` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`cusID`),
  UNIQUE KEY `customer_email_uindex` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
REPLACE  IGNORE INTO `customer` VALUES ('C000','970490078V','Dilshan','Maduranga','dilshan@gmail.com','1234','male','0762778752','1997-02-18'),('C001','9454105','Iresha','Madushani','madushani@gmail.com','564256','female','0752274759','2023-03-15'),('C002','2000545','Hashan','Madushan','Hashan@gmail.com','324234','male','0752277759','2023-03-16'),('C003','7545465','Kamal','Ananda','kamal@gmail.com','1234','male','0724456585','2023-03-13'),('C004','200022603098','Nimal','Ananda','nimal@gmail.com','1234','male','0756546221','2023-03-21'),('C005','200022603098','Bandara','kamal','bandara@gmail.com','1234','male','4456','2023-03-21');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `routeID` varchar(45) NOT NULL,
  `via_Rode` text NOT NULL,
  `cost` double(10,2) NOT NULL,
  `date` varchar(250) DEFAULT NULL,
  `time` varchar(250) DEFAULT NULL,
  `busID` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`routeID`),
  KEY `busID` (`busID`),
  CONSTRAINT `route_ibfk_1` FOREIGN KEY (`busID`) REFERENCES `bus` (`busID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
REPLACE  IGNORE INTO `route` VALUES ('RT000','Gampaha,Colombo',20.00,'2023-03-12','08:55','B001'),('RT001','Kadawatha,Colombo',10.00,'2023-03-22','08:17','B000'),('RT002','Colombo,Galle',15.00,'2023-03-15','00:01','B006'),('RT003','Gampaha,Yagoda',27.00,'2023-03-15','00:01','B004'),('RT004','Mathara,Galle',25.00,'2023-03-16','05:14','B007');
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` varchar(45) NOT NULL,
  `ftName` varchar(250) NOT NULL,
  `ltName` varchar(250) NOT NULL,
  `email` varchar(400) DEFAULT NULL,
  `pwd` text,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `user_email_uindex` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE  IGNORE INTO `users` VALUES ('E000','User','User','user@gmail.com','1234'),('E001','Kamal','Ananda','kamal1234@gmail.com','1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-09  4:10:15

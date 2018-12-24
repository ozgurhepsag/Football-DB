-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: fbdb
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `manager_contract`
--

DROP TABLE IF EXISTS `manager_contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `manager_contract` (
  `idContract` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(13,2) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `team` int(11) NOT NULL,
  `manager` int(11) NOT NULL,
  PRIMARY KEY (`idContract`),
  KEY `fk_mcontract_manager` (`manager`),
  KEY `fk_mcontract_team` (`team`),
  CONSTRAINT `fk_mcontract_manager` FOREIGN KEY (`manager`) REFERENCES `manager` (`idmanager`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_mcontract_team` FOREIGN KEY (`team`) REFERENCES `team` (`idteam`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_contract`
--

LOCK TABLES `manager_contract` WRITE;
/*!40000 ALTER TABLE `manager_contract` DISABLE KEYS */;
INSERT INTO `manager_contract` VALUES (3,15000000.00,'2017-11-07','2020-01-14',13,3),(4,10000000.00,'2018-12-04','2019-01-06',15,5),(5,2000000.00,'2018-12-04','2019-01-06',16,6),(6,40000000.00,'2018-12-19','2019-01-06',14,4);
/*!40000 ALTER TABLE `manager_contract` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-24 22:05:12

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
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `log` (
  `idLog` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `related_table` varchar(45) DEFAULT NULL,
  `operation` varchar(45) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`idLog`),
  KEY `fk_log_user` (`user`),
  CONSTRAINT `fk_log_user` FOREIGN KEY (`user`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (4,8,'country','CREATE','2018-12-24 20:44:16'),(5,8,'country','CREATE','2018-12-24 20:44:21'),(6,8,'league','CREATE','2018-12-24 20:44:34'),(7,8,'league','CREATE','2018-12-24 20:44:40'),(8,8,'manager','CREATE','2018-12-24 20:45:47'),(9,8,'team','CREATE','2018-12-24 20:46:05'),(10,8,'player','CREATE','2018-12-24 20:46:40'),(11,8,'player','CREATE','2018-12-24 20:47:11'),(12,8,'player','CREATE','2018-12-24 20:47:33'),(13,8,'player','CREATE','2018-12-24 20:47:55'),(14,8,'player','CREATE','2018-12-24 20:48:35'),(15,8,'manager','CREATE','2018-12-24 20:49:18'),(16,8,'team','CREATE','2018-12-24 20:49:58'),(17,8,'player','CREATE','2018-12-24 20:51:24'),(18,8,'player','CREATE','2018-12-24 20:51:45'),(19,8,'player','CREATE','2018-12-24 20:52:07'),(20,8,'player','CREATE','2018-12-24 20:52:25'),(21,8,'player','CREATE','2018-12-24 20:52:37'),(22,8,'manager','CREATE','2018-12-24 20:53:10'),(23,8,'team','CREATE','2018-12-24 20:53:44'),(24,8,'player','CREATE','2018-12-24 20:54:19'),(25,8,'player','CREATE','2018-12-24 20:54:41'),(26,8,'player','CREATE','2018-12-24 20:55:10'),(27,8,'player','CREATE','2018-12-24 20:55:27'),(28,8,'player','CREATE','2018-12-24 20:55:47'),(29,8,'manager','CREATE','2018-12-24 20:56:18'),(30,8,'team','CREATE','2018-12-24 20:56:49'),(31,8,'player','CREATE','2018-12-24 20:57:15'),(32,8,'player','CREATE','2018-12-24 20:57:34'),(33,8,'player','CREATE','2018-12-24 20:57:55'),(34,8,'player','CREATE','2018-12-24 20:58:11'),(35,8,'player','CREATE','2018-12-24 20:58:27'),(36,8,'player_team','CREATE','2018-12-24 20:58:51'),(37,8,'player_team','CREATE','2018-12-24 20:58:55'),(38,8,'player_team','CREATE','2018-12-24 20:59:01'),(39,8,'player_team','CREATE','2018-12-24 20:59:08'),(40,8,'player_team','CREATE','2018-12-24 20:59:11'),(41,8,'player_team','CREATE','2018-12-24 20:59:17'),(42,8,'player_team','CREATE','2018-12-24 20:59:21'),(43,8,'player_team','DELETE','2018-12-24 20:59:25'),(44,8,'player_team','CREATE','2018-12-24 20:59:31'),(45,8,'player_team','CREATE','2018-12-24 20:59:39'),(46,8,'player_team','CREATE','2018-12-24 20:59:46'),(47,8,'player_team','CREATE','2018-12-24 20:59:53'),(48,8,'player_team','CREATE','2018-12-24 21:00:01'),(49,8,'player_team','CREATE','2018-12-24 21:00:08'),(50,8,'player_team','CREATE','2018-12-24 21:00:16'),(51,8,'player_team','CREATE','2018-12-24 21:00:23'),(52,8,'player_team','CREATE','2018-12-24 21:00:28'),(53,8,'player_team','CREATE','2018-12-24 21:00:36'),(54,8,'player_team','CREATE','2018-12-24 21:00:46'),(55,8,'player_team','CREATE','2018-12-24 21:00:52'),(56,8,'player_team','CREATE','2018-12-24 21:00:58'),(57,8,'player_team','CREATE','2018-12-24 21:01:06'),(58,8,'player_team','DELETE','2018-12-24 21:03:29'),(59,8,'player_team','CREATE','2018-12-24 21:03:34'),(60,8,'match','CREATE','2018-12-24 21:08:47'),(61,8,'match','CREATE','2018-12-24 21:09:06'),(62,8,'match','UPDATE','2018-12-24 21:09:44'),(63,8,'match','CREATE','2018-12-24 21:10:17'),(64,8,'match','CREATE','2018-12-24 21:10:31'),(65,8,'manager_contract','CREATE','2018-12-24 21:33:01'),(66,8,'manager_contract','CREATE','2018-12-24 21:33:17'),(67,8,'manager_contract','CREATE','2018-12-24 21:33:28'),(68,8,'manager_contract','CREATE','2018-12-24 21:33:39'),(69,8,'player_contract','CREATE','2018-12-24 21:34:07'),(70,8,'player_statistic','CREATE','2018-12-24 21:34:17');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
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

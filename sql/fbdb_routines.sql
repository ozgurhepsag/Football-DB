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
-- Temporary view structure for view `top_10_players`
--

DROP TABLE IF EXISTS `top_10_players`;
/*!50001 DROP VIEW IF EXISTS `top_10_players`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `top_10_players` AS SELECT 
 1 AS `likes`,
 1 AS `name`,
 1 AS `id`,
 1 AS `image`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_standings`
--

DROP TABLE IF EXISTS `view_standings`;
/*!50001 DROP VIEW IF EXISTS `view_standings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_standings` AS SELECT 
 1 AS `team_name`,
 1 AS `team_id`,
 1 AS `played`,
 1 AS `won`,
 1 AS `drawn`,
 1 AS `lost`,
 1 AS `f`,
 1 AS `a`,
 1 AS `gd`,
 1 AS `points`,
 1 AS `league`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `top_10_players`
--

/*!50001 DROP VIEW IF EXISTS `top_10_players`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `top_10_players` AS select count(0) AS `likes`,concat(`p`.`firstName`,' ',`p`.`lastName`) AS `name`,`p`.`idPlayer` AS `id`,`p`.`image` AS `image` from (`user_player` `up` join `player` `p`) where (`p`.`idPlayer` = `up`.`player`) group by `up`.`player` order by `likes` desc limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_standings`
--

/*!50001 DROP VIEW IF EXISTS `view_standings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_standings` AS select `t`.`name` AS `team_name`,`t`.`idTeam` AS `team_id`,(sum(if((`m`.`awayTeam` = `t`.`idTeam`),1,0)) + sum(if((`m`.`homeTeam` = `t`.`idTeam`),1,0))) AS `played`,(sum(if(((`m`.`homeTeam` = `t`.`idTeam`) and (`m`.`homeScore` > `m`.`awayScore`)),1,0)) + sum(if(((`m`.`awayTeam` = `t`.`idTeam`) and (`m`.`homeScore` < `m`.`awayScore`)),1,0))) AS `won`,(sum(if(((`m`.`homeTeam` = `t`.`idTeam`) and (`m`.`homeScore` = `m`.`awayScore`)),1,0)) + sum(if(((`m`.`awayTeam` = `t`.`idTeam`) and (`m`.`homeScore` = `m`.`awayScore`)),1,0))) AS `drawn`,(sum(if(((`m`.`homeTeam` = `t`.`idTeam`) and (`m`.`homeScore` < `m`.`awayScore`)),1,0)) + sum(if(((`m`.`awayTeam` = `t`.`idTeam`) and (`m`.`homeScore` > `m`.`awayScore`)),1,0))) AS `lost`,(sum(if((`m`.`homeTeam` = `t`.`idTeam`),`m`.`homeScore`,0)) + sum(if((`m`.`awayTeam` = `t`.`idTeam`),`m`.`awayScore`,0))) AS `f`,(sum(if((`m`.`homeTeam` = `t`.`idTeam`),`m`.`awayScore`,0)) + sum(if((`m`.`awayTeam` = `t`.`idTeam`),`m`.`homeScore`,0))) AS `a`,(((sum(if((`m`.`homeTeam` = `t`.`idTeam`),`m`.`homeScore`,0)) + sum(if((`m`.`awayTeam` = `t`.`idTeam`),`m`.`awayScore`,0))) - sum(if((`m`.`homeTeam` = `t`.`idTeam`),`m`.`awayScore`,0))) - sum(if((`m`.`awayTeam` = `t`.`idTeam`),`m`.`homeScore`,0))) AS `gd`,(((sum(if(((`m`.`homeTeam` = `t`.`idTeam`) and (`m`.`homeScore` > `m`.`awayScore`)),3,0)) + sum(if(((`m`.`awayTeam` = `t`.`idTeam`) and (`m`.`homeScore` < `m`.`awayScore`)),3,0))) + sum(if(((`m`.`homeTeam` = `t`.`idTeam`) and (`m`.`homeScore` = `m`.`awayScore`)),1,0))) + sum(if(((`m`.`awayTeam` = `t`.`idTeam`) and (`m`.`homeScore` = `m`.`awayScore`)),1,0))) AS `points`,`t`.`league` AS `league` from (`match` `m` join `team` `t`) where (`m`.`season` = 2018) group by `t`.`name` order by `points` desc,`gd` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-24 23:30:51

CREATE DATABASE  IF NOT EXISTS `licenta` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `licenta`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: licenta
-- ------------------------------------------------------
-- Server version	8.0.16

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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(200) DEFAULT NULL,
  `from_who` json NOT NULL,
  `to_who` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,'salut','{\"id\": 27, \"avatar\": null, \"display_name\": \"Potec Teodor\"}','{\"id\": 2, \"avatar\": null, \"display_name\": \"asd\"}'),(2,'ce faci?7\n','{\"id\": 27, \"avatar\": null, \"display_name\": \"Potec Teodor\"}','{\"id\": 2, \"avatar\": null, \"display_name\": \"asd\"}'),(3,'bine tu?','{\"id\": 2, \"avatar\": null, \"display_name\": \"asd\"}','{\"id\": 27, \"avatar\": null, \"display_name\": \"Potec Teodor\"}'),(4,'salutare\n','{\"id\": 27, \"avatar\": null, \"display_name\": \"Potec Teodor\"}','{\"id\": 2, \"avatar\": null, \"display_name\": \"asd\"}'),(5,'ce faci?','{\"id\": 2, \"avatar\": null, \"display_name\": \"asd\"}','{\"id\": 27, \"avatar\": null, \"display_name\": \"Potec Teodor\"}'),(6,'salut','{\"id\": 28, \"avatar\": null, \"display_name\": \"Potec Monica\"}','{\"id\": 27, \"avatar\": \"assets/images/1559489428896_DSC_1738-Edit.jpg\", \"display_name\": \"Potec Teodor\"}'),(7,'hello','{\"id\": 27, \"avatar\": \"assets/images/1559489428896_DSC_1738-Edit.jpg\", \"display_name\": \"Potec Teodor\"}','{\"id\": 28, \"avatar\": null, \"display_name\": \"Potec Monica\"}'),(8,'\nce faci','{\"id\": 28, \"avatar\": null, \"display_name\": \"Potec Monica\"}','{\"id\": 27, \"avatar\": \"assets/images/1559489428896_DSC_1738-Edit.jpg\", \"display_name\": \"Potec Teodor\"}'),(9,'saluttttt','{\"id\": 28, \"avatar\": null, \"display_name\": \"Potec Monica\"}','{\"id\": 27, \"avatar\": \"assets/images/1559489428896_DSC_1738-Edit.jpg\", \"display_name\": \"Potec Teodor\"}'),(10,'hello\n','{\"id\": 27, \"avatar\": \"assets/images/1559489428896_DSC_1738-Edit.jpg\", \"display_name\": \"Potec Teodor\"}','{\"id\": 28, \"avatar\": null, \"display_name\": \"Potec Monica\"}'),(11,'asdasd','{\"id\": 2, \"avatar\": null, \"display_name\": \"asd\"}','{\"id\": 27, \"avatar\": \"assets/images/1559574306338_DSC_1740-Edit.jpg\", \"display_name\": \"Potec Teodor\"}'),(12,'asdasd','{\"id\": 27, \"avatar\": \"assets/images/1559574306338_DSC_1740-Edit.jpg\", \"display_name\": \"Potec Teodor\"}','{\"id\": 2, \"avatar\": null, \"display_name\": \"asd\"}'),(13,'asdasd\n','{\"id\": 2, \"avatar\": null, \"display_name\": \"asd\"}','{\"id\": 27, \"avatar\": \"assets/images/1559574306338_DSC_1740-Edit.jpg\", \"display_name\": \"Potec Teodor\"}'),(14,'jukkyky','{\"id\": 27, \"avatar\": \"assets/images/1559574306338_DSC_1740-Edit.jpg\", \"display_name\": \"Potec Teodor\"}','{\"id\": 32, \"avatar\": null, \"display_name\": \"teodor\"}'),(15,'tyjytjt','{\"id\": 27, \"avatar\": \"assets/images/1559574306338_DSC_1740-Edit.jpg\", \"display_name\": \"Potec Teodor\"}','{\"id\": 1, \"avatar\": null, \"display_name\": \"124\"}');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collaborator`
--

DROP TABLE IF EXISTS `collaborator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `collaborator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `my_id` int(11) NOT NULL,
  `collab_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaborator`
--

LOCK TABLES `collaborator` WRITE;
/*!40000 ALTER TABLE `collaborator` DISABLE KEYS */;
INSERT INTO `collaborator` VALUES (8,25,3),(10,3,25),(12,25,2),(13,2,25),(14,2,27),(16,27,1),(17,1,27),(18,27,28),(19,28,27),(20,27,30),(21,30,27),(22,27,32),(23,32,27);
/*!40000 ALTER TABLE `collaborator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `start_date` varchar(100) DEFAULT NULL,
  `end_date` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'testEdit2',25,'2019-03-31T21:00:00.000Z','2019-04-01T21:00:00.000Z','descriere','2019-04-13 11:30:39'),(3,'test',3,'2019-04-08T21:00:00.000Z','2019-04-15T21:00:00.000Z','aasdad','2019-04-13 11:37:46'),(4,'test222',25,'2019-04-08T21:00:00.000Z','2019-04-08T21:00:00.000Z','dsfdsfdsvsdvdsvsvd','2019-04-13 17:35:51'),(5,'asdasd',25,'2019-05-07T21:00:00.000Z','2019-05-08T21:00:00.000Z','asdasdsad','2019-05-24 10:37:06'),(6,'test',2,'2019-04-30T21:00:00.000Z','2019-05-05T21:00:00.000Z','test 2 way','2019-05-29 09:49:49'),(7,'test',27,'2019-04-30T21:00:00.000Z','2019-05-07T21:00:00.000Z','asdasda','2019-05-29 15:07:05'),(8,'Project Mona',28,'2019-06-03T21:00:00.000Z','2019-06-12T21:00:00.000Z','asdasddas','2019-06-02 15:33:30'),(9,'rewrw',27,'2019-06-04T21:00:00.000Z','2019-06-19T21:00:00.000Z','asda','2019-06-07 17:40:18');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_members`
--

DROP TABLE IF EXISTS `project_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `project_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_members`
--

LOCK TABLES `project_members` WRITE;
/*!40000 ALTER TABLE `project_members` DISABLE KEYS */;
INSERT INTO `project_members` VALUES (4,3,25),(9,4,1),(10,4,3),(11,5,2),(12,1,1),(13,1,2),(14,6,25),(15,7,2),(16,10,10),(18,8,27),(19,9,1),(20,9,32);
/*!40000 ALTER TABLE `project_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(200) NOT NULL,
  `created_by` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `start_date` varchar(200) DEFAULT NULL,
  `end_date` varchar(200) DEFAULT NULL,
  `priority` varchar(200) NOT NULL DEFAULT 'Low',
  `status` varchar(200) NOT NULL DEFAULT 'Not Started',
  `description` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (3,'dddd',2,6,'null','null','','','','2019-05-29 09:50:01'),(4,'testAdd2',25,4,'2019-05-07T21:00:00.000Z','2019-05-14T21:00:00.000Z',' High','Testing','asdasdads','2019-05-29 11:28:20'),(6,'testAdd4',25,1,'null','null','','','','2019-05-29 11:33:42'),(7,'zxzxzxzx',27,7,'null','null','','','','2019-06-02 09:12:18'),(8,'asdasd',28,8,'2019-06-03T21:00:00.000Z','2019-06-05T21:00:00.000Z',' High','Testing','asdasdasdasd','2019-06-02 15:33:56'),(9,'qwdqwd',27,7,'2019-06-12T21:00:00.000Z','2019-06-10T21:00:00.000Z','Medium','Started','qwdqd','2019-06-07 17:42:01');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_members`
--

DROP TABLE IF EXISTS `task_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `task_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_members`
--

LOCK TABLES `task_members` WRITE;
/*!40000 ALTER TABLE `task_members` DISABLE KEYS */;
INSERT INTO `task_members` VALUES (4,3,25),(11,4,1),(12,8,27),(13,9,2);
/*!40000 ALTER TABLE `task_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `display_name` varchar(200) NOT NULL,
  `password` varchar(500) NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('confirmed','unconfirmed') NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'asd@asd','124','85136c79cbf9fe36bb9d05d0639c70c265c18d37',NULL,'2019-04-04 13:05:35','unconfirmed',NULL),(2,'aaa@a','asd','85136c79cbf9fe36bb9d05d0639c70c265c18d37',NULL,'2019-04-04 13:06:42','confirmed',NULL),(26,'asd@asdasd','asd','7c4a8d09ca3762af61e59520943dc26494f8941b',NULL,'2019-04-08 12:28:52','confirmed',NULL),(27,'teodor.potec@gmail.com','Potec Teodor','18ebf39e9cbe2458ae3b649853782f9a36c4a53d','assets/images/1559574306338_DSC_1740-Edit.jpg','2019-05-29 13:20:41','confirmed','23423423424'),(29,'potec.monica@gmail.com','Potec Monica','85136c79cbf9fe36bb9d05d0639c70c265c18d37',NULL,'2019-06-02 15:43:45','confirmed','45646454655'),(32,'teodor.potec@yahoo.com','teodor','85136c79cbf9fe36bb9d05d0639c70c265c18d37',NULL,'2019-06-07 16:54:00','confirmed','7537095523');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'licenta'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-07 21:11:34

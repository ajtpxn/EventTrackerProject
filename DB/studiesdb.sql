-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema studiesdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema studiesdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `studiesdb` DEFAULT CHARACTER SET utf8 ;
USE `studiesdb` ;

-- -----------------------------------------------------
-- Table `studiesdb`.`study_sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiesdb`.`study_sessions` ;

CREATE TABLE IF NOT EXISTS `studiesdb`.`study_sessions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `length` INT(11) NULL DEFAULT NULL,
  `study_date` DATETIME NULL DEFAULT NULL,
  `study_topic_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO student@localhost;
 DROP USER student@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'student'@'localhost' IDENTIFIED BY 'student';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `studiesdb`.* TO 'student'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `studiesdb`.`study_sessions`
-- -----------------------------------------------------
START TRANSACTION;
USE `studiesdb`;
INSERT INTO `studiesdb`.`study_sessions` (`id`, `length`, `study_date`, `study_topic_id`) VALUES (1, 20, NULL, 1);

COMMIT;

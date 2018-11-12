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
-- Table `studiesdb`.`topics`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiesdb`.`topics` ;

CREATE TABLE IF NOT EXISTS `studiesdb`.`topics` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `studiesdb`.`study_sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiesdb`.`study_sessions` ;

CREATE TABLE IF NOT EXISTS `studiesdb`.`study_sessions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `length` INT(11) NULL DEFAULT NULL,
  `study_date` DATETIME NULL DEFAULT NULL,
  `study_topic_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `study_topic_id_idx` (`study_topic_id` ASC),
  CONSTRAINT `study_topic_id`
    FOREIGN KEY (`study_topic_id`)
    REFERENCES `studiesdb`.`topics` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
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
-- Data for table `studiesdb`.`topics`
-- -----------------------------------------------------
START TRANSACTION;
USE `studiesdb`;
INSERT INTO `studiesdb`.`topics` (`id`, `title`) VALUES (1, 'Ham Radio');
INSERT INTO `studiesdb`.`topics` (`id`, `title`) VALUES (2, 'Rockets');
INSERT INTO `studiesdb`.`topics` (`id`, `title`) VALUES (3, 'Chemistry');
INSERT INTO `studiesdb`.`topics` (`id`, `title`) VALUES (4, 'Mead');
INSERT INTO `studiesdb`.`topics` (`id`, `title`) VALUES (5, 'Philosophy');
INSERT INTO `studiesdb`.`topics` (`id`, `title`) VALUES (6, 'Physics');

COMMIT;


-- -----------------------------------------------------
-- Data for table `studiesdb`.`study_sessions`
-- -----------------------------------------------------
START TRANSACTION;
USE `studiesdb`;
INSERT INTO `studiesdb`.`study_sessions` (`id`, `length`, `study_date`, `study_topic_id`) VALUES (1, 20, '2018-10-22 17:00:00', 1);
INSERT INTO `studiesdb`.`study_sessions` (`id`, `length`, `study_date`, `study_topic_id`) VALUES (2, 21, '2018-11-09 17:00:00', 2);

COMMIT;

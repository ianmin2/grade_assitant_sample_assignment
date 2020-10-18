--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS services;
CREATE TABLE `services` (
  `service_id` BIGINT(64) AUTO_INCREMENT,
  `service_name` TEXT NOT NULL,
  `service_fee` BIGINT(64) NOT NULL,
  `service_code` TEXT NOT NULL,
  `service_added` TIMESTAMP NULL DEFAULT NOW(),
  `service_active` BOOL DEFAULT 1,
  PRIMARY KEY (`service_id` ASC),
  UNIQUE KEY `unique_service_name_required` (`service_name`(10) ASC),
  UNIQUE KEY `unique_service_coed_required` (`service_code`(10) ASC)
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;


--
-- Table structure for table `aud_services`
--

DROP TABLE IF EXISTS aud_services;
CREATE TABLE `aud_services` (
  `service_id` BIGINT(64),
  `service_name` TEXT,
  `service_fee` BIGINT(64),
  `service_code` TEXT,
  `service_added` TIMESTAMP NULL DEFAULT NOW(),
  `service_active` BOOL DEFAULT 1,
  `func` CHAR(15) NULL
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;


-- SERVICES 
DROP TRIGGER IF EXISTS tr_services_after_update;
CREATE TRIGGER tr_services_after_update AFTER UPDATE ON services
  FOR EACH ROW BEGIN
        INSERT INTO aud_services (service_id,service_name,service_fee,service_code,service_added,service_active,func) 
        SELECT OLD.service_id,OLD.service_name,OLD.service_fee,OLD.service_code,OLD.service_added,OLD.service_active,'UPDATE';
  END;

DROP TRIGGER IF EXISTS tr_services_after_delete;
CREATE TRIGGER tr_services_after_delete AFTER UPDATE ON services
FOR EACH ROW BEGIN
    INSERT INTO aud_services (service_id,service_name,service_fee,service_code,service_added,service_active,func) 
    SELECT OLD.service_id,OLD.service_name,OLD.service_fee,OLD.service_code,OLD.service_added,OLD.service_active,'DELETE';
END;

-- ==========================================================================================================

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS members;
CREATE TABLE `members` (
  `member_id` BIGINT(64) AUTO_INCREMENT,
  `full_name` CHAR(25) NOT NULL,
  `username` CHAR(25),
  `password` TEXT NOT NULL,
  `joined` TIMESTAMP NULL DEFAULT NOW(),
  `active` BOOL DEFAULT 1,
  PRIMARY KEY (`member_id` ASC),
  UNIQUE KEY `username_always_required` (`username`(10) ASC)
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;


--
-- Table structure for table `aud_members`
--

DROP TABLE IF EXISTS aud_members;
CREATE TABLE `aud_members` (
  `member_id` BIGINT(64),
  `full_name` CHAR(25),
  `username` CHAR(25),
  `password` TEXT,
  `joined` TIMESTAMP NULL DEFAULT NOW(),
  `active` BOOL DEFAULT 1,
  `func` CHAR(15) NULL
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;

-- MEMBERS &&&&
DROP TRIGGER IF EXISTS tr_member_after_update;
CREATE TRIGGER tr_member_after_update AFTER UPDATE ON members
  FOR EACH ROW BEGIN
        INSERT INTO aud_members (member_id,full_name,username,password,joined,active,func) 
        SELECT OLD.member_id,OLD.full_name,OLD.username,OLD.password,OLD.joined,OLD.active,'UPDATE';
  END;

DROP TRIGGER IF EXISTS tr_member_after_update;
CREATE TRIGGER tr_member_after_update AFTER UPDATE ON members
    FOR EACH ROW BEGIN
        INSERT INTO aud_members (member_id,full_name,username,password,joined,active,func) 
        SELECT OLD.member_id,OLD.full_name,OLD.username,OLD.password,OLD.joined,OLD.active,'UPDATE';
END;

-- ==========================================================================================================

--
-- Table structure for table `password_recovery`
--

DROP TABLE IF EXISTS password_recovery;
CREATE TABLE `password_recovery` (
  `password_recovery_id` BIGINT(64) AUTO_INCREMENT,
  `member` BIGINT(64) NOT NULL,
  `recovery_key` TEXT,
  `requested` TIMESTAMP NULL DEFAULT NOW(),
  `used` BOOL DEFAULT 1,
  `used_at` TIMESTAMP,
  PRIMARY KEY (`password_recovery_id` ASC),
  CONSTRAINT `valid_member_required` FOREIGN KEY (`member`) REFERENCES `members` (`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;


--
-- Table structure for table `aud_password_recovery`
--

DROP TABLE IF EXISTS aud_password_recovery;
CREATE TABLE `aud_password_recovery` (
  `password_recovery_id` BIGINT(64),
  `member` BIGINT(64),
  `recovery_key` TEXT,
  `requested` TIMESTAMP,
  `used` BOOL,
  `used_at` TIMESTAMP,
  `func` CHAR(15) NULL
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;

-- PASSWORD_RECOVERY TRIGGER FUNCTION
DROP TRIGGER IF EXISTS tr_password_recovery_after_update;
CREATE TRIGGER tr_password_recovery_after_update AFTER UPDATE ON password_recovery
  FOR EACH ROW BEGIN
    INSERT INTO aud_password_recovery (password_recovery_id,member,recovery_key,requested,used,used_at,func) 
    SELECT OLD.password_recovery_id,OLD.member,OLD.recovery_key,OLD.requested,OLD.used,OLD.used_at,'UPDATE';
  END;

DROP TRIGGER IF EXISTS tr_password_recovery_after_delete;
CREATE TRIGGER tr_password_recovery_after_delete AFTER UPDATE ON password_recovery
FOR EACH ROW BEGIN
    INSERT INTO aud_password_recovery (password_recovery_id,member,recovery_key,requested,used,used_at,func) 
    SELECT OLD.password_recovery_id,OLD.member,OLD.recovery_key,OLD.requested,OLD.used,OLD.used_at,'DELETE';
END;


-- ==========================================================================================================


--
-- Dumping data for table `members`
--

INSERT INTO `members` 
(`member_id`,full_name,username,`password`) 
VALUES 
(1,'User Administrator','userAdmin',MD5('password'));

--
-- Dumping data for table `services`
--

INSERT INTO `services` 
(`service_id`,`service_name`,`service_fee`,`service_code`) 
VALUES 
(1,'SMS',0,'BX_SMS');





-- ==========================================================================================================





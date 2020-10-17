-- SERVICES --
IF EXISTS( SELECT * FROM   services )   DROP TABLE  services;
CREATE TABLE services (
    service_id      bigint   identity(1, 1)  PRIMARY KEY,
    service_name    varchar(500)        CONSTRAINT  unique_service_name_required UNIQUE NOT NULL,
    service_fee     bigint      CONSTRAINT  service_fee_required NOT NULL,
    service_code    varchar(500)        CONSTRAINT  unique_service_coed_required UNIQUE NOT NULL,
    service_added   DATETIMEOFFSET    DEFAULT     GETDATE(),
    service_active  bit     DEFAULT   1
);
INSERT INTO services 
(service_name,service_fee,service_code)
VALUES
('SMS',0,'BX_SMS');

--- SERVICES ---
DROP VIEW IF EXISTS vw_services;
CREATE VIEW vw_services AS 
SELECT service_id,service_name,service_code,service_added,service_active
FROM services;




--==========================================================================================================


-- MEMBERS --
IF EXISTS( SELECT * FROM  members  )   DROP TABLE  members;
CREATE TABLE members (
	member_id		bigint 	    identity(1, 1)  PRIMARY KEY,
	full_name    varchar(25) 	NOT NULL,
	username	    varchar(25),
	password	    varchar(500)		    NOT NULL,
	joined		    DATETIMEOFFSET	    DEFAULT GETDATE(),
	active 		    bit 	    DEFAULT 1
);

INSERT INTO members 
( full_name, username, password ) 
VALUES
('User Administrator', 'userAdmin', CONVERT(VARCHAR(32), HashBytes('MD5', 'password'), 2));

--- VW_MEMBERS ---
DROP VIEW IF EXISTS vw_members;
CREATE VIEW vw_members AS 
SELECT *
FROM members;

--==========================================================================================================

--- PASSWORD_RECOVERY --
IF EXISTS( SELECT * FROM  password_recovery  )   DROP TABLE  password_recovery;
CREATE TABLE password_recovery (
    password_recovery_id                    bigint identity(1, 1)  PRIMARY KEY
    ,member                                 bigint NOT NULL CONSTRAINT valid_member_required REFERENCES members(member_id)
    ,recovery_key                           varchar(500)
    ,requested                              DATETIMEOFFSET DEFAULT GETDATE()
    ,used                                   bit DEFAULT 0
    ,used_at                                DATETIMEOFFSET
);

-- VW_PASSWORD_RECOVERY
DROP VIEW IF EXISTS vw_password_recovery;
CREATE VIEW vw_password_recovery AS 
SELECT password_recovery_id,recovery_key
,member ,members.full_name AS member_full_name ,members.username AS member_username
FROM password_recovery
    LEFT JOIN members
        ON password_recovery.member         = members.member_id
WHERE password_recovery.used = 0;
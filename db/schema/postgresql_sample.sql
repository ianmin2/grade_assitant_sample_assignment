---- PGSQL SAFE ----
-- SERVICES --
DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE IF NOT EXISTS services (
    service_id      bigserial   PRIMARY KEY,
    service_name    text        CONSTRAINT  unique_service_name_required UNIQUE NOT NULL,
    service_fee     bigint      CONSTRAINT  service_fee_required NOT NULL,
    service_code    text        CONSTRAINT  unique_service_coed_required UNIQUE NOT NULL,
    service_added   TIMESTAMP WITH TIME ZONE    DEFAULT     CURRENT_TIMESTAMP,
    service_active  boolean     DEFAULT     true
);
INSERT INTO services 
(service_id,service_name,service_fee,service_code)
VALUES
(1,'SMS',0,'BX_SMS');

-- AUD_SERVICES --
DROP TABLE IF EXISTS aud_services CASCADE;
CREATE TABLE IF NOT EXISTS aud_services (
    service_id      bigint      ,
    service_name    text        ,
    service_fee     bigint      ,
    service_code    text        ,
    service_added   TIMESTAMP WITH TIME ZONE    DEFAULT     CURRENT_TIMESTAMP,
    service_active  boolean     DEFAULT     true,
    func            varchar(15)
);


--- SERVICES 
CREATE OR REPLACE FUNCTION audit_services()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_services (service_id,service_name,service_fee,service_code,service_added,service_active,func) 
        SELECT OLD.service_id,OLD.service_name,OLD.service_fee,OLD.service_code,OLD.service_added,OLD.service_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_services (service_id,service_name,service_fee,service_code,service_added,service_active,func) 
        -- SELECT NEW.service_id,NEW.service_name,NEW.service_fee,NEW.service_code,NEW.service_added,NEW.service_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_services (service_id,service_name,service_fee,service_code,service_added,service_active,func) 
        SELECT OLD.service_id,OLD.service_name,OLD.service_fee,OLD.service_code,OLD.service_added,OLD.service_active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;

-- SERVICES
CREATE TRIGGER services_audit BEFORE UPDATE OR INSERT OR DELETE
   ON services FOR EACH ROW
EXECUTE PROCEDURE audit_services();


--- SERVICES ---
DROP VIEW IF EXISTS vw_services CASCADE;
CREATE OR REPLACE VIEW vw_services AS 
SELECT service_id,service_name,service_code,service_added,service_active
FROM services;



--==========================================================================================================


-- MEMBER TYPE ENUMERATOR --
DROP TYPE IF EXISTS available_roles CASCADE;
CREATE TYPE available_roles AS ENUM ('audit','client','admin');

-- MEMBERS --
DROP TABLE IF EXISTS members CASCADE;
CREATE TABLE IF NOT EXISTS members (
	member_id		bigserial 	    PRIMARY KEY,
	full_name    varchar(25) 	NOT NULL,
	username	    varchar(25),  
	password	    text		    NOT NULL,
	joined		    TIMESTAMP WITH TIME ZONE	    DEFAULT CURRENT_TIMESTAMP,
	active 		    boolean 	    DEFAULT true
);

INSERT INTO members 
( member_id,full_name, username, password ) 
VALUES
(1,'User Admin','userAdmin',MD5('password'));

-- AUD_MEMBERS --
DROP TABLE IF EXISTS aud_members CASCADE;
CREATE TABLE IF NOT EXISTS aud_members (
	member_id		bigint,
	full_name    varchar(25) 	,
	username	    varchar(25),    
	password	    text		    ,
	joined		    TIMESTAMP WITH TIME ZONE	    DEFAULT CURRENT_TIMESTAMP,
	active 		    boolean 	    DEFAULT true,
    func            varchar(15)
);


--- MEMBERS
CREATE OR REPLACE FUNCTION audit_members()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_members (member_id,full_name,username,password,joined,active,func) 
        SELECT OLD.member_id,OLD.full_name,OLD.username,OLD.password,OLD.joined,OLD.active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_members (member_id,full_name,username,password,joined,active,func) 
        -- SELECT NEW.member_id,NEW.full_name,NEW.username,NEW.password,NEW.joined,NEW.active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_members (member_id,full_name,username,password,joined,active,func) 
        SELECT OLD.member_id,OLD.full_name,OLD.username,OLD.password,OLD.joined,OLD.active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- MEMBERS
CREATE TRIGGER members_audit BEFORE UPDATE OR INSERT OR DELETE
   ON members FOR EACH ROW
EXECUTE PROCEDURE audit_members();

--- VW_MEMBERS ---
DROP VIEW IF EXISTS vw_members;
CREATE OR REPLACE VIEW vw_members AS 
SELECT * from members;


--==========================================================================================================

--- PASSWORD_RECOVERY --
DROP TABLE IF EXISTS password_recovery CASCADE;
CREATE TABLE IF NOT EXISTS password_recovery (
    password_recovery_id                    bigserial PRIMARY KEY
    ,member                                 bigint NOT NULL CONSTRAINT valid_member_required REFERENCES members(member_id)
    ,recovery_key                           text
    ,requested                              TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    ,used                                   boolean DEFAULT false
    ,used_at                                TIMESTAMP WITH TIME ZONE
);

--- AUD_PASSWORD_RECOVERY --
DROP TABLE IF EXISTS aud_password_recovery CASCADE;
CREATE TABLE IF NOT EXISTS aud_password_recovery (
    password_recovery_id                    bigint
    ,member                                 bigint
    ,recovery_key                           text
    ,requested                              TIMESTAMP WITH TIME ZONE
    ,used                                   boolean
    ,used_at                                TIMESTAMP WITH TIME ZONE
    ,func                                   varchar(15)
);

--- PASSWORD_RECOVERY TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION audit_password_recovery()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_password_recovery (password_recovery_id,member,recovery_key,requested,used,used_at,func) 
        SELECT OLD.password_recovery_id,OLD.member,OLD.recovery_key,OLD.requested,OLD.used,OLD.used_at,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_password_recovery (password_recovery_id,member,recovery_key,requested,used,used_at,func) 
        -- SELECT NEW.password_recovery_id,NEW.member,NEW.recovery_key,NEW.requested,NEW.used,NEW.used_at,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_password_recovery (password_recovery_id,member,recovery_key,requested,used,used_at,func) 
        SELECT OLD.password_recovery_id,OLD.member,OLD.recovery_key,OLD.requested,OLD.used,OLD.used_at,TG_OP;
        NEW.used_at = now();
        NEW.used = true;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- PASSWORD_RECOVERY AUDIT TRIGGER
CREATE TRIGGER password_recovery_audit BEFORE UPDATE OR INSERT OR DELETE
   ON password_recovery FOR EACH ROW
EXECUTE PROCEDURE audit_password_recovery();

-- VW_PASSWORD_RECOVERY
DROP VIEW IF EXISTS vw_password_recovery CASCADE;
CREATE OR REPLACE VIEW vw_password_recovery AS 
SELECT password_recovery_id,recovery_key
,member ,members.full_name AS member_full_name ,members.username AS member_username 
FROM password_recovery
    LEFT JOIN members
        ON password_recovery.member         = members.member_id
WHERE password_recovery.used = false;


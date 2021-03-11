CREATE SCHEMA "VMS";

CREATE TABLE "VMS".role
(
    id serial,
    role_name CHARACTER VARYING(50) COLLATE pg_catalog."default" NOT NULL,
    role_description CHARACTER VARYING(125) COLLATE pg_catalog."default",
    CONSTRAINT role_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE "VMS".account
(
    id serial,
    first_name CHARACTER VARYING(50) COLLATE pg_catalog."default" NOT NULL,
    last_name CHARACTER VARYING(50) COLLATE pg_catalog."default",
    username CHARACTER VARYING(50) COLLATE pg_catalog."default" NOT NULL,
    password CHARACTER VARYING(125) COLLATE pg_catalog."default" NOT NULL,
    phone_number character(15) COLLATE pg_catalog."default",
    created_date date NOT NULL DEFAULT CURRENT_DATE,
    account_role INTEGER NOT NULL,
    CONSTRAINT account_pkey PRIMARY KEY (id),
    CONSTRAINT username UNIQUE (username),
    CONSTRAINT account_account_role_fkey FOREIGN KEY (account_role)
        REFERENCES "VMS".role (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE "VMS".type_info
(
    id serial,
    type_name CHARACTER VARYING(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT type_info_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE "VMS".blacklist
(
    id serial,
    type_id INTEGER,
    blacklist_number CHARACTER VARYING(25) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT blacklist_pkey PRIMARY KEY (id),
    CONSTRAINT blacklist_type_id_blacklist_number_key UNIQUE (type_id, blacklist_number),
    CONSTRAINT type_id FOREIGN KEY (type_id)
        REFERENCES "VMS".type_info (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE "VMS".visit_log
(
    id serial,
    who_to_see character varying(50) COLLATE pg_catalog."default",
    type_id integer NOT NULL,
    phone_number character(15) COLLATE pg_catalog."default" NOT NULL,
    entry_time time(6) with time zone NOT NULL DEFAULT timezone('utc-1'::text, CURRENT_TIME),
    identification_number character varying(50) COLLATE pg_catalog."default" NOT NULL,
    date timestamp(4) with time zone NOT NULL DEFAULT CURRENT_DATE,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default",
    image_url character varying(125) COLLATE pg_catalog."default",
    active boolean NOT NULL DEFAULT true,
    CONSTRAINT visit_log_pkey PRIMARY KEY (id),
    CONSTRAINT type_id FOREIGN KEY (type_id)
        REFERENCES "VMS".type_info (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT visit_log_who_to_see_fkey FOREIGN KEY (who_to_see)
        REFERENCES "VMS".account (username) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE "VMS".closed_visit_log
(
    visit_log_id integer NOT NULL,
    exit_time time(6) with time zone NOT NULL DEFAULT timezone('utc-1'::text, CURRENT_TIME),
    exit_date timestamp(4) with time zone NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT closed_visit_log_pkey PRIMARY KEY (visit_log_id),
    CONSTRAINT closed_visit_log_visit_log_id_fkey FOREIGN KEY (visit_log_id)
        REFERENCES "VMS".visit_log (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


CREATE TABLE "VMS".appointment_info
(
    id serial,
    account_id integer NOT NULL,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default",
    phone_number character varying(15) COLLATE pg_catalog."default" NOT NULL,
    appointment_date timestamp(4) with time zone NOT NULL,
    appointment_time time(6) without time zone NOT NULL,
    date timestamp(4) with time zone NOT NULL DEFAULT CURRENT_DATE,
    active boolean NOT NULL DEFAULT true,
    CONSTRAINT appointment_info_pkey PRIMARY KEY (id),
    CONSTRAINT account_id FOREIGN KEY (account_id)
        REFERENCES "VMS".account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;



CREATE TABLE "VMS".vehicle_info
(
    id serial,
     vehicle_type character varying(50) COLLATE pg_catalog."default",
    plate_number character varying(50) COLLATE pg_catalog."default" NOT NULL,
    color character varying(50) COLLATE pg_catalog."default",
    brand character varying(50) COLLATE pg_catalog."default",
    model_number character varying(50) COLLATE pg_catalog."default",
    custom boolean DEFAULT false,
    created_date timestamp(4) with time zone DEFAULT CURRENT_DATE,
    CONSTRAINT vehicle_info_pkey PRIMARY KEY (id),
    CONSTRAINT plate_number UNIQUE (plate_number)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE "VMS".vehicle_log
(
    id serial,
    car_id integer,
    active boolean DEFAULT true,
    entry_time time(6) with time zone NOT NULL DEFAULT timezone('utc-1'::text, CURRENT_TIME),
    date timestamp(4) with time zone DEFAULT CURRENT_DATE,
    CONSTRAINT vehicle_log_pkey PRIMARY KEY (id),
    CONSTRAINT car_id FOREIGN KEY (car_id)
        REFERENCES "VMS".vehicle_info (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE "VMS".closed_vehicle_log
(
    vehicle_log_id integer NOT NULL,
    exit_time time(6) with time zone NOT NULL DEFAULT timezone('utc-1'::text, CURRENT_TIME),
    exit_date timestamp(4) with time zone NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT closed_vehicle_log_pkey PRIMARY KEY (vehicle_log_id),
    CONSTRAINT closed_vehicle_log_vehicle_log_id_fkey FOREIGN KEY (vehicle_log_id)
        REFERENCES "VMS".vehicle_log (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE TABLE "VMS".car_blacklist
(
    id SERIAL,
    plate_number character varying(25) COLLATE pg_catalog."default",
    CONSTRAINT car_blacklist_pkey PRIMARY KEY (id),
    CONSTRAINT car_blacklist_plate_number_key UNIQUE (plate_number)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

INSERT INTO "VMS".type_info(
	type_name)
	VALUES
		('passport'),
		('driver license'),
		('National ID Card'),
		('Voters Card'),
		('Tax Clearance Card');

INSERT INTO "VMS".role(
	role_name, role_description)
	VALUES 
		('admin', 'Full Control over the system, register new users.'),
		('Security Guard', 'Access to security Guard Modules, deals with cars.'),
		('receptionist', 'Access to Receptionist Module, deals with visits.'),
		('office employee', 'Access to user module, like creating appointments, are the user.')
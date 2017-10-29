
DROP DATABASE IF EXISTS zoltar_db;

CREATE DATABASE zoltar_db;

USE zoltar_db;

CREATE TABLE companies (
	company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(50) NOT NULL,
    account_number VARCHAR(30) NOT NULL,
    createdOn TIMESTAMP NOT NULL
);

INSERT INTO companies (company_name, account_number)
VALUE ('Elementive Marketing Solutions', 58062675);

SELECT * FROM companies;

CREATE TABLE properties (
	property_id INT AUTO_INCREMENT PRIMARY KEY,
    property_name VARCHAR(50) NOT NULL,
    tracking_id VARCHAR(30) NOT NULL,
    defaultProperty BOOLEAN DEFAULT TRUE,
    company_id INT NOT NULL,
    createdOn TIMESTAMP NOT NULL,
	FOREIGN KEY fk_company(company_id)
	REFERENCES companies(company_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
    
);

INSERT INTO properties (property_name, tracking_id, company_id)
VALUE ('Elementive', 'UA-58062675-1', 1);

SELECT * FROM properties;

CREATE TABLE views (
	view_id INT AUTO_INCREMENT PRIMARY KEY,
    view_name VARCHAR(50) NOT NULL,
    ga_view_id VARCHAR(30) NOT NULL,
    defaultView BOOLEAN DEFAULT TRUE,
    property_id INT NOT NULL,
    createdOn TIMESTAMP NOT NULL,
	FOREIGN KEY fk_property(property_id)
	REFERENCES properties(property_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO views (view_name, ga_view_id, property_id)
VALUE ('All Web Site Data', 95712718, 1);

SELECT * FROM views;

CREATE TABLE monthly_usage (
	id INT AUTO_INCREMENT PRIMARY KEY,
	sessions INT,
    pageviews INT,
    users INT,
    pageviewsBySession DECIMAL(5,2),
    exitRate  DECIMAL(4,4),
    bounceRate DECIMAL(4,4),
    newSession DECIMAL(4,4),
    avgSession TIME,
    goalCompletion INT,
    company_id INT,
    property_id INT,
    view_id INT,
	start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    createdOn TIMESTAMP NOT NULL,
	FOREIGN KEY fk_company(company_id)
	REFERENCES companies(company_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
    FOREIGN KEY fk_property(property_id)
	REFERENCES properties(property_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY fk_view(view_id)
	REFERENCES views(view_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

INSERT INTO monthly_usage (sessions, pageviews, users, pageviewsBySession, bounceRate, exitRate, newSession, avgSession, goalCompletion, company_id, property_id, view_id, start_date, end_date)
VALUE(329, 510, 309, 1.55, .6049, .6392, .9271, '00:01:07', 2, 1, 1, 1, '2017-01-01', '2017-01-31');

SELECT*FROM monthly_usage;

CREATE TABLE traffic_sources (
	id INT AUTO_INCREMENT PRIMARY KEY,
	entrances INT,
    bounces INT,
    bounce_rate DECIMAL(2,2),
    avgSession TIME,
    pageviews_session DECIMAL(5,2),
    referral_landing INT,
    referral_sources INT,
    social_landing INT,
    social_sources INT,
    other_sources INT,
    traffic_source VARCHAR(50) NOT NULL,
	company_id INT,
    property_id INT,
    view_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	createdOn TIMESTAMP NOT NULL,
	FOREIGN KEY fk_company(company_id)
	REFERENCES companies(company_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
    FOREIGN KEY fk_property(property_id)
	REFERENCES properties(property_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY fk_view(view_id)
	REFERENCES views(view_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

SELECT * FROM traffic_sources;

CREATE TABLE search_engine (
	id INT AUTO_INCREMENT PRIMARY KEY,
    entrances INT,
    unique_pages INT,
    search_engine VARCHAR(50) NOT NULL,
	company_id INT,
    property_id INT,
    view_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	createdOn TIMESTAMP NOT NULL,
	FOREIGN KEY fk_company(company_id)
	REFERENCES companies(company_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
    FOREIGN KEY fk_property(property_id)
	REFERENCES properties(property_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY fk_view(view_id)
	REFERENCES views(view_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE social (
	id INT AUTO_INCREMENT PRIMARY KEY,
	entrances INT,
    bounces INT,
    bounce_rate DECIMAL(2,2),
    avgSession TIME,
    pageviews_session DECIMAL(5,2),
    social_source VARCHAR(50) NOT NULL,
	company_id INT,
    property_id INT,
    view_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	createdOn TIMESTAMP NOT NULL,
	FOREIGN KEY fk_company(company_id)
	REFERENCES companies(company_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
    FOREIGN KEY fk_property(property_id)
	REFERENCES properties(property_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY fk_view(view_id)
	REFERENCES views(view_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);


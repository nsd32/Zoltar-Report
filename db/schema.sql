DROP DATABASE IF EXISTS testGA;
CREATE DATABASE testGA;
USE testGA;
CREATE TABLE companies (
    company_id INT AUTO_INCREMENT,
    company_name VARCHAR(50) NOT NULL,
    account_number VARCHAR(30) NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    PRIMARY KEY(company_id)
);
CREATE TABLE properties (
    property_id INT AUTO_INCREMENT,
    property_name VARCHAR(50) NOT NULL,
    tracking_id VARCHAR(30) NOT NULL,
    defaultProperty BOOLEAN DEFAULT TRUE,
    company_id INT NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    PRIMARY KEY(property_id)
);
CREATE TABLE views (
    view_id INT AUTO_INCREMENT,
    view_name VARCHAR(50) NOT NULL,
    tracking_id VARCHAR(30) NOT NULL,
    defaultView BOOLEAN DEFAULT TRUE,
    property_id INT NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    PRIMARY KEY(view_id)
);
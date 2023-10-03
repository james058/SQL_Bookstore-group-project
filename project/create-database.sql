DROP DATABASE IF EXISTS LOOKINNABOOK;
CREATE DATABASE LOOKINNABOOK;
USE LOOKINNABOOK;

SET NAMES utf8;
SET character_set_client = utf8mb4 ;

CREATE TABLE AUTHOR(
    a_id TINYINT(4) PRIMARY KEY NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_bio VARCHAR(255) NOT NULL
);
INSERT INTO AUTHOR VALUES(1, "James Patterson", "Male American Author");
INSERT INTO AUTHOR VALUES(2, "Louise Penny", "Female Canadian Author");
INSERT INTO AUTHOR VALUES(3, "Nora Roberts", "Female American Author");
INSERT INTO AUTHOR VALUES(4, "David Baldacci", "Male American Author");
INSERT INTO AUTHOR VALUES(5, "Michael Connelly", "Male American Author");
INSERT INTO AUTHOR VALUES(6, "J D Robb", "Female American Author");
INSERT INTO AUTHOR VALUES(7, "Lee Child", "Male British Author");
INSERT INTO AUTHOR VALUES(8, "Elly Griffiths", "Female British Author");
INSERT INTO AUTHOR VALUES(9, "Mike Maden", "Male American Author");
INSERT INTO AUTHOR VALUES(10, "Colleen Hoover", "Female American Author");


CREATE TABLE PUBLISHER(
    id TINYINT(4) PRIMARY KEY NOT NULL,
    publisher_name VARCHAR(255) NOT NULL,
    publisher_address VARCHAR(255) NOT NULL,
    account_number CHAR(9) NOT NULL,
    phone_number CHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL
);
INSERT INTO PUBLISHER VALUES(1, "Little, Brown and Company", "Boston, Massachusetts, United States", 534776873, 4508762345, "lbc@gmail.com");
INSERT INTO PUBLISHER VALUES(2, "Little Brown Books for Young Readers", "Boston, Massachusetts, United States", 788456985, 4509831996, "lbbyr@gmail.com");
INSERT INTO PUBLISHER VALUES(3, "St. Martin's Publishing Group", "New York, New York, United States", 665198004, 6889442006, "martinpress@gmail.com");
INSERT INTO PUBLISHER VALUES(4, "Harlequin", "Toronto, Ontario, Canada", 533966735, 2264580385, "Harlequin@gmail.com");
INSERT INTO PUBLISHER VALUES(5, "Grand Central Publishing", "New York, New York, United States", 545803557, 6888495503, "gcp@gmail.com");
INSERT INTO PUBLISHER VALUES(6, "Random House Publishing Group", "New York, New York, United States", 458734055, 6885638954, "rhpg@gmail.com");
INSERT INTO PUBLISHER VALUES(7, "HarperCollins Publishers", "New York, New York, United States", 475634054, 6884543098, "harpercollins@gmail.com");
INSERT INTO PUBLISHER VALUES(8, "Penguin Publishing Group", "Boston, Massachusetts, United States", 874322234, 4505643547, "ppg@gmail.com");
INSERT INTO PUBLISHER VALUES(9, "Atria Books", "New York, New York, United States", 374327382, 6884554934, "atriabooks@gmail.com");

CREATE TABLE BOOKS(
    book_name VARCHAR(255) NOT NULL,
    book_genre VARCHAR(50) NOT NULL,
    book_ISBN CHAR(13) PRIMARY KEY NOT NULL,
    book_price DECIMAL(5,2) NOT NULL, 
    pages INT NOT NULL,
    quantity INT NOT NULL,
    author_id TINYINT(4) NOT NULL,
    publisher_id TINYINT(4) NOT NULL,
    FOREIGN KEY (author_id)
        REFERENCES AUTHOR(a_id),
    FOREIGN KEY (publisher_id)
        REFERENCES PUBLISHER(id)
);
INSERT INTO BOOKS VALUES("Blow back", "Mystery", 9780316499637, 35.16, 512, 1000, 1, 1);
INSERT INTO BOOKS VALUES("The girl in the Castle", "Mystery", 9780316411721, 23.75, 368, 1000, 1, 2);
INSERT INTO BOOKS VALUES("The Twelve Topsy-Turvy, Very Messy Days of Christmas", "General Fiction", 9780316405904, 25, 288, 1000, 1, 1);
INSERT INTO BOOKS VALUES("Triple Cross", "Thriller", 9780316471152, 21.99, 496, 1000, 1, 1);
INSERT INTO BOOKS VALUES("A World of Curiosities", "Mystery",9781250145291, 27.02, 400, 1000, 2, 3);
INSERT INTO BOOKS VALUES("A Christmas Promise", "Romance", 9781250847256, 16.08, 320, 1000, 3, 3);
INSERT INTO BOOKS VALUES("A Force of Nature", "Romance", 9781250849731, 17.01, 384, 1000, 3, 3);
INSERT INTO BOOKS VALUES("Midnight Shadows", "Romantic Suspense", 9781335425966, 12.86, 416, 1000, 3, 4);
INSERT INTO BOOKS VALUES("Long Shadows", "Mystery", 9781538739754, 21.99, 448, 1000, 4, 5);
INSERT INTO BOOKS VALUES("Desert Star", "Mystery", 9780316505321, 21.99, 400, 1000, 5, 1);
INSERT INTO BOOKS VALUES("Desperation in Death", "Urban Fantasy", 9781250278234, 27.74, 368, 1000, 6, 3);
INSERT INTO BOOKS VALUES("No Plan B", "Thriller", 9780593599518, 22.99, 368, 1000, 7, 6);
INSERT INTO BOOKS VALUES("Bleeding Heart Yard", "Mystery", 9780063289277, 34.67, 352, 1000, 8, 7);
INSERT INTO BOOKS VALUES("Marple ", "Mystery", 9780063136052, 35.63, 368, 1000, 8, 7);
INSERT INTO BOOKS VALUES("The Last Remains", "Mystery", 9780358726487, 36.63, 352, 1000, 8, 7);
INSERT INTO BOOKS VALUES("Hellburner", "Thriller", 9780593540640, 35, 432, 1000, 9, 8);
INSERT INTO BOOKS VALUES("It Starts with Us", "New Adult Romance", 9781668001226, 51.03, 336, 1000, 10, 9);

CREATE TABLE USERS(
    customer_id TINYINT(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE ORDERS(
    order_number CHAR(10) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_id TINYINT(4) NOT NULL UNIQUE,
    PRIMARY KEY(Order_Number)
);

CREATE TABLE CART(
    book_name VARCHAR(255) NOT NULL,
    book_price DECIMAL(5,2) NOT NULL,
    book_ISBN CHAR(13) NOT NULL, 
    customer_id TINYINT(4) NOT NULL,
    b_quantity INT NOT NULL,
    FOREIGN KEY (book_ISBN) REFERENCES BOOKS(book_ISBN)
);

CREATE TABLE CHECKOUT(
    order_number CHAR(10) NOT NULL,
    customer_address VARCHAR(255) NOT NULL,
    customer_id TINYINT(4) NOT NULL,
    customer_name VARCHAR(255) NOT NULL, 
    card_number CHAR(16) NOT NULL,
    card_pin CHAR(3) NOT NULL,
    FOREIGN KEY  (customer_id) REFERENCES USERS(customer_id)
);

CREATE TABLE OWNERS(
    owner_id TINYINT(4) PRIMARY KEY NOT NULL,
    owner_name VARCHAR(30) NOT NULL
);
INSERT INTO OWNERS VALUES(1, "Chiedu Ezinwa");
INSERT INTO OWNERS VALUES(2, "Daniel");
INSERT INTO OWNERS VALUES(3, "James");
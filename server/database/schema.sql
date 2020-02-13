-- optional drop whole DB before recreating
-- DROP DATABASE MEALDEALS;
CREATE DATABASE MEALDEALS;

-- store individual deals in this table
CREATE TABLE MEALDEALS.Deals(
    deal_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(1000),
    venue VARCHAR(150) NOT NULL,
    location VARCHAR(70) NOT NULL,
    image VARCHAR(100),
    PRIMARY KEY ( deal_id )
);

-- example insert statment with a single deals parameters
INSERT INTO MEALDEALS.Deals (title, description, venue, location, image)
VALUES (
    'All you can eat Chicken Wings, £9.99',
    'Between 5pm and 10pm, get all you can eat wings. Various choices of sauces and sides',
    'Dog & Partridge',
    'Sheffield', 
    'OluKitchen.png'
)
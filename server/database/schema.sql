CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pseudo VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    points INT,
    password VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    is_admin BOOLEAN
);

CREATE TABLE city (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    points INT
);


CREATE TABLE artist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    points INT
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255)
);

CREATE TABLE streetArt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    geolocation_x INT,
    geolocation_y INT,
    imageUrl VARCHAR(255),
    imageAlt VARCHAR(255),
    points INT,
    city_id INT,
    created_at TIMESTAMP,
    user_id INT,
    artist_id INT,
    category_id INT,
    FOREIGN KEY (city_id) REFERENCES city(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (artist_id) REFERENCES artist(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE seen (
    user_id INT,
    streetArt_id INT,
    points INT,
    PRIMARY KEY (user_id, streetArt_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (streetArt_id) REFERENCES streetArt(id)
);

INSERT INTO city (name) VALUES ('paris');
INSERT INTO city (name) VALUES ('lisbon');
INSERT INTO city (name) VALUES ('madrid');
UPDATE city
SET name = 'Paris'
WHERE name = 'paris';
UPDATE city
SET name = 'Lisbon'
WHERE name = 'lisbon';
UPDATE city
SET name = 'Madrid'
WHERE name = 'madrid';

INSERT INTO user (pseudo, email, password, is_admin) VALUES ('john_doe', 'johndoe@yopmail.com', '1234', 1);
INSERT INTO user (pseudo, email, password, is_admin) VALUES ('jean_french', 'jeanfrench@yopmail.com', '4567', 0);
INSERT INTO user (pseudo, email, password, is_admin) VALUES ('juana_latina', 'juanalatina@yopmail.com', '8910', 0);

INSERT INTO artist (name) VALUES ('Banksy');
INSERT INTO artist (name) VALUES ('Os Gêmeos');
INSERT INTO artist (name) VALUES ('Invader');

INSERT INTO streetart (title, city_id, artist_id) VALUES ('La Petite Fille au ballon', 1, 1);
UPDATE streetart
SET title = 'Champagne Rat'
WHERE title = 'La Petite Fille au ballon';
UPDATE streetart
SET imageUrl = 'assets/images/rat-champagne.jpg'
WHERE id = 1;

INSERT INTO seen (user_id, streetArt_id) VALUES (1, 1);
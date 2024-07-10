-- SQLBook: Code
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

INSERT INTO city (name) VALUES ('Paris');
INSERT INTO city (name) VALUES ('Lisbon');
INSERT INTO city (name) VALUES ('Madrid');
INSERT INTO city (name) VALUES ('Bordeaux');
INSERT INTO city (name) VALUES ('Bangkok');


INSERT INTO user (pseudo, email, password, is_admin) VALUES ('john_doe', 'johndoe@yopmail.com', '1234', 1);
INSERT INTO user (pseudo, email, password, is_admin) VALUES ('jean_french', 'jeanfrench@yopmail.com', '4567', 0);
INSERT INTO user (pseudo, email, password, is_admin) VALUES ('juana_latina', 'juanalatina@yopmail.com', '8910', 0);

INSERT INTO artist (name) VALUES ('Banksy');
INSERT INTO artist (name) VALUES ('Os Gêmeos');
INSERT INTO artist (name) VALUES ('Invader');
INSERT INTO artist (name) VALUES ('C215');
INSERT INTO artist (name) VALUES ('Jef Aérosol');
INSERT INTO artist (name) VALUES ('Paola Delfin');
INSERT INTO artist (name) VALUES ('Okuda');




INSERT INTO streetart (title,imageUrl, city_id, artist_id) VALUES ('Chuuuttt','assets/images/Chuuuttt.jpg', 1, 5);
INSERT INTO streetart (title, imageUrl, city_id, artist_id) VALUES ('Amor com as Mulheres','asset/images/amor-com-as-mulheres.jpg', 3, 7);
INSERT INTO streetart (title, imageUrl, city_id, artist_id) VALUES ('Deux dimensions','assets/images/deux-dimensions.jpg', 4, 6);
INSERT INTO streetart (title,imageUrl,city_id, artist_id) VALUES ('The cat','assets/images/the-cat.jpg',1,4);
INSERT INTO streetart (title, imageUrl, city_id, artist_id) VALUES ('Champagne Rat','assets/images/rat-champagne.jpg', 1, 1);

INSERT INTO seen (user_id, streetArt_id) VALUES (1, 1);
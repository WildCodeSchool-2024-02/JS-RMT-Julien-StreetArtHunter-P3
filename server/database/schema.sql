-- SQLBook: Code
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pseudo VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    points INT DEFAULT 0,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE city (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    points INT DEFAULT 0
);

CREATE TABLE artist ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    points INT DEFAULT 0 
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE streetart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    geolocation_x DECIMAL(10, 6) NOT NULL,
    geolocation_y DECIMAL(9, 6) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    image_alt VARCHAR(255),
    points INT DEFAULT 0,
    city_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    artist_id INT,
    category_id INT,
    FOREIGN KEY (city_id) REFERENCES city (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (artist_id) REFERENCES artist (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE seen (
    user_id INT,
    streetart_id INT,
    points INT,
    PRIMARY KEY (user_id, streetart_id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (streetart_id) REFERENCES streetart (id) ON DELETE CASCADE
);

INSERT INTO city (name) VALUES ('Paris');

INSERT INTO city (name) VALUES ('Lisbon');

INSERT INTO city (name) VALUES ('Madrid');

INSERT INTO city (name) VALUES ('Bordeaux');

INSERT INTO city (name) VALUES ('Bangkok');

INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'john_doe',
        'johndoe@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        1
    );

INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'jean_french',
        'jeanfrench@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );

INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
    INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina1@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina2@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
    INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina3@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
    INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina4@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
    INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina5@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
    INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina6@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
    INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina7@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
    INSERT INTO
    user (
        pseudo,
        email,
        password,
        is_admin
    )
VALUES (
        'juana_latina',
        'juanalatina8@yopmail.com',
        '$argon2id$v=19$m=19456,t=2,p=1$IJmFzYqJmmkkJP2FaKwKRw$PKh00nB9Si9vaZ2I/xgzsRqtb4skuPLChhJNCWeizNc',
        0
    );
INSERT INTO artist (name) VALUES ('Banksy');

INSERT INTO artist (name) VALUES ('Os Gêmeos');

INSERT INTO artist (name) VALUES ('Invader');

INSERT INTO artist (name) VALUES ('C215');

INSERT INTO artist (name) VALUES ('Jef Aérosol');

INSERT INTO artist (name) VALUES ('Paola Delfin');

INSERT INTO artist (name) VALUES ('Okuda');

INSERT INTO
    streetart (
        title,
        description,
        image_url,
        city_id,
        artist_id,
        geolocation_x,
        geolocation_y
    )
VALUES (
        'Chuuuttt',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum non odio scelerisque vestibulum. Aliquam auctor mauris quis vestibulum hendrerit. Aliquam nec sapien id quam porta varius at vitae mauris. Ut elementum velit vel nulla mollis, et tincidunt eros tempus. Praesent finibus nunc sit amet ligula pharetra mattis. Aliquam erat volutpat. In a elit ac justo sodales vulputate. Aenean eget arcu a elit facilisis blandit quis at augue. Aenean fringilla urna vitae eleifend iaculis. Nullam vulputate tellus ut mattis ornare. Mauris at nunc aliquam, auctor ipsum sodales, ullamcorper dolor.',
        'assets/streetarts/Chuuuttt.jpg',
        1,
        5,
        2.287592,
        48.862725
    );

INSERT INTO
    streetart (
        title,
        description,
        image_url,
        city_id,
        artist_id,
        geolocation_x,
        geolocation_y
    )
VALUES (
        'Amor com as Mulheres',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum non odio scelerisque vestibulum. Aliquam auctor mauris quis vestibulum hendrerit. Aliquam nec sapien id quam porta varius at vitae mauris. Ut elementum velit vel nulla mollis, et tincidunt eros tempus. Praesent finibus nunc sit amet ligula pharetra mattis. Aliquam erat volutpat. In a elit ac justo sodales vulputate. Aenean eget arcu a elit facilisis blandit quis at augue. Aenean fringilla urna vitae eleifend iaculis. Nullam vulputate tellus ut mattis ornare. Mauris at nunc aliquam, auctor ipsum sodales, ullamcorper dolor.',
        'assets/streetarts/amor-com-as-mulheres.jpg',
        3,
        7,
        2.421488873012425,
        48.817102111250094
    );

INSERT INTO
    streetart (
        title,
        description,
        image_url,
        city_id,
        artist_id,
        geolocation_x,
        geolocation_y
    )
VALUES (
        'The cat',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum non odio scelerisque vestibulum. Aliquam auctor mauris quis vestibulum hendrerit. Aliquam nec sapien id quam porta varius at vitae mauris. Ut elementum velit vel nulla mollis, et tincidunt eros tempus. Praesent finibus nunc sit amet ligula pharetra mattis. Aliquam erat volutpat. In a elit ac justo sodales vulputate. Aenean eget arcu a elit facilisis blandit quis at augue. Aenean fringilla urna vitae eleifend iaculis. Nullam vulputate tellus ut mattis ornare. Mauris at nunc aliquam, auctor ipsum sodales, ullamcorper dolor.',
        'assets/streetarts/the-cat.jpg',
        1,
        4,
        2.317891232021214,
        48.76220516624343
    );

INSERT INTO
    streetart (
        title,
        description,
        image_url,
        city_id,
        artist_id,
        geolocation_x,
        geolocation_y
    )
VALUES (
        'Champagne Rat',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum non odio scelerisque vestibulum. Aliquam auctor mauris quis vestibulum hendrerit. Aliquam nec sapien id quam porta varius at vitae mauris. Ut elementum velit vel nulla mollis, et tincidunt eros tempus. Praesent finibus nunc sit amet ligula pharetra mattis. Aliquam erat volutpat. In a elit ac justo sodales vulputate. Aenean eget arcu a elit facilisis blandit quis at augue. Aenean fringilla urna vitae eleifend iaculis. Nullam vulputate tellus ut mattis ornare. Mauris at nunc aliquam, auctor ipsum sodales, ullamcorper dolor.',
        'assets/streetarts/rat-champagne.jpg',
        1,
        1,
        -3.698358,
        40.410928
    );

INSERT INTO
    streetart (
        title,
        description,
        image_url,
        city_id,
        artist_id,
        geolocation_x,
        geolocation_y
    )
VALUES (
        'Petite fille, espoir',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum non odio scelerisque vestibulum. Aliquam auctor mauris quis vestibulum hendrerit. Aliquam nec sapien id quam porta varius at vitae mauris. Ut elementum velit vel nulla mollis, et tincidunt eros tempus. Praesent finibus nunc sit amet ligula pharetra mattis. Aliquam erat volutpat. In a elit ac justo sodales vulputate. Aenean eget arcu a elit facilisis blandit quis at augue. Aenean fringilla urna vitae eleifend iaculis. Nullam vulputate tellus ut mattis ornare. Mauris at nunc aliquam, auctor ipsum sodales, ullamcorper dolor.',
        'assets/streetarts/petite-fille-espoir.jpg',
        4,
        5,
        -0.6032733,
        44.830324
    );

INSERT INTO seen (user_id, streetart_id, points) VALUES (1, 1, 20);

INSERT INTO category (title) VALUES ('Graffiti');
INSERT INTO category (title) VALUES ('Pochoirs');
INSERT INTO category (title) VALUES ('Mosaïques');
INSERT INTO category (title) VALUES ('Sculptures et installations urbaines');
INSERT INTO category (title) VALUES ('Fresques murales');
INSERT INTO category (title) VALUES ('Street art 3D');
INSERT INTO category (title) VALUES ('Stickering');
INSERT INTO category (title) VALUES ('Art activiste');
INSERT INTO category (title) VALUES ('Yarn bombing');


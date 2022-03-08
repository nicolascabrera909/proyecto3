CREATE DATABASE udenavybd;
CREATE USER 'udeuser'@'%' IDENTIFIED BY 'udepass';
GRANT ALL PRIVILEGES ON udenavybd.* TO udeuser@'%';
USE udenavybd;
CREATE TABLE version (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  version VARCHAR(10) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp
);
INSERT INTO version (id, version)
  VALUES (1, '0.1');




USE udenavybd;

CREATE TABLE difficulty (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	multiMap INT,
	multiLife INT,
	multiPower INT,
	multiVisibility INT,
	multiSpeed INT,
	multiDistance INT,
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE game (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	difficulty_id INT,
	FOREIGN KEY (difficulty_id) REFERENCES difficulty(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE mapa (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	game_id INT,
	heigth INT,
	width INT,
	FOREIGN KEY (game_id) REFERENCES game(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);



CREATE TABLE player (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(20),
	game_id INT,
	FOREIGN KEY (game_id) REFERENCES game(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);



CREATE TABLE ship (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	player_id INT,
	positionX INT,
	positionY INT,
	rotation INT,
	boatLife INT,
	boatType varchar(20),
	FOREIGN KEY (player_id) REFERENCES player(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE freighters (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ship_id INT,
	FOREIGN KEY (ship_id) REFERENCES ship(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE destructor (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ship_id INT,
	FOREIGN KEY (ship_id) REFERENCES ship(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE submarine (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ship_id INT,
	s_depth INT,
	FOREIGN KEY (ship_id) REFERENCES ship(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE cannon (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ship_id INT,
	c_cantidad INT,
	FOREIGN KEY (ship_id) REFERENCES ship(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE depth_charge (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	destructor_id INT,
	dp_time INT,
	dp_depth INT,
	FOREIGN KEY (destructor_id) REFERENCES destructor(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE torpedo (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	submarine_id INT,
	t_cantidad
	FOREIGN KEY (submarine_id) REFERENCES submarine(id),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);
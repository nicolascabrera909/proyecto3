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

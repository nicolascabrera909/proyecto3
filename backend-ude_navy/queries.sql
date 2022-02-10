CREATE DATABASE udenavybd;

USE udenavybd;

-- TABLE Version
CREATE TABLE version (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  version VARCHAR(10) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp
);

INSERT INTO version (id, numero)
  VALUES (1, '0.1');

-- SELECTS
SELECT * FROM udenavybd.version;
DELETE FROM udenavybd.version;
-- DROPS
DROP table udenavybd.version;
-- DROP DB
DROP database udenavybd;

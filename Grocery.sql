SELECT database();


-- CREATING TABLES

-- ADDDRESS
CREATE TABLE address (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  	line1 VARCHAR(50) NOT NULL,
  	line2 VARCHAR(50) NOT NULL,
  	city VARCHAR(50) NOT NULL,
  	state VARCHAR(50) NOT NULL,
  	pincode VARCHAR(16) NOT NULL,
  	landmark VARCHAR(50),
  	created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  	deleted_at DATETIME DEFAULT NULL
);
INSERT INTO address (line1, line2, city, state, pincode, landmark ) VALUES ("28h","def road", "delhi", "NCR","450016", "Red fort");

SELECT *, BIN_TO_UUID(id) FROM address;


-- USERS
CREATE TABLE users (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    phno VARCHAR(15) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    isVerified BOOL DEFAULT false,
    address_id BINARY(16) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  	deleted_at DATETIME DEFAULT NULL,
    CONSTRAINT email_validation CHECK (
        email REGEXP '^[a-zA-Z0-9][a-zA-Z0-9.!#$%&''*+/=?^_`{|}~]*[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$'
    ),
    CONSTRAINT fk_user_address FOREIGN KEY (address_id) REFERENCES address(id)
);
ALTER TABLE users
ADD COLUMN role ENUM('user', 'seller') NOT NULL DEFAULT 'user';

INSERT INTO users (username, email, phno, user_password, address_id) VALUES ("hadi ahmed", "abcD@gmail.com", "123456", "password", UUID_TO_BIN('a37a7d78-2729-11f0-992f-7412b3a4a495'));


SELECT *,BIN_TO_UUID(id) as uid FROM users;
SELECT * FROM users WHERE id=UUID_TO_BIN('f318b6a2-272d-11f0-992f-7412b3a4a495');


-- PRODUCT
CREATE TABLE products (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  	seller_id BINARY(16) NOT NULL, --
  	name VARCHAR(50) NOT NULL, --
  	mrp DECIMAL(8,2) NOT NULL, --
  	discount_percent DECIMAL(4,2) DEFAULT 0,
  	quantity SMALLINT UNSIGNED DEFAULT 1,
    unit ENUM('piece','units','kg','g','mg','lb','ml','l') DEFAULT 'units',
  	photo VARCHAR(255) DEFAULT NULL,
  	description VARCHAR(255) DEFAULT NULL,
  	stock INT UNSIGNED DEFAULT 0,
  	address_id BINARY(16) DEFAULT NULL,
  	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  	deleted_at DATETIME DEFAULT NULL,
  	CONSTRAINT fk_products_user FOREIGN KEY (seller_id) REFERENCES users(id),
  	CONSTRAINT fk_products_address FOREIGN KEY (address_id) REFERENCES address(id),
  	CONSTRAINT positive_discount CHECK (discount_percent >=0),
  	CONSTRAINT positive_mrp CHECK (mrp>0)
);

DESCRIBE users;


DELIMITER //

CREATE TRIGGER check_seller_role
BEFORE INSERT ON products
FOR EACH ROW
BEGIN
  DECLARE sellerRole VARCHAR(10);
  IF NOT EXISTS (
    SELECT 1 FROM users WHERE id = NEW.seller_id
  ) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid seller_id: user not found';
  ELSE
    SELECT role INTO sellerRole FROM users WHERE id = NEW.seller_id;
    IF sellerRole != 'seller' THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'seller_id must reference a user with role = "seller"';
    END IF;
  END IF;
END;
//

DELIMITER ;

SHOW Triggers;

INSERT INTO products(seller_id, name,mrp) VALUES (UUID_TO_BIN('efdc1474-2740-11f0-992f-7412b3a4a495'), 'soap', 50);

SELECT * FROM products;
  
SHOW WARNINGS;
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
SELECT database();
SHOW TABLES;

DESC users;
SELECT * FROM users;
  
DESC products;
SELECT * FROM products p ;

DESC cartitems;
SELECT * FROM 
cartitems c JOIN users u 
ON c.user_id = u.id;

DESC address;
SELECT * FROM address;

DESC orderitems;
SELECT * FROM orderitems;

DESC orders;
SELECT * FROM orders;

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
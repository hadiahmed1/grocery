SELECT database();
SHOW TABLES;

DESC users;
SELECT * FROM users u JOin cartitem c
ON u.id = c.user_id
JOIN products p ON p.id = c.product_id
WHERE u.id  = "66083832-9c63-47a6-aa92-5942c8ed9b60";

DESC products;
SELECT * FROM products p ;

DESC cartitems;
SELECT * FROM 
cartitems c;
-- WHERE id = "b39898e6-9e0a-4bd9-9bd2-32078b3d2b93";
-- JOIN users u 
-- ON c.user_id = u.id;

DESC address;
SELECT * FROM address
WHERE user_id = "585d8e2a-6862-4e83-815c-81ddc1dd59fb";

DESC orderitems;
SELECT * FROM orderitems;

DESC orders;
SELECT * FROM orders;

-- GET CART

SELECT * FROM 
cartitems c JOIN products p 
ON c.product_id = p.id;

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
SELECT database();
SHOW TABLES;

DESC users;
SELECT * FROM users u ;
SELECT  
c.id, c.product_id, c.count, c.createdAt, c.updatedAt, c.deletedAt ,p.name, p.mrp, p.mrp,p.discount_percent ,p.quantity, p.unit, p.photo 
FROM cartitems c
JOIN products p ON p.id = c.product_id
WHERE c.deletedAt IS NULL;

DESC products;
SELECT * FROM products p ;

DESC cartitems;

SELECT * FROM 
cartitems c 
JOIN users u 
ON c.user_id = u.id;

DESC address;
SELECT * FROM address
WHERE user_id = "85aefd18-2d04-4065-983d-a9601bedde23";

DESC orderitems;
SELECT * FROM orderitems;

DESC orders;
SELECT * FROM orders;

SELECT * FROM reviews r ;

-- Order toatal
SELECT o.id,o.status, o.delivery_date, o.createdAt, 
SUM(oi.price) as total  FROM 
orders o JOIN orderitems oi
ON o.id = oi.order_id
WHERE o.user_id = "85aefd18-2d04-4065-983d-a9601bedde23"
GROUP BY o.id;
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
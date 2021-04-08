INSERT INTO jobs (id, company, experience, country, position, wage)
VALUES
  (1, 'Amazon', '3', 'USA', 'software engineer', 170000),
  (2, 'Google', '2', 'USA', 'data scientist', 150000),
  (3, 'Microsoft', '2', 'USA', 'software engineer', 135000),
  (4, 'Oracle', '1', 'USA', 'app developer', 130000),
  (5, 'Paypal', '1', 'USA', 'backend developer', 125000); 

  ALTER SEQUENCE jobs RESTART WITH 12;  


DROP TABLE IF EXISTS jobs;

CREATE TABLE heroku_2793bc343638f0e.jobs (
    id int(120) DEFAULT NULL, AUTO_INCREMENT
    company text(100) NOT NULL,
    experience int(250) NOT NULL,
    country text(100) NOT NULL,
    position text(100) NOT NULL,
    wage int(100000) NOT NULL,
    PRIMARY KEY (`id`)
); ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO heroku_2793bc343638f0e.jobs (id, company, experience, country, position, wage) 
VALUES 
(1, 'Amazon', '3', 'USA', 'software engineer', 170000),
(2, 'Google', '2', 'USA', 'data scientist', 150000),
(3, 'Microsoft', '2', 'USA', 'software engineer', 135000),
(4, 'Oracle', '1', 'USA', 'app developer', 130000),
(5, 'Paypal', '1', 'USA', 'backend developer', 125000); 


CREATE TABLE jobs (
    id int(120) DEFAULT NULL, AUTO_INCREMENT
    company text(100) NOT NULL,
    experience int(200) NOT NULL,
    country text(100) NOT NULL,
    position text(100) NOT NULL,
    wage int(200) NOT NULL,
    PRIMARY KEY (`id`)
); ENGINE=InnoDB DEFAULT CHARSET=utf8;
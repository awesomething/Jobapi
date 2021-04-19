

CREATE TABLE jobs (
    id int(120) DEFAULT NULL, AUTO_INCREMENT
    company text(100) NOT NULL,
    experience int(250) NOT NULL,
    country text(100) NOT NULL,
    position text(100) NOT NULL,
    wage int(100000) NOT NULL,
    PRIMARY KEY (`id`)
);

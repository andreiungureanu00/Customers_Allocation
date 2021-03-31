CREATE DATABASE IF NOT EXISTS `customers_alloc`;
use customers_alloc;

CREATE table if not exists `projects` (
    `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `project_name` varchar(100) NOT NULL UNIQUE,
    `start_date` datetime,
    `planned_end_date` datetime,
    `description` varchar(500),
    `project_code` varchar(50) NOT NULL UNIQUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `employees` (
    `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `hire_date` datetime,
    `salary` int(10),
    `job_title` varchar(70),
    `project_id` int (11) NOT NULL,
    FOREIGN KEY (`project_id`) REFERENCES projects(`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;



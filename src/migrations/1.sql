CREATE TABLE `users`  (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `service` varchar(255) NOT NULL,
    `origin_id` int(10) NOT NULL,
    `email` varchar(255) NULL,
    `first_name` varchar(255) NULL,
    `last_name` varchar(255) NULL,
    `avatar` text NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY (`service`, `origin_id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci;

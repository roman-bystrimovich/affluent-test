CREATE TABLE `affluent`.`stats`  (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `date` date NOT NULL UNIQUE,
    `commissions_total` float(10, 0) UNSIGNED NULL DEFAULT 0,
    `sales_net` int(10) UNSIGNED NULL DEFAULT 0,
    `leads_net` int(10) UNSIGNED NULL DEFAULT 0,
    `clicks` int(10) UNSIGNED NULL DEFAULT 0,
    `epc` float(10, 0) UNSIGNED NULL DEFAULT 0,
    `impressions` float(10, 0) UNSIGNED NULL DEFAULT 0,
    `cr` float(10, 0) UNSIGNED NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci;;

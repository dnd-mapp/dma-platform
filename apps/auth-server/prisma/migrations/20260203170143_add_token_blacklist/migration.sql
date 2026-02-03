-- CreateTable
CREATE TABLE `token_blacklist` (
    `jti` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`jti`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

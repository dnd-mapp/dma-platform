-- CreateTable
CREATE TABLE `authorization_transactions` (
    `id` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `nonce` VARCHAR(191) NOT NULL,
    `code_challenge` VARCHAR(191) NOT NULL,
    `login_challenge` VARCHAR(191) NOT NULL,
    `client_id` VARCHAR(191) NOT NULL,
    `authorization_code` VARCHAR(191) NULL,
    `authorization_code_expiry` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `authorization_transactions` ADD CONSTRAINT `fk_client_authorization_transaction` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

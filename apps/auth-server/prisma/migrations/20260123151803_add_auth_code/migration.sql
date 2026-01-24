-- AlterTable
ALTER TABLE `auth_transactions` ADD COLUMN `auth_code` VARCHAR(191) NULL,
    ADD COLUMN `auth_code_expiry` DATETIME(3) NULL;

/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `familyId` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `tokenHash` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `refresh_tokens` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - The required column `family_id` was added to the `refresh_tokens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `token_hash` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `refresh_tokens` DROP FOREIGN KEY `fk_user_refresh_token`;

-- DropIndex
DROP INDEX `fk_user_refresh_token` ON `refresh_tokens`;

-- AlterTable
ALTER TABLE `auth_transactions` ADD COLUMN `user_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `refresh_tokens` DROP COLUMN `expiresAt`,
    DROP COLUMN `familyId`,
    DROP COLUMN `tokenHash`,
    DROP COLUMN `userId`,
    ADD COLUMN `expires_at` DATETIME(3) NOT NULL,
    ADD COLUMN `family_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `token_hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `auth_transactions` ADD CONSTRAINT `fk_user_auth_transaction` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `fk_user_refresh_token` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

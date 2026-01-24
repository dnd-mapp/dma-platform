/*
  Warnings:

  - Added the required column `redirectUrl` to the `auth_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auth_transactions` ADD COLUMN `redirectUrl` VARCHAR(191) NOT NULL;

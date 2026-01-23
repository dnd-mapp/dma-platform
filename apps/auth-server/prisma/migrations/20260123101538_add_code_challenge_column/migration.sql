/*
  Warnings:

  - Added the required column `code_challenge` to the `auth_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auth_transactions` ADD COLUMN `code_challenge` VARCHAR(191) NOT NULL;

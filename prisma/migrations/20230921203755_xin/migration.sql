/*
  Warnings:

  - Made the column `email` on table `Clientes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Clientes` MODIFY `email` VARCHAR(191) NOT NULL;

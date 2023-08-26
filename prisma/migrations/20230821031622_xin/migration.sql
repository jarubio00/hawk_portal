/*
  Warnings:

  - Added the required column `clienteId` to the `CobrosCortes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CobrosCortes` ADD COLUMN `clienteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CobrosCortes` ADD CONSTRAINT `CobrosCortes_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

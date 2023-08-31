/*
  Warnings:

  - You are about to alter the column `clientId` on the `KommoSync` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Int`.

*/
-- AlterTable
ALTER TABLE `KommoSync` MODIFY `clientId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `KommoSync` ADD CONSTRAINT `KommoSync_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

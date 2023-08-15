/*
  Warnings:

  - You are about to drop the column `clienteId` on the `ClientesChecklist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clienteEmail]` on the table `ClientesChecklist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clienteEmail` to the `ClientesChecklist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ClientesChecklist` DROP FOREIGN KEY `ClientesChecklist_clienteId_fkey`;

-- AlterTable
ALTER TABLE `ClientesChecklist` DROP COLUMN `clienteId`,
    ADD COLUMN `clienteEmail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ClientesChecklist_clienteEmail_key` ON `ClientesChecklist`(`clienteEmail`);

-- AddForeignKey
ALTER TABLE `ClientesChecklist` ADD CONSTRAINT `ClientesChecklist_clienteEmail_fkey` FOREIGN KEY (`clienteEmail`) REFERENCES `Clientes`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

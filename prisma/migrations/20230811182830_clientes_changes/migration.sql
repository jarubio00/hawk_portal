/*
  Warnings:

  - You are about to drop the column `correoVerificado` on the `Clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Clientes` DROP COLUMN `correoVerificado`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `disabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `disabledAt` DATETIME(3) NULL,
    ADD COLUMN `disabledBy` INTEGER NULL,
    ADD COLUMN `passwordType` VARCHAR(191) NOT NULL DEFAULT 'bcrypt';

-- CreateTable
CREATE TABLE `ClientesChecklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `correoVerificado` BOOLEAN NOT NULL DEFAULT true,
    `correoVerificadoAt` DATETIME(3) NOT NULL DEFAULT (NOW()),
    `celularVerificado` BOOLEAN NOT NULL DEFAULT true,
    `celularVerificadoAt` DATETIME(3) NOT NULL DEFAULT (NOW()),
    `tutorialTomado` BOOLEAN NOT NULL DEFAULT true,
    `tutorialTomadoAt` DATETIME(3) NULL,
    `firstLogin` BOOLEAN NOT NULL DEFAULT false,
    `firstLoginAt` DATETIME(3) NULL,
    `clienteV2` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientesChecklist` ADD CONSTRAINT `ClientesChecklist_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

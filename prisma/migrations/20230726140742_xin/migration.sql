-- AlterTable
ALTER TABLE `Clientes` ADD COLUMN `celular` VARCHAR(191) NULL,
    ADD COLUMN `whatsappEnabled` BOOLEAN NULL DEFAULT false;

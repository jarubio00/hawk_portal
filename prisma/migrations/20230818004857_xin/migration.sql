-- AlterTable
ALTER TABLE `Misdirecciones` ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `icon` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Recolecciones` ADD COLUMN `direccionId` INTEGER NULL;

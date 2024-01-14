/*
  Warnings:

  - Added the required column `corteId` to the `PrintBatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PrintBatch` ADD COLUMN `corteId` INTEGER NOT NULL,
    ADD COLUMN `printed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `printedAt` DATETIME(3) NULL,
    ALTER COLUMN `printer` DROP DEFAULT;

-- CreateTable
CREATE TABLE `PrintCorte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `fecha` DATE NOT NULL,
    `bloque` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrintBatch` ADD CONSTRAINT `PrintBatch_corteId_fkey` FOREIGN KEY (`corteId`) REFERENCES `PrintCorte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

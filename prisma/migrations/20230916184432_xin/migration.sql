/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `CatalogoCodigosPostales` will be added. If there are existing duplicate values, this will fail.
  - Made the column `rutaId` on table `CatalogoCodigosPostales` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `CatalogoCodigosPostales` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1,
    MODIFY `rutaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CatalogoColonias` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `CatalogoMunicipios` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `CatalalogoRutas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CatalogoCodigosPostales_id_key` ON `CatalogoCodigosPostales`(`id`);

-- AddForeignKey
ALTER TABLE `CatalogoCodigosPostales` ADD CONSTRAINT `CatalogoCodigosPostales_rutaId_fkey` FOREIGN KEY (`rutaId`) REFERENCES `CatalalogoRutas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `CatalogoCodigosPostales` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `CatalogoColonias` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `CatalogoMunicipios` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

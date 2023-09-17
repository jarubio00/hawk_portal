-- AlterTable
ALTER TABLE `CatalogoUsuariosAreas` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `CatalogoUsuariosDepartamentos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `CatalogoUsuariosEmpresas` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

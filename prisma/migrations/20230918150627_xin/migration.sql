-- AlterTable
ALTER TABLE `CatalogoProductos` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT (now());

-- AlterTable
ALTER TABLE `CatalogoTiposPaquetes` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 1;

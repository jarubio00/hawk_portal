/*
  Warnings:

  - You are about to drop the column `categoria` on the `Clientes` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `Clientes` table. All the data in the column will be lost.
  - You are about to drop the `CatalalogoCategoriasClientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoNivelesCLientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Clientes` DROP COLUMN `categoria`,
    DROP COLUMN `nivel`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `nivelId` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `CatalalogoCategoriasClientes`;

-- DropTable
DROP TABLE `CatalogoNivelesCLientes`;

-- CreateTable
CREATE TABLE `CatalogoNivelesClientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nivel` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `puntos` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoCategoriasClientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clientes` ADD CONSTRAINT `Clientes_nivelId_fkey` FOREIGN KEY (`nivelId`) REFERENCES `CatalogoNivelesClientes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clientes` ADD CONSTRAINT `Clientes_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `CatalogoCategoriasClientes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

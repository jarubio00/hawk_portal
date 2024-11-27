/*
  Warnings:

  - Added the required column `categoriaId` to the `CatalogoActividadOperaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ActividadOperaciones` MODIFY `pedidoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `CatalogoActividadOperaciones` ADD COLUMN `categoriaId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CatalogoCategoriasActividadOperaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CatalogoActividadOperaciones` ADD CONSTRAINT `CatalogoActividadOperaciones_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `CatalogoCategoriasActividadOperaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

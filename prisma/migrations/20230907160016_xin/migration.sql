/*
  Warnings:

  - Added the required column `empresaId` to the `CatalogoUsuariosAreas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaId` to the `CatalogoUsuariosDepartamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CatalogoUsuariosAreas` ADD COLUMN `empresaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CatalogoUsuariosDepartamentos` ADD COLUMN `areaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CatalogoUsuariosAreas` ADD CONSTRAINT `CatalogoUsuariosAreas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `CatalogoUsuariosEmpresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatalogoUsuariosDepartamentos` ADD CONSTRAINT `CatalogoUsuariosDepartamentos_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `CatalogoUsuariosAreas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

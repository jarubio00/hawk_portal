/*
  Warnings:

  - Added the required column `rol` to the `UsuariosHawk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Operadores` ADD COLUMN `areaId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `departamentoId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `empresaId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `tipoId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `UsuariosHawk` ADD COLUMN `rol` ENUM('superUser', 'admin', 'user') NOT NULL;

-- AddForeignKey
ALTER TABLE `Operadores` ADD CONSTRAINT `Operadores_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `CatalogoUsuariosEmpresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operadores` ADD CONSTRAINT `Operadores_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `CatalogoUsuariosAreas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operadores` ADD CONSTRAINT `Operadores_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `CatalogoUsuariosDepartamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operadores` ADD CONSTRAINT `Operadores_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoUsuariosTipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

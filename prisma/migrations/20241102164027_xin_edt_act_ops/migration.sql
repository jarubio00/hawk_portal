/*
  Warnings:

  - You are about to drop the column `tipo` on the `CatalogoActividadOperaciones` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `CatalogoCategoriasActividadOperaciones` table. All the data in the column will be lost.
  - Added the required column `actividad` to the `CatalogoActividadOperaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria` to the `CatalogoCategoriasActividadOperaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CatalogoActividadOperaciones` DROP COLUMN `tipo`,
    ADD COLUMN `actividad` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `CatalogoCategoriasActividadOperaciones` DROP COLUMN `tipo`,
    ADD COLUMN `categoria` VARCHAR(191) NOT NULL;

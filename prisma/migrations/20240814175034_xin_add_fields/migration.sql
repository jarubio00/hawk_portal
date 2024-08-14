/*
  Warnings:

  - You are about to drop the column `color` on the `CatalogoActividadOperaciones` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `CatalogoActividadOperaciones` table. All the data in the column will be lost.
  - Added the required column `clave` to the `CatalogoActividadOperaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CatalogoActividadOperaciones` DROP COLUMN `color`,
    DROP COLUMN `icon`,
    ADD COLUMN `clave` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Pedidos` ADD COLUMN `bloqueEntregaOriginal` INTEGER NULL,
    ADD COLUMN `entregaActualizada` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `fechaEntregaOriginal` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `RecoleccionesHistory` ADD COLUMN `bloqueOriginal` INTEGER NULL,
    ADD COLUMN `fechaOriginal` DATETIME(3) NULL,
    ADD COLUMN `recoleccionActualizada` BOOLEAN NOT NULL DEFAULT false;

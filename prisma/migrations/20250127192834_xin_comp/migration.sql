/*
  Warnings:

  - You are about to alter the column `comprobante_req` on the `NacionalCatalogoMetodosPago` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `NacionalCatalogoMetodosPago` MODIFY `comprobante_req` BOOLEAN NOT NULL DEFAULT false;

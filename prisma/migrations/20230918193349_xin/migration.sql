/*
  Warnings:

  - You are about to drop the column `zonaId` on the `CatalogoCodigosPostales` table. All the data in the column will be lost.
  - Made the column `coberturaId` on table `CatalogoCodigosPostales` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `CatalogoCodigosPostales` DROP COLUMN `zonaId`,
    MODIFY `coberturaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CatalogoCodigosPostales` ADD CONSTRAINT `CatalogoCodigosPostales_coberturaId_fkey` FOREIGN KEY (`coberturaId`) REFERENCES `CatalogoCoberturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

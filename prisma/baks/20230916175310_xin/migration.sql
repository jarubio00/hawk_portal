/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `CatalogoCodigosPostales` will be added. If there are existing duplicate values, this will fail.
  - Made the column `rutaId` on table `CatalogoCodigosPostales` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `CatalogoCodigosPostales` MODIFY `rutaId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CatalogoCodigosPostales_id_key` ON `CatalogoCodigosPostales`(`id`);

-- AddForeignKey
ALTER TABLE `CatalogoCodigosPostales` ADD CONSTRAINT `CatalogoCodigosPostales_rutaId_fkey` FOREIGN KEY (`rutaId`) REFERENCES `CatalalogoRutas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

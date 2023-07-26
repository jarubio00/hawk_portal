/*
  Warnings:

  - You are about to drop the column `cobros` on the `Clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Clientes` DROP COLUMN `cobros`,
    ADD COLUMN `cobrosPermitidos` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CobrosDestino` ADD COLUMN `retornoComprobanteUrl` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `CobrosDestino` ADD CONSTRAINT `CobrosDestino_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CobrosDestino` ADD CONSTRAINT `CobrosDestino_estatusCobroId_fkey` FOREIGN KEY (`estatusCobroId`) REFERENCES `CatalogoEstatusCobros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CobrosDestino` ADD CONSTRAINT `CobrosDestino_estatusPagoCobroId_fkey` FOREIGN KEY (`estatusPagoCobroId`) REFERENCES `CatalogoEstatusPagoCobros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CobrosDestino` ADD CONSTRAINT `CobrosDestino_retornoFormaId_fkey` FOREIGN KEY (`retornoFormaId`) REFERENCES `CatalogoTiposRetornoCobros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

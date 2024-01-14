/*
  Warnings:

  - You are about to drop the `_PedidoHistoryToRecoleccionHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PedidosHistory` DROP FOREIGN KEY `PedidosHistory_recoleccionId_fkey`;

-- DropForeignKey
ALTER TABLE `_PedidoHistoryToRecoleccionHistory` DROP FOREIGN KEY `_PedidoHistoryToRecoleccionHistory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PedidoHistoryToRecoleccionHistory` DROP FOREIGN KEY `_PedidoHistoryToRecoleccionHistory_B_fkey`;

-- DropTable
DROP TABLE `_PedidoHistoryToRecoleccionHistory`;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_recoleccionId_fkey` FOREIGN KEY (`recoleccionId`) REFERENCES `RecoleccionesHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

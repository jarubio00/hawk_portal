/*
  Warnings:

  - You are about to drop the column `printCorte` on the `Pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `printMCorte` on the `Pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `printCorte` on the `PedidosHistory` table. All the data in the column will be lost.
  - You are about to drop the column `printMCorte` on the `PedidosHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Pedidos` DROP COLUMN `printCorte`,
    DROP COLUMN `printMCorte`,
    ADD COLUMN `printBatchId` INTEGER NULL,
    ADD COLUMN `printBatchNumber` INTEGER NULL,
    ADD COLUMN `printed` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `PedidosHistory` DROP COLUMN `printCorte`,
    DROP COLUMN `printMCorte`,
    ADD COLUMN `printBatchId` INTEGER NULL,
    ADD COLUMN `printBatchNumber` INTEGER NULL,
    ADD COLUMN `printed` BOOLEAN NULL;

-- CreateTable
CREATE TABLE `PrintBatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `status` ENUM('pendiente', 'imprimiendo', 'completado') NOT NULL DEFAULT 'pendiente',
    `fecha` DATE NOT NULL,
    `bloque` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_printBatchId_fkey` FOREIGN KEY (`printBatchId`) REFERENCES `PrintBatch`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

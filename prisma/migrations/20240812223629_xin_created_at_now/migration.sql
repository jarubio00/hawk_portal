-- AlterTable
ALTER TABLE `Pedidos` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT (now());

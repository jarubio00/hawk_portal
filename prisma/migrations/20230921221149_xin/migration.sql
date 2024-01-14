-- AlterTable
ALTER TABLE `Clientes` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT (now());

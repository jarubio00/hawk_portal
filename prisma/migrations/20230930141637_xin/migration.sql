-- AlterTable
ALTER TABLE `Pedidos` ADD COLUMN `batched` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `PedidosHistory` ADD COLUMN `batched` BOOLEAN NOT NULL DEFAULT false;

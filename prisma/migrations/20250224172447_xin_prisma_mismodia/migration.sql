-- AlterTable
ALTER TABLE `Clientes` ADD COLUMN `mismoDiaEnabled` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Pedidos` ADD COLUMN `mismoDia` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `mismoDiaPrecioVenta` DOUBLE NOT NULL DEFAULT 0;

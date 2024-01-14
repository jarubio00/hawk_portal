-- AlterTable
ALTER TABLE `Pedidos` MODIFY `entregaReferencias` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `PedidosHistory` MODIFY `entregaReferencias` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Recolecciones` MODIFY `referencias` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `RecoleccionesHistory` MODIFY `referencias` LONGTEXT NULL;

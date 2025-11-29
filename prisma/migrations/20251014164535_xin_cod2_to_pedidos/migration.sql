-- AddForeignKey
ALTER TABLE `Cod2Charge` ADD CONSTRAINT `Cod2Charge_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

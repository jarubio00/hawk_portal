-- AddForeignKey
ALTER TABLE `CobrosDestino` ADD CONSTRAINT `CobrosDestino_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

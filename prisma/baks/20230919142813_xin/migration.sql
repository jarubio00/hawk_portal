-- AddForeignKey
ALTER TABLE `Recolecciones` ADD CONSTRAINT `Recolecciones_cpId_fkey` FOREIGN KEY (`cpId`) REFERENCES `CatalogoCodigosPostales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_entregaCpId_fkey` FOREIGN KEY (`entregaCpId`) REFERENCES `CatalogoCodigosPostales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

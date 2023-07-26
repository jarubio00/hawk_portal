-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_entregaMunicipioId_fkey` FOREIGN KEY (`entregaMunicipioId`) REFERENCES `CatalogoMunicipios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_paqTipoId_fkey` FOREIGN KEY (`paqTipoId`) REFERENCES `CatalogoTiposPaquetes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

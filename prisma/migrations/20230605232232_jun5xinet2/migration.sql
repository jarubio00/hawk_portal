-- AddForeignKey
ALTER TABLE `Mispaquetes` ADD CONSTRAINT `Mispaquetes_paqTipoId_fkey` FOREIGN KEY (`paqTipoId`) REFERENCES `CatalogoTiposPaquetes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

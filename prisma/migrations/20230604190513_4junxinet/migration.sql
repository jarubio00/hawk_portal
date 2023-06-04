-- AddForeignKey
ALTER TABLE `Misdestinos` ADD CONSTRAINT `Misdestinos_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `CatalogoMunicipios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

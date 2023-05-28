-- AddForeignKey
ALTER TABLE `CatalogoColonias` ADD CONSTRAINT `CatalogoColonias_municipio_id_fkey` FOREIGN KEY (`municipio_id`) REFERENCES `CatalogoMunicipios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

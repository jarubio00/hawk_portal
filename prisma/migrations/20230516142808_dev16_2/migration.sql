-- DropForeignKey
ALTER TABLE `CatalogoColonias` DROP FOREIGN KEY `CatalogoColonias_municipio_id_fkey`;

-- AddForeignKey
ALTER TABLE `CatalogoCodigosPostales` ADD CONSTRAINT `CatalogoCodigosPostales_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `CatalogoMunicipios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

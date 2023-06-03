-- DropIndex
DROP INDEX `CatalogoColonias_municipio_id_fkey` ON `CatalogoColonias`;

-- AddForeignKey
ALTER TABLE `Misdirecciones` ADD CONSTRAINT `Misdirecciones_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `CatalogoMunicipios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

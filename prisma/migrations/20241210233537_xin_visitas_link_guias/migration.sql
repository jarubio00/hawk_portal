-- AlterTable
ALTER TABLE `CatalogoAppVisitaModsTipos` MODIFY `desc` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CatalogoAppVisitaTipo` MODIFY `desc` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `AppVisitaGuias` ADD CONSTRAINT `AppVisitaGuias_visitaUuid_fkey` FOREIGN KEY (`visitaUuid`) REFERENCES `AppVisita`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

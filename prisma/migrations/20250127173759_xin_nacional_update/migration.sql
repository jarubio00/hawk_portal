-- AlterTable
ALTER TABLE `NacionalCatalogoMetodosPago` ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `RecoleccionesNacionales` MODIFY `recolectorId` INTEGER NOT NULL DEFAULT 1;

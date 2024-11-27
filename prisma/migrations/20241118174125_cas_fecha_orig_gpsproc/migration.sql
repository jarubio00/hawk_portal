-- AlterTable
ALTER TABLE `Pedidos` ADD COLUMN `gpsEntregaFound` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `gpsEntregaProc` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isBloqueEntregaChanged` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isFechaEntregaChanged` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Recolecciones` ADD COLUMN `bloqueOriginal` INTEGER NULL,
    ADD COLUMN `fechaOriginal` DATETIME(3) NULL,
    ADD COLUMN `gpsFound` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `gpsProc` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isBloqueChanged` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isFechaChanged` BOOLEAN NOT NULL DEFAULT false;

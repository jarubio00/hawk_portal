-- AlterTable
ALTER TABLE `AvisoProgramacionContenido` MODIFY `desc` TEXT NULL,
    MODIFY `mobileBackgroundImage` TEXT NULL;

-- AlterTable
ALTER TABLE `AvisosProgramacion` ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `pausa` BOOLEAN NOT NULL DEFAULT false;

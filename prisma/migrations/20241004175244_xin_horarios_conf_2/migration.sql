-- AlterTable
ALTER TABLE `ConfiguracionHorarios` ADD COLUMN `bloque1GuiasLimitEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `bloque2GuiasLimitEnabled` BOOLEAN NOT NULL DEFAULT false;

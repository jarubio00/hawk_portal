-- AlterTable
ALTER TABLE `CatalogoCoberturas` ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT (now()),
    ADD COLUMN `createdBy` INTEGER NULL DEFAULT 1;

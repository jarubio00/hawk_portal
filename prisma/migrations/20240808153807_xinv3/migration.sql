-- AlterTable
ALTER TABLE `Pedidos` ADD COLUMN `migrated` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `migratedAt` DATETIME(3) NULL;

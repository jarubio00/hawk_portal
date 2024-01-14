-- AlterTable
ALTER TABLE `CatalogoColonias` MODIFY `tipo` VARCHAR(191) NULL DEFAULT 'default',
    MODIFY `custom` BOOLEAN NULL DEFAULT false,
    MODIFY `customCreatedAt` DATETIME(3) NULL;

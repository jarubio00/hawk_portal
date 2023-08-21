-- AlterTable
ALTER TABLE `CobrosDestino` ADD COLUMN `canceladoAt` DATETIME(3) NULL,
    ADD COLUMN `canceladoBy` INTEGER NULL,
    ADD COLUMN `confirmadoAt` DATETIME(3) NULL,
    ADD COLUMN `confirmadoBy` INTEGER NULL,
    ADD COLUMN `corteId` INTEGER NULL;

-- CreateTable
CREATE TABLE `CobrosCortes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatusRetornoId` INTEGER NOT NULL DEFAULT 1,
    `tipoRetornoId` INTEGER NOT NULL DEFAULT 1,
    `retornoAt` DATETIME(3) NULL,
    `retornoBy` INTEGER NULL,
    `comprobanteUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CobrosDestino` ADD CONSTRAINT `CobrosDestino_corteId_fkey` FOREIGN KEY (`corteId`) REFERENCES `CobrosCortes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CobrosCortes` ADD CONSTRAINT `CobrosCortes_estatusRetornoId_fkey` FOREIGN KEY (`estatusRetornoId`) REFERENCES `CatalogoEstatusPagoCobros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CobrosCortes` ADD CONSTRAINT `CobrosCortes_tipoRetornoId_fkey` FOREIGN KEY (`tipoRetornoId`) REFERENCES `CatalogoTiposRetornoCobros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

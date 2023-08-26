-- AlterTable
ALTER TABLE `Pedidos` ADD COLUMN `cobroDestinoCantidad` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `OperacionesActividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `tipoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoOperacionesActividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OperacionesActividad` ADD CONSTRAINT `OperacionesActividad_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoOperacionesActividad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

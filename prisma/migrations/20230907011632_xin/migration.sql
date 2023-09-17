/*
  Warnings:

  - You are about to drop the `CatalogoOperacionesActividad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OperacionesActividad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OperacionesActividad` DROP FOREIGN KEY `OperacionesActividad_tipoId_fkey`;

-- AlterTable
ALTER TABLE `CobrosCortes` MODIFY `comprobanteUrl` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `CobrosDestino` MODIFY `retornoComprobanteUrl` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Pedidos` MODIFY `comprobanteUrl` LONGTEXT NULL,
    MODIFY `labelImageUrl` LONGTEXT NULL,
    MODIFY `labelPdfUrl` LONGTEXT NULL;

-- DropTable
DROP TABLE `CatalogoOperacionesActividad`;

-- DropTable
DROP TABLE `OperacionesActividad`;

-- CreateTable
CREATE TABLE `ActividadOperaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `tipoId` INTEGER NOT NULL,
    `isChange` BOOLEAN NOT NULL DEFAULT false,
    `changeOld` LONGTEXT NULL,
    `changeNew` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActividadClientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `tipoId` INTEGER NOT NULL,
    `isChange` BOOLEAN NOT NULL DEFAULT false,
    `changeOld` LONGTEXT NULL,
    `changeNew` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppRoute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operadorId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isReceiving` BOOLEAN NOT NULL DEFAULT false,
    `receivedAt` DATETIME(3) NULL,
    `receivedBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppVisita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `routeId` INTEGER NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `pagoMonto` DOUBLE NOT NULL DEFAULT 0,
    `pagoFaltante` DOUBLE NOT NULL DEFAULT 0,
    `cobroMonto` DOUBLE NOT NULL DEFAULT 0,
    `isCanceled` BOOLEAN NOT NULL DEFAULT false,
    `canceledAt` DATETIME(3) NULL,
    `canceledBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppVisitaEventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `visitaId` INTEGER NULL,
    `visitaUuid` VARCHAR(191) NOT NULL,
    `tipoId` INTEGER NOT NULL,
    `pedidoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppVisitaEventosEvidencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventoUuid` VARCHAR(191) NOT NULL,
    `evidenciaUrl` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppVisitaEventosMods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventoUuid` VARCHAR(191) NOT NULL,
    `evidenciaUrl` LONGTEXT NULL,
    `tipoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoAppVisitaEventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoAppVisitaMods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoActividadOperaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoActividadClientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActividadOperaciones` ADD CONSTRAINT `ActividadOperaciones_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoActividadOperaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadOperaciones` ADD CONSTRAINT `ActividadOperaciones_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadClientes` ADD CONSTRAINT `ActividadClientes_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoActividadClientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppVisitaEventos` ADD CONSTRAINT `AppVisitaEventos_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoAppVisitaEventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppVisitaEventosMods` ADD CONSTRAINT `AppVisitaEventosMods_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoAppVisitaMods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

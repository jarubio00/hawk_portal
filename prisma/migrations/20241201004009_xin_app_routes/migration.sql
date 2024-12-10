/*
  Warnings:

  - You are about to drop the `AppVisitaEventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppVisitaEventosEvidencias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppVisitaEventosMods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoAppVisitaEventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoAppVisitaMods` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoId` to the `AppVisita` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AppVisitaEventos` DROP FOREIGN KEY `AppVisitaEventos_tipoId_fkey`;

-- DropForeignKey
ALTER TABLE `AppVisitaEventosMods` DROP FOREIGN KEY `AppVisitaEventosMods_tipoId_fkey`;

-- AlterTable
ALTER TABLE `AppRouteGuias` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `AppVisita` ADD COLUMN `tipoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `AppVisitaEventos`;

-- DropTable
DROP TABLE `AppVisitaEventosEvidencias`;

-- DropTable
DROP TABLE `AppVisitaEventosMods`;

-- DropTable
DROP TABLE `CatalogoAppVisitaEventos`;

-- DropTable
DROP TABLE `CatalogoAppVisitaMods`;

-- CreateTable
CREATE TABLE `AppVisitaGuias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitaId` INTEGER NULL,
    `visitaUuid` VARCHAR(191) NOT NULL,
    `pedidoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppVisitaEvidencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitaId` INTEGER NOT NULL,
    `visitaUuid` VARCHAR(191) NOT NULL,
    `evidenciaUrl` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppVisitaGuiaMods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `tipoId` INTEGER NOT NULL,
    `original` VARCHAR(191) NULL,
    `nuevo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoAppVisitaTipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoAppVisitaModsTipos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AppVisita` ADD CONSTRAINT `AppVisita_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoAppVisitaTipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppVisitaEvidencias` ADD CONSTRAINT `AppVisitaEvidencias_visitaId_fkey` FOREIGN KEY (`visitaId`) REFERENCES `AppVisita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppVisitaGuiaMods` ADD CONSTRAINT `AppVisitaGuiaMods_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoAppVisitaModsTipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

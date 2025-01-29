/*
  Warnings:

  - You are about to drop the `ActividadOperacionesNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoActividadOperacionesNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoCategoriasActividadOperacionesNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoEstatusPedidosNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoEstatusRecoleccionesNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoIncidenciaMotivoNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoIncidenciaTipoNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CatalogoMetodosPagoNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncidenciaFotoNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrintBatchNacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrintCorteNacional` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recolectorId` to the `RecoleccionesNacionales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ActividadOperacionesNacional` DROP FOREIGN KEY `ActividadOperacionesNacional_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `ActividadOperacionesNacional` DROP FOREIGN KEY `ActividadOperacionesNacional_pedidoId_fkey`;

-- DropForeignKey
ALTER TABLE `ActividadOperacionesNacional` DROP FOREIGN KEY `ActividadOperacionesNacional_tipoId_fkey`;

-- DropForeignKey
ALTER TABLE `CatalogoActividadOperacionesNacional` DROP FOREIGN KEY `CatalogoActividadOperacionesNacional_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `IncidenciaFotoNacional` DROP FOREIGN KEY `IncidenciaFotoNacional_incidenciaId_fkey`;

-- DropForeignKey
ALTER TABLE `IncidenciaNacional` DROP FOREIGN KEY `IncidenciaNacional_motivoId_fkey`;

-- DropForeignKey
ALTER TABLE `IncidenciaNacional` DROP FOREIGN KEY `IncidenciaNacional_tipoId_fkey`;

-- DropForeignKey
ALTER TABLE `PedidosNacionales` DROP FOREIGN KEY `PedidosNacionales_estatusPedidoId_fkey`;

-- DropForeignKey
ALTER TABLE `PedidosNacionales` DROP FOREIGN KEY `PedidosNacionales_formaPagoId_fkey`;

-- DropForeignKey
ALTER TABLE `PedidosNacionales` DROP FOREIGN KEY `PedidosNacionales_printBatchId_fkey`;

-- DropForeignKey
ALTER TABLE `PrintBatchNacional` DROP FOREIGN KEY `PrintBatchNacional_corteId_fkey`;

-- DropForeignKey
ALTER TABLE `RecoleccionesNacionales` DROP FOREIGN KEY `RecoleccionesNacionales_estatusRecoleccionId_fkey`;

-- AlterTable
ALTER TABLE `RecoleccionesNacionales` ADD COLUMN `direccionColor` VARCHAR(191) NULL,
    ADD COLUMN `direccionIcon` VARCHAR(191) NULL,
    ADD COLUMN `direccionId` INTEGER NULL,
    ADD COLUMN `recolectorId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ActividadOperacionesNacional`;

-- DropTable
DROP TABLE `CatalogoActividadOperacionesNacional`;

-- DropTable
DROP TABLE `CatalogoCategoriasActividadOperacionesNacional`;

-- DropTable
DROP TABLE `CatalogoEstatusPedidosNacional`;

-- DropTable
DROP TABLE `CatalogoEstatusRecoleccionesNacional`;

-- DropTable
DROP TABLE `CatalogoIncidenciaMotivoNacional`;

-- DropTable
DROP TABLE `CatalogoIncidenciaTipoNacional`;

-- DropTable
DROP TABLE `CatalogoMetodosPagoNacional`;

-- DropTable
DROP TABLE `IncidenciaFotoNacional`;

-- DropTable
DROP TABLE `PrintBatchNacional`;

-- DropTable
DROP TABLE `PrintCorteNacional`;

-- CreateTable
CREATE TABLE `NacionalCatalogoRecolectores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `fotoUrl` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalPrintBatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `corteId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `grupo` INTEGER NULL,
    `printer` INTEGER NULL,
    `printed` BOOLEAN NOT NULL DEFAULT false,
    `printedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalPrintCorte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `fecha` DATE NOT NULL,
    `bloque` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalActividadOperaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NULL,
    `tipoId` INTEGER NOT NULL,
    `isChange` BOOLEAN NOT NULL DEFAULT false,
    `changeOld` LONGTEXT NULL,
    `changeNew` LONGTEXT NULL,
    `changeType` VARCHAR(191) NULL,
    `changeData` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalCatalogoActividadOperaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(191) NOT NULL,
    `actividad` VARCHAR(191) NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalCatalogoCategoriasActividadOperaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalIncidenciaFoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `incidenciaId` INTEGER NOT NULL,
    `fotoUrl` LONGTEXT NOT NULL,
    `takenAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalCatalogoIncidenciaMotivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motivo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalCatalogoIncidenciaTipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalCatalogoMetodosPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `comprobante_req` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalCatalogoEstatusRecolecciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NacionalCatalogoEstatusPedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecoleccionesNacionales` ADD CONSTRAINT `RecoleccionesNacionales_estatusRecoleccionId_fkey` FOREIGN KEY (`estatusRecoleccionId`) REFERENCES `NacionalCatalogoEstatusRecolecciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecoleccionesNacionales` ADD CONSTRAINT `RecoleccionesNacionales_recolectorId_fkey` FOREIGN KEY (`recolectorId`) REFERENCES `NacionalCatalogoRecolectores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_estatusPedidoId_fkey` FOREIGN KEY (`estatusPedidoId`) REFERENCES `NacionalCatalogoEstatusPedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_formaPagoId_fkey` FOREIGN KEY (`formaPagoId`) REFERENCES `NacionalCatalogoMetodosPago`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_printBatchId_fkey` FOREIGN KEY (`printBatchId`) REFERENCES `NacionalPrintBatch`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NacionalPrintBatch` ADD CONSTRAINT `NacionalPrintBatch_corteId_fkey` FOREIGN KEY (`corteId`) REFERENCES `NacionalPrintCorte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NacionalActividadOperaciones` ADD CONSTRAINT `NacionalActividadOperaciones_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `NacionalCatalogoActividadOperaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NacionalActividadOperaciones` ADD CONSTRAINT `NacionalActividadOperaciones_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `PedidosNacionales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NacionalActividadOperaciones` ADD CONSTRAINT `NacionalActividadOperaciones_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `UsuariosHawk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NacionalCatalogoActividadOperaciones` ADD CONSTRAINT `NacionalCatalogoActividadOperaciones_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `NacionalCatalogoCategoriasActividadOperaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaNacional` ADD CONSTRAINT `IncidenciaNacional_motivoId_fkey` FOREIGN KEY (`motivoId`) REFERENCES `NacionalCatalogoIncidenciaMotivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaNacional` ADD CONSTRAINT `IncidenciaNacional_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `NacionalCatalogoIncidenciaTipo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NacionalIncidenciaFoto` ADD CONSTRAINT `NacionalIncidenciaFoto_incidenciaId_fkey` FOREIGN KEY (`incidenciaId`) REFERENCES `IncidenciaNacional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

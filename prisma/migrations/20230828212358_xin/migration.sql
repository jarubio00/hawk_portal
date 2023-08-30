-- AlterTable
ALTER TABLE `Operaciones` MODIFY `punteoRecoleccion` BOOLEAN NULL DEFAULT false,
    MODIFY `recolectado` BOOLEAN NULL DEFAULT false,
    MODIFY `recibo` BOOLEAN NULL DEFAULT false,
    MODIFY `punteoEntrega` BOOLEAN NULL DEFAULT false,
    MODIFY `entregado` BOOLEAN NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Incidencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `tipoId` INTEGER NOT NULL DEFAULT 1,
    `motivoId` INTEGER NOT NULL DEFAULT 1,
    `comentarios` VARCHAR(191) NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IncidenciaFoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `incidenciaId` INTEGER NOT NULL,
    `fotoUrl` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoIncidenciaMotivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motivo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoIncidenciaTipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Incidencia` ADD CONSTRAINT `Incidencia_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incidencia` ADD CONSTRAINT `Incidencia_motivoId_fkey` FOREIGN KEY (`motivoId`) REFERENCES `CatalogoIncidenciaMotivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incidencia` ADD CONSTRAINT `Incidencia_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoIncidenciaTipo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaFoto` ADD CONSTRAINT `IncidenciaFoto_incidenciaId_fkey` FOREIGN KEY (`incidenciaId`) REFERENCES `Incidencia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

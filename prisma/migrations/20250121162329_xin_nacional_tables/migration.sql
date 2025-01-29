-- CreateTable
CREATE TABLE `RecoleccionesNacionales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `estatusRecoleccionId` INTEGER NOT NULL DEFAULT 1,
    `fecha` DATETIME(3) NOT NULL,
    `contactoNombre` VARCHAR(191) NOT NULL,
    `contactoTel` VARCHAR(191) NOT NULL,
    `cp` VARCHAR(191) NOT NULL,
    `calle` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `numeroInt` VARCHAR(191) NOT NULL,
    `colonia` VARCHAR(191) NOT NULL,
    `otraColonia` BOOLEAN NOT NULL DEFAULT false,
    `municipio` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NULL,
    `referencias` LONGTEXT NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedBy` INTEGER NULL,
    `migrated` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Recolecciones_clienteId_fkey`(`clienteId`),
    INDEX `Recolecciones_estatusRecoleccionId_fkey`(`estatusRecoleccionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidosNacionales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoRastreo` VARCHAR(191) NULL,
    `clienteId` INTEGER NOT NULL,
    `recoleccionId` INTEGER NOT NULL,
    `estatusPedidoId` INTEGER NOT NULL DEFAULT 1,
    `fechaEntrega` DATETIME(3) NOT NULL,
    `entregaContactoNombre` VARCHAR(191) NULL,
    `entregaContactoTel` VARCHAR(191) NULL,
    `entregaCp` VARCHAR(191) NULL,
    `entregaCalle` VARCHAR(191) NOT NULL,
    `entregaNumero` VARCHAR(191) NULL,
    `entregaNumeroInt` VARCHAR(191) NULL,
    `entregaColonia` VARCHAR(191) NOT NULL,
    `entregaOtraColonia` BOOLEAN NOT NULL DEFAULT false,
    `entregaMunicipio` VARCHAR(191) NOT NULL,
    `entregaEmpresa` VARCHAR(191) NULL,
    `entregaReferencias` LONGTEXT NULL,
    `entregaLat` VARCHAR(191) NULL,
    `entregaLng` VARCHAR(191) NULL,
    `paqEmpaqueId` INTEGER NOT NULL DEFAULT 1,
    `paqAncho` DOUBLE NOT NULL,
    `paqLargo` DOUBLE NOT NULL,
    `paqAlto` DOUBLE NOT NULL,
    `paqPeso` DOUBLE NOT NULL,
    `paqContenido` VARCHAR(191) NULL,
    `paqPesoVol` DOUBLE NOT NULL,
    `precioVenta` DOUBLE NOT NULL,
    `formaPagoId` INTEGER NOT NULL DEFAULT 1,
    `estatusPagoId` INTEGER NOT NULL DEFAULT 1,
    `batched` BOOLEAN NOT NULL DEFAULT false,
    `printBatchId` INTEGER NULL,
    `printBatchNumber` INTEGER NULL,
    `printed` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedBy` INTEGER NULL DEFAULT 1,
    `migrated` BOOLEAN NOT NULL DEFAULT false,
    `migratedAt` DATETIME(3) NULL,
    `migratedBy` VARCHAR(191) NULL,
    `userCreated` BOOLEAN NOT NULL DEFAULT true,

    INDEX `Pedidos_clienteId_fkey`(`clienteId`),
    INDEX `Pedidos_estatusPagoId_fkey`(`estatusPagoId`),
    INDEX `Pedidos_formaPagoId_fkey`(`formaPagoId`),
    INDEX `Pedidos_recoleccionId_fkey`(`recoleccionId`),
    INDEX `Pedidos_estatusPedidoId_fkey`(`estatusPedidoId`),
    INDEX `Pedidos_dateInxs_fkey`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintBatchNacional` (
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
CREATE TABLE `PrintCorteNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `fecha` DATE NOT NULL,
    `bloque` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActividadOperacionesNacional` (
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
CREATE TABLE `CatalogoActividadOperacionesNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(191) NOT NULL,
    `actividad` VARCHAR(191) NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoCategoriasActividadOperacionesNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IncidenciaNacional` (
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
CREATE TABLE `IncidenciaFotoNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `incidenciaId` INTEGER NOT NULL,
    `fotoUrl` LONGTEXT NOT NULL,
    `takenAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoIncidenciaMotivoNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motivo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoIncidenciaTipoNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoMetodosPagoNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `comprobante_req` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEstatusRecoleccionesNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEstatusPedidosNacional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecoleccionesNacionales` ADD CONSTRAINT `RecoleccionesNacionales_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecoleccionesNacionales` ADD CONSTRAINT `RecoleccionesNacionales_estatusRecoleccionId_fkey` FOREIGN KEY (`estatusRecoleccionId`) REFERENCES `CatalogoEstatusRecoleccionesNacional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_estatusPagoId_fkey` FOREIGN KEY (`estatusPagoId`) REFERENCES `CatalogoEstatusPago`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_estatusPedidoId_fkey` FOREIGN KEY (`estatusPedidoId`) REFERENCES `CatalogoEstatusPedidosNacional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_formaPagoId_fkey` FOREIGN KEY (`formaPagoId`) REFERENCES `CatalogoMetodosPagoNacional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_recoleccionId_fkey` FOREIGN KEY (`recoleccionId`) REFERENCES `RecoleccionesNacionales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosNacionales` ADD CONSTRAINT `PedidosNacionales_printBatchId_fkey` FOREIGN KEY (`printBatchId`) REFERENCES `PrintBatchNacional`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrintBatchNacional` ADD CONSTRAINT `PrintBatchNacional_corteId_fkey` FOREIGN KEY (`corteId`) REFERENCES `PrintCorteNacional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadOperacionesNacional` ADD CONSTRAINT `ActividadOperacionesNacional_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoActividadOperacionesNacional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadOperacionesNacional` ADD CONSTRAINT `ActividadOperacionesNacional_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `PedidosNacionales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadOperacionesNacional` ADD CONSTRAINT `ActividadOperacionesNacional_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `UsuariosHawk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatalogoActividadOperacionesNacional` ADD CONSTRAINT `CatalogoActividadOperacionesNacional_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `CatalogoCategoriasActividadOperacionesNacional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaNacional` ADD CONSTRAINT `IncidenciaNacional_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `PedidosNacionales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaNacional` ADD CONSTRAINT `IncidenciaNacional_motivoId_fkey` FOREIGN KEY (`motivoId`) REFERENCES `CatalogoIncidenciaMotivoNacional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaNacional` ADD CONSTRAINT `IncidenciaNacional_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoIncidenciaTipoNacional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaFotoNacional` ADD CONSTRAINT `IncidenciaFotoNacional_incidenciaId_fkey` FOREIGN KEY (`incidenciaId`) REFERENCES `IncidenciaNacional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

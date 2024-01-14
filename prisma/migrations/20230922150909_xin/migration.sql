-- CreateTable
CREATE TABLE `RecoleccionesHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NULL,
    `estatusRecoleccionId` INTEGER NULL DEFAULT 1,
    `fecha` DATETIME(3) NULL,
    `bloque` INTEGER NULL,
    `contactoNombre` VARCHAR(191) NULL,
    `contactoTel` VARCHAR(191) NULL,
    `cpId` INTEGER NULL DEFAULT 97777,
    `calle` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `numeroInt` VARCHAR(191) NULL,
    `colonia` VARCHAR(191) NULL,
    `otraColonia` BOOLEAN NULL DEFAULT false,
    `municipioId` INTEGER NULL DEFAULT 1,
    `empresa` VARCHAR(191) NULL,
    `referencias` VARCHAR(191) NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedBy` INTEGER NULL,
    `direccionId` INTEGER NULL,
    `direccionIcon` VARCHAR(191) NULL,
    `direccionColor` VARCHAR(191) NULL,

    INDEX `RecoleccionesHistory_clienteId_fkey`(`clienteId`),
    INDEX `RecoleccionesHistory_estatusRecoleccionId_fkey`(`estatusRecoleccionId`),
    INDEX `RecoleccionesHistory_municipioId_fkey`(`municipioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidosHistory` (
    `id` INTEGER NOT NULL,
    `clienteId` INTEGER NULL,
    `recoleccionId` INTEGER NULL,
    `estatusPedidoId` INTEGER NULL DEFAULT 1,
    `fechaEntrega` DATETIME(3) NULL,
    `bloqueEntrega` INTEGER NULL,
    `entregaContactoNombre` VARCHAR(191) NULL,
    `entregaContactoTel` VARCHAR(191) NULL,
    `entregaCpId` INTEGER NULL DEFAULT 97777,
    `entregaCalle` VARCHAR(191) NOT NULL,
    `entregaNumero` VARCHAR(191) NULL,
    `entregaNumeroInt` VARCHAR(191) NULL,
    `entregaColonia` VARCHAR(191) NULL,
    `entregaOtraColonia` BOOLEAN NULL DEFAULT false,
    `entregaMunicipioId` INTEGER NULL DEFAULT 1,
    `entregaEmpresa` VARCHAR(191) NULL,
    `entregaReferencias` VARCHAR(191) NULL,
    `entregaLat` VARCHAR(191) NULL,
    `entregaLng` VARCHAR(191) NULL,
    `paqTipoId` INTEGER NULL DEFAULT 1,
    `paqEmpaqueId` INTEGER NULL DEFAULT 1,
    `paqAncho` DOUBLE NULL,
    `paqLargo` DOUBLE NULL,
    `paqAlto` DOUBLE NULL,
    `paqPeso` DOUBLE NULL,
    `paqContenido` VARCHAR(191) NULL,
    `paqPesoVol` DOUBLE NULL,
    `precioVenta` DOUBLE NULL,
    `formaPagoId` INTEGER NULL DEFAULT 1,
    `estatusPagoId` INTEGER NULL DEFAULT 1,
    `cobroDestino` BOOLEAN NULL DEFAULT false,
    `cobroDestinoCantidad` DOUBLE NULL DEFAULT 0,
    `cobroDestinoId` INTEGER NULL,
    `printCorte` INTEGER NULL,
    `printMCorte` INTEGER NULL,
    `comprobante` BOOLEAN NULL DEFAULT false,
    `comprobanteUrl` LONGTEXT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `updatedBy` INTEGER NULL DEFAULT 1,
    `labelImageUrl` LONGTEXT NULL,
    `labelPdfUrl` LONGTEXT NULL,

    INDEX `PedidosHistory_clienteId_fkey`(`clienteId`),
    INDEX `PedidosHistory_estatusPagoId_fkey`(`estatusPagoId`),
    INDEX `PedidosHistory_formaPagoId_fkey`(`formaPagoId`),
    INDEX `PedidosHistory_recoleccionId_fkey`(`recoleccionId`),
    INDEX `PedidosHistory_entregaMunicipioId_fkey`(`entregaMunicipioId`),
    INDEX `PedidosHistory_estatusPedidoId_fkey`(`estatusPedidoId`),
    INDEX `PedidosHistory_paqTipoId_fkey`(`paqTipoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PedidoHistoryToRecoleccionHistory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PedidoHistoryToRecoleccionHistory_AB_unique`(`A`, `B`),
    INDEX `_PedidoHistoryToRecoleccionHistory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecoleccionesHistory` ADD CONSTRAINT `RecoleccionesHistory_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecoleccionesHistory` ADD CONSTRAINT `RecoleccionesHistory_estatusRecoleccionId_fkey` FOREIGN KEY (`estatusRecoleccionId`) REFERENCES `CatalogoEstatusRecolecciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecoleccionesHistory` ADD CONSTRAINT `RecoleccionesHistory_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `CatalogoMunicipios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecoleccionesHistory` ADD CONSTRAINT `RecoleccionesHistory_cpId_fkey` FOREIGN KEY (`cpId`) REFERENCES `CatalogoCodigosPostales`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_entregaMunicipioId_fkey` FOREIGN KEY (`entregaMunicipioId`) REFERENCES `CatalogoMunicipios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_estatusPagoId_fkey` FOREIGN KEY (`estatusPagoId`) REFERENCES `CatalogoEstatusPago`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_estatusPedidoId_fkey` FOREIGN KEY (`estatusPedidoId`) REFERENCES `CatalogoEstatusPedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_formaPagoId_fkey` FOREIGN KEY (`formaPagoId`) REFERENCES `CatalogoMetodosPago`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_paqTipoId_fkey` FOREIGN KEY (`paqTipoId`) REFERENCES `CatalogoTiposPaquetes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_recoleccionId_fkey` FOREIGN KEY (`recoleccionId`) REFERENCES `Recolecciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosHistory` ADD CONSTRAINT `PedidosHistory_entregaCpId_fkey` FOREIGN KEY (`entregaCpId`) REFERENCES `CatalogoCodigosPostales`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PedidoHistoryToRecoleccionHistory` ADD CONSTRAINT `_PedidoHistoryToRecoleccionHistory_A_fkey` FOREIGN KEY (`A`) REFERENCES `PedidosHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PedidoHistoryToRecoleccionHistory` ADD CONSTRAINT `_PedidoHistoryToRecoleccionHistory_B_fkey` FOREIGN KEY (`B`) REFERENCES `RecoleccionesHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

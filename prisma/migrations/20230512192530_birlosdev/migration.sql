-- CreateTable
CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `correoVerificado` DATETIME(3) NULL,
    `imagen` VARCHAR(191) NULL,
    `hashedPassword` VARCHAR(191) NULL,
    `nivel` INTEGER NOT NULL DEFAULT 1,
    `categoria` INTEGER NOT NULL DEFAULT 1,
    `saldo` DOUBLE NOT NULL DEFAULT 0,
    `tipo` INTEGER NOT NULL DEFAULT 0,
    `credito` BOOLEAN NOT NULL DEFAULT false,
    `limiteCredito` DOUBLE NOT NULL DEFAULT 0,
    `cobros` BOOLEAN NOT NULL DEFAULT false,
    `direccionDefaultId` INTEGER NULL,
    `loggedIn` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastLoginAt` DATETIME(3) NULL,

    UNIQUE INDEX `Clientes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recolecciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `estatusRecoleccionId` INTEGER NOT NULL DEFAULT 1,
    `fecha` DATETIME(3) NOT NULL,
    `bloque` INTEGER NOT NULL,
    `contactoNombre` VARCHAR(191) NOT NULL,
    `contactoTel` VARCHAR(191) NOT NULL,
    `cpId` INTEGER NOT NULL,
    `calle` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `numeroInt` VARCHAR(191) NOT NULL,
    `colonia` VARCHAR(191) NOT NULL,
    `otraColonia` BOOLEAN NOT NULL DEFAULT false,
    `municipioId` INTEGER NOT NULL,
    `empresa` VARCHAR(191) NULL,
    `referencias` VARCHAR(191) NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `recoleccionId` INTEGER NOT NULL,
    `estatusPedidoId` INTEGER NOT NULL,
    `fechaEntrega` DATETIME(3) NOT NULL,
    `bloqueEntrega` INTEGER NOT NULL,
    `entregaContactoNombre` VARCHAR(191) NULL,
    `entregaContactoTel` VARCHAR(191) NOT NULL,
    `entregaCpId` INTEGER NOT NULL,
    `entregaCalle` VARCHAR(191) NOT NULL,
    `entregaNumero` VARCHAR(191) NOT NULL,
    `entregaNumeroInt` VARCHAR(191) NOT NULL,
    `entregaColonia` VARCHAR(191) NOT NULL,
    `entregaOtraColonia` BOOLEAN NOT NULL DEFAULT false,
    `entregaMunicipioId` INTEGER NOT NULL,
    `entregaEmpresa` VARCHAR(191) NULL,
    `entregaReferencias` VARCHAR(191) NULL,
    `entregaLat` VARCHAR(191) NULL,
    `entregaLng` VARCHAR(191) NULL,
    `paqTipoId` INTEGER NOT NULL,
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
    `cobroDestino` BOOLEAN NOT NULL DEFAULT false,
    `cobroDestinoId` INTEGER NULL,
    `printCorte` INTEGER NULL,
    `printMCorte` INTEGER NULL,
    `comprobante` BOOLEAN NOT NULL DEFAULT false,
    `comprobanteUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Misdirecciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `nombreDireccion` VARCHAR(191) NOT NULL,
    `contactoNombre` VARCHAR(191) NULL,
    `contactoTel` VARCHAR(191) NOT NULL,
    `cpId` INTEGER NOT NULL,
    `calle` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `numeroInt` VARCHAR(191) NOT NULL,
    `colonia` VARCHAR(191) NOT NULL,
    `otraColonia` BOOLEAN NOT NULL DEFAULT false,
    `municipioId` INTEGER NOT NULL,
    `empresa` VARCHAR(191) NULL,
    `referencias` VARCHAR(191) NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `updatedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Misdestinos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `contactoNombre` VARCHAR(191) NULL,
    `contactoTel` VARCHAR(191) NOT NULL,
    `cpId` INTEGER NOT NULL,
    `calle` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `numeroInt` VARCHAR(191) NOT NULL,
    `colonia` VARCHAR(191) NOT NULL,
    `otraColonia` BOOLEAN NOT NULL DEFAULT false,
    `municipioId` INTEGER NOT NULL,
    `empresa` VARCHAR(191) NULL,
    `referencias` VARCHAR(191) NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mispaquetes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `nombrePaquete` VARCHAR(191) NOT NULL,
    `paqTipoId` INTEGER NOT NULL,
    `paqEmpaqueId` INTEGER NOT NULL DEFAULT 1,
    `paqAncho` DOUBLE NOT NULL,
    `paqLargo` DOUBLE NOT NULL,
    `paqAlto` DOUBLE NOT NULL,
    `paqPeso` DOUBLE NOT NULL,
    `paqContenido` VARCHAR(191) NULL,
    `paqPesoVol` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CobrosDestino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `pedidoId` INTEGER NOT NULL,
    `cantidad` DOUBLE NOT NULL DEFAULT 0,
    `estatusCobroId` INTEGER NOT NULL DEFAULT 1,
    `estatusPagoCobroId` INTEGER NOT NULL DEFAULT 1,
    `comentario` VARCHAR(191) NULL,
    `cobradoAt` DATETIME(3) NULL,
    `cobradoBy` INTEGER NULL,
    `retornado` BOOLEAN NOT NULL DEFAULT false,
    `retornoFormaId` INTEGER NOT NULL DEFAULT 1,
    `retornoAt` DATETIME(3) NULL,
    `retornoBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoNivelesCLientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nivel` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalalogoCategoriasClientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoTiposClientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEstatusRecolecciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEstatusPedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoTiposPaquetes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEmpaquesPaquetes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empaque` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoFormasPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `forma` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEstatusPagos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEstatusCobros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEstatusPagoCobros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoTiposRetornoCobros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoCodigosPostales` (
    `id` INTEGER NOT NULL,
    `municipioId` INTEGER NOT NULL,
    `zonaId` INTEGER NULL,
    `rutaId` INTEGER NULL,
    `coberturaId` INTEGER NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `base` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoColonias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `colonia` VARCHAR(191) NOT NULL,
    `cpId` INTEGER NOT NULL,
    `municipio_id` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `custom` BOOLEAN NOT NULL DEFAULT false,
    `customCreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoMunicipios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `municipio` VARCHAR(191) NOT NULL,
    `abrev` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'Nuevo León',
    `pais` VARCHAR(191) NOT NULL DEFAULT 'México',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accounts` ADD CONSTRAINT `Accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recolecciones` ADD CONSTRAINT `Recolecciones_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_recoleccionId_fkey` FOREIGN KEY (`recoleccionId`) REFERENCES `Recolecciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Misdirecciones` ADD CONSTRAINT `Misdirecciones_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Misdestinos` ADD CONSTRAINT `Misdestinos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mispaquetes` ADD CONSTRAINT `Mispaquetes_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatalogoColonias` ADD CONSTRAINT `CatalogoColonias_cpId_fkey` FOREIGN KEY (`cpId`) REFERENCES `CatalogoCodigosPostales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

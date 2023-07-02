-- CreateTable
CREATE TABLE `CatalogoMetodosPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `comprobante_req` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoEstatusPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_formaPagoId_fkey` FOREIGN KEY (`formaPagoId`) REFERENCES `CatalogoMetodosPago`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_estatusPagoId_fkey` FOREIGN KEY (`estatusPagoId`) REFERENCES `CatalogoEstatusPago`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

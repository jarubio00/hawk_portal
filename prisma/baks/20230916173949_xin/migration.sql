-- CreateTable
CREATE TABLE `CatalalogoRutas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CatalogoCodigosPostales` ADD CONSTRAINT `CatalogoCodigosPostales_rutaId_fkey` FOREIGN KEY (`rutaId`) REFERENCES `CatalalogoRutas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

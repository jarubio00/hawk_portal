-- CreateTable
CREATE TABLE `CatalogoProductos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_id` INTEGER NOT NULL DEFAULT 1,
    `tipo_paquete_id` INTEGER NOT NULL,
    `cobertura_id` INTEGER NOT NULL DEFAULT 1,
    `peso_min` INTEGER NOT NULL,
    `peso_max` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoCoberturas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cobertura` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CatalogoProductos` ADD CONSTRAINT `CatalogoProductos_tipo_paquete_id_fkey` FOREIGN KEY (`tipo_paquete_id`) REFERENCES `CatalogoTiposPaquetes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatalogoProductos` ADD CONSTRAINT `CatalogoProductos_cobertura_id_fkey` FOREIGN KEY (`cobertura_id`) REFERENCES `CatalogoCoberturas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `ActividadPlataformaClientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `tipoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoActividadPlataformaClientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActividadPlataformaClientes` ADD CONSTRAINT `ActividadPlataformaClientes_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoActividadPlataformaClientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadPlataformaClientes` ADD CONSTRAINT `ActividadPlataformaClientes_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

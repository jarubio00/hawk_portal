-- CreateTable
CREATE TABLE `Operaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `punteoRecoleccion` BOOLEAN NULL,
    `punteoRecoleccionAt` DATETIME(3) NULL,
    `punteoRecoleccionBy` INTEGER NULL,
    `recolectadoAt` DATETIME(3) NULL,
    `recolectado` BOOLEAN NULL,
    `recolectadoBy` INTEGER NULL,
    `recolectadoFrom` VARCHAR(191) NULL,
    `reciboAt` DATETIME(3) NULL,
    `recibo` BOOLEAN NULL,
    `reciboBy` INTEGER NULL,
    `punteoEntregaAt` DATETIME(3) NULL,
    `punteoEntrega` BOOLEAN NULL,
    `punteoEntregaBy` INTEGER NULL,
    `entregadoAt` DATETIME(3) NULL,
    `entregado` BOOLEAN NULL,
    `entregadoBy` INTEGER NULL,
    `entregadoFrom` VARCHAR(191) NULL,

    UNIQUE INDEX `Operaciones_pedidoId_key`(`pedidoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_estatusPedidoId_fkey` FOREIGN KEY (`estatusPedidoId`) REFERENCES `CatalogoEstatusPedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operaciones` ADD CONSTRAINT `Operaciones_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

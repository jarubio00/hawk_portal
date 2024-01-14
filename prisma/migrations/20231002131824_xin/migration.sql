-- CreateTable
CREATE TABLE `AppRouteGuias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `routeId` INTEGER NOT NULL,
    `pedidoId` INTEGER NOT NULL,
    `tipo` ENUM('Recoleccion', 'entrega') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AppRouteGuias` ADD CONSTRAINT `AppRouteGuias_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

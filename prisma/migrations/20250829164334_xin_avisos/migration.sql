-- CreateTable
CREATE TABLE `BloqueoServicios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `servicio` ENUM('REC', 'ENT', 'MD', 'TODO') NOT NULL DEFAULT 'REC',
    `tipo` VARCHAR(191) NOT NULL DEFAULT 'normal',
    `customMessage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvisosProgramacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inicio` DATE NOT NULL,
    `fin` DATE NOT NULL,
    `avisoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvisoProgramacionContenido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `desc` TEXT NOT NULL,
    `backgroundColor` VARCHAR(191) NOT NULL,
    `backgroundImage` TEXT NOT NULL,
    `message` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BloqueoServicios` ADD CONSTRAINT `BloqueoServicios_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `UsuariosHawk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AvisosProgramacion` ADD CONSTRAINT `AvisosProgramacion_avisoId_fkey` FOREIGN KEY (`avisoId`) REFERENCES `AvisoProgramacionContenido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

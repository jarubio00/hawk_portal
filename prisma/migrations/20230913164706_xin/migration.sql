-- CreateTable
CREATE TABLE `CatalogoFotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform` VARCHAR(191) NOT NULL DEFAULT 'cloudinary',
    `public_id` LONGTEXT NOT NULL,
    `url` LONGTEXT NOT NULL,
    `folder` VARCHAR(191) NULL,
    `nombre` VARCHAR(191) NULL,
    `asset_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KommoSync` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` LONGTEXT NOT NULL,
    `tipo` ENUM('add', 'update', 'delete') NOT NULL DEFAULT 'add',
    `isProc` BOOLEAN NOT NULL DEFAULT false,
    `procAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

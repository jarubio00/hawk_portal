/*
  Warnings:

  - You are about to drop the column `rol` on the `UsuariosHawk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UsuariosHawk` DROP COLUMN `rol`,
    ADD COLUMN `oldRol` ENUM('superUser', 'admin', 'user') NULL,
    ADD COLUMN `rolId` INTEGER NULL;

-- CreateTable
CREATE TABLE `CatalogoUsuariosRoles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuariosHawk` ADD CONSTRAINT `UsuariosHawk_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `CatalogoUsuariosRoles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

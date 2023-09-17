/*
  Warnings:

  - You are about to drop the column `areaId` on the `Operadores` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `Operadores` table. All the data in the column will be lost.
  - You are about to drop the column `areaId` on the `UsuariosHawk` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `UsuariosHawk` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Operadores` DROP FOREIGN KEY `Operadores_areaId_fkey`;

-- DropForeignKey
ALTER TABLE `Operadores` DROP FOREIGN KEY `Operadores_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `UsuariosHawk` DROP FOREIGN KEY `UsuariosHawk_areaId_fkey`;

-- DropForeignKey
ALTER TABLE `UsuariosHawk` DROP FOREIGN KEY `UsuariosHawk_empresaId_fkey`;

-- AlterTable
ALTER TABLE `Operadores` DROP COLUMN `areaId`,
    DROP COLUMN `empresaId`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `fotoPublicId` LONGTEXT NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isLocked` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lockedAt` DATETIME(3) NULL,
    ADD COLUMN `lockedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `UsuariosHawk` DROP COLUMN `areaId`,
    DROP COLUMN `empresaId`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `fotoPublicId` LONGTEXT NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isLocked` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lockedAt` DATETIME(3) NULL,
    ADD COLUMN `lockedBy` INTEGER NULL;

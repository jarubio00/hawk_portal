/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Misdirecciones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Misdirecciones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `Pedidos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Pedidos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `Recolecciones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Recolecciones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Misdirecciones` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `Pedidos` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `Recolecciones` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NULL DEFAULT NOW() ON UPDATE NOW();

/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Recolecciones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Recolecciones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Recolecciones` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NULL DEFAULT NOW() ON UPDATE NOW();

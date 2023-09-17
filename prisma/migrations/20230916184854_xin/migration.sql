/*
  Warnings:

  - You are about to drop the column `createdAt` on the `CatalogoCodigosPostales` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `CatalogoCodigosPostales` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CatalogoColonias` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `CatalogoColonias` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CatalogoMunicipios` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `CatalogoMunicipios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CatalogoCodigosPostales` DROP COLUMN `createdAt`,
    DROP COLUMN `createdBy`;

-- AlterTable
ALTER TABLE `CatalogoColonias` DROP COLUMN `createdAt`,
    DROP COLUMN `createdBy`;

-- AlterTable
ALTER TABLE `CatalogoMunicipios` DROP COLUMN `createdAt`,
    DROP COLUMN `createdBy`;

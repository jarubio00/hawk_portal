/*
  Warnings:

  - You are about to drop the column `departamentoId` on the `Operadores` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Operadores` DROP FOREIGN KEY `Operadores_departamentoId_fkey`;

-- AlterTable
ALTER TABLE `Operadores` DROP COLUMN `departamentoId`;

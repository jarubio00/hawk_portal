/*
  Warnings:

  - Added the required column `tipo` to the `FechasBloqueadas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FechasBloqueadas` ADD COLUMN `tipo` ENUM('AM', 'PM', 'DIA') NOT NULL;

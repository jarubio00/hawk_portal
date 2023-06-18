/*
  Warnings:

  - The values [AM,PM,DIA] on the enum `FechasBloqueadas_tipo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `FechasBloqueadas` MODIFY `tipo` ENUM('REC', 'ENT') NOT NULL;

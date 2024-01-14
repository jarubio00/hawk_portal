/*
  Warnings:

  - You are about to drop the column `bloque` on the `PrintBatch` table. All the data in the column will be lost.
  - You are about to drop the column `estatus` on the `PrintBatch` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `PrintBatch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PrintBatch` DROP COLUMN `bloque`,
    DROP COLUMN `estatus`,
    DROP COLUMN `fecha`;

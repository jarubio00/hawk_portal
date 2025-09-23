/*
  Warnings:

  - Added the required column `mobileBackgroundImage` to the `AvisoProgramacionContenido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AvisoProgramacionContenido` ADD COLUMN `mobileBackgroundImage` TEXT NOT NULL;

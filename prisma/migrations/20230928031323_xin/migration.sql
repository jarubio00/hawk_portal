/*
  Warnings:

  - You are about to drop the column `status` on the `PrintBatch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Pedidos` MODIFY `printed` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `PrintBatch` DROP COLUMN `status`,
    ADD COLUMN `estatus` ENUM('pendiente', 'imprimiendo', 'completado') NOT NULL DEFAULT 'pendiente';

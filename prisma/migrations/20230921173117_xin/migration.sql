/*
  Warnings:

  - Made the column `correoVerificadoAt` on table `ClientesChecklist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `celularVerificadoAt` on table `ClientesChecklist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ClientesChecklist` MODIFY `correoVerificado` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `correoVerificadoAt` DATETIME(3) NOT NULL DEFAULT (now()),
    MODIFY `celularVerificado` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `celularVerificadoAt` DATETIME(3) NOT NULL DEFAULT (now()),
    MODIFY `tutorialTomado` BOOLEAN NOT NULL DEFAULT true;

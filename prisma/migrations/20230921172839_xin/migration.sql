-- AlterTable
ALTER TABLE `ClientesChecklist` MODIFY `correoVerificado` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `correoVerificadoAt` DATETIME(3) NULL,
    MODIFY `celularVerificado` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `celularVerificadoAt` DATETIME(3) NULL,
    MODIFY `tutorialTomado` BOOLEAN NOT NULL DEFAULT false;

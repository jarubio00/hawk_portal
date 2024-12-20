-- AlterTable
ALTER TABLE `Operadores` ADD COLUMN `rol` ENUM('operador', 'supervisor', 'admin', 'ultra') NOT NULL DEFAULT 'operador';

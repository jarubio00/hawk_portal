-- Revierte la migración 20260822_cod2_retornos.
--
-- No se pierde nada de cobros ni de cortes: los enums de método nunca se
-- tocaron, así que al quitar las columnas `methodId` los datos siguen ahí.
-- Lo único que desaparece son los eventos y evidencias de retornos que se
-- hubieran registrado.
--
-- El orden importa: primero las llaves foráneas, luego las columnas, al final
-- las tablas.

-- 1) Volver el estatus a texto libre.
ALTER TABLE `Cod2Payout`
  MODIFY COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING';

-- 2) Relaciones al cliente.
ALTER TABLE `Cod2Charge`         DROP FOREIGN KEY `Cod2Charge_clienteId_fkey`;
ALTER TABLE `Cod2Settlement`     DROP FOREIGN KEY `Cod2Settlement_clienteId_fkey`;
ALTER TABLE `Cod2ClientSettings` DROP FOREIGN KEY `Cod2ClientSettings_clienteId_fkey`;

-- 3) Llaves foráneas de las columnas nuevas.
ALTER TABLE `Cod2ClientSettings` DROP FOREIGN KEY `Cod2ClientSettings_methodId_fkey`;
ALTER TABLE `Cod2Settlement`     DROP FOREIGN KEY `Cod2Settlement_methodId_fkey`;
ALTER TABLE `Cod2Payout`         DROP FOREIGN KEY `Cod2Payout_methodId_fkey`;
ALTER TABLE `Cod2Payout`         DROP FOREIGN KEY `Cod2Payout_pedidoId_fkey`;
ALTER TABLE `Cod2PayoutFee`      DROP FOREIGN KEY `Cod2PayoutFee_cargoId_fkey`;
ALTER TABLE `Cod2Issue`          DROP FOREIGN KEY `Cod2Issue_cod2PayoutId_fkey`;

-- 4) Columnas nuevas. Al quitarlas se van sus índices.
ALTER TABLE `Cod2ClientSettings` DROP COLUMN `methodId`;
ALTER TABLE `Cod2Settlement`     DROP COLUMN `methodId`;
ALTER TABLE `Cod2Payout`         DROP COLUMN `methodId`, DROP COLUMN `pedidoId`;
ALTER TABLE `Cod2PayoutFee`      DROP COLUMN `cargoId`;
ALTER TABLE `Cod2Issue`          DROP COLUMN `cod2PayoutId`;

-- 5) Tablas nuevas.
DROP TABLE IF EXISTS `Cod2PayoutEvidencia`;
DROP TABLE IF EXISTS `Cod2PayoutEvent`;
DROP TABLE IF EXISTS `Cod2PayoutMethodCargo`;
DROP TABLE IF EXISTS `Cod2PayoutMethod`;
DROP TABLE IF EXISTS `Cod2PayoutCargo`;

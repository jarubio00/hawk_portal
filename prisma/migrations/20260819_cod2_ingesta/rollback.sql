-- Revierte la migración 20260819_cod2_ingesta.
--
-- Aplicar solo si hace falta deshacer. Ninguno de los pasos toca datos de cobros:
-- lo único que se pierde son los eventos de ingesta ya recibidos.

-- 1) El buzón de entrada.
DROP TABLE IF EXISTS `Cod2IngestEvent`;

-- 2) Devolver el índice de pedidoId a como estaba (normal, no único).
--    Mismo cuidado que en la migración: la llave foránea hacia Pedidos necesita
--    un índice en todo momento, así que se crea el normal ANTES de borrar el único.
CREATE INDEX `Cod2Charge_pedidoId_idx` ON `Cod2Charge`(`pedidoId`);
DROP INDEX `Cod2Charge_pedidoId_key` ON `Cod2Charge`;

-- 3) El valor PAID_TO_CLIENT del enum.
--    OJO: esto falla si alguna incidencia ya lo usa. Verificar primero:
--      SELECT COUNT(*) FROM Cod2Issue WHERE type = 'PAID_TO_CLIENT';
--    Si hay filas, reasignarlas antes (p.ej. a OTHER) o dejar el valor:
--    un valor de más en el enum es inofensivo.
ALTER TABLE `Cod2Issue`
  MODIFY COLUMN `type` ENUM(
    'AMOUNT_LESS',
    'AMOUNT_MORE',
    'REFUSED_TO_PAY',
    'RECIPIENT_ABSENT',
    'INCORRECT_ADDRESS',
    'COUNTERFEIT_BILL',
    'OTHER'
  ) NOT NULL;

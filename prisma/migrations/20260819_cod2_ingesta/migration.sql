-- Ingesta de eventos de calle del COD
--
-- Verificado antes de escribir esta migración (2026-08-19, base `hawk_prisma`):
--   * Cod2Charge: 4090 filas, 0 pedidoId duplicados -> la restricción única es segura
--   * Cod2Charge_pedidoId_idx existe como índice normal -> lo reemplaza el único
--
-- Los tres cambios son aditivos y reversibles. Ninguno borra datos.

-- 1) Nuevo tipo de incidencia: el destinatario pagó directo al cliente (mod tipo 5 del app).
--    Hoy ese caso se cubre abusando de COUNTERFEIT_BILL, que significa "billete falso".
ALTER TABLE `Cod2Issue`
  MODIFY COLUMN `type` ENUM(
    'AMOUNT_LESS',
    'AMOUNT_MORE',
    'REFUSED_TO_PAY',
    'RECIPIENT_ABSENT',
    'INCORRECT_ADDRESS',
    'COUNTERFEIT_BILL',
    'PAID_TO_CLIENT',
    'OTHER'
  ) NOT NULL;

-- 2) Un COD siempre va ligado a un envío, y solo uno.
--    Legacy lo da por hecho: cobros_destinatarios solo tiene un sysop_id por cobro,
--    así que un segundo cobro para el mismo pedido se perdería en la sincronización.
--
--    OJO CON EL ORDEN: pedidoId tiene una llave foránea hacia Pedidos, y MySQL no
--    deja quedarse sin índice que la respalde. Hay que crear el único PRIMERO para
--    que la FK se apoye en él, y hasta entonces borrar el viejo.
CREATE UNIQUE INDEX `Cod2Charge_pedidoId_key` ON `Cod2Charge`(`pedidoId`);
DROP INDEX `Cod2Charge_pedidoId_idx` ON `Cod2Charge`;

-- 3) Buzón de entrada de los eventos que manda el API legacy.
--    Se guarda el payload crudo ANTES de procesarlo: la app manda cada visita una sola
--    vez, así que un fallo al procesar no debe perder el evento.
--    El único (visitaId, guia) es lo que da la idempotencia.
CREATE TABLE `Cod2IngestEvent` (
  `id`          VARCHAR(191) NOT NULL,
  `visitaId`    INTEGER      NOT NULL,
  `guia`        INTEGER      NOT NULL,
  `payload`     JSON         NOT NULL,
  `status`      ENUM('PENDING','PROCESSED','FAILED','IGNORED') NOT NULL DEFAULT 'PENDING',
  `error`       TEXT         NULL,
  `attempts`    INTEGER      NOT NULL DEFAULT 0,
  `scenario`    VARCHAR(191) NULL,
  `chargeId`    VARCHAR(191) NULL,
  `receivedAt`  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `processedAt` DATETIME(3)  NULL,

  UNIQUE INDEX `Cod2IngestEvent_visitaId_guia_key`(`visitaId`, `guia`),
  INDEX `Cod2IngestEvent_status_receivedAt_idx`(`status`, `receivedAt`),
  INDEX `Cod2IngestEvent_guia_idx`(`guia`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

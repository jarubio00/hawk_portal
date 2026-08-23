-- Catálogo de métodos de retorno, seguimiento y evidencias.
--
-- ⚠️ FASE SEGURA. Los enums de método (`defaultPayoutMethod`, `payoutMethod`,
-- `method`) NO se tocan: el portal escribe `Cod2ClientSettings.defaultPayoutMethod`
-- dentro de la transacción que crea el envío, y quitarlo rompería la generación
-- de envíos con cobro en producción. Se agregan columnas `methodId` a su lado.
-- Los enums se eliminan en una segunda migración, cuando el portal se alinee.
--
-- Verificado antes de escribirla (2026-08-22, base `hawk_prisma`):
--   * Cod2Settlement, Cod2Charge y Cod2ClientSettings: 0 clienteId huérfanos
--   * Cod2Payout.status: 1 fila con 'COMPLETED' -> cabe en el enum
--   * Cod2Payout: 1 fila · Cod2PayoutFee: 2 filas
--
-- Todo es aditivo salvo el cambio de tipo de `status`. Ninguna columna se borra.

-- ── 1) Catálogo de cargos ────────────────────────────────────────────────
-- Los conceptos se catalogan aparte de los métodos porque el mismo cargo lo
-- comparten varios: el "envío" lo cobran domicilio, banco y conveniencia. Así
-- sube una vez y los tres quedan al día.
CREATE TABLE `Cod2PayoutCargo` (
  `id`         INTEGER      NOT NULL AUTO_INCREMENT,
  `clave`      VARCHAR(191) NOT NULL,
  `nombre`     VARCHAR(191) NOT NULL,
  `tipo`       ENUM('FIJO','PORCENTAJE') NOT NULL DEFAULT 'FIJO',
  `monto`      INTEGER      NULL,
  `porcentaje` DECIMAL(5,4) NULL,
  `activo`     BOOLEAN      NOT NULL DEFAULT true,
  `createdAt`  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt`  DATETIME(3)  NOT NULL,
  UNIQUE INDEX `Cod2PayoutCargo_clave_key`(`clave`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ── 2) Catálogo de métodos ───────────────────────────────────────────────
CREATE TABLE `Cod2PayoutMethod` (
  `id`             INTEGER      NOT NULL AUTO_INCREMENT,
  `clave`          VARCHAR(191) NOT NULL,
  `nombre`         VARCHAR(191) NOT NULL,
  `descripcion`    VARCHAR(191) NULL,
  `requierePedido` BOOLEAN      NOT NULL DEFAULT false,
  `activo`         BOOLEAN      NOT NULL DEFAULT true,
  `orden`          INTEGER      NOT NULL DEFAULT 0,
  `createdAt`      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt`      DATETIME(3)  NOT NULL,
  UNIQUE INDEX `Cod2PayoutMethod_clave_key`(`clave`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ── 3) Qué cargos aplica cada método ─────────────────────────────────────
CREATE TABLE `Cod2PayoutMethodCargo` (
  `id`       INTEGER NOT NULL AUTO_INCREMENT,
  `methodId` INTEGER NOT NULL,
  `cargoId`  INTEGER NOT NULL,
  `monto`    INTEGER NULL,
  `orden`    INTEGER NOT NULL DEFAULT 0,
  UNIQUE INDEX `Cod2PayoutMethodCargo_methodId_cargoId_key`(`methodId`, `cargoId`),
  INDEX `Cod2PayoutMethodCargo_cargoId_idx`(`cargoId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Cod2PayoutMethodCargo`
  ADD CONSTRAINT `Cod2PayoutMethodCargo_methodId_fkey`
  FOREIGN KEY (`methodId`) REFERENCES `Cod2PayoutMethod`(`id`) ON DELETE CASCADE;
ALTER TABLE `Cod2PayoutMethodCargo`
  ADD CONSTRAINT `Cod2PayoutMethodCargo_cargoId_fkey`
  FOREIGN KEY (`cargoId`) REFERENCES `Cod2PayoutCargo`(`id`) ON DELETE CASCADE;

-- ── 4) Seguimiento y evidencias del retorno ──────────────────────────────
CREATE TABLE `Cod2PayoutEvent` (
  `id`          VARCHAR(191) NOT NULL,
  `payoutId`    VARCHAR(191) NOT NULL,
  `tipo`        VARCHAR(191) NOT NULL,
  `descripcion` TEXT         NULL,
  `createdAt`   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdBy`   INTEGER      NULL,
  INDEX `Cod2PayoutEvent_payoutId_createdAt_idx`(`payoutId`, `createdAt`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Cod2PayoutEvidencia` (
  `id`        VARCHAR(191) NOT NULL,
  `payoutId`  VARCHAR(191) NOT NULL,
  `url`       TEXT         NOT NULL,
  `nota`      VARCHAR(191) NULL,
  `createdAt` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdBy` INTEGER      NULL,
  INDEX `Cod2PayoutEvidencia_payoutId_idx`(`payoutId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Cod2PayoutEvent`
  ADD CONSTRAINT `Cod2PayoutEvent_payoutId_fkey`
  FOREIGN KEY (`payoutId`) REFERENCES `Cod2Payout`(`id`) ON DELETE CASCADE;
ALTER TABLE `Cod2PayoutEvidencia`
  ADD CONSTRAINT `Cod2PayoutEvidencia_payoutId_fkey`
  FOREIGN KEY (`payoutId`) REFERENCES `Cod2Payout`(`id`) ON DELETE CASCADE;

-- ── 5) Columnas nuevas, todas opcionales ─────────────────────────────────
ALTER TABLE `Cod2ClientSettings` ADD COLUMN `methodId` INTEGER NULL;
ALTER TABLE `Cod2Settlement`     ADD COLUMN `methodId` INTEGER NULL;
ALTER TABLE `Cod2Payout`         ADD COLUMN `methodId` INTEGER NULL,
                                 ADD COLUMN `pedidoId` INTEGER NULL;
ALTER TABLE `Cod2PayoutFee`      ADD COLUMN `cargoId`  INTEGER NULL;
ALTER TABLE `Cod2Issue`          ADD COLUMN `cod2PayoutId` VARCHAR(191) NULL;

CREATE INDEX `Cod2ClientSettings_methodId_idx` ON `Cod2ClientSettings`(`methodId`);
CREATE INDEX `Cod2Settlement_methodId_idx`     ON `Cod2Settlement`(`methodId`);
CREATE INDEX `Cod2Payout_methodId_idx`         ON `Cod2Payout`(`methodId`);
CREATE INDEX `Cod2Payout_pedidoId_idx`         ON `Cod2Payout`(`pedidoId`);
CREATE INDEX `Cod2PayoutFee_cargoId_idx`       ON `Cod2PayoutFee`(`cargoId`);
CREATE INDEX `Cod2Issue_cod2PayoutId_idx`      ON `Cod2Issue`(`cod2PayoutId`);

ALTER TABLE `Cod2ClientSettings` ADD CONSTRAINT `Cod2ClientSettings_methodId_fkey`
  FOREIGN KEY (`methodId`) REFERENCES `Cod2PayoutMethod`(`id`);
ALTER TABLE `Cod2Settlement` ADD CONSTRAINT `Cod2Settlement_methodId_fkey`
  FOREIGN KEY (`methodId`) REFERENCES `Cod2PayoutMethod`(`id`);
ALTER TABLE `Cod2Payout` ADD CONSTRAINT `Cod2Payout_methodId_fkey`
  FOREIGN KEY (`methodId`) REFERENCES `Cod2PayoutMethod`(`id`);
ALTER TABLE `Cod2Payout` ADD CONSTRAINT `Cod2Payout_pedidoId_fkey`
  FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`id`);
ALTER TABLE `Cod2PayoutFee` ADD CONSTRAINT `Cod2PayoutFee_cargoId_fkey`
  FOREIGN KEY (`cargoId`) REFERENCES `Cod2PayoutCargo`(`id`);
ALTER TABLE `Cod2Issue` ADD CONSTRAINT `Cod2Issue_cod2PayoutId_fkey`
  FOREIGN KEY (`cod2PayoutId`) REFERENCES `Cod2Payout`(`id`) ON DELETE SET NULL;

-- ── 6) Relaciones al cliente ─────────────────────────────────────────────
-- Sin ellas había que rodear por el pedido para llegar al cliente, y buscar un
-- corte por nombre necesitaba dos consultas. Verificado: 0 huérfanos en las tres.
ALTER TABLE `Cod2Charge` ADD CONSTRAINT `Cod2Charge_clienteId_fkey`
  FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`);
ALTER TABLE `Cod2Settlement` ADD CONSTRAINT `Cod2Settlement_clienteId_fkey`
  FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`);
ALTER TABLE `Cod2ClientSettings` ADD CONSTRAINT `Cod2ClientSettings_clienteId_fkey`
  FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`);

-- ── 7) El estatus del retorno deja de ser texto libre ────────────────────
ALTER TABLE `Cod2Payout`
  MODIFY COLUMN `status` ENUM('PENDING','ASSIGNED','COMPLETED','FAILED')
  NOT NULL DEFAULT 'PENDING';

-- ── 8) Sembrar el catálogo ───────────────────────────────────────────────
-- Los montos salen de Cod2Config, que guardaba bankFee=68 y convenienceFee=12.
-- El mal llamado "bankFee" nunca fue una comisión bancaria: es el ENVÍO, y lo
-- cobran los tres métodos que se mueven físicamente.
INSERT INTO `Cod2PayoutCargo` (`clave`, `nombre`, `tipo`, `monto`, `updatedAt`) VALUES
  ('ENVIO',                 'Envío',              'FIJO', 6800, NOW(3)),
  ('COMISION_CONVENIENCIA', 'Comisión de tienda', 'FIJO', 1200, NOW(3));

INSERT INTO `Cod2PayoutMethod` (`clave`, `nombre`, `descripcion`, `requierePedido`, `orden`, `updatedAt`) VALUES
  ('RECOGER_EN_OFICINA',    'Recoge en oficinas',     'El cliente pasa por su dinero. Sin costo.', false, 1, NOW(3)),
  ('ENTREGA_DOMICILIO',     'Entrega a domicilio',    'Un mensajero le lleva el efectivo.',         true,  2, NOW(3)),
  ('DEPOSITO_BANCO',        'Depósito en banco',      'Se deposita en su cuenta.',                  true,  3, NOW(3)),
  ('DEPOSITO_CONVENIENCIA', 'Depósito en tienda',     'Depósito en tienda de conveniencia.',        true,  4, NOW(3));

INSERT INTO `Cod2PayoutMethodCargo` (`methodId`, `cargoId`, `orden`)
SELECT m.id, c.id, 1
  FROM `Cod2PayoutMethod` m, `Cod2PayoutCargo` c
 WHERE m.clave IN ('ENTREGA_DOMICILIO', 'DEPOSITO_BANCO', 'DEPOSITO_CONVENIENCIA')
   AND c.clave = 'ENVIO';

INSERT INTO `Cod2PayoutMethodCargo` (`methodId`, `cargoId`, `orden`)
SELECT m.id, c.id, 2
  FROM `Cod2PayoutMethod` m, `Cod2PayoutCargo` c
 WHERE m.clave = 'DEPOSITO_CONVENIENCIA'
   AND c.clave = 'COMISION_CONVENIENCIA';

-- ── 9) Alinear los datos existentes con el catálogo ──────────────────────
UPDATE `Cod2ClientSettings` s
  JOIN `Cod2PayoutMethod` m ON m.clave = s.defaultPayoutMethod
   SET s.methodId = m.id;

UPDATE `Cod2Settlement` t
  JOIN `Cod2PayoutMethod` m ON m.clave = t.payoutMethod
   SET t.methodId = m.id;

UPDATE `Cod2Payout` p
  JOIN `Cod2PayoutMethod` m ON m.clave = p.method
   SET p.methodId = m.id;

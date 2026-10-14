-- Módulo de devoluciones: un paquete que tiene que regresar al cliente.
--
-- El requerimiento y el por qué de cada decisión viven en el repo de hawk2admin,
-- en docs/devoluciones/. Este SQL sale de 03-esquema-propuesto.md, revisado el
-- 2026-10-14. Aquí solo se aplica.
--
-- Independiente de COD2: sin llaves foráneas entre los dos módulos.
-- No se replica a legacy: el estatus 11 vive solo en hawk_prisma, porque la
-- sincronización de envíos ocurre una vez, al crearlos, y ninguno nace en 11.
--
-- COLLATE utf8mb4_unicode_ci es lo que usan Pedidos, UsuariosHawk y Operadores
-- (141 apariciones en las migraciones del repo contra 6 de utf8mb4_0900_ai_ci).
-- Con 0900 las llaves foráneas sobre VARCHAR fallan con el error 3780, que es
-- lo que tumbó la migración de COD-retornos en agosto.
--
-- VERIFICAR ANTES DE APLICAR:
--   SELECT id, estatus FROM CatalogoEstatusPedidos ORDER BY id;
--     -> el 11 debe estar libre.
--   SELECT VERSION();
--     -> la CHECK del paso 3 requiere MySQL 8.0.16 o superior. Por debajo
--        MySQL la parsea y la IGNORA en silencio: la migración pasa, el
--        constraint no existe y nadie se entera hasta que un evento tenga los
--        dos autores puestos.

-- ── 1. Los catálogos primero: las tablas de abajo los referencian ──────────
CREATE TABLE `CatalogoDevolucionMotivo` (
  `id`                  INT          NOT NULL AUTO_INCREMENT,
  `clave`               VARCHAR(40)  NOT NULL,
  `motivo`              VARCHAR(120) NOT NULL,
  `desc`                VARCHAR(255) NULL,
  `requiereRecoleccion` TINYINT(1)   NOT NULL DEFAULT 0,
  `requiereComentario`  TINYINT(1)   NOT NULL DEFAULT 0,
  `requiereEvidencia`   TINYINT(1)   NOT NULL DEFAULT 0,
  `activo`              TINYINT(1)   NOT NULL DEFAULT 1,
  `orden`               INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CatalogoDevolucionMotivo_clave_key` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `CatalogoDevolucionEstatus` (
  `id`      INT          NOT NULL AUTO_INCREMENT,
  `clave`   VARCHAR(40)  NOT NULL,
  `estatus` VARCHAR(60)  NOT NULL,
  `desc`    VARCHAR(255) NULL,
  `esFinal` TINYINT(1)   NOT NULL DEFAULT 0,
  `orden`   INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CatalogoDevolucionEstatus_clave_key` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `CatalogoDevolucionEvento` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `clave`        VARCHAR(40)  NOT NULL,
  `evento`       VARCHAR(120) NOT NULL,
  `desc`         VARCHAR(255) NULL,
  `esAutomatico` TINYINT(1)   NOT NULL DEFAULT 0,
  `activo`       TINYINT(1)   NOT NULL DEFAULT 1,
  `orden`        INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CatalogoDevolucionEvento_clave_key` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 2. La devolución ──────────────────────────────────────────────────────
-- `pedidoId` va UNIQUE: una sola devolución por envío. Un segundo intento
-- reabre la que existe, para que la historia del caso no se parta en dos
-- expedientes.
CREATE TABLE `Devolucion` (
  `id`                      INT         NOT NULL AUTO_INCREMENT,
  `pedidoId`                INT         NOT NULL,
  `motivoId`                INT         NOT NULL,
  `estatusId`               INT         NOT NULL DEFAULT 1,
  `requiereRecoleccion`     TINYINT(1)  NOT NULL DEFAULT 0,
  `estatusPedidoAnteriorId` INT         NULL,
  `comentarios`             TEXT        NULL,
  `createdAt`               DATETIME(3) NOT NULL DEFAULT (now()),
  `createdBy`               INT         NOT NULL,
  `cerradaAt`               DATETIME(3) NULL,
  `cerradaBy`               INT         NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Devolucion_pedidoId_key` (`pedidoId`),
  KEY `Devolucion_estatusId_idx` (`estatusId`),
  KEY `Devolucion_createdAt_idx` (`createdAt`),
  KEY `Devolucion_motivoId_idx`  (`motivoId`),
  CONSTRAINT `Devolucion_pedidoId_fkey`
    FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Devolucion_motivoId_fkey`
    FOREIGN KEY (`motivoId`) REFERENCES `CatalogoDevolucionMotivo` (`id`),
  CONSTRAINT `Devolucion_estatusId_fkey`
    FOREIGN KEY (`estatusId`) REFERENCES `CatalogoDevolucionEstatus` (`id`),
  CONSTRAINT `Devolucion_createdBy_fkey`
    FOREIGN KEY (`createdBy`) REFERENCES `UsuariosHawk` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 3. Los eventos ────────────────────────────────────────────────────────
-- Dos columnas de autor, cada una con su llave foránea, en vez de una sola
-- polimórfica: ese patrón es el de Cod2AuditLog.createdBy, que guarda ids de
-- dos tablas sin decir de cuál, y produjo el bug del autor equivocado.
CREATE TABLE `DevolucionEvento` (
  `id`           INT         NOT NULL AUTO_INCREMENT,
  `devolucionId` INT         NOT NULL,
  `tipoId`       INT         NOT NULL,
  `descripcion`  TEXT        NULL,
  `fotoUrl`      TEXT        NULL,
  `createdAt`    DATETIME(3) NOT NULL DEFAULT (now()),
  `createdBy`    INT         NULL,
  `operadorId`   INT         NULL,
  `hawkVisitaId` INT         NULL,
  PRIMARY KEY (`id`),
  KEY `DevolucionEvento_devolucionId_idx` (`devolucionId`),
  KEY `DevolucionEvento_createdAt_idx`    (`createdAt`),
  CONSTRAINT `DevolucionEvento_devolucionId_fkey`
    FOREIGN KEY (`devolucionId`) REFERENCES `Devolucion` (`id`) ON DELETE CASCADE,
  CONSTRAINT `DevolucionEvento_tipoId_fkey`
    FOREIGN KEY (`tipoId`) REFERENCES `CatalogoDevolucionEvento` (`id`),
  CONSTRAINT `DevolucionEvento_createdBy_fkey`
    FOREIGN KEY (`createdBy`) REFERENCES `UsuariosHawk` (`id`),
  CONSTRAINT `DevolucionEvento_operadorId_fkey`
    FOREIGN KEY (`operadorId`) REFERENCES `Operadores` (`id`),
  -- Un usuario del admin o un mensajero, nunca los dos. Los dos nulos es el
  -- sistema sin firma, por ejemplo cuando no se encontró el correo del
  -- mensajero.
  --
  -- Las dos llaves de autor NO llevan ON DELETE ni ON UPDATE a propósito:
  -- MySQL prohíbe acciones referenciales en columnas que usa una CHECK, así
  -- que agregárselas después haría fallar esa migración. Y es correcto que
  -- falle.
  CONSTRAINT `DevolucionEvento_un_autor_chk`
    CHECK (`createdBy` IS NULL OR `operadorId` IS NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 4. La semilla de los catálogos ────────────────────────────────────────
-- Los MOTIVOS son provisionales: salen de una conversación, no del negocio. Se
-- cambian con un UPDATE cuando el cliente pase su lista; para eso son catálogo.
-- La `desc` lo dice, para que quien los lea en seis meses lo sepa.
INSERT INTO `CatalogoDevolucionMotivo`
  (`clave`, `motivo`, `desc`, `requiereRecoleccion`, `requiereComentario`, `requiereEvidencia`, `orden`) VALUES
  ('PRODUCTO_EQUIVOCADO', 'El cliente envió el producto equivocado',
   'PROVISIONAL. Talla, color o artículo distinto al que se vendió.', 0, 0, 0, 1),
  ('RECHAZADO', 'El destinatario no quiso recibirlo',
   'PROVISIONAL. Rechazo en la puerta.', 0, 0, 0, 2),
  ('NO_SE_PUDO_ENTREGAR', 'No se pudo entregar tras varios intentos',
   'PROVISIONAL. Se agotaron los intentos de entrega.', 0, 0, 0, 3),
  ('OTRO', 'Otro motivo',
   'PROVISIONAL. Pide comentario: es lo que va a revelar los motivos que faltan.', 0, 1, 0, 99);

-- Ningún motivo exige evidencia todavía: se decide cuando llegue el catálogo
-- real del cliente, y es un UPDATE de una columna.

-- Cuatro estatus. EN_PROCESO se descartó el 2026-10-11: entre Abierto y En
-- tránsito no había nada que distinguir, y los eventos cuentan el detalle.
-- En masculino porque hablan del paquete, como los estatus del envío.
INSERT INTO `CatalogoDevolucionEstatus`
  (`clave`, `estatus`, `desc`, `esFinal`, `orden`) VALUES
  ('ABIERTO',     'Abierto',             'Registrado y en gestión.',                 0, 1),
  ('EN_TRANSITO', 'En tránsito',         'El paquete va de regreso al cliente.',     0, 2),
  ('DEVUELTO',    'Devuelto al cliente', 'El paquete llegó al cliente.',             1, 3),
  ('CANCELADO',   'Cancelado',           'Se resolvió de otra forma o no procedía.', 1, 4);

INSERT INTO `CatalogoDevolucionEvento`
  (`clave`, `evento`, `desc`, `esAutomatico`, `orden`) VALUES
  ('ABIERTA',           'Devolución abierta',        'La escribe el sistema al crearla.',   1, 1),
  ('CAMBIO_ESTATUS',    'Cambio de estatus',         'La escribe el sistema.',              1, 2),
  ('CONTACTO_CLIENTE',  'Se contactó al cliente',    NULL,                                 0, 3),
  ('PAQUETE_EN_BODEGA', 'El paquete está en bodega', NULL,                                 0, 4),
  ('DEVUELTO',          'Devuelto al cliente',       'Manual, o automático desde la app.', 0, 5),
  ('NOTA',              'Nota de seguimiento',       'Comentario libre en la línea.',       0, 6);

-- ── 5. El estatus nuevo del envío ─────────────────────────────────────────
-- Con id explícito: 11, NO el 6. El hueco del 6 probablemente es algo que se
-- borró, y si algo allá afuera conserva un mapeo viejo significaría otra cosa
-- en silencio.
--
-- PENDIENTE DEL LADO DEL PORTAL, antes de producción (acordado 2026-10-14):
-- hoy un envío en 11 no aparece en ninguna de las cuatro pestañas de
-- "mis pedidos" ni en sus contadores, y su etiqueta sale vacía porque
-- statusIdToString no tiene caso default. Ver app/components/utils/helpers.js,
-- app/actions/getPedidosCounts.ts y app/api/pedidos/route.ts.
INSERT INTO `CatalogoEstatusPedidos` (`id`, `estatus`, `desc`)
VALUES (11, 'Devolución', 'Envío en proceso de devolución al cliente');

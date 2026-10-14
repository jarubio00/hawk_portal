-- Eventos personalizados en la actividad del envío, y notas del envío.
--
-- Dos funciones que el cliente pidió aprovechando los cambios de devoluciones.
-- NO son parte de devoluciones y no dependen de ellas: van en migración aparte
-- justamente para que cada una se aplique y se revierta sola.
--
-- El requerimiento vive en el repo de hawk2admin, en
-- docs/devoluciones/02-eventos-y-notas.md, decidido el 2026-10-14.
--
-- Lo que separa a las dos es lo único que de verdad importa de ellas:
-- el evento se ve en la línea de tiempo del envío, la nota no.
--
-- Ninguna de las tres tablas que toca este SQL la usa el portal: verificado
-- que no hay un solo prisma.actividadOperaciones ni
-- prisma.catalogoActividadOperaciones en app/. userActivityRegister escribe en
-- ActividadPlataformaClientes, que es otra tabla.

-- ── 1. La categoría de los eventos personalizados ─────────────────────────
-- Un evento personalizado es una fila de ActividadOperaciones con isChange =
-- false y un tipoId de esta categoría. No hace falta tabla nueva: esa
-- estructura ya existe con pedido, tipo, catálogo, fecha y autor.
--
-- La categoría importa porque la línea de tiempo del admin agrupa las
-- modificaciones del mismo segundo y categoría —un cambio de dirección
-- escribe diez renglones—, y un evento personalizado no debe agruparse. La
-- línea de tiempo la busca por clave, no por id.
INSERT INTO `CatalogoCategoriasActividadOperaciones` (`clave`, `categoria`, `desc`)
VALUES ('EVP', 'Eventos personalizados', 'Creados a mano desde el admin. No se agrupan como modificaciones.');

-- ── 2. `activo` en el catálogo de actividades ─────────────────────────────
-- Para retirar un tipo de evento sin borrar la historia que lo usa. Es una de
-- las dos defensas baratas contra que el catálogo se llene de veinte tipos
-- parecidos; la otra es que crear tipos sea un permiso distinto de crear
-- eventos.
--
-- Es el único cambio a una tabla existente. Con DEFAULT 1 todas las
-- actividades que ya existen quedan activas y nada cambia para ellas.
ALTER TABLE `CatalogoActividadOperaciones`
  ADD COLUMN `activo` TINYINT(1) NOT NULL DEFAULT 1;

-- ── 3. Las notas del envío ────────────────────────────────────────────────
-- Tabla propia precisamente porque lo que define a una nota es NO estar en la
-- línea de tiempo. Si viviera en ActividadOperaciones estaría a un filtro de
-- distancia de aparecer ahí por accidente; así la separación es estructural y
-- no una condición que alguien puede olvidar.
--
-- Borrado lógico: la nota deja de verse, pero la fila se queda con quién y
-- cuándo. Toda lectura lleva `borradaAt IS NULL`, y conviene que esa condición
-- viva en una sola función en vez de repetirse en cada pantalla.
CREATE TABLE `PedidoNota` (
  `id`        INT         NOT NULL AUTO_INCREMENT,
  `pedidoId`  INT         NOT NULL,
  `nota`      TEXT        NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
  `createdBy` INT         NOT NULL,
  `editadaAt` DATETIME(3) NULL,
  `editadaBy` INT         NULL,
  `borradaAt` DATETIME(3) NULL,
  `borradaBy` INT         NULL,
  PRIMARY KEY (`id`),
  KEY `PedidoNota_pedidoId_idx` (`pedidoId`),
  CONSTRAINT `PedidoNota_pedidoId_fkey`
    FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `PedidoNota_createdBy_fkey`
    FOREIGN KEY (`createdBy`) REFERENCES `UsuariosHawk` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Los tipos de evento NO se siembran: no hay una lista del cliente. Se crean
-- desde la pantalla de catálogo como filas de CatalogoActividadOperaciones con
-- la categoría EVP.

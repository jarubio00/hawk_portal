-- Revierte la migración 20261014120000_devoluciones.
--
-- Se puede deshacer completo. La única tabla existente que se toca es Pedidos,
-- y solo en los envíos que estén en "Devolución", que vuelven a su estatus
-- anterior. Si se revierte el mismo día que se aplica, no habrá ninguno.
--
-- ANTES DE REVERTIR: quitar el gancho del API legacy, si ya está puesto. Si no,
-- cada entrega intentaría escribir en tablas que ya no existen. Su try/catch
-- evita que eso afecte a la app, pero el log se llenaría de errores.

-- 1. Los envíos que estén en "Devolución" regresan al estatus que tenían.
--    Sin esto el DELETE del paso 2 falla por la llave foránea de Pedidos.
--    El COALESCE a 2 (Recolectado) es la red para una foto nula.
UPDATE `Pedidos` p
  JOIN `Devolucion` d ON d.`pedidoId` = p.`id`
   SET p.`estatusPedidoId` = COALESCE(d.`estatusPedidoAnteriorId`, 2)
 WHERE p.`estatusPedidoId` = 11;

-- 2. El estatus del envío.
DELETE FROM `CatalogoEstatusPedidos` WHERE `id` = 11;

-- 3. Las tablas, al revés que la creación: primero lo que referencia.
DROP TABLE IF EXISTS `DevolucionEvento`;
DROP TABLE IF EXISTS `Devolucion`;
DROP TABLE IF EXISTS `CatalogoDevolucionEvento`;
DROP TABLE IF EXISTS `CatalogoDevolucionEstatus`;
DROP TABLE IF EXISTS `CatalogoDevolucionMotivo`;

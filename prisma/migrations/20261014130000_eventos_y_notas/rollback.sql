-- Revierte la migración 20261014130000_eventos_y_notas.
--
-- ⚠️ A DIFERENCIA DEL DE DEVOLUCIONES, ESTE ROLLBACK BORRA DATOS DE UNA TABLA
-- EXISTENTE: los eventos personalizados viven en ActividadOperaciones, que es
-- la bitácora de operaciones. Si se revierte con eventos ya creados, se
-- pierden. Revertir el mismo día que se aplica no pierde nada.
--
-- Antes de revertir con datos dentro, vale la pena medir qué se va:
--   SELECT COUNT(*) FROM ActividadOperaciones a
--     JOIN CatalogoActividadOperaciones t ON t.id = a.tipoId
--     JOIN CatalogoCategoriasActividadOperaciones c ON c.id = t.categoriaId
--    WHERE c.clave = 'EVP';

-- 1. Los eventos, antes que sus tipos, y los tipos antes que la categoría:
--    cada uno es llave foránea del siguiente.
DELETE a FROM `ActividadOperaciones` a
  JOIN `CatalogoActividadOperaciones` t ON t.`id` = a.`tipoId`
  JOIN `CatalogoCategoriasActividadOperaciones` c ON c.`id` = t.`categoriaId`
 WHERE c.`clave` = 'EVP';

DELETE t FROM `CatalogoActividadOperaciones` t
  JOIN `CatalogoCategoriasActividadOperaciones` c ON c.`id` = t.`categoriaId`
 WHERE c.`clave` = 'EVP';

DELETE FROM `CatalogoCategoriasActividadOperaciones` WHERE `clave` = 'EVP';

-- 2. La columna del catálogo.
ALTER TABLE `CatalogoActividadOperaciones` DROP COLUMN `activo`;

-- 3. Las notas.
DROP TABLE IF EXISTS `PedidoNota`;

-- Restablece el default de Clientes.cobrosPermitidos a 1.
--
-- La migración 20260311144713_cobros_max ya lo había puesto en true en marzo,
-- pero la columna volvió a DEFAULT 0 en algún momento posterior — con toda
-- probabilidad por un `db push` desde hawk2admin, cuyo schema declaraba
-- @default(false). El portal siguió insertando 1 porque Prisma manda su propio
-- @default(true) en el INSERT, así que el desvío no se notó.
--
-- Evidencia de que el comportamiento correcto es 1 (verificado 2026-08-23):
--   * cobrosPermitidos = 1 -> 53,062 clientes, hasta uno registrado hoy
--   * cobrosPermitidos = 0 ->     31 clientes, todos entre el 9 y el 11 de
--     marzo de 2026, o sea la ventana previa a que corriera cobros_max
--
-- Importa aunque Prisma lo sobreescriba: cualquier alta que no pase por el
-- portal —el sistema legacy, una carga manual— sí toma el default de la
-- columna, y hoy nacería sin acceso al servicio de cobros.
--
-- No toca ninguna fila existente.

ALTER TABLE `Clientes`
  MODIFY `cobrosPermitidos` BOOLEAN NOT NULL DEFAULT true;

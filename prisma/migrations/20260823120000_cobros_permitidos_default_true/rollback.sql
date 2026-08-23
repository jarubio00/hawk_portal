-- Revierte el default de Clientes.cobrosPermitidos al estado en que estaba
-- antes de esta migración. No cambia el valor de ninguna fila.
--
-- Ojo: volver a false reinstala la mina que veníamos a quitar. Cualquier alta
-- que no pase por el cliente Prisma del portal crearía el cliente con COD
-- bloqueado, sin error y sin aviso.

ALTER TABLE `Clientes`
  MODIFY `cobrosPermitidos` BOOLEAN NOT NULL DEFAULT false;

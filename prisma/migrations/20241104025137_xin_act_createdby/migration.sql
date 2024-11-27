-- AddForeignKey
ALTER TABLE `ActividadOperaciones` ADD CONSTRAINT `ActividadOperaciones_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `UsuariosHawk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

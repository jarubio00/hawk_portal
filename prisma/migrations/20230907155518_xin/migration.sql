-- AddForeignKey
ALTER TABLE `AppRoute` ADD CONSTRAINT `AppRoute_operadorId_fkey` FOREIGN KEY (`operadorId`) REFERENCES `Operadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuariosHawk` ADD CONSTRAINT `UsuariosHawk_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `CatalogoUsuariosEmpresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuariosHawk` ADD CONSTRAINT `UsuariosHawk_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `CatalogoUsuariosAreas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuariosHawk` ADD CONSTRAINT `UsuariosHawk_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `CatalogoUsuariosDepartamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuariosHawk` ADD CONSTRAINT `UsuariosHawk_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `CatalogoUsuariosTipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

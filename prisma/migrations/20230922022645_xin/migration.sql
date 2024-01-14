-- CreateIndex
CREATE FULLTEXT INDEX `Clientes_nombre_idx` ON `Clientes`(`nombre`);

-- CreateIndex
CREATE FULLTEXT INDEX `Clientes_nombre_email_idx` ON `Clientes`(`nombre`, `email`);

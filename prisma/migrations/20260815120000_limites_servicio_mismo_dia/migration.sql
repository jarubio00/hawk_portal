-- Límite diario de servicios de mismo día.
--
-- La ausencia de una fila que cubra una fecha significa "sin límite", que es el
-- estado normal. Así no hay que interpretar un 0 ni acordarse de apagar una
-- bandera cuando termina la temporada.
--
-- El rango es por periodo y no por día porque operaciones ya razona así
-- ("bloquear todo el mes"): una fila cubre una semana o un mes completo.
--
-- Si dos rangos activos cubren la misma fecha gana el más restrictivo.

CREATE TABLE `LimitesServicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaInicio` DATE NOT NULL,
    `fechaFin` DATE NOT NULL,
    `servicio` ENUM('REC', 'ENT', 'MD', 'TODO') NOT NULL DEFAULT 'MD',
    `limite` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `motivo` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    INDEX `LimitesServicio_rango_idx`(`servicio`, `activo`, `fechaInicio`, `fechaFin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- El conteo de mismo día filtra por Recolecciones.fecha, que hoy no tiene
-- índice: solo clienteId, estatusRecoleccionId y municipioId.
CREATE INDEX `Recolecciones_fecha_idx` ON `Recolecciones`(`fecha`);

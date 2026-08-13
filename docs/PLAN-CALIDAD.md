# Plan de Calidad y Observabilidad — hawk_portal

**Estado:** 🧊 **CONGELADO** el 2026-08-13, tras completar la Fase 0 · **Responsable:** @jarubio00
**Regla:** ninguna fase con costo de licencia arranca sin autorización explícita del cliente.

> **Para retomar este plan en otra sesión, empieza por la sección 8.**
> No hay trabajo a medias: la Fase 0 quedó cerrada y ninguna otra fase se inició.
> No se modificó código fuente — lo único que se agregó fue `docs/`.

---

## 1. Objetivo

Dejar el proyecto en condiciones de ser monitoreado de forma útil. Hoy no lo está: el intento
previo de integrar Sentry se abandonó porque el ruido hacía imposible distinguir los errores
reales. La causa raíz no era Sentry — era el estado del código.

Por eso el orden es: **primero limpiar, después instrumentar.**

---

## 2. Línea base medida (2026-08-13)

| Métrica | Valor |
|---|---|
| Archivos fuente (`.ts/.tsx/.js/.jsx`) | 512 |
| Líneas de código (`.ts/.tsx` en app, components, lib, pages) | 58,506 |
| Errores de TypeScript (`tsc --noEmit`) | **45** |
| Errores de ESLint `react-hooks/rules-of-hooks` | **30** |
| Warnings `react-hooks/exhaustive-deps` | 92 |
| Warnings `@next/next/no-img-element` | 29 |
| Archivos de respaldo/muertos identificados por nombre | **36** + carpeta `baks/` (5) |
| Dependencias faltantes | 1 (`vaul`) |
| Dependencias sospechosas de instalación accidental | 1 (`or`) |

### Hallazgo clave: los candados están puestos

[next.config.js](../next.config.js) tiene ambas válvulas de escape activas:

```js
eslint:     { ignoreDuringBuilds: true }
typescript: { ignoreBuildErrors: true }   // "!! WARN !!" en el propio comentario
```

Esto es lo que permitió que 45 errores de tipos y 30 violaciones de reglas de hooks llegaran
a producción sin que nadie se enterara. Cerrar estos candados es el criterio de éxito del plan.

### Buena noticia

45 errores en 58k líneas es **mucho menos de lo esperado**, y ~20 de ellos están en archivos
que ya son basura. El trabajo real es más chico de lo que parecía.

---

## 3. Fases

### Fase 0 — Línea base ✅ COMPLETADA (2026-08-13)

- [x] Conteo de archivos y LOC
- [x] `tsc --noEmit` → 45 errores catalogados
- [x] `next lint` → 151 hallazgos catalogados
- [x] Inventario de archivos muertos
- [x] Evaluación de opciones de Sentry y alternativas

---

### Fase 1 — Poda de código muerto

**Costo:** $0 · **Riesgo:** bajo · **Autorización cliente:** no requerida
**Impacto:** elimina ~20 de los 45 errores de TS y 16 de los 30 de hooks, sin tocar una línea de código vivo.

Trabajar en rama `chore/limpieza-codigo-muerto`. Un commit por grupo, para poder revertir granular.

- [ ] **1.1** Verificar con `grep` que ningún archivo del inventario está importado en código vivo
      (antes de borrar nada). Los que sí lo estén, salen de la lista y se documentan aquí.
- [ ] **1.2** Borrar las 9 variantes muertas de `Programacion` en `app/portal/crear/steps/`.
      **Ya verificado:** solo `ProgramacionV2.tsx` está importado (desde `CrearPedidoWidget.tsx`,
      `CreandoPedidoModal.tsx` y `portal/pro/page.tsx`). Las otras 9 no tienen ninguna referencia:
      `Programacion.tsx`, `Programacion_SINEXPRESS.tsx`, `Programacion_conbloque1.tsx`,
      `zBak_27sep_completo_*`, `zBak_Completo_*`, `zBak_SinAuto_*`, `zBak_autoNuevo_*`,
      `zBak_autoorig_*`, `z_Programacion_2bloques.tsx`
- [ ] **1.3** Borrar los ~26 archivos restantes con patrón `copy` / `bak` / `zBak_` / `z_old_` /
      `_bakv1` en `app/`, `components/` y `pages/`
- [ ] **1.4** Borrar la carpeta `baks/` (schemas de Prisma históricos + `PrintManager.tsx`).
      El histórico ya está en git.
- [ ] **1.5** Borrar los restos del intento previo de Sentry: `next.config-sentry.js` y
      `instrumentation.ts` (importa `sentry.server.config` / `sentry.edge.config`, que no existen)
- [ ] **1.6** Limpiar `tsconfig.json`: quitar del `include` los 3 archivos `.js` listados a mano
      si quedaron huérfanos
- [ ] **1.7** Quitar la dependencia `or` de `package.json` (instalación accidental, sin uso)

**Criterio de aceptación:** `npm run build` completa igual que antes; el flujo de crear pedido
funciona en dev; `tsc --noEmit` baja de 45 a ~25 errores.

---

### Fase 2 — Errores reales de TypeScript

**Costo:** $0 · **Riesgo:** medio (son bugs reales, hay que entender el dominio) · **Autorización:** no requerida

Estos **no** son ruido de tipos: varios son bugs de runtime que hoy están vivos en producción.

#### 2.1 Desalineación con el esquema de Prisma (bugs reales)

- [ ] `app/api/colonias/[cpId]/route.ts:45` — se lee `municipio_id`, campo que **no existe** en el
      modelo. Hoy devuelve `undefined` a los clientes. Verificar si el campo se renombró a `municipioId`.
- [ ] `app/api/colonias/[cpId]/route.ts:50` — falta la propiedad `custom` requerida
- [ ] `app/api/cod/dashboard/route.ts:178` — se lee `severity` en `Cod2Issue`, campo inexistente
- [ ] `app/portal/cod/client/components/CodClientDashboard.tsx:119,136` — se leen `pendingCharges`
      y `activeCharges`, que no existen en el objeto retornado. Probable render de `undefined`.

#### 2.2 Violaciones de contrato de Next.js App Router

- [ ] `app/api/pedidos/route.ts` y `app/api/pedidos/counts/route.ts` exportan `getSession`.
      Los route handlers **solo** pueden exportar verbos HTTP y config. Mover a `lib/`.

#### 2.3 Dependencia faltante

- [ ] `vaul` está importado por `components/ui/drawer.tsx` y `drawer-sidebar.tsx` pero **no está
      instalado**. Decidir: instalarlo o borrar ambos componentes si no se usan.

#### 2.4 Props y tipos menores

- [ ] `app/components/homePage/SectionCotizar.tsx:18` — falta prop requerida `errors`
- [ ] `app/portal/adm/miperfil/page.tsx:23` — falta prop requerida `searchParams`
- [ ] `app/portal/components/welcome/phoneConfirm/PhoneConfirmForm.tsx:12-13` — importa
      `../../inputs/FormInput` y `../../Heading`, ninguno existe. Probablemente el archivo es muerto → verificar en Fase 1.
- [ ] 5× `Parameter 'theme' implicitly has an 'any' type` en componentes MUI de
      `app/components/portal/` — tipar con `Theme` de MUI
- [ ] `components/ui/alert-dialog.tsx` y `sheet.tsx` — `className` en el Portal de Radix (cosmético)
- [ ] `app/components/portal/BuscarCodigo.tsx:84` — genéricos del cliente de Algolia (cosmético)

**Criterio de aceptación:** `npx tsc --noEmit` sale limpio, salida 0.

---

### Fase 3 — Cerrar los candados del build 🔒

**Costo:** $0 · **Autorización:** no requerida · **Depende de:** Fase 2 completa

- [ ] Quitar `typescript.ignoreBuildErrors` de [next.config.js](../next.config.js)
- [ ] Quitar `eslint.ignoreDuringBuilds` de [next.config.js](../next.config.js)

Esta es la fase que hace que el trabajo **no se degrade**. Sin ella, en tres meses volvemos
al punto de partida.

---

### Fase 4 — Violaciones de reglas de hooks

**Costo:** $0 · **Riesgo:** medio-alto (toca lógica viva del flujo de pedidos) · **Autorización:** no requerida

De las 30 violaciones, 16 desaparecen con la Fase 1. Quedan **14 reales**, todas concentradas
en el flujo de creación de pedido — el camino crítico de los 1,200 pedidos diarios.

- [ ] `useDrawer` llamado dentro de callbacks — 9 casos:
      `DestinoDrawer.tsx` (×2), `DireccionDrawer.tsx`, `PaqueteDrawer.tsx` (×2),
      `UtilDrawer.tsx`, `Destino.tsx`, `Paquete.tsx`, `Recoleccion.tsx`
- [ ] `useTimer` llamado dentro de `handleTimerOn`/`handleTimerOff` en `Programacion.tsx`
      (revisar si `ProgramacionV2.tsx` heredó el patrón)
- [ ] `useState` dentro de un callback en `app/components/drawer/MainDrawer.tsx:48`
- [ ] `useCp` dentro de callbacks en `app/components/portal/BuscarCodigo.tsx:52,70`
- [ ] `app/customers/page.tsx:10` — componente cliente declarado `async`

**Nota:** si `useDrawer` es un store de Zustand, la corrección suele ser usar
`useDrawer.getState()` fuera del render. Confirmar antes de tocar.

---

### Fase 5 — Triage de `exhaustive-deps` (92 warnings)

**Costo:** $0 · **Autorización:** no requerida

**No arreglar los 92 a ciegas** — añadir dependencias sin entender el efecto es la forma más
rápida de introducir loops infinitos de render.

- [ ] Clasificar los 92 en: (a) stale closure real, (b) intencional y suprimible con comentario,
      (c) requiere refactor
- [ ] Atacar solo la categoría (a), priorizando el flujo de crear pedido y los módulos COD

---

### Fase 6 — Endurecer el tooling

**Costo:** $0 · **Autorización:** no requerida

Hoy `.eslintrc.json` solo extiende `next/core-web-vitals`. No detecta variables ni imports sin
usar, que es exactamente por qué el código muerto se acumuló sin ruido.

- [ ] Añadir `@typescript-eslint` con `no-unused-vars` y `no-floating-promises`
- [ ] Evaluar `knip` para detección continua de archivos/exports/dependencias muertas
- [ ] Script `npm run check` = `tsc --noEmit && next lint`
- [ ] Definir dónde se ejecuta: pre-commit local o CI (no en el servidor de producción)

---

### Fase 7 — Observabilidad (Sentry) ⚠️ REQUIERE AUTORIZACIÓN DEL CLIENTE

**Depende de:** Fases 1–4 completas · **Ver evaluación completa en la sección 4**

- [ ] **7.0** Presentar costos al cliente y obtener autorización
- [ ] **7.1** Verificar si la org existente `la-mensajeria` ya consumió su trial de 14 días
- [ ] **7.2** Definir política de scrubbing de PII (25k clientes: nombres, teléfonos,
      direcciones, datos de MercadoPago) y región de datos (US/EU)
- [ ] **7.3** Definir dónde se hace el build y desde ahí subir los source maps
      (**no** compilar en el servidor de producción)
- [ ] **7.4** Instalar `@sentry/nextjs` con filtrado agresivo desde el commit inicial
- [ ] **7.5** Arrancar trial Business de 14 días y medir volumen real
- [ ] **7.6** Convertir cada descarte en regla permanente (`ignoreErrors`/`beforeSend`/Inbound Filters)
- [ ] **7.7** Decidir plan definitivo con el dato medido

---

## 4. Evaluación de costos — para autorización del cliente

### Fases 1 a 6: **$0 en licencias.** Solo tiempo de desarrollo.

### Fase 7 — Opciones de monitoreo

| Opción | Costo mensual | Costo anual | Notas |
|---|---|---|---|
| Sentry Developer (free) | $0 | $0 | 5k errores/mes, 1 usuario, solo alertas por email, 30 días de retención |
| **Sentry Team** | **$26 USD** (anual) / $29 (mensual) | **~$312 USD** | 50k errores, usuarios ilimitados, integraciones, 90 días |
| Sentry Business | $80 USD (anual) | ~$960 USD | Añade Delete & Discard y dashboards ilimitados |
| GlitchTip self-hosted | $0 licencia | costo del servidor | Compatible con el SDK de Sentry. Sin tracing ni replay. |
| PostHog | $0 hasta 100k excepciones/mes | $0 | Incluye analítica de producto |

**Garantía de no exceder el presupuesto en Sentry Team:**
el pay-as-you-go es *opt-in*. Si no se configura presupuesto PAYG, al agotar la cuota los
eventos simplemente se descartan — **no hay cobro sorpresa posible**. Adicionalmente se activa
Spike Protection por proyecto y alerta de cuota al 80%.

**Cobertura recomendada:** Sentry Team, ~$312 USD/año.

**Decisión de arquitectura que mantiene la puerta abierta:** instalar el SDK con el DSN en
variable de entorno. GlitchTip y Bugsink usan el mismo protocolo de ingesta, así que migrar
es cambiar una variable — cero refactor. No hay lock-in.

---

## 5. Restricciones operativas (no negociables)

- **El entorno de desarrollo apunta a la BD de producción.** Nunca `prisma migrate dev` ni
  `migrate deploy`. El flujo es SQL manual + `prisma migrate resolve`.
- **No compilar en el servidor de producción.** Un `npm run build` en hawk-prod tumbó el login.
  El build (y la subida de source maps) va en otro lado.
- Las Fases 1–4 tocan el flujo de creación de pedido: 1,200 pedidos/día. Cada fase va en rama
  propia con prueba manual del flujo completo antes de mezclar.

---

## 6. Tablero de seguimiento

| Fase | Estado | Autorización | Errores TS restantes | Notas |
|---|---|---|---|---|
| 0 · Línea base | ✅ Completada | — | 45 (base) | 2026-08-13 |
| 1 · Poda de código muerto | ⬜ Pendiente | No requerida | objetivo ~25 | |
| 2 · Errores TS reales | ⬜ Pendiente | No requerida | objetivo 0 | |
| 3 · Cerrar candados del build | ⬜ Pendiente | No requerida | 0 | Depende de F2 |
| 4 · Rules of hooks | ⬜ Pendiente | No requerida | — | 14 casos reales |
| 5 · Triage exhaustive-deps | ⬜ Pendiente | No requerida | — | 92 a clasificar |
| 6 · Endurecer tooling | ⬜ Pendiente | No requerida | — | |
| 7 · Sentry | ⬜ Bloqueada | **⚠️ Requerida** | — | Depende de F1–F4 |

---

## 7. Registro de decisiones

| Fecha | Decisión | Razón |
|---|---|---|
| 2026-08-13 | Limpiar el código antes de instrumentar | El intento previo de Sentry se abandonó por exceso de ruido; instrumentar primero repetiría el error |
| 2026-08-13 | Descartar Sentry self-hosted | 40+ contenedores para mantener con un solo desarrollador |
| 2026-08-13 | Descartar Highlight.io | LaunchDarkly lo adquirió y apagó el servicio hosted en feb/2026 |
| 2026-08-13 | Congelar el plan tras la Fase 0 | Entró un fix urgente. No se inició ninguna fase de cambios. |

---

## 8. Cómo retomar este plan

### 8.1 Estado exacto al congelar

- **Fase 0 completada.** Todo lo demás está en ⬜ Pendiente, sin trabajo parcial.
- **Cero cambios en código fuente.** Lo único agregado al repo fue la carpeta `docs/`.
- Rama al congelar: `main`, árbol limpio.

### 8.2 Artefactos de la línea base

Están guardados crudos para poder comparar contra ellos más adelante:

- [`docs/baseline/2026-08-13-tsc.txt`](baseline/2026-08-13-tsc.txt) — salida completa de `tsc --noEmit` (45 errores)
- [`docs/baseline/2026-08-13-eslint.txt`](baseline/2026-08-13-eslint.txt) — salida completa de `next lint` (181 hallazgos)

### 8.3 Comandos para regenerar la línea base y medir el avance

Ejecutar desde la raíz del proyecto, en la máquina de desarrollo:

```bash
# Errores de TypeScript (la métrica principal: 45 al congelar → meta 0)
npx tsc --noEmit --incremental false

# Hallazgos de ESLint (181 al congelar)
npx next lint --format compact

# Inventario de archivos muertos por nombre (36 al congelar)
find app components pages lib -type f \
  \( -name "*copy*" -o -name "*bak*" -o -name "*Bak*" -o -name "z_*" \
     -o -name "z[A-Z]*" -o -name "*_old*" -o -name "*old_*" \) | sort

# Antes de borrar cualquier archivo: confirmar que nadie lo importa
grep -rn "NombreDelArchivoSinExtension" app components pages lib --include="*.ts" --include="*.tsx"
```

> **Ojo:** si al regenerar la línea base los números difieren de los de la sección 2, hubo
> trabajo intermedio. Compara contra los archivos de `docs/baseline/` antes de asumir nada.

### 8.4 Por dónde arrancar

La **Fase 1, tarea 1.1** — verificar por `grep` que los 36 archivos del inventario no están
importados en código vivo. Es la única tarea del plan que no tiene dependencias y es la que
desbloquea el mayor avance con el menor riesgo.

La única tarea ya adelantada de la Fase 1 es la verificación de las variantes de
`Programacion` (tarea 1.2): confirmado que solo `ProgramacionV2.tsx` está importada.
Esa verificación sigue siendo válida mientras nadie toque `app/portal/crear/`.

### 8.5 Contexto que no está en el código

- El intento previo de integrar Sentry (org `la-mensajeria`, proyecto `javascript-nextjs`) se
  **abandonó** porque el ruido impedía distinguir errores reales. Sus restos son
  `next.config-sentry.js` e `instrumentation.ts`, ambos huérfanos.
- Volumen del negocio para dimensionar cuotas: ~25,000 clientes registrados y ~1,200
  pedidos/día. No hay dato de usuarios concurrentes ni de pageviews — obtenerlo de los logs
  del servidor es prerrequisito para decidir el plan de Sentry.
- Los costos de licencia e implementación los autoriza el cliente, no el equipo de desarrollo.

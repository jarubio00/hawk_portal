# Instrucciones del proyecto — hawk_portal

## Flujo de trabajo (obligatorio)

**Analizar → proponer → esperar confirmación → implementar.**

Cuando se pida analizar un problema, evaluar una mejora o corregir un bug:

1. Investigar y entender el problema a fondo.
2. Presentar **el resumen de lo encontrado y el plan propuesto**.
3. **Detenerse y preguntar.** No empezar a modificar archivos.
4. Esperar a que el plan se discuta y se confirme explícitamente.
5. Recién entonces implementar.

El objetivo es tener tiempo de discutir el enfoque antes de que existan cambios en
disco. Aplica también cuando la solución parece obvia: primero se propone, luego se hace.

Excepción: cuando la instrucción es directamente ejecutar algo ya acordado
("aplica el fix", "haz el commit"), no hace falta volver a proponer.

## Restricciones operativas (no negociables)

- **El entorno de desarrollo apunta a la base de datos de producción.** Nunca ejecutar
  `prisma migrate dev` ni `prisma migrate deploy`. El flujo de cambios de esquema es
  SQL manual + `prisma migrate resolve`.
- **Este repositorio es el dueño del esquema.** La base `hawk_prisma` la comparte con
  hawk2admin, que nunca corre `migrate`: todas las migraciones nacen aquí. Lo que se
  mantiene sincronizado entre los dos es el `schema.prisma`, por unión y no por copia
  (ninguno es superconjunto del otro).
  Antecedente de por qué importa: un `db push` desde hawk2admin revirtió en silencio el
  default de `Clientes.cobrosPermitidos` que este repo había puesto en marzo de 2026.
- **Cuando el esquema declare una columna que aún no existe en la base, no correr
  `prisma generate`.** Prisma selecciona todos los campos escalares declarados, así que
  el cliente generado falla en runtime con `Unknown column`. Primero se aplica el SQL,
  después se genera.
- **El build en el servidor de producción tumba el servidor.** Ha pasado dos veces: el
  `npm run build` satura la máquina y se cae el login (sssd deja de alcanzar el metadata
  server). Si hay que compilar ahí, correrlo con prioridad degradada:
  `nice -n 19 ionice -c 3 npm run build`. Mejor todavía: compilar fuera y subir el
  resultado.
- **No ejecutar queries contra la base sin autorización.** Si hace falta una consulta de
  diagnóstico, escribirla y entregarla para que la ejecute el desarrollador.

## Contexto del proyecto

- Portal de clientes de paquetería (Next.js 14 App Router, Prisma/MySQL, NextAuth).
- ~25,000 clientes registrados, ~1,200 pedidos/día.
- Los costos de licencias e implementación **los autoriza el cliente**, no el equipo
  de desarrollo. Nada con costo arranca sin esa autorización.
- Hay un plan de calidad y observabilidad congelado en [docs/PLAN-CALIDAD.md](docs/PLAN-CALIDAD.md).

## Notas del código

- `next.config.js` tiene `typescript.ignoreBuildErrors` y `eslint.ignoreDuringBuilds`
  activos: **el build no detecta errores de tipos ni de lint**. Verificar siempre con
  `npx tsc --noEmit` antes de dar por buena una corrección.
- El repositorio tiene ~36 archivos de respaldo huérfanos (`*copy*`, `zBak_*`, `z_old_*`).
  Al buscar dónde se usa algo, confirmar que el archivo encontrado esté realmente
  importado antes de trabajar sobre él.
- API externa: `hawkapi.lamensajeria.mx` — backend separado, fuera de este repositorio.

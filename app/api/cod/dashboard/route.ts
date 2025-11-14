import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Cod2ChargeStatus } from "@/app/portal/cod/client/types";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const clienteId = searchParams.get("clienteId");

    if (!clienteId) {
      return NextResponse.json(
        { error: "Cliente ID is required" },
        { status: 400 }
      );
    }

    /**
     * IMPORTANTE: Flujo de activeAnchorAt y períodos de liquidación
     *
     * activeAnchorAt representa la fecha del ÚLTIMO CORTE (settlement) realizado.
     *
     * Funcionamiento:
     * 1. Cuando se realiza un corte (settlement):
     *    - Si hay cobros pendientes (not collected): activeAnchorAt = fecha del corte
     *    - Si NO hay cobros pendientes: activeAnchorAt = null
     *
     * 2. El período actual SIEMPRE es:
     *    - Inicio: activeAnchorAt (fecha del último corte)
     *    - Fin: activeAnchorAt + 7 días
     *    - Si activeAnchorAt es null: no hay período activo
     *
     * 3. NO es necesario calcular múltiples períodos o usar periodNumber.
     *    Cada vez que se genera un settlement, activeAnchorAt se actualiza.
     *
     * 4. Los cobros del período actual son:
     *    - Creados desde activeAnchorAt (createdAt >= activeAnchorAt)
     *    - Sin settlementLine (no liquidados aún)
     */
    const clientSettings = await prisma.cod2ClientSettings.findUnique({
      where: { clienteId: parseInt(clienteId) },
      select: { activeAnchorAt: true },
    });

    const today = new Date();

    // Período actual: desde activeAnchorAt hasta activeAnchorAt + 7 días
    const currentPeriodStart = clientSettings?.activeAnchorAt
      ? new Date(clientSettings.activeAnchorAt)
      : null;

    const currentPeriodEnd = currentPeriodStart
      ? new Date(currentPeriodStart.getTime() + 7 * 24 * 60 * 60 * 1000)
      : null;

    // Obtener todos los cobros del cliente que NO han sido incluidos en un settlement
    // (Los cobros con settlementLine ya fueron liquidados)
    const charges = await prisma.cod2Charge.findMany({
      where: {
        clienteId: parseInt(clienteId),
        settlementLine: null, // Excluir cobros ya incluidos en un settlement
      },
      include: {
        attempts: true,
        payment: true,
        issues: {
          where: {
            status: "OPEN",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`[COD_DASHBOARD] Cliente ${clienteId}: encontrados ${charges.length} cobros`);
    if (charges.length > 0) {
      console.log(`[COD_DASHBOARD] Primer cobro:`, {
        id: charges[0].id,
        pedidoId: charges[0].pedidoId,
        amountRequested: charges[0].amountRequested,
        amountCollected: charges[0].amountCollected,
        status: charges[0].status,
      });
    }

    // Filtrar cobros del período actual
    // Período = desde activeAnchorAt (último corte) hasta hoy
    // Los cobros con settlementLine ya fueron excluidos en la query anterior
    const currentPeriodCharges = charges.filter((c) => {
      // Si no hay activeAnchorAt (sin período activo), incluir todos los cobros
      if (!currentPeriodStart) return true;

      // Incluir solo cobros creados desde el último corte (activeAnchorAt)
      const chargeDate = new Date(c.createdAt);
      return chargeDate >= currentPeriodStart;
    });

    // Calcular estadísticas del período actual (montos en centavos, dividir entre 100)
    const totalRequested = currentPeriodCharges.reduce(
      (sum, charge) => sum + parseFloat(charge.amountRequested.toString()) / 100,
      0
    );
    const totalCollected = currentPeriodCharges.reduce(
      (sum, charge) => sum + parseFloat(charge.amountCollected.toString()) / 100,
      0
    );

    // Tarjeta 1: Periodo Actual - Total de cobros (excluyendo CANCELLED y UNCOLLECTIBLE)
    const totalChargesCount = currentPeriodCharges.filter(
      (c) =>
        c.status !== Cod2ChargeStatus.CANCELLED &&
        c.status !== Cod2ChargeStatus.UNCOLLECTIBLE
    ).length;

    // Tarjeta 2: En Resguardo - Solo HANDED_IN (confirmados por supervisor)
    const handedInCharges = currentPeriodCharges.filter(
      (c) => c.status === Cod2ChargeStatus.HANDED_IN
    );
    const totalHandedIn = handedInCharges.reduce(
      (sum, charge) => sum + parseFloat(charge.amountCollected.toString()) / 100,
      0
    );
    const handedInCount = handedInCharges.length;

    // Tarjeta 3: En Revisión - COLLECTED y PARTIALLY_COLLECTED (cobrados pero no entregados)
    const inReviewCharges = currentPeriodCharges.filter(
      (c) =>
        c.status === Cod2ChargeStatus.COLLECTED ||
        c.status === Cod2ChargeStatus.PARTIALLY_COLLECTED
    );
    const totalInReview = inReviewCharges.reduce(
      (sum, charge) => sum + parseFloat(charge.amountCollected.toString()) / 100,
      0
    );
    const inReviewCount = inReviewCharges.length;

    // Tarjeta 4: Por Cobrar - INITIATED, IN_ROUTE, ATTEMPTED
    const pendingChargesData = currentPeriodCharges.filter(
      (c) =>
        c.status === Cod2ChargeStatus.INITIATED ||
        c.status === Cod2ChargeStatus.IN_ROUTE ||
        c.status === Cod2ChargeStatus.ATTEMPTED
    );
    const totalPending = pendingChargesData.reduce(
      (sum, charge) => sum + parseFloat(charge.amountRequested.toString()) / 100,
      0
    );
    const pendingCount = pendingChargesData.length;

    // Gráfica Pie - Cancelados (solo los creados en el período actual)
    // Ya están filtrados por currentPeriodCharges que usa createdAt >= activeAnchorAt
    const cancelledCharges = currentPeriodCharges.filter(
      (c) =>
        c.status === Cod2ChargeStatus.CANCELLED ||
        c.status === Cod2ChargeStatus.UNCOLLECTIBLE
    );
    const cancelledCount = cancelledCharges.length;

    // Agrupar cobros por estado
    const chargesByStatus = Object.values(Cod2ChargeStatus).map((status) => {
      const statusCharges = charges.filter((c) => c.status === status);
      const amount = statusCharges.reduce(
        (sum, charge) => sum + parseFloat(charge.amountRequested.toString()) / 100,
        0
      );
      return {
        status,
        count: statusCharges.length,
        amount,
      };
    }).filter((item) => item.count > 0);

    // Contar issues abiertas
    const allIssues = charges.flatMap((c) => c.issues || []);
    const criticalIssues = allIssues.filter(
      (issue) => issue.severity === "CRITICAL"
    ).length;

    // Calcular días restantes hasta el próximo corte (activeAnchorAt + 7 días)
    // Si no hay activeAnchorAt, mostrar 0 días restantes
    const daysRemaining = currentPeriodEnd
      ? Math.max(
          0,
          Math.ceil(
            (currentPeriodEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : 0;

    const commissionRate = 0.05; // 5% de comisión (ajustar según negocio)
    const grossTotal = totalCollected;
    const commissionTotal = grossTotal * commissionRate;
    const netTotal = grossTotal - commissionTotal;

    // Construir respuesta
    const stats = {
      currentPeriod: {
        totalRequested,
        totalCollected,
        totalChargesCount, // Tarjeta 1: Total de cobros activos
        daysRemaining, // Tarjeta 1: Días restantes del período
        totalHandedIn, // Tarjeta 2: Monto en resguardo
        handedInCount, // Tarjeta 2: Cantidad en resguardo
        totalInReview, // Tarjeta 3: Monto en revisión
        inReviewCount, // Tarjeta 3: Cantidad en revisión
        totalPending, // Tarjeta 4: Monto por cobrar
        pendingCount, // Tarjeta 4: Cantidad por cobrar
      },
      pieChart: {
        confirmed: handedInCount, // HANDED_IN
        inReview: inReviewCount, // COLLECTED + PARTIALLY_COLLECTED
        pending: pendingCount, // INITIATED + IN_ROUTE + ATTEMPTED
        cancelled: cancelledCount, // CANCELLED + UNCOLLECTIBLE
      },
      nextSettlement: {
        periodStart: currentPeriodStart?.toISOString() || null,
        dueDate: currentPeriodEnd?.toISOString() || null,
        daysRemaining,
        grossTotal,
        commissionTotal,
        netTotal,
      },
      chargesByStatus,
      openIssues: {
        total: allIssues.length,
        critical: criticalIssues,
      },
    };

    return NextResponse.json({ stats, charges });
  } catch (error) {
    console.error("[COD_DASHBOARD_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

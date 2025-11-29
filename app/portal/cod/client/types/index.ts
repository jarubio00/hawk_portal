// Enums de COD v2
export enum Cod2ChargeStatus {
  INITIATED = "INITIATED",
  IN_ROUTE = "IN_ROUTE",
  ATTEMPTED = "ATTEMPTED",
  PARTIALLY_COLLECTED = "PARTIALLY_COLLECTED",
  COLLECTED = "COLLECTED",
  CANCELLED = "CANCELLED",
  UNCOLLECTIBLE = "UNCOLLECTIBLE",
  HANDED_IN = "HANDED_IN",
  SETTLED_TO_CLIENT = "SETTLED_TO_CLIENT",
}

export enum Cod2AttemptResult {
  SUCCESS = "SUCCESS",
  PARTIAL = "PARTIAL",
  FAILED = "FAILED",
}

export enum Cod2PayoutMethod {
  DEPOSITO_BANCO = "DEPOSITO_BANCO",
  DEPOSITO_CONVENIENCIA = "DEPOSITO_CONVENIENCIA",
  RECOGER_EN_OFICINA = "RECOGER_EN_OFICINA",
}

export enum Cod2SettlementStatus {
  DRAFT = "DRAFT",
  GENERATED = "GENERATED",
  APPROVED = "APPROVED",
  PAID = "PAID",
  RECONCILED = "RECONCILED",
}

export enum Cod2IssueType {
  AMOUNT_LESS = "AMOUNT_LESS",
  AMOUNT_MORE = "AMOUNT_MORE",
  REFUSED_TO_PAY = "REFUSED_TO_PAY",
  RECIPIENT_ABSENT = "RECIPIENT_ABSENT",
  INCORRECT_ADDRESS = "INCORRECT_ADDRESS",
  COUNTERFEIT_BILL = "COUNTERFEIT_BILL",
  OTHER = "OTHER",
}

export enum Cod2IssueStatus {
  OPEN = "OPEN",
  IN_REVIEW = "IN_REVIEW",
  RESOLVED = "RESOLVED",
  DISMISSED = "DISMISSED",
}

// Interfaces
export interface Cod2Charge {
  id: string;
  pedidoId: number;
  clienteId: number;
  courierId: number | null;
  amountRequested: number;
  amountCollected: number;
  status: Cod2ChargeStatus;
  createdAt: Date;
  updatedAt: Date;
  attempts?: Cod2Attempt[];
  payment?: Cod2Payment;
  issues?: Cod2Issue[];
}

export interface Cod2Attempt {
  id: string;
  cod2ChargeId: string;
  attemptedAt: Date;
  result: Cod2AttemptResult;
  amount: number;
  reason: string | null;
  geotagLat: number | null;
  geotagLng: number | null;
  evidenceUrl: string | null;
  createdBy: number;
}

export interface Cod2Payment {
  id: string;
  cod2ChargeId: string;
  method: string;
  amount: number;
  collectedAt: Date;
  collectedBy: number;
  handedIn: boolean;
  handedInAt: Date | null;
  notes: string | null;
  officeCountedAmount: number | null;
  officeNotes: string | null;
  officeCountedAt: Date | null;
  officeCountedBy: number | null;
}

export interface Cod2Issue {
  id: string;
  cod2ChargeId: string;
  cod2AttemptId: string | null;
  cod2PaymentId: string | null;
  type: Cod2IssueType;
  status: Cod2IssueStatus;
  description: string | null;
  evidenceUrl: string | null;
  createdAt: Date;
  createdBy: number | null;
  updatedAt: Date;
  resolvedAt: Date | null;
  resolvedBy: number | null;
  resolutionNote: string | null;
}

export interface Cod2Settlement {
  id: string;
  clienteId: number;
  periodStart: Date;
  periodEnd: Date;
  payoutMethod: Cod2PayoutMethod;
  status: Cod2SettlementStatus;
  grossTotal: number;
  commissionTotal: number;
  feesTotal: number;
  netTotal: number;
  generatedAt: Date | null;
  approvedAt: Date | null;
  paidAt: Date | null;
  reconciledAt: Date | null;
  notes: string | null;
  lines?: Cod2SettlementLine[];
  payouts?: Cod2Payout[];
}

export interface Cod2SettlementLine {
  id: string;
  settlementId: string;
  cod2ChargeId: string;
  amountCollected: number;
  commission: number;
  lineNet: number;
  notes: string | null;
}

export interface Cod2Payout {
  id: string;
  settlementId: string;
  method: Cod2PayoutMethod;
  amount: number;
  feeApplied: number;
  executedAt: Date | null;
  reference: string | null;
  status: string;
  notes: string | null;
  assignedCourierId: number | null;
  dueAt: Date | null;
  receiptUrl: string | null;
  amountDeposited: number | null;
}

export interface Cod2ClientSettings {
  id: number;
  clienteId: number;
  defaultPayoutMethod: Cod2PayoutMethod;
  activeAnchorAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard data types
export interface DashboardStats {
  currentPeriod: {
    totalRequested: number;
    totalCollected: number;
    totalChargesCount: number; // Tarjeta 1: Total de cobros activos
    daysRemaining: number; // Tarjeta 1: Días restantes
    totalHandedIn: number; // Tarjeta 2: Monto en resguardo
    handedInCount: number; // Tarjeta 2: Cantidad en resguardo
    totalInReview: number; // Tarjeta 3: Monto en revisión
    inReviewCount: number; // Tarjeta 3: Cantidad en revisión
    totalPending: number; // Tarjeta 4: Monto por cobrar
    pendingCount: number; // Tarjeta 4: Cantidad por cobrar
  };
  pieChart: {
    confirmed: number; // HANDED_IN
    inReview: number; // COLLECTED + PARTIALLY_COLLECTED
    pending: number; // INITIATED + IN_ROUTE + ATTEMPTED
    cancelled: number; // CANCELLED + UNCOLLECTIBLE
  };
  nextSettlement: {
    periodStart: Date;
    dueDate: Date;
    grossTotal: number;
    commissionTotal: number;
    netTotal: number;
    daysRemaining: number;
  };
  chargesByStatus: {
    status: Cod2ChargeStatus;
    count: number;
    amount: number;
  }[];
  openIssues: {
    total: number;
    critical: number;
  };
}

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.cod2Config.upsert({
    where: { id: 1 },
    update: {
      commissionPct: "0.0450",
      bankFee: 68,
      convenienceFee: 12,
      courierTimezone: "America/Monterrey",
    },
    create: {
      id: 1,
      commissionPct: "0.0450",
      bankFee: 68,
      convenienceFee: 12,
      courierTimezone: "America/Monterrey",
    },
  });

  console.log("✔ Cod2Config inicial listo");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

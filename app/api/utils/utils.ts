import getCurrentUser from "@/app/actions/getCurrentUser";
import { subHours } from "date-fns";

export async function cl(type: string, log: any) {
  const currentUser = await getCurrentUser();
  const fecha = new Date();
  const hoy = subHours(fecha, 6);
  console.log(
    `${fecha.toISOString()} | ${hoy.toISOString()} |${
      currentUser?.id ?? "noid"
    } | ${currentUser?.email ?? "noemail"} | ${type} |-> ${log}`
  );
}

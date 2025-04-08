"use server";

export default async function getDirecciones() {
  try {
    const serverDate = new Date();
    console.log("date action");
    console.log(serverDate);

    return serverDate;
  } catch (error: any) {
    throw new Error(error);
  }
}

"use server";

export default async function getDirecciones() {
  try {
    const serverDate = new Date();

    return serverDate;
  } catch (error: any) {
    throw new Error(error);
  }
}

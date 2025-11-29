import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// GET - Obtener el estado del checklist de cobros del usuario
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Verificar si el usuario tiene cobros permitidos
    const user = await prisma.user.findUnique({
      where: {
        email: currentUser.email,
      },
      select: {
        cobrosPermitidos: true,
      },
    });

    // Si no tiene cobros permitidos, retornar todo en false
    if (!user?.cobrosPermitidos) {
      return NextResponse.json({
        cobrosEnabled: false,
        displayCobrosDialog: false,
        displayCobrosBanner: false,
      });
    }

    // Buscar el checklist del usuario
    let checklist = await prisma.clientesCobrosChecklist.findUnique({
      where: {
        clienteEmail: currentUser.email,
      },
    });

    // Si no existe, crear uno con valores por defecto
    if (!checklist) {
      checklist = await prisma.clientesCobrosChecklist.create({
        data: {
          clienteEmail: currentUser.email,
          cobrosEnabled: false,
          displayCobrosDialog: true,
          displayCobrosBanner: true,
        },
      });
    }

    return NextResponse.json(checklist);
  } catch (error) {
    console.error("[COD_CHECKLIST_GET]", error);
    return NextResponse.json(
      { error: "Error al obtener el checklist de cobros" },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar el estado del checklist de cobros
export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { cobrosEnabled, displayCobrosDialog, displayCobrosBanner } = body;

    // Validar que al menos un campo esté presente
    if (
      cobrosEnabled === undefined &&
      displayCobrosDialog === undefined &&
      displayCobrosBanner === undefined
    ) {
      return NextResponse.json(
        { error: "Debe proporcionar al menos un campo para actualizar" },
        { status: 400 }
      );
    }

    // Preparar datos a actualizar
    const updateData: any = {};

    if (cobrosEnabled !== undefined) {
      updateData.cobrosEnabled = cobrosEnabled;
      if (cobrosEnabled === true) {
        updateData.cobrosEnabledAt = new Date();
        // Al habilitar el servicio, ocultar dialog y banner
        updateData.displayCobrosDialog = false;
        updateData.displayCobrosBanner = false;
      }
    }

    if (displayCobrosDialog !== undefined) {
      updateData.displayCobrosDialog = displayCobrosDialog;
    }

    if (displayCobrosBanner !== undefined) {
      updateData.displayCobrosBanner = displayCobrosBanner;
    }

    // Actualizar o crear el checklist
    const checklist = await prisma.clientesCobrosChecklist.upsert({
      where: {
        clienteEmail: currentUser.email,
      },
      update: updateData,
      create: {
        clienteEmail: currentUser.email,
        cobrosEnabled: cobrosEnabled ?? false,
        cobrosEnabledAt: cobrosEnabled ? new Date() : null,
        displayCobrosDialog: displayCobrosDialog ?? true,
        displayCobrosBanner: displayCobrosBanner ?? true,
      },
    });

    return NextResponse.json(checklist);
  } catch (error) {
    console.error("[COD_CHECKLIST_PATCH]", error);
    return NextResponse.json(
      { error: "Error al actualizar el checklist de cobros" },
      { status: 500 }
    );
  }
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/app/portal/store/cobros/onboardingStore";

export function CobroDestinatarioLoginDialog() {
  const router = useRouter();
  const { showLoginDialog, deferDialog } = useOnboardingStore();

  const goOnboarding = () => router.push("/portal/cobros/onboarding");

  return (
    <Dialog open={showLoginDialog}>
      <DialogContent
        className="
          p-0 w-[min(92vw,640px)]
          overflow-hidden bg-background
          border-0 ring-0 sm:rounded-xl shadow-lg
        "
      >
        {/* Imagen superior (sin márgenes), con overlay/gradiente */}
        <div className="relative w-full h-[50vh] min-h-[220px] sm:h-[300px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Fimages%2Fcobros1.png?alt=media&token=8bac39b6-936b-4051-ac1b-ab32af75743a"
            alt="Cobros fondo"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay oscuro tipo gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Avatar circular en esquina inferior derecha */}
          <div className="absolute bottom-3 right-3 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-1 shadow-xl border-2 border-white">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Fimages%2Fcobros_avatar.png?alt=media&token=84fa2916-32b2-4a23-adc8-e9923861a7c8"
                alt="Cobros avatar"
                fill
                className="object-contain"
                sizes="128px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Contenido inferior */}
        <div className="p-6 flex flex-col justify-between">
          <DialogHeader className="p-0 space-y-1">
            <DialogTitle className="text-xl">
              ¡Cobro al destinatario disponible!
            </DialogTitle>
            <DialogDescription>
              Ahora puedes programar cobros al destinatario de tus envíos. Te
              depositamos el monto cobrado menos comisión.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 mt-6">
            <Button
              size="lg"
              className="w-full sm:w-auto text-white"
              style={{ backgroundColor: "#eb7711" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#d5670f")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#eb7711")
              }
              onClick={goOnboarding}
            >
              Habilitar
            </Button>

            {/* Botón invisible estilo texto, esquina inferior derecha */}
            <button
              onClick={deferDialog}
              className="text-xs text-muted-foreground hover:underline self-end"
            >
              En otro momento
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/app/portal/store/cobros/onboardingStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CobroDestinatarioBanner() {
  const router = useRouter();
  const { serviceEnabled, showBanner } = useOnboardingStore();

  if (serviceEnabled || !showBanner) return null;

  return (
    <Card className="border-2 border-dashed overflow-hidden">
      <CardContent className="p-4 flex flex-col md:flex-row items-stretch gap-4">
        {/* Imagen con overlay + avatar */}
        <div className="relative w-full md:w-64 h-32 md:h-40 rounded-xl overflow-hidden">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Fimages%2Fcobros1.png?alt=media&token=8bac39b6-936b-4051-ac1b-ab32af75743a"
            alt="Cobro al destinatario"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />

          {/* Avatar circular esquina inferior derecha */}
          <div className="absolute bottom-2 right-2 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white p-1 shadow-lg border border-white">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Fimages%2Fcobros_avatar.png?alt=media&token=84fa2916-32b2-4a23-adc8-e9923861a7c8"
                alt="Cobros avatar"
                fill
                className="object-contain"
                sizes="80px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Texto + botón */}
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-lg font-semibold">
            Ahora puedes programar cobros al destinatario de tus envíos
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Te depositamos el monto cobrado menos comisión. Habilítalo para
            comenzar a usarlo en tus envíos.
          </p>
          <Button
            className="mt-3 text-white"
            style={{ backgroundColor: "#eb7711" }}
            onClick={() => router.push("/portal/cobros/onboarding")}
          >
            Habilitar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useOnboardingStore } from "@/app/portal/store/cobros/onboardingStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Info } from "../components/Info";
import { CalculadoraCobros } from "../components/CalculadoraCobros";

export default function OnboardingCobrosPage() {
  const router = useRouter();
  const { enableService } = useOnboardingStore();
  const [accepted, setAccepted] = useState(false);

  // Tabs: info, instrucciones, calculadora
  const tabKeys = ["info", "instrucciones", "calculadora"] as const;
  type TabKey = (typeof tabKeys)[number];

  const [activeTab, setActiveTab] = useState<TabKey>("info");
  const [visited, setVisited] = useState<Record<TabKey, boolean>>({
    info: false,
    instrucciones: false,
    calculadora: false,
  });

  const handleTabChange = (val: string) => {
    const k = val as TabKey;
    setActiveTab(k);
    setVisited((v) => ({ ...v, [k]: true }));
  };

  const Dot = ({ shown }: { shown: boolean }) => (
    <span
      className={`inline-block w-2 h-2 rounded-full ml-1 align-middle ${
        shown ? "bg-green-500 opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );

  const handleEnable = () => {
    if (!accepted) return;
    enableService({ termsVersion: "v1" });
    router.push("/portal");
  };

  return (
    <div className="container mx-auto p-4 flex flex-col space-y-6">
      <h1 className="text-2xl font-bold text-center">Cobro al destinatario</h1>

      {/* Card: plano en mobile, con estilo en sm+ */}
      <Card className="border-0 shadow-none rounded-none sm:border sm:shadow sm:rounded-lg">
        <CardContent className="px-0 py-4 sm:px-6 sm:py-6 space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            {/* Títulos de Tabs */}
            <TabsList className="inline-flex items-center gap-2 overflow-x-auto whitespace-nowrap w-full sm:w-auto px-1 py-1">
              <TabsTrigger value="info" className="px-3 text-xs sm:text-sm">
                <span>Info</span>
                <span
                  className={`inline-block w-2 h-2 rounded-full ml-1 align-middle ${
                    !visited.info ? "bg-green-500 opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </TabsTrigger>
              <TabsTrigger
                value="instrucciones"
                className="px-3 text-xs sm:text-sm"
              >
                <span>Instrucciones</span>
                <span
                  className={`inline-block w-2 h-2 rounded-full ml-1 align-middle ${
                    !visited.instrucciones
                      ? "bg-green-500 opacity-100"
                      : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </TabsTrigger>
              <TabsTrigger
                value="calculadora"
                className="px-3 text-xs sm:text-sm"
              >
                <span>Calculadora</span>
                <span
                  className={`inline-block w-2 h-2 rounded-full ml-1 align-middle ${
                    !visited.calculadora
                      ? "bg-green-500 opacity-100"
                      : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </TabsTrigger>
            </TabsList>

            {/* Contenidos: cada uno con su propio contenedor */}
            <TabsContent value="info" className="mt-4">
              <div className="min-h-[220px] sm:min-h-[250px] border rounded-lg p-3 sm:p-4">
                <Info />
              </div>
            </TabsContent>

            <TabsContent value="instrucciones" className="mt-4">
              <div className="min-h-[220px] sm:min-h-[250px] border rounded-lg p-3 sm:p-4">
                <p className="text-sm text-muted-foreground">
                  Demo: Instrucciones
                </p>
              </div>
            </TabsContent>

            <TabsContent value="calculadora" className="mt-4">
              <div className="min-h-[220px] sm:min-h-[250px] border rounded-lg p-3 sm:p-4">
                <CalculadoraCobros />
              </div>
            </TabsContent>
          </Tabs>

          {/* Checkbox T&C */}
          <section className="flex items-start gap-3 px-2 sm:px-0">
            <Checkbox
              id="terms"
              checked={accepted}
              onCheckedChange={(v) => setAccepted(!!v)}
            />
            <label htmlFor="terms" className="text-sm leading-tight">
              He leído y acepto los{" "}
              <a
                className="underline"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Términos y Condiciones
              </a>{" "}
              (v1)
            </label>
          </section>

          {/* Botón principal */}
          <div className="flex justify-center px-2 sm:px-0">
            <Button
              disabled={!accepted}
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
              onClick={handleEnable}
            >
              Aceptar y habilitar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// src/pages/SimaPage.tsx
import { useState, useCallback, type JSX } from "react";
import Sidebar from "../components/Sidebar";
import SimaMap from "../components/SimaMap";
import SimaDrawer from "../components/SimaDrawer";
import type { PontoColeta } from "../types/ponto";

type Range = { start?: Date | null; end?: Date | null };

export default function SimaPage(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPonto, setSelectedPonto] = useState<PontoColeta | null>(null);
  const [range, setRange] = useState<Range>({ start: null, end: null });

  const normalizeId = (id: unknown): number | string | undefined => {
    if (id === undefined || id === null) return undefined;
    if (typeof id === "number") return id;
    if (typeof id === "string" && /^\d+$/.test(id)) return Number(id);
    return String(id);
  };

  const handleMarkerClick = useCallback((ponto: PontoColeta) => {
    const normalizedId = normalizeId(ponto.id) ?? ponto.id;

    setSelectedPonto({
      ...ponto,
      id: normalizedId,
      name: ponto.name ?? ponto.rotulo ?? `Ponto ${String(normalizedId)}`,
    });

    setIsDrawerOpen(true);
  }, []);

  const handleDrawerOpenChange = useCallback((open: boolean) => {
    setIsDrawerOpen(open);
    if (!open) setSelectedPonto(null);
  }, []);

  // callback para o sidebar quando o usuário clica num reservatório
  const handleSidebarSelectPoint = useCallback((p: PontoColeta) => {
    const normalizedId = normalizeId(p.id) ?? p.id;
    setSelectedPonto({
      ...p,
      id: normalizedId,
      name: p.name ?? p.rotulo ?? `Ponto ${String(normalizedId)}`,
    });
    setIsDrawerOpen(true);
  }, []);

  return (
    <div className="flex gap-4 min-h-screen">
      {!isDrawerOpen && (
        <Sidebar
          logoSrc="./imagens/Logo-2.png"
          variant="sima"
          onSelectPoint={handleSidebarSelectPoint}
        />
      )}

      <main className={`flex-1 ${isDrawerOpen ? "overflow-hidden" : ""}`}>
        {!isDrawerOpen && (
          <header className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-bold">SIMA</h1>
            <div className="text-sm text-gray-600">
              {selectedPonto
                ? `Ponto selecionado: ${selectedPonto.name ?? selectedPonto.id}`
                : "Clique em um ponto no mapa para ver a tabela"}
            </div>
          </header>
        )}

        <section className="">
          <SimaMap onMarkerClick={handleMarkerClick} />
        </section>

        <SimaDrawer
          open={isDrawerOpen}
          onOpenChange={handleDrawerOpenChange}
          selectedPonto={selectedPonto}
          setSelectedPonto={setSelectedPonto}
          range={range}
          setRange={setRange}
        />
      </main>
    </div>
  );
}

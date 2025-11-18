// src/pages/FurnasMapPage.tsx
import { useParams } from "react-router-dom";
import Map from "@/components/Map";
import { useState, useCallback } from "react";
import FurnasDrawer from "@/components/FurnasDrawer";
import type { PontoColeta } from "@/types/ponto";

type Range = { start?: Date | null; end?: Date | null };

export const FurnasMapPage = () => {
  const { instituicao } = useParams<{ instituicao: string }>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPonto, setSelectedPonto] = useState<PontoColeta | null>(null);
  const [range, setRange] = useState<Range>({ start: null, end: null });

  const handleMarkerClick = useCallback((ponto: PontoColeta) => {
    // normalizar nome e id — prioriza id numérico
    const normalized = {
      ...ponto,
      name: ponto.name ?? ponto.rotulo ?? `Ponto ${ponto.id}`,
      id: ponto.id,
    };
    setSelectedPonto(normalized);
    setIsDrawerOpen(true);
  }, []);

  return (
    <div className="flex gap-4 min-h-screen">
      <Map
        onMarkerClick={handleMarkerClick}
        type="furnas"
        instituicao={instituicao}
      />

      <FurnasDrawer
        open={isDrawerOpen}
        onOpenChange={(v) => setIsDrawerOpen(v)}
        selectedPonto={selectedPonto}
        setSelectedPonto={setSelectedPonto}
        range={range}
        setRange={setRange}
        apiBase={"http://localhost:3001/furnas"}
      />
    </div>
  );
};

export default FurnasMapPage;

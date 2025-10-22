import { useParams } from "react-router-dom";
import Map from "@/components/Map";
import { useState, useCallback } from "react";
import type { PontoColeta } from "@/types/ponto";

export const FurnasMapPage = () => {
  const { instituicao } = useParams<{ instituicao: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPonto, setSelectedPonto] = useState<PontoColeta | null>(null);

  const handleMarkerClick = useCallback((ponto: PontoColeta) => {
    setSelectedPonto({
      ...ponto,
      name: ponto.name ?? ponto.rotulo ?? `Ponto ${ponto.id}`,
    });
    setIsDrawerOpen(true);
  }, []);

  return (
    <div className="flex gap-4 min-h-screen">
      <Map
        onMarkerClick={handleMarkerClick}
        type="furnas"
        instituicao={instituicao} // passamos aqui
      />
    </div>
  );
};

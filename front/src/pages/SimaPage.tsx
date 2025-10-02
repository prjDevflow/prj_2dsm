// src/pages/SimaPage.tsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SimaMap from "../components/SimaMap";
import SimaDrawer from "../components/SimaDrawer.tsx";
 
interface PontoColeta {
  id: number;
  name?: string;
  latitude: number;
  longitude: number;
  type?: string;
}
 
export default function SimaPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPonto, setSelectedPonto] = useState<PontoColeta | null>(null);
  const [range, setRange] = useState<{ start?: Date | null; end?: Date | null }>({});
 
  const handleMarkerClick = (ponto: PontoColeta) => {
    setSelectedPonto(ponto);
    setIsDrawerOpen(true);
  };
 
  return (
    <div className="flex gap-4">
      <Sidebar logoSrc="./imagens/Logo-2.png" variant="sima" />
 
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">SIMA</h1>
 
        {/* mapa centralizado na página (wrapper leve) */}
        <SimaMap onMarkerClick={handleMarkerClick} />
 
        {/* drawer — toda a UI da tabela e filtros fica aqui */}
        <SimaDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          selectedPonto={selectedPonto}
          setSelectedPonto={setSelectedPonto}
          range={range}
          setRange={setRange}
        />
      </main>
    </div>
  );
}
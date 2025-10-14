import { useState, useCallback, type JSX } from "react";
import Sidebar from "../components/Sidebar";
import SimaMap from "../components/SimaMap";
import SimaDrawer from "../components/SimaDrawer";
 
type Range = { start?: Date | null; end?: Date | null };
 
export type PontoColeta = {
  id: number | string;
  name?: string;
  rotulo?: string;
  latitude: number;
  longitude: number;
  type?: string;
};
 
export default function SimaPage(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPonto, setSelectedPonto] = useState<PontoColeta | null>(null);
  const [range, setRange] = useState<Range>({ start: null, end: null });
 
  /**
   * Quando um marker é clicado no mapa:
   * - convertemos id string numérica para number (quando possível)
   * - abrimos o drawer e definimos o ponto selecionado
   */
  const handleMarkerClick = useCallback((ponto: PontoColeta) => {
    const normalizedId =
      typeof ponto.id === "string" && /^\d+$/.test(ponto.id) ? Number(ponto.id) : ponto.id;
 
    setSelectedPonto({
      ...ponto,
      id: normalizedId,
      name: ponto.name ?? ponto.rotulo ?? `Ponto ${normalizedId}`,
    });
 
    setIsDrawerOpen(true);
  }, []);
 
  /**
   * Lidando com abertura/fechamento do Drawer.
   * Ao fechar, limpamos o ponto selecionado.
   */
  const handleDrawerOpenChange = useCallback((open: boolean) => {
    setIsDrawerOpen(open);
    if (!open) setSelectedPonto(null);
  }, []);
 
  return (
    <div className="flex gap-4 min-h-screen">
      {/* Sidebar só aparece se o Drawer estiver fechado */}
      {!isDrawerOpen && <Sidebar logoSrc="./imagens/Logo-2.png" variant="sima" />}
 
      <main className={`flex-1 p-6 ${isDrawerOpen ? "overflow-hidden" : ""}`}>
        {/* Header — só aparece se o Drawer estiver fechado */}
        {!isDrawerOpen && (
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">SIMA</h1>
            <div className="text-sm text-gray-600">
              {selectedPonto ? `Ponto selecionado: ${selectedPonto.name ?? selectedPonto.id}` : "Clique em um ponto no mapa para ver a tabela"}
            </div>
          </header>
        )}
 
        <section className="mb-6">
          {/* Mapa — dispara onMarkerClick quando usuário clica em marcador */}
          <SimaMap onMarkerClick={handleMarkerClick} />
        </section>
 
        {/* Drawer — recebe o ponto selecionado e o range */}
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

import React from "react";
import BalcarTable from "@/components/BalcarTable";
 
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
 
type PontoColeta = {
  idreservatorio?: number | string;
  nome_reservatorio?: string;
  lat?: number;
  lng?: number;
  nome_instituicao?: string;
};
 
type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selectedPonto: PontoColeta | null;
  setSelectedPonto?: (p: PontoColeta | null) => void;
  apiBase?: string;
};
 
const BalcarDrawer: React.FC<Props> = ({
  open,
  onOpenChange,
  selectedPonto,
  setSelectedPonto,
  apiBase = "http://localhost:3001/balcar",
}) => {
  const [key, setKey] = React.useState(0);
 
  React.useEffect(() => {
    if (selectedPonto) {
      onOpenChange(true);
      // Force re-render do BalcarTable quando o ponto muda
      setKey(prev => prev + 1);
    }
  }, [selectedPonto, onOpenChange]);
 
  const title = React.useMemo(() => {
    if (!selectedPonto) return "Dados Balcar";
    return (
      selectedPonto.nome_reservatorio ??
      selectedPonto.idreservatorio ??
      "Reservatório"
    );
  }, [selectedPonto]);
 
  const handleClose = () => {
    onOpenChange(false);
    // Resetar a seleção após um delay para evitar flickering
    setTimeout(() => {
      if (setSelectedPonto) {
        setSelectedPonto(null);
      }
    }, 300);
  };
 
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh]">
        <DrawerHeader>
          <DrawerTitle className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="block text-lg font-semibold">
                Tabela de Dados — {title}
              </span>
            </div>
 
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <BalcarTable
                key={key} // Força re-render quando o ponto muda
                selectedPoint={selectedPonto ?? undefined}
                selectedPointId={selectedPonto?.idreservatorio ?? null}
                selectedPointName={selectedPonto?.nome_reservatorio ?? null}
                initialPage={1}
                initialLimit={10}
                apiBase={apiBase}
              />
            </div>
          </DrawerTitle>
        </DrawerHeader>
 
        <DrawerFooter>
          <div className="flex gap-2 justify-between items-center">
            <div className="flex gap-2">
              <Button onClick={handleClose}>Fechar</Button>
 
              {setSelectedPonto && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedPonto(null);
                    onOpenChange(false);
                  }}
                >
                  Limpar seleção
                </Button>
              )}
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
 
export default BalcarDrawer;
 
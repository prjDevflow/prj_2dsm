import React from "react";
import SimaTable from "@/components/SimaTable";
 
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
 
type PontoColeta = {
  id: number | string;
  name?: string;
  rotulo?: string;
  latitude: number;
  longitude: number;
  type?: string;
};
 
type Range = { start?: Date | null; end?: Date | null };
 
type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selectedPonto: PontoColeta | null; // use null em vez de void
  setSelectedPonto?: (p: PontoColeta | null) => void; // opcional
  range: Range;
  setRange: (r: Range) => void;
};
 
const SimaDrawer: React.FC<Props> = ({
  open,
  onOpenChange,
  selectedPonto,
  range,
}) => {
  // debug rápido: mostra quando o drawer abre e o ponto atual
  React.useEffect(() => {
    if (open) {
      console.debug("[SimaDrawer] abriu drawer, selectedPonto:", selectedPonto);
    }
  }, [open, selectedPonto]);
 
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="space-y-4">
            <span className="block text-lg font-semibold">
              Tabela de Dados{selectedPonto ? ` - ${selectedPonto.name ?? selectedPonto.rotulo ?? selectedPonto.id}` : ""}
            </span>
 
            <div className="mt-4 p-2 border rounded-md bg-white">

 
              {/* SimaTable: envio tanto do id quanto do objeto completo para mais robustez */}
              <div className="mt-4">
                <SimaTable
                  selectedPoint={selectedPonto ?? undefined} // objeto completo (mais robusto)
                  selectedPointId={selectedPonto?.id ?? null} // mantém compatibilidade
                  range={range}
                  initialPage={1}
                  initialLimit={10}
                />
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
 
        <DrawerFooter>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
 
export default SimaDrawer;
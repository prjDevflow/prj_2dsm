// src/components/FurnasDrawer.tsx
import React from "react";
import FurnasTable from "@/components/FurnasTable";

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
  latitude?: number;
  longitude?: number;
  type?: string;
};

type Range = { start?: Date | null; end?: Date | null };

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selectedPonto: PontoColeta | null;
  setSelectedPonto?: (p: PontoColeta | null) => void;
  range: Range;
  setRange: (r: Range) => void;
  apiBase?: string;
};

const FurnasDrawer: React.FC<Props> = ({
  open,
  onOpenChange,
  selectedPonto,
  range,
  apiBase = "http://localhost:3001/furnas",
}) => {
  React.useEffect(() => {
    if (open) {
      console.debug("[FurnasDrawer] abriu drawer, selectedPonto:", selectedPonto);
    }
  }, [open, selectedPonto]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="space-y-4">
            <span className="block text-lg font-semibold">
              Tabela de Dados - {selectedPonto ? (selectedPonto.name ?? selectedPonto.rotulo ?? selectedPonto.id) : "Selecionar ponto"}
            </span>

            <div className="mt-4 p-2 border rounded-md bg-white">

              <div className="mt-4">
                <FurnasTable
                  selectedPoint={selectedPonto ?? undefined}
                  selectedPointId={selectedPonto?.id ?? null}
                  range={range}
                  initialPage={1}
                  initialLimit={10}
                  apiBase={apiBase}
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

export default FurnasDrawer;

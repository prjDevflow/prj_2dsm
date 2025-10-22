import React from "react";
import CalendarPicker from "@/components/CalendarPicker";
import SimaTable from "@/components/SimaTable";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type PontoColeta = {
  id: number;
  name?: string;
  latitude: number;
  longitude: number;
  type?: string;
};

type Range = { start?: Date | null; end?: Date | null };

type Props = {
  open: boolean;
  onOpenChange?: (v: boolean) => void;
  selectedPonto?: PontoColeta | void;
  setSelectedPonto?: (p: PontoColeta | null) => void;
  range?: Range;
  setRange?: (r: Range) => void;
};

const pontosDisponiveis: PontoColeta[] = [
  { id: 30, name: "Ponto 30 - Escola X", latitude: -3.0, longitude: -60.0, type: "sima" },
  { id: 12, name: "Ponto 12 - Praça Y", latitude: -4.0, longitude: -61.0, type: "campanhas" },
  { id: 7, name: "Ponto 7 - Unidade Z", latitude: -5.0, longitude: -62.0, type: "sima" },
];

const SimaDrawer: React.FC<Props> = ({
  open,
  onOpenChange,
  selectedPonto,
  setSelectedPonto,
  range,
  setRange,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="space-y-4">
            <span className="block text-lg font-semibold">
              Tabela de Dados{selectedPonto ? ` - ${selectedPonto.name}` : ""}
            </span>

            <div className="mt-4 p-2 border rounded-md bg-white">
              <CalendarPicker
                value={range}
                onChange={(r) => setRange(r)}
                showApply={true}
                points={pontosDisponiveis.map((p) => ({ id: p.id, name: p.name }))}
                selectedPointId={selectedPonto?.id ?? null}
                onSelectPoint={(id) => {
                  if (id === null) {
                    setSelectedPonto(null);
                  } else {
                    const found = pontosDisponiveis.find((p) => p.id === id);
                    setSelectedPonto(found ?? { id, latitude: 0, longitude: 0 });
                  }
                }}
                onApply={(r) => {
                  // CalendarPicker já envia o range ao aplicar
                  setRange(r);
                }}
              />

              {/* SimaTable faz o fetch por conta própria com props (selectedPointId + range) */}
              <div className="mt-4">
                <SimaTable
                  selectedPointId={selectedPonto?.id ?? null}
                  range={range}
                  initialPage={1}
                  initialLimit={20}
                />
              </div>
            </div>
          </DrawerTitle>

        </DrawerHeader>

        <DrawerFooter>
          <Button
            onClick={() => {
              console.log("Fechar Drawer", { range, selectedPonto });
              onOpenChange(false);
            }}
          >
            Ok
          </Button>
          <DrawerClose>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SimaDrawer;

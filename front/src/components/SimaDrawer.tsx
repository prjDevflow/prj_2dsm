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
  onOpenChange: (v: boolean) => void;
  selectedPonto: PontoColeta | void;
  setSelectedPonto: (p: PontoColeta | null) => void;
  range: Range;
  setRange: (r: Range) => void;
};

const SimaDrawer: React.FC<Props> = ({
  open,
  onOpenChange,
  selectedPonto,
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
              {/* CalendarPicker sem seletor de estação */}
              <CalendarPicker
                value={range}
                onChange={(r) => setRange(r)}
                showApply={true}
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

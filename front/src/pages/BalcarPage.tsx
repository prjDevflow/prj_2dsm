import { useState } from "react";
import Map from "../components/Map";
import BalcarDrawer from "../components/BalcarDrawer";
 
export default function BalcarPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPonto, setSelectedPonto] = useState<any>(null);
 
  return (
    <div className="flex gap-4">
     
 
      <main className="flex-1 relative">
        <h1 className="text-2xl font-bold mb-4">Balcar</h1>
 
        <Map
          type="balcar"
          instituicao="INPE"
          onMarkerClick={(ponto) => {
            console.log("PONTO BALCAR CLICADO:", ponto);
            setSelectedPonto(ponto);
            setOpenDrawer(true);
          }}
        />
 
        <BalcarDrawer
          open={openDrawer}
          onOpenChange={setOpenDrawer}
          selectedPonto={selectedPonto}
          setSelectedPonto={setSelectedPonto}
        />
      </main>
    </div>
  );
}
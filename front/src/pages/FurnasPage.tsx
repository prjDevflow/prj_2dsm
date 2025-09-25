// src/pages/SimaPage.tsx
import Sidebar from "../components/Sidebar";
import Map from "../components/Map"; // se quiser mostrar um mapa só nessa página

export default function SimaPage() {
  return (
    <div className="flex gap-4">
      {/* Sidebar específico pra SIMA */}
      <Sidebar logoSrc="/logos/sima-logo.png" variant="sima" />

      {/* Conteúdo principal da página */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Conteúdo Furnas</h1>
        <Map /* props caso precise */ />
        {/* demais componentes específicos da página */}
      </main>
    </div>
  );
}

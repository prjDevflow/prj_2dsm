// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";

// Componentes de layout
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";

// Componentes do Drawer
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// Tabela UI
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Páginas
import LandingPage from "./pages/LandingPage";

import { useEffect, useState } from "react";

// Interface para os pontos do mapa
interface PontoColeta {
  id: number;
  name?: string;
  latitude: number;
  longitude: number;
  type?: string;
}

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 🔹 Novo estado: controla se o Map já foi exibido uma vez
  const [mapRendered, setMapRendered] = useState(false);

  // 🔹 Estados para o drawer do mapa
  const [selectedPonto, setSelectedPonto] = useState<PontoColeta | null>(null);

  const handleMarkerClick = (ponto: PontoColeta) => {
    setSelectedPonto(ponto);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    // Quando a aplicação abre, renderiza o mapa
    if (!mapRendered) {
      setMapRendered(true);
    }
  }, [mapRendered]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col">
        <Router>
          {/* 🔹 Barra institucional do governo */}
          <BarraBrasil />

          {/* 🔹 Menu principal */}
          <MenuBar />

          {/* 🔹 Sidebar aparece em todas as páginas, exceto Landing */}
          <Routes>
            <Route path="/" element={null} />
            <Route
              path="*"
              element={
                // ✅ classe base + condicional
                <div className={`sidebar-container ${isDrawerOpen ? "sidebar-drawer-open" : ""}`}>
                  <Sidebar variant="sima" />
                </div>
              }
            />
          </Routes>

          {/* 🔹 Conteúdo principal */}
          <div
            className="flex-1 w-full"
            style={{
              minHeight: "calc(100vh - 3rem - 56px)",
              paddingTop: "1rem",
              paddingBottom: "72px",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <LandingPage />
                    {/* 🔹 O Map só renderiza na primeira vez que a aplicação abre */}
                    {!mapRendered && (
                      <div className="mt-4 h-[70vh]">
                        <Map onMarkerClick={handleMarkerClick} />
                      </div>
                    )}
                  </>
                }
              />
              <Route
                path="/sima"
                element={
                  <div className="h-[80vh]">
                    <Map onMarkerClick={handleMarkerClick} />
                  </div>
                }
              />
              <Route
                path="/furnas"
                element={
                  <div className="h-[80vh]">
                    <Map onMarkerClick={handleMarkerClick} />
                  </div>
                }
              />
              <Route
                path="/balcar"
                element={
                  <div className="h-[80vh]">
                    <Map onMarkerClick={handleMarkerClick} />
                  </div>
                }
              />
            </Routes>
          </div>

          {/* 🔹 Drawer para exibir detalhes do ponto */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent>
              <DrawerHeader>
                {/* ⚠️ Mantida a tabela dentro do DrawerTitle */}
                <DrawerTitle className="space-y-4">
                  <span className="block text-lg font-semibold">Tabela de Dados</span>
                  <div className="p-2 border rounded-md">
                    <Table>
                      <TableCaption>Pontos cadastrados</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">ID</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>Latitude</TableHead>
                          <TableHead>Longitude</TableHead>
                          <TableHead>Tipo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">9991</TableCell>
                          <TableCell>Ponto Fake 1</TableCell>
                          <TableCell>-3.1</TableCell>
                          <TableCell>-60.0</TableCell>
                          <TableCell>sima</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">9992</TableCell>
                          <TableCell>Ponto Fake 2</TableCell>
                          <TableCell>-5.0</TableCell>
                          <TableCell>-62.0</TableCell>
                          <TableCell>campanhas</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">9993</TableCell>
                          <TableCell>Ponto Fake 3</TableCell>
                          <TableCell>-4.5</TableCell>
                          <TableCell>-66.0</TableCell>
                          <TableCell>sima</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </DrawerTitle>
                <DrawerDescription>
                  Esta é uma tabela de exemplo dentro do título.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* 🔹 Footer com animação apenas quando drawer está aberto */}
          <div className={`sidebar-container ${isDrawerOpen ? "sidebar-drawer-open" : ""}`}>
            <Sidebar variant="sima" />
          </div>
          <div className={`footer-container ${isDrawerOpen ? "footer-drawer-open" : ""}`}>
            <Footer />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

// src/App.tsx
import { useEffect, useState } from "react";
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

// CalendarPicker atualizado com selector de ponto
import CalendarPicker from "@/components/CalendarPicker";

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
  const [mapRendered, setMapRendered] = useState(false);
  const [selectedPonto, setSelectedPonto] = useState<PontoColeta | null>(null);
  const [range, setRange] = useState<{ start?: Date | null; end?: Date | null }>({});
  const [simaData, setSimaData] = useState<any[]>([]);
  const [simaOfflineData] = useState<any[]>([]);
  const [loadingSima, setLoadingSima] = useState(false);

  const handleMarkerClick = (ponto: PontoColeta) => {
    setSelectedPonto(ponto);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    setMapRendered(true);
  }, []);

  // Lista de pontos para o selector
  const pontosDisponiveis: PontoColeta[] = [
    { id: 30, name: "Ponto 30 - Escola X", latitude: -3.0, longitude: -60.0, type: "sima" },
    { id: 12, name: "Ponto 12 - Praça Y", latitude: -4.0, longitude: -61.0, type: "campanhas" },
    { id: 7, name: "Ponto 7 - Unidade Z", latitude: -5.0, longitude: -62.0, type: "sima" },
  ];

  const fetchSimaData = async () => {
    if (!selectedPonto || !range.start || !range.end) return;

    setLoadingSima(true);

    try {
      const res = await fetch(
        `http://localhost:PORT/sima?idestacao=${selectedPonto.id}&inicio=${range.start.toISOString()}&fim=${range.end.toISOString()}`,
      );
      const json = await res.json();
      setSimaData(json.data || []);
    } catch (err) {
      console.error("Erro ao buscar dados SIMA:", err);
      setSimaData([]);
    } finally {
      setLoadingSima(false);
    }
  };

  const applyDateFilter = () => {
    if (!range.start || !range.end || !selectedPonto) {
      console.warn("Selecione ponto e intervalo de datas antes de aplicar o filtro.");
      return;
    }

    fetchSimaData();
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col">
        <Router>
          {/* Barra institucional */}
          <BarraBrasil />

          {/* Menu principal */}
          <MenuBar />

          {/* Sidebar em todas as páginas exceto landing */}
          <Routes>
            <Route path="/" element={null} />
            <Route
              path="*"
              element={
                <div className={`sidebar-container ${isDrawerOpen ? "sidebar-drawer-open" : ""}`}>
                  <Sidebar variant="sima" />
                </div>
              }
            />
          </Routes>

          {/* Conteúdo principal */}
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
                    {mapRendered && (
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

          {/* Drawer com tabela e CalendarPicker */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="space-y-4">
                  <span className="block text-lg font-semibold">
                    Tabela de Dados{selectedPonto ? ` - ${selectedPonto.name}` : ""}
                  </span>
                  <div className="mt-4 p-2 border rounded-md">
                    <CalendarPicker
                      value={range}
                      onChange={(r) => setRange(r)}
                      showApply={true}
                      points={pontosDisponiveis}
                      selectedPointId={selectedPonto?.id ?? null}
                      onSelectPoint={(id) => {
                        if (id === null) {
                          setSelectedPonto(null);
                        } else {
                          const found = pontosDisponiveis.find((p) => p.id === id);
                          setSelectedPonto(found ?? { id, latitude: 0, longitude: 0 });
                        }
                      }}
                      onApply={applyDateFilter}
                    />

                    <Table>
                      <TableCaption>Dados do ponto {selectedPonto?.name ?? ""}</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Estação</TableHead>
                          <TableHead>Data/Hora</TableHead>
                          <TableHead>Regno</TableHead>
                          <TableHead>Nofsamples</TableHead>
                          <TableHead>Proamag</TableHead>
                          <TableHead>Dirvt</TableHead>
                          <TableHead>Intensvt</TableHead>
                          <TableHead>U Vel</TableHead>
                          <TableHead>V Vel</TableHead>
                          <TableHead>Tempag1</TableHead>
                          <TableHead>Tempag2</TableHead>
                          <TableHead>Tempag3</TableHead>
                          <TableHead>Tempag4</TableHead>
                          <TableHead>Tempar</TableHead>
                          <TableHead>Ur</TableHead>
                          <TableHead>Tempar R</TableHead>
                          <TableHead>Pressatm</TableHead>
                          <TableHead>Radincid</TableHead>
                          <TableHead>Radrefl</TableHead>
                          <TableHead>Bateria</TableHead>
                          <TableHead>Sonda Temp</TableHead>
                          <TableHead>Sonda Cond</TableHead>
                          <TableHead>Sonda DO Sat</TableHead>
                          <TableHead>Sonda DO</TableHead>
                          <TableHead>Sonda pH</TableHead>
                          <TableHead>Sonda NH4</TableHead>
                          <TableHead>Sonda NO3</TableHead>
                          <TableHead>Sonda Turb</TableHead>
                          <TableHead>Sonda Chl</TableHead>
                          <TableHead>Sonda Bateria</TableHead>
                          <TableHead>Corr Norte</TableHead>
                          <TableHead>Corr Leste</TableHead>
                          <TableHead>Co2 Low</TableHead>
                          <TableHead>Co2 High</TableHead>
                          <TableHead>Precipitacao</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadingSima ? (
                          <TableRow>
                            <TableCell colSpan={34}>Carregando dados...</TableCell>
                          </TableRow>
                        ) : simaData.length > 0 ? (
                          simaData.map((row) => (
                            <TableRow key={row.idsima}>
                              <TableCell>{row.idsima}</TableCell>
                              <TableCell>{row.idestacao}</TableCell>
                              <TableCell>{new Date(row.datahora).toLocaleString()}</TableCell>
                              <TableCell>{row.regno ?? "-"}</TableCell>
                              <TableCell>{row.nofsamples ?? "-"}</TableCell>
                              <TableCell>{row.proamag ?? "-"}</TableCell>
                              <TableCell>{row.dirvt ?? "-"}</TableCell>
                              <TableCell>{row.intensvt ?? "-"}</TableCell>
                              <TableCell>{row.u_vel ?? "-"}</TableCell>
                              <TableCell>{row.v_vel ?? "-"}</TableCell>
                              <TableCell>{row.tempag1 ?? "-"}</TableCell>
                              <TableCell>{row.tempag2 ?? "-"}</TableCell>
                              <TableCell>{row.tempag3 ?? "-"}</TableCell>
                              <TableCell>{row.tempag4 ?? "-"}</TableCell>
                              <TableCell>{row.tempar ?? "-"}</TableCell>
                              <TableCell>{row.ur ?? "-"}</TableCell>
                              <TableCell>{row.tempar_r ?? "-"}</TableCell>
                              <TableCell>{row.pressatm ?? "-"}</TableCell>
                              <TableCell>{row.radincid ?? "-"}</TableCell>
                              <TableCell>{row.radrefl ?? "-"}</TableCell>
                              <TableCell>{row.bateria ?? "-"}</TableCell>
                              <TableCell>{row.sonda_temp ?? "-"}</TableCell>
                              <TableCell>{row.sonda_cond ?? "-"}</TableCell>
                              <TableCell>{row.sonda_dosat ?? "-"}</TableCell>
                              <TableCell>{row.sonda_do ?? "-"}</TableCell>
                              <TableCell>{row.sonda_ph ?? "-"}</TableCell>
                              <TableCell>{row.sonda_nh4 ?? "-"}</TableCell>
                              <TableCell>{row.sonda_no3 ?? "-"}</TableCell>
                              <TableCell>{row.sonda_turb ?? "-"}</TableCell>
                              <TableCell>{row.sonda_chl ?? "-"}</TableCell>
                              <TableCell>{row.sonda_bateria ?? "-"}</TableCell>
                              <TableCell>{row.corr_norte ?? "-"}</TableCell>
                              <TableCell>{row.corr_leste ?? "-"}</TableCell>
                              <TableCell>{row.co2_low ?? "-"}</TableCell>
                              <TableCell>{row.co2_high ?? "-"}</TableCell>
                              <TableCell>{row.precipitacao ?? "-"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={34}>Nenhum dado encontrado.</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <Table>
                      <TableCaption>
                        Dados Offline do ponto {selectedPonto?.name ?? ""}
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Estação</TableHead>
                          <TableHead>Data/Hora</TableHead>
                          <TableHead>Dirvt</TableHead>
                          <TableHead>Intensvt</TableHead>
                          <TableHead>U Vel</TableHead>
                          <TableHead>V Vel</TableHead>
                          <TableHead>Tempag1</TableHead>
                          <TableHead>Tempag2</TableHead>
                          <TableHead>Tempag3</TableHead>
                          <TableHead>Tempag4</TableHead>
                          <TableHead>Tempar</TableHead>
                          <TableHead>Ur</TableHead>
                          <TableHead>Tempar R</TableHead>
                          <TableHead>Pressatm</TableHead>
                          <TableHead>Radincid</TableHead>
                          <TableHead>Radrefl</TableHead>
                          <TableHead>Fonte Radiometro</TableHead>
                          <TableHead>Sonda Temp</TableHead>
                          <TableHead>Sonda Cond</TableHead>
                          <TableHead>Sonda DO</TableHead>
                          <TableHead>Sonda pH</TableHead>
                          <TableHead>Sonda NH4</TableHead>
                          <TableHead>Sonda NO3</TableHead>
                          <TableHead>Sonda Turb</TableHead>
                          <TableHead>Sonda Chl</TableHead>
                          <TableHead>Sonda Bateria</TableHead>
                          <TableHead>Corr Norte</TableHead>
                          <TableHead>Corr Leste</TableHead>
                          <TableHead>Bateria Painel</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadingSima ? (
                          <TableRow>
                            <TableCell colSpan={31}>Carregando dados offline...</TableCell>
                          </TableRow>
                        ) : simaOfflineData.length > 0 ? (
                          simaOfflineData.map((row) => (
                            <TableRow key={row.idsimaoffline}>
                              <TableCell>{row.idsimaoffline}</TableCell>
                              <TableCell>{row.idestacao}</TableCell>
                              <TableCell>
                                {row.datahora ? new Date(row.datahora).toLocaleString() : "-"}
                              </TableCell>
                              <TableCell>{row.dirvt ?? "-"}</TableCell>
                              <TableCell>{row.intensvt ?? "-"}</TableCell>
                              <TableCell>{row.u_vel ?? "-"}</TableCell>
                              <TableCell>{row.v_vel ?? "-"}</TableCell>
                              <TableCell>{row.tempag1 ?? "-"}</TableCell>
                              <TableCell>{row.tempag2 ?? "-"}</TableCell>
                              <TableCell>{row.tempag3 ?? "-"}</TableCell>
                              <TableCell>{row.tempag4 ?? "-"}</TableCell>
                              <TableCell>{row.tempar ?? "-"}</TableCell>
                              <TableCell>{row.ur ?? "-"}</TableCell>
                              <TableCell>{row.tempar_r ?? "-"}</TableCell>
                              <TableCell>{row.pressatm ?? "-"}</TableCell>
                              <TableCell>{row.radincid ?? "-"}</TableCell>
                              <TableCell>{row.radrefl ?? "-"}</TableCell>
                              <TableCell>{row.fonteradiometro ?? "-"}</TableCell>
                              <TableCell>{row.sonda_temp ?? "-"}</TableCell>
                              <TableCell>{row.sonda_cond ?? "-"}</TableCell>
                              <TableCell>{row.sonda_do ?? "-"}</TableCell>
                              <TableCell>{row.sonda_ph ?? "-"}</TableCell>
                              <TableCell>{row.sonda_nh4 ?? "-"}</TableCell>
                              <TableCell>{row.sonda_no3 ?? "-"}</TableCell>
                              <TableCell>{row.sonda_turb ?? "-"}</TableCell>
                              <TableCell>{row.sonda_chl ?? "-"}</TableCell>
                              <TableCell>{row.sonda_bateria ?? "-"}</TableCell>
                              <TableCell>{row.corr_norte ?? "-"}</TableCell>
                              <TableCell>{row.corr_leste ?? "-"}</TableCell>
                              <TableCell>{row.bateriapainel ?? "-"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={31}>Nenhum dado offline encontrado.</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </DrawerTitle>
                <DrawerDescription>
                  Esta é uma tabela de dados carregados via Docker/SIMA.
                </DrawerDescription>
              </DrawerHeader>

              <DrawerFooter>
                <Button
                  onClick={() => {
                    console.log("Submit clicked", { range, selectedPonto });
                    setIsDrawerOpen(false);
                  }}
                >
                  Submit
                </Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Footer */}
          <div className={`footer-container ${isDrawerOpen ? "footer-drawer-open" : ""}`}>
            <Footer />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

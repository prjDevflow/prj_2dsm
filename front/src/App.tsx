// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";

import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

// Páginas
import LandingPage from "./pages/LandingPage";
import SimaPage from "./pages/SimaPage";
import FurnasPage from "./pages/FurnasPage"; // se existir
import BalcarPage from "./pages/BalcarPage"; // se existir

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col">
        <Router>
          <BarraBrasil />
          <MenuBar />

          <main
            style={{
              minHeight: "calc(100vh - 3rem - 56px)",
              paddingTop: "1rem",
              paddingBottom: "72px",
              flex: 1,
            }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/sima" element={<SimaPage />} />
              <Route path="/furnas" element={<FurnasPage />} />
              <Route path="/balcar" element={<BalcarPage />} />
              {/* outras rotas */}
            </Routes>
          </main>
        </Router>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

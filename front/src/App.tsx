// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

// Páginas
import LandingPage from "./pages/LandingPage";
import SimaPage from "./pages/SimaPage";
import FurnasPage from "./pages/FurnasPage";
import BalcarPage from "./pages/BalcarPage";

function AppContent() {
  const location = useLocation();

  const isLanding = location.pathname === "/";

  return (
    <div className="w-full min-h-screen flex flex-col">
      <BarraBrasil />
      <MenuBar />

      <main
        style={{
          minHeight: "calc(100vh - 3rem - 56px)",
          paddingTop: "1rem",
          paddingBottom: isLanding ? "72px" : "0", // só reserva espaço se o footer existir
          flex: 1,
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sima" element={<SimaPage />} />
          <Route path="/furnas" element={<FurnasPage />} />
          <Route path="/balcar" element={<BalcarPage />} />
        </Routes>
      </main>

      {/* Footer só aparece na landing page */}
      {isLanding && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default AppLayout;

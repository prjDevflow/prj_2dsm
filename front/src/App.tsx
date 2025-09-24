// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Map from "./components/Map";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col">
        <Router>
          <BarraBrasil />
          <MenuBar />

          {}
          <Sidebar logoSrc="/public/Logo-2.png" />

          {/* Conteúdo principal:
              - minHeight = 100vh menos header (3rem) e footer (56px)
              - paddingBottom garante que nada fique coberto pelo footer
          */}
          <div
            className="flex-1 w-full"
            style={{
              minHeight: "calc(100vh - 3rem - 56px)",
              paddingTop: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingBottom: "72px", // espaço extra para o footer e para scroll
            }}
          >
            <Routes>
              <Route path="/sima" element={<div />} />
              {<Route path="/mapa" element={<Map />} />}
            </Routes>
          </div>

          {/* Footer fixo; sua altura deve ser a mesma usada no Sidebar bottom */}
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

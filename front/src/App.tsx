// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import SimaPage from "./pages/SimaPage";
import FurnasPage from "./pages/FurnasPage";
import BalcarPage from "./pages/BalcarPage";
import LandingPage from "./pages/LandingPage";
import Map from "./components/Map";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col">
        <Router>
          <BarraBrasil />
          <MenuBar />

          <div
            className="flex-1 w-full"
            style={{
              minHeight: "calc(100vh - 3rem - 56px)",
              paddingTop: "1rem",
              paddingBottom: "72px",
            }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/sima" element={<SimaPage />} />
              <Route path="/furnas" element={<FurnasPage />} />
              <Route path="/balcar" element={<BalcarPage />} />
              {<Route path="/sima" element={<Map />} />}
              {<Route path="/balcar" element={<Map />} />}
              {<Route path="/furnas" element={<Map />} />}
            </Routes>
          </div>

          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

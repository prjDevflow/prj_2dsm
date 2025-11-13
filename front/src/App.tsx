import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

import theme from "./styles/theme";

const AppLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col">
        <BarraBrasil />
        <MenuBar />

        <main
          style={{
            // paddingTop: "1rem",
            paddingBottom: "72px",
            flex: 1,
          }}
        >
          {/* Aqui as páginas renderizam via Outlet */}
          <Outlet />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;

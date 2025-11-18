import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
 
import AppLayout from "./App";
import LandingPage from "./pages/LandingPage";
import SimaPage from "./pages/SimaPage";
import BalcarPage from "./pages/BalcarPage";
import InstituicaoPage from "./pages/Furnas/FurnasInstituicao.page";
import { FurnasMapPage } from "@/pages/Furnas/furnasMap.page";
import AboutPage from "./pages/AboutPage";
 
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import "./index.css";
import { GraphicsPage } from "./pages/graphics/page";

const queryClient = new QueryClient();
 
const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "sima", element: <SimaPage /> },
      { path: "balcar", element: <BalcarPage /> },
      { path: "furnas", element: <InstituicaoPage /> },
      { path: "graficos", element: <GraphicsPage /> },
      { path: "furnas/:instituicao", element: <FurnasMapPage /> }, // <--- aqui
    ],
  },
]);
 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </React.StrictMode>
  </QueryClientProvider>,
);
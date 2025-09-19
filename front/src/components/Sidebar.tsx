// src/components/Sidebar.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Sliders, ChevronLeft } from "lucide-react";

interface SidebarProps {
  logoSrc?: string; // caminho da logo (ex: "/logo-team.png")
}

const SIDEBAR_WIDTH = 300; // largura do painel
const FOOTER_HEIGHT = 0;
const HEADER_HEIGHT = "32px"; // ajuste conforme seu header

const SidebarWrapper = styled.aside<{ open: boolean }>`
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  bottom: ${FOOTER_HEIGHT}px;
  width: ${SIDEBAR_WIDTH}px;
  transform: translateX(${(p) => (p.open ? "0" : `-${SIDEBAR_WIDTH}px`)});
  transition: transform 280ms cubic-bezier(.2,.9,.2,1);
  background: #007fce;
  color: ${({ theme }) => theme.colors.text.inverse};
  z-index: 1200;
  display:flex;
  flex-direction:column;
  border-right: 2px solid rgba(255,255,255,0.06);
  box-shadow: 4px 0 18px rgba(2,6,23,0.18);
`;

/* botão lateral visível quando fechado */
const ToggleHandle = styled.button<{ open: boolean }>`
  position: absolute;
  right: -42px;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 98px;
  border-radius: 0 12px 12px 0;
  border: none;
  background: ${({ open }) => (open ? "#0b9cff" : "#0b9cff")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
`;

/* --- NOVO: wrapper de logo que ocupa 100% sem padding --- */
const LogoFullWrap = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  flex: 0 0 auto; /* ocupa espaço fixo */
  display: block;
  overflow: hidden;
`;

/* imagem que preenche toda a área (sem margens) */
const LogoFullImg = styled.img`
  width: 100%;
  height: 250px; /* ajuste a altura conforme desejar */
  object-fit: cover; /* preenche completamente, pode cortar */
  display: block;
  background: transparent;
  border: none;
`;

/* conteúdo do painel (filtros) - mantém padding interno */
const SidebarContent = styled.div`
  padding: 1.5rem 1.25rem;
  overflow-y: auto;
  flex: 1;
`;

/* botão Filtros */
const FiltersButton = styled.button`
  margin-top: .6rem;
  width:100%;
  display:flex;
  gap:.5rem;
  align-items:center;
  padding:.6rem .9rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.06);
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight:600;
  border-radius:8px;
  cursor:pointer;
`;

/* blocos de filtro (colapsados por padrão) */
const Section = styled.div`
  margin-top:1rem;
  background: rgba(255,255,255,0.03);
  border-radius:8px;
  padding:.8rem;
`;

const SectionTitle = styled.div`
  font-weight:700;
  font-size:0.85rem;
  margin-bottom:.6rem;
  color: rgba(255,255,255,0.95);
`;

const Row = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: .45rem 0;
  color: rgba(255,255,255,0.95);
`;

const DateRow = styled.div`
  display:flex;
  gap:.5rem;
  margin-top:.4rem;
  input[type="date"]{
    background: white;
    padding: .25rem .35rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: .85rem;
  }
`;

export default function Sidebar({ logoSrc }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const cls = "sidebar-open";
    if (open) document.body.classList.add(cls);
    else document.body.classList.remove(cls);
    return () => document.body.classList.remove(cls);
  }, [open]);

  return (
    <SidebarWrapper open={open} aria-hidden={!open}>
      <ToggleHandle
        onClick={() => setOpen((s) => !s)}
        open={open}
        aria-label={open ? "Fechar painel" : "Abrir painel de filtros"}
        title={open ? "Fechar" : "Abrir filtros"}
      >
        <ChevronLeft color="white" size={20} style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)" }} />
      </ToggleHandle>

      {/* Logo full-width sem margem */}
      <LogoFullWrap>
        <LogoFullImg src={logoSrc ?? "/logo-team.png"} alt="Logo do time" />
      </LogoFullWrap>

      {/* resto do conteúdo com padding normal */}
      <SidebarContent>
        <FiltersButton onClick={() => setFiltersOpen((s) => !s)} aria-expanded={filtersOpen}>
          <Sliders size={16} /> Filtros
        </FiltersButton>

        {filtersOpen && (
          <>
            <Section>
              <SectionTitle>1. INSTITUIÇÃO</SectionTitle>
              <Row>Opção A <input type="checkbox" aria-label="Opção A" /></Row>
              <Row>Opção B <input type="checkbox" aria-label="Opção B" /></Row>
            </Section>

            <Section>
              <SectionTitle>2. RESERVATÓRIO</SectionTitle>
              <Row>Opção 1 <input type="checkbox" aria-label="Opção 1" /></Row>
              <Row>Opção 2 <input type="checkbox" aria-label="Opção 2" /></Row>
            </Section>

            <Section>
              <SectionTitle>3. PERÍODO DE TEMPO</SectionTitle>
              <DateRow>
                <input type="date" aria-label="Data início" />
                <input type="date" aria-label="Data fim" />
              </DateRow>
            </Section>
          </>
        )}
      </SidebarContent>
    </SidebarWrapper>
  );
}

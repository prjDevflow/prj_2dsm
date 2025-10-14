// src/components/Sidebar.tsx
import { useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Sliders, ChevronLeft, ChevronDown } from "lucide-react";
import "../styles/Sidebar.css";
import { useColetas } from "../hooks/useColetas";

interface SidebarProps {
  logoSrc?: string;
  variant?: "sima" | "furnas" | "balcar";
  /**
   * recebe { points: (string|number)[] } quando o usuário clica em "Aplicar"
   */
  onFiltersChange?: (filters: { points: (string | number)[] }) => void;
}

const SIDEBAR_WIDTH = 300;
const FOOTER_HEIGHT = 0;
const HEADER_HEIGHT = "32px";

/* ---------- styled components (mantive seus existentes) ---------- */
const Backdrop = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.45);
  z-index: 1100;
  opacity: 0;
  visibility: hidden;
  transition: opacity 220ms ease;
  ${(p) => p.$visible && `opacity:1; visibility:visible;`}
`;

const SidebarWrapper = styled.aside<{ open: boolean }>`
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  bottom: ${FOOTER_HEIGHT}px;
  width: ${SIDEBAR_WIDTH}px;
  max-width: 95vw;
  transform: translateX(${(p) => (p.open ? "0" : `-${SIDEBAR_WIDTH}px`)});
  transition:
    transform 280ms cubic-bezier(0.2, 0.9, 0.2, 1),
    box-shadow 200ms;
  background: linear-gradient(180deg, #007fce 0%, #006bb3 100%);
  color: ${({ theme }) => theme?.colors?.text?.inverse ?? "#fff"};
  z-index: 1200;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 4px 0 24px rgba(2, 6, 23, 0.18);
  @media (max-width: 640px) {
    width: 85vw;
    border-radius: 0 12px 12px 0;
  }
`;

const ToggleHandle = styled.button<{ open: boolean }>`
  position: absolute;
  right: -42px;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 98px;
  border-radius: 0 12px 12px 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(11, 156, 255, 0.95), rgba(11, 156, 255, 0.9));
  box-shadow: 0 6px 18px rgba(3, 10, 30, 0.25);
  transition:
    transform 180ms ease,
    box-shadow 180ms;
  &:hover {
    transform: translateY(-50%) scale(1.02);
  }
  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.12);
  }
`;

const LogoFullWrap = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  flex: 0 0 auto;
  display: block;
  overflow: hidden;
`;

const LogoFullImg = styled.img<{ open: boolean }>`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  background: transparent;
  border: none;
  transition:
    height 280ms ease,
    filter 280ms ease;
  ${(p) => !p.open && `filter: brightness(0.9) contrast(0.95);`}
  @media (max-width: 640px) {
    height: 160px;
  }
`;

const SidebarContent = styled.div`
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 99px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`;

const FiltersButton = styled.button`
  margin-top: 0.25rem;
  width: 100%;
  display: flex;
  gap: 0.6rem;
  align-items: center;
  padding: 0.6rem 0.9rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: inherit;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform 140ms,
    box-shadow 140ms;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(2, 6, 23, 0.12);
  }
  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.12);
  }
`;

const Section = styled.div`
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.03);
`;

const SectionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.9rem;
  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.08);
  }
`;

const SectionBody = styled.div<{ open: boolean }>`
  padding: 0.75rem;
  max-height: ${(p) => (p.open ? "min(52vh, 520px)" : "0")};
  transition:
    max-height 300ms cubic-bezier(0.2, 0.9, 0.2, 1),
    padding 200ms;
  padding-top: ${(p) => (p.open ? ".75rem" : "0")};
  padding-bottom: ${(p) => (p.open ? ".75rem" : "0")};
  overflow: auto; /* importante: permitir rolagem interna */
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.01), transparent);
  &::-webkit-scrollbar { width: 10px; }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.06);
    border-radius: 99px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`;

const Row = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  user-select: none;
`;

const DateRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
  align-items: center;
  width: 100%;
`;

const Rotating = styled.span<{ open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 220ms ease;
  transform: rotate(${(p) => (p.open ? "180deg" : "0deg")});
`;

const Hint = styled.div`
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.85);
  opacity: 0.95;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  color: inherit;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
`;

const ActionsRow = styled.div`
  display:flex;
  gap:0.5rem;
  margin-bottom:0.5rem;
  align-items:center;
`;

const ApplyRow = styled.div`
  display:flex;
  gap:0.5rem;
  margin-top:0.6rem;
  justify-content:flex-end;
`;

/* simples botões - use suas classes se preferir */
const SecondaryButton = styled.button`
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.08);
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-weight: 700;
`;

const PrimaryButton = styled.button`
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  border: none;
  background: rgba(0,0,0,0.12);
  color: inherit;
  cursor: pointer;
  font-weight: 800;
`;

/* ---------- componente ---------- */
export default function Sidebar({ logoSrc, variant = "sima", onFiltersChange }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const defaultFiltersOpen = variant === "sima" ? true : false;
  const [filtersOpen, setFiltersOpen] = useState<boolean>(defaultFiltersOpen);

  const initialSections: Record<string, boolean> = {
    instituicao: variant === "furnas",
    reservatorio: variant === "balcar",
    periodo: variant === "sima",
    pontos: true,
  };
  const [openSection, setOpenSection] = useState<Record<string, boolean>>(initialSections);

  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setFiltersOpen(false);
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [open]);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const toggleSection = (key: string) => setOpenSection((s) => ({ ...s, [key]: !s[key] }));

  // === dados de pontos via useColetas ===
  const { data: pontos = [], isLoading, isError } = useColetas(variant);

  // estados: pending (edição) e applied (o que foi enviado pro mapa)
  const [pendingSelectedPoints, setPendingSelectedPoints] = useState<(string | number)[]>([]);
  const [appliedPoints, setAppliedPoints] = useState<(string | number)[]>([]);

  const [search, setSearch] = useState("");

  // inicializa pending com applied quando abre o sidebar
  useEffect(() => {
    if (open) setPendingSelectedPoints(appliedPoints);
  }, [open, appliedPoints]);

  // filtrar lista localmente (por rotulo/name)
  const filteredPontos = useMemo(() => {
    if (!pontos || pontos.length === 0) return [];
    const q = search.trim().toLowerCase();
    if (!q) return pontos;
    return pontos.filter((p: any) => {
      const label = (p.rotulo ?? p.name ?? String(p.id ?? "")).toLowerCase();
      return label.includes(q) || String(p.id).toLowerCase().includes(q);
    });
  }, [pontos, search]);

  const handleTogglePoint = (id: string | number) => {
    setPendingSelectedPoints((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSelectAllVisible = () => {
    const ids = filteredPontos.map((p: any) => p.id ?? p._id ?? p.nome ?? p.rotulo ?? p.name);
    setPendingSelectedPoints((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const handleClearSelection = () => setPendingSelectedPoints([]);

  // AÇÃO: aplicar filtros -> notifica o pai e guarda appliedPoints
  const handleApply = () => {
    setAppliedPoints(pendingSelectedPoints);
    onFiltersChange?.({ points: pendingSelectedPoints });
    // opcional: fechar sidebar ao aplicar
    setOpen(false);
  };

  // AÇÃO: cancelar edições -> reverte pending para último applied
  const handleCancel = () => {
    setPendingSelectedPoints(appliedPoints);
    // mantemos sidebar aberto para editar de novo
  };

  return (
    <>
      <Backdrop $visible={open} aria-hidden={!open} onClick={() => setOpen(false)} />

      <SidebarWrapper open={open} aria-hidden={!open} ref={sidebarRef}>
        <ToggleHandle
          onClick={() => setOpen((s) => !s)}
          open={open}
          aria-label={open ? "Fechar painel" : "Abrir painel de filtros"}
          title={open ? "Fechar" : "Abrir filtros"}
        >
          <ChevronLeft
            color="white"
            size={20}
            style={{
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 180ms",
            }}
          />
        </ToggleHandle>

        <LogoFullWrap>
          <LogoFullImg src={logoSrc ?? "/logo-team.png"} alt="Logo do time" open={open} />
        </LogoFullWrap>

        <SidebarContent>
          <FiltersButton
            onClick={() => setFiltersOpen((s) => !s)}
            aria-expanded={filtersOpen}
            aria-controls="filters-area"
          >
            <Sliders size={16} /> Filtros
            <span style={{ marginLeft: "auto", opacity: 0.9 }}>
              {filtersOpen ? "Ocultar" : "Mostrar"}
            </span>
          </FiltersButton>

          {filtersOpen && (
            <>
              {variant !== "sima" && (
                <Section id="filters-area" aria-live="polite">
                  <SectionHeader
                    onClick={() => toggleSection("instituicao")}
                    aria-expanded={!!openSection.instituicao}
                  >
                    <span>INSTITUIÇÃO</span>
                    <Rotating open={!!openSection.instituicao}>
                      <ChevronDown color="white" size={16} />
                    </Rotating>
                  </SectionHeader>
                  <SectionBody open={!!openSection.instituicao}>
                    <Row className="row">
                      <span className="row-label">IIE</span>
                      <input className="fancy-checkbox" type="checkbox" aria-label="Opção A" />
                    </Row>
                    <Row className="row">
                      <span className="row-label">INPE</span>
                      <input className="fancy-checkbox" type="checkbox" aria-label="Opção B" />
                    </Row>
                    <Row className="row">
                      <span className="row-label">UFJF</span>
                      <input className="fancy-checkbox" type="checkbox" aria-label="Opção C" />
                    </Row>
                    <Row className="row">
                      <span className="row-label">UFRJ</span>
                      <input className="fancy-checkbox" type="checkbox" aria-label="Opção D" />
                    </Row>
                    <Row className="row">
                      <span className="row-label">Furnas</span>
                      <input className="fancy-checkbox" type="checkbox" aria-label="Opção E" />
                    </Row>
                  </SectionBody>
                </Section>
              )}

              <Section>
                <SectionHeader onClick={() => toggleSection("pontos")} aria-expanded={!!openSection.pontos}>
                  <span>RESERVATÓRIOS</span>
                  <Rotating open={!!openSection.pontos}>
                    <ChevronDown color="white" size={16} />
                  </Rotating>
                </SectionHeader>

                <SectionBody open={!!openSection.pontos}>
                  <SearchInput
                    placeholder="Buscar reservatório por nome ou id..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Buscar reservatórios"
                  />

                  <ActionsRow>
                    <button type="button" className="btn-small" onClick={handleSelectAllVisible}>
                      Selecionar visíveis
                    </button>
                    <button type="button" className="btn-small" onClick={handleClearSelection}>
                      Limpar seleção
                    </button>
                    <Hint style={{ marginLeft: "auto", fontSize: "0.9rem" }}>
                      Selecionados: {pendingSelectedPoints.length}
                    </Hint>
                  </ActionsRow>

                  {isLoading && <Hint>Carregando pontos...</Hint>}
                  {isError && <Hint>Erro ao carregar pontos.</Hint>}

                  {!isLoading && !isError && filteredPontos.length === 0 && (
                    <Hint>Nenhum ponto encontrado.</Hint>
                  )}

                  {!isLoading && filteredPontos.map((p: any) => {
                    const id = p.id ?? p._id ?? p.nome ?? p.rotulo ?? p.name;
                    const label = p.rotulo ?? p.name ?? `Ponto ${id}`;
                    return (
                      <Row key={String(id)} className="row">
                        <span className="row-label">{label}</span>
                        <input
                          type="checkbox"
                          className="fancy-checkbox"
                          aria-label={`Filtrar ponto ${label}`}
                          checked={pendingSelectedPoints.includes(id)}
                          onChange={() => handleTogglePoint(id)}
                        />
                      </Row>
                    );
                  })}

                  {/* botões aplicar/cancelar */}
                  <ApplyRow>
                    <SecondaryButton type="button" onClick={handleCancel} aria-label="Cancelar alterações">
                      Cancelar
                    </SecondaryButton>
                    <PrimaryButton
                      type="button"
                      onClick={handleApply}
                      aria-label="Aplicar filtros"
                      title="Aplicar filtros"
                    >
                      Aplicar ({pendingSelectedPoints.length})
                    </PrimaryButton>
                  </ApplyRow>
                </SectionBody>
              </Section>

              <Section>
                <SectionHeader
                  onClick={() => toggleSection("periodo")}
                  aria-expanded={!!openSection.periodo}
                >
                  <span>PERÍODO DE TEMPO</span>
                  <Rotating open={!!openSection.periodo}>
                    <ChevronDown color="white" size={16} />
                  </Rotating>
                </SectionHeader>
                <SectionBody open={!!openSection.periodo}>
                  <DateRow>
                    <input type="date" aria-label="Data início" />
                    <input type="date" aria-label="Data fim" />
                  </DateRow>
                  <Hint>Escolha um intervalo para filtrar os resultados.</Hint>
                </SectionBody>
              </Section>
            </>
          )}
        </SidebarContent>
      </SidebarWrapper>
    </>
  );
}

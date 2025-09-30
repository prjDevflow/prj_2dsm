// src/components/MenuBar.tsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import styled, { keyframes } from "styled-components";

const HEADER_HEIGHT = "4.5rem"; // 72px - conforme imagem

const pop = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.small};
  position: fixed;
  top: 32px;
  left: 0;
  z-index: 1100;
`;

const TopContainer = styled.div`
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing(6)};
  gap: 1rem;
`;

/* Logo + title (à esquerda) */
const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

/* Título ao lado da logo */
const BrandTitle = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const AppName = styled.div`
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.2px;
`;

const AppSubtitle = styled.div`
  font-size: 0.8rem;
  opacity: 0.95;
`;

/* Menu desktop (à direita) */
const DesktopMenu = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};

  @media (min-width: 768px) {
    display: flex;
  }
`;

/* cada item do menu agora com melhor estilo, hover suave e micro-animação */
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
  position: relative;
  background: transparent;

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.02));
    animation: ${pop} 350ms ease;
  }

  &:focus-within {
    outline: 3px solid rgba(255, 255, 255, 0.06);
    outline-offset: 4px;
  }
`;

/* link com underline animado */
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  font-weight: 700;
  position: relative;
  display: inline-block;
  padding: 0.05rem 0.125rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.12));
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 220ms cubic-bezier(0.2, 0.9, 0.2, 1);
    border-radius: 2px;
    opacity: 0.9;
  }

  ${MenuItem}:hover &::after {
    transform: scaleX(1);
  }
`;

/* Botão de inicio estilizado (visível no desktop) */
const HomeButton = styled(Link)`
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  font-weight: 700;
  position: relative;
  display: inline-block;
  padding: 0.05rem 0.125rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.12));
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 220ms cubic-bezier(0.2, 0.9, 0.2, 1);
    border-radius: 2px;
    opacity: 0.9;
  }
`;

/* Botão hamburguer (mobile) */
const MobileButton = styled.button`
  display: block;
  padding: ${({ theme }) => theme.spacing(2)};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.inverse};
  border-radius: 8px;
  transition:
    background 160ms ease,
    transform 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    transform: translateY(-1px);
  }

  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.06);
    outline-offset: 3px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

/* Menu mobile (aparece abaixo do header quando aberto) */
const MobileMenu = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.text.inverse};
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  animation: ${slideDown} 180ms ease;
  box-shadow: 0 8px 30px rgba(2, 6, 23, 0.45);
`;

const MobileLink = styled(Link)`
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: 700;
  transition:
    background 160ms ease,
    transform 140ms ease;
  display: block;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateX(6px);
  }

  &:active {
    transform: translateX(2px) scale(0.995);
  }
`;

export default function MenuBar({ title }: { title?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Mapeamento de rotas para títulos — adicione mais conforme necessário
  const pathToTitle: Record<string, string> = {
    "/sima": "DevFlow Analytics - SIMA",
    "/furnas": "DevFlow Analytics - Furnas",
    "/balcar": "DevFlow Analytics - Balcar",
    "/mapa": "DevFlow Analytics - Mapa",
  };

  // tenta casar pela rota exata, caso não encontre usa startsWith (para rotas filhas)
  const match = Object.entries(pathToTitle).find(
    ([path]) => location.pathname === path || location.pathname.startsWith(path + "/"),
  );
  const computedTitle = title ?? (match ? match[1] : "DevFlow Analytics");

  return (
    <Nav>
      <TopContainer>
        <Brand>
          <BrandTitle>
            <AppName>{computedTitle}</AppName>
            <AppSubtitle></AppSubtitle>
          </BrandTitle>
        </Brand>

        <DesktopMenu>
          {/* Botão INÍCIO — volta para a Landing Page */}
          <HomeButton to="/" aria-label="Ir para a página inicial">
            INÍCIO
          </HomeButton>

          <MenuItem role="button" tabIndex={0} aria-label="Tabelas menu">
            <StyledLink to="/sima">TABELAS</StyledLink>
            <ChevronDown size={16} />
          </MenuItem>

          <MenuItem role="button" tabIndex={0} aria-label="Gráficos menu">
            <StyledLink to="/graficos">GRAFICOS</StyledLink>
            <ChevronDown size={16} />
          </MenuItem>

          <MenuItem role="button" tabIndex={0} aria-label="Sobre">
            <StyledLink to="/about">SOBRE</StyledLink>
          </MenuItem>

          <MenuItem role="button" tabIndex={0} aria-label="Contato">
            <StyledLink to="/contact">CONTATO</StyledLink>
          </MenuItem>
        </DesktopMenu>

        <MobileButton onClick={() => setIsOpen((s) => !s)} aria-label="Abrir menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileButton>
      </TopContainer>

      {isOpen && (
        <MobileMenu>
          {/* INÍCIO no topo do menu mobile */}
          <MobileLink to="/" onClick={() => setIsOpen(false)}>
            INÍCIO
          </MobileLink>

          <MobileLink to="/sima" onClick={() => setIsOpen(false)}>
            TABELAS
          </MobileLink>
          <MobileLink to="/graficos" onClick={() => setIsOpen(false)}>
            GRAFICOS
          </MobileLink>
          <MobileLink to="/about" onClick={() => setIsOpen(false)}>
            SOBRE
          </MobileLink>
          <MobileLink to="/contact" onClick={() => setIsOpen(false)}>
            CONTATO
          </MobileLink>
        </MobileMenu>
      )}
    </Nav>
  );
}

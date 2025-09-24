import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import styled from "styled-components";

const HEADER_HEIGHT = "4.5rem"; // 72px - conforme imagem

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

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  font-weight: 700;
`;

/* Botão hamburguer (mobile) */
const MobileButton = styled.button`
  display: block;
  padding: ${({ theme }) => theme.spacing(2)};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.inverse};

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
`;

const MobileLink = styled(Link)`
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export default function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <TopContainer>
        <Brand>
          <BrandTitle>
            <AppName>DevFlow Analytics</AppName>
            <AppSubtitle></AppSubtitle>
          </BrandTitle>
        </Brand>

        <DesktopMenu>
          <MenuItem>
            <StyledLink to="/sima">TABELAS</StyledLink>
            <ChevronDown size={16} />
          </MenuItem>

          <MenuItem>
            <StyledLink to="/graficos">GRAFICOS</StyledLink>
            <ChevronDown size={16} />
          </MenuItem>

          <MenuItem>
            <StyledLink to="/about">SOBRE</StyledLink>
          </MenuItem>

          <MenuItem>
            <StyledLink to="/contact">CONTATO</StyledLink>
          </MenuItem>
        </DesktopMenu>

        <MobileButton onClick={() => setIsOpen((s) => !s)} aria-label="Abrir menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileButton>
      </TopContainer>

      {isOpen && (
        <MobileMenu>
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

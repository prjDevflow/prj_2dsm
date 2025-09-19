// src/components/Footer.tsx
import styled from "styled-components";

const FooterBar = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 56px; /* se alterar, atualize sidebar bottom */
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  font-weight: 700;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.08);
`;

export default function Footer() {
  return <FooterBar>DEVFLOW - ANALYTICS</FooterBar>;
}

// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  height: calc(100vh - 3rem - 56px);
  display: flex;
  align-items: center; /* centraliza verticalmente */
  justify-content: center; /* centraliza horizontalmente */
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 600px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* centraliza o conteúdo do botão */
  padding: 1rem 1.25rem; /* define tamanho do botão */
  border-radius: 12px;
  text-decoration: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
  box-shadow: 0 4px 12px rgba(2, 6, 23, 0.06);
  transition:
    transform 140ms ease,
    box-shadow 140ms ease;
  color: inherit;
  &:hover,
  &:focus {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(2, 6, 23, 0.1);
  }
`;

const Badge = styled.div<{ gradient?: string }>`
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: white;
  background: ${({ gradient }) => gradient ?? "linear-gradient(135deg, #4f46e5, #06b6d4)"};
`;

const Title = styled.h2`
  margin: 0.3rem 0 0 0;
  font-size: 1rem;
  font-weight: 700;
`;

export default function LandingPage() {
  return (
    <Page>
      <Grid>
        <CardLink to="/sima">
          <Badge>SI</Badge>
          <Title>SIMA</Title>
        </CardLink>

        <CardLink to="/furnas">
          <Badge gradient="linear-gradient(135deg,#10b981,#059669)">FU</Badge>
          <Title>Furnas</Title>
        </CardLink>

        <CardLink to="/balcar">
          <Badge gradient="linear-gradient(135deg,#8b5cf6,#7c3aed)">BA</Badge>
          <Title>Balcar</Title>
        </CardLink>
      </Grid>
    </Page>
  );
}

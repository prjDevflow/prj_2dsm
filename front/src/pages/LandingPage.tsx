// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const PageHeader = styled.header`
  margin-top: 200px;
  width: 100%;
  max-width: 960px;
  text-align: center;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #0b1220;
`;

const Underline = styled.div`
  width: 78px;
  height: 4px;
  border-radius: 2px;
  margin: 8px auto 0;
  background: linear-gradient(180deg, rgba(37, 127, 187, 1), rgba(18, 102, 212, 1));
`;
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 960px; /* aumentei o max-width para comportar botões mais largos */
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    /* Cada coluna pode crescer, mas não fique menor que 220px */
    grid-template-columns: repeat(3, minmax(220px, 1fr));
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Mais largura visual — padding horizontal maior */
  padding: 1.125rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
  box-shadow: 0 4px 12px rgba(2, 6, 23, 0.06);
  transition:
    transform 140ms ease,
    box-shadow 140ms ease;
  color: inherit;

  /* força uma altura mínima pra ficar mais "achatado" (largura > altura) */
  min-height: 120px;
  /* faz o conteúdo não colar na borda em telas maiores */
  width: 100%;

  &:hover,
  &:focus {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(2, 6, 23, 0.1);
    background: linear-gradient(180deg, rgba(37, 127, 187, 1), rgba(18, 102, 212, 1));
    color: #fff;
  }
`;

/* Imagem retangular (width > height) */
const Icon = styled.img`
  width: 200px;
  height: 200px; /* retangular: largura maior que altura */
  border-radius: 999px;
  display: block;
  object-fit: cover;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 10px rgba(2, 6, 23, 0.06);
  background: linear-gradient(180deg, rgba(255, 245, 225, 1), rgba(255, 235, 200, 1));
`;

/* título levemente maior para combinar com os botões maiores */
const Title = styled.h2`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  text-align: center;
`;

const Legend = styled.h2`
  margin: 0;
  font-size: 14px;
  text-align: center;
`;
export default function LandingPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Acesso aos serviços interativos</PageTitle>
        <Underline />
      </PageHeader>

      <Grid>
        <CardLink to="/sima" aria-label="SIMA">
          <Icon
            src="/imagens/Logo_Sima.png"
            alt="SIMA"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <Title>SIMA</Title>
          <Legend>
            Mapa interativo com dados coletados automaticamente pelo SIMA, durante longos períodos,
            em um uníco ponto do reservatório.
          </Legend>
        </CardLink>

        <CardLink to="/furnas" aria-label="Furnas">
          <Icon
            src="/imagens/Logo_Furnas.png"
            alt="Furnas"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <Title>Furnas</Title>
          <Legend>
            Mapa interativo com parametros limnológicos coletados manualmente em diversos locais dos
            reservatórios, em curtos períodos de tempo.
          </Legend>
        </CardLink>

        <CardLink to="/balcar" aria-label="Balcar">
          <Icon
            src="/imagens/Logo_Balcar.png"
            alt="Balcar"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <Title>Balcar</Title>
          <Legend>
            Mapa interativo com parametros limnológicos coletados manualmente em diversos locais dos
            reservatórios, em curtos períodos de tempo.
          </Legend>
        </CardLink>
      </Grid>
    </Page>
  );
}

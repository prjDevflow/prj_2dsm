// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";

import imgINPE from "/public/instituicoes/logo_inpe.png"
import imgIIE from "/public/instituicoes/logo_iie.png"
import imgUFJF from "/public/instituicoes/logo_ufjf.png"
import imgUFRJ from "/public/instituicoes/logo_ufrj.png"

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  padding: 0px 16vw;
`;

const PageHeader = styled.header`
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
  gap: 1.5rem;
  width: 100%;
  max-width: 100%; /* aumentei o max-width para comportar botões mais largos */
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    /* Cada coluna pode crescer, mas não fique menor que 220px */
    grid-template-columns: repeat(4, minmax(220px, 1fr));
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
  box-shadow: 0 4px 12px rgba(2, 6, 23, 0.06);
  color: inherit;

  width: 100%;

  transition:
    transform 340ms ease-in-out,
    box-shadow 340ms ease-in-out;
    
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
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

// const Legend = styled.h2`
//   margin: 0;
//   font-size: 14px;
//   text-align: center;
// `;
export default function InstituicaoPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Selecione uma Instituição</PageTitle>
        <Underline />
      </PageHeader>

      <Grid>
        <CardLink to="/furnas/INPE" aria-label="SIMA">
          <Icon
            src={imgINPE}
            alt="image INPE"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <Title>INPE</Title>
        </CardLink>

        <CardLink to="/furnas/IIE" aria-label="Furnas">
          <Icon
            src={imgIIE}
            alt="IIE"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <Title>IIE</Title>
        </CardLink>

        <CardLink to="/furnas/UFJF" aria-label="Balcar">
          <Icon
            src={imgUFJF}
            alt="UFJF"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <Title>UFJF</Title>
        </CardLink>

        <CardLink to="/furnas/UFRJ" aria-label="Balcar">
          <Icon
            src={imgUFRJ}
            alt="UFRJ"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <Title>UFRJ</Title>
        </CardLink>

        {/* <CardLink to="/furnas/furnas" aria-label="Balcar">
          <Icon
            src="/imagens/Logo_Balcar.png"
            alt="Furnas"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <Title>Furnas</Title>
        </CardLink> */}
      </Grid>
    </Page>
  );
}


import { Link } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Container = styled.main`
  width: 100%;
  max-width: 1100px;
  display: grid;
  gap: 2rem;
  align-items: start;
`;

/* Header */
const Header = styled.header`
  text-align: center;
  margin-top: 3rem;
`;

const Title = styled.h1`
  margin: 50px;
  font-size: 2rem;
  font-weight: 800;
  color: #0b1220;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: start;
  margin-top: 3rem; /* Adicionado espaçamento entre seções */

  @media (min-width: 900px) {
    grid-template-columns: 420px 1fr;
    align-items: center;
  }
`;

const SectionImage = styled.img`
  width: 100%;
  max-width: 420px;
  height: 260px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
`;

/* MemberInfo (padronizado para textos) */
const MemberInfo = styled.div`
  margin: 0.25rem 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  color: #0b1220;
`;

const Actions = styled.div`
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  background: linear-gradient(180deg, rgba(37,127,187,1), rgba(18,102,212,1));
  color: white;
  box-shadow: 0 8px 20px rgba(2,6,23,0.08);
`;


export default function AboutPage() {
  return (
    <Page>
      <Container>
        <Header>
          <Title>Sobre os serviços</Title>
        </Header>

        {/* SIMA */}
        <Section aria-labelledby="sima-title">
          <SectionImage
            src="/imagens/Logo_Sima.png"
            alt="Logo SIMA"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          <div>
            <SectionTitle id="sima-title">SIMA</SectionTitle>
            <MemberInfo>
              <p>
              O SIMA concentra medições automáticas contínuas em um ponto fixo do reservatório,
              fornecendo séries temporais de parâmetros limnológicos (temperatura, oxigênio,
              condutividade, entre outros) com alta resolução temporal. Ideal para estudos de
              dinâmica temporal e detecção de eventos rápidos.</p>
            </MemberInfo>

            <MemberInfo>
              Dados do SIMA são úteis para modelagem, análise de tendência e correlação com sinais
              ambientais. Na interface você encontra tabelas, gráficos e mapas focados nessa
              estação fixa.
            </MemberInfo>

            <Actions>
              <ActionButton to="/sima">Ir para SIMA</ActionButton>
            </Actions>
          </div>
        </Section>

        {/* Furnas */}
        <Section aria-labelledby="furnas-title">
          <SectionImage
            src="/imagens/Logo_Furnas.png"
            alt="Logo Furnas"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          <div>
            <SectionTitle id="furnas-title">Furnas</SectionTitle>
            <MemberInfo>
              O conjunto Furnas reúne parâmetros coletados manualmente em múltiplos pontos do
              reservatório — ideal para capturar variabilidade espacial. As amostras costumam ser
              realizadas em campanhas periódicas e trazem informações complementares às séries
              automáticas.
            </MemberInfo>

            <MemberInfo>
              Use a página Furnas para explorar mapas com pontos de coleta, comparar amostras entre
              locais e baixar relatórios consolidados por instituição ou área de estudo.
            </MemberInfo>

            <Actions>
              <ActionButton to="/furnas">Ir para Furnas</ActionButton>
            </Actions>
          </div>
        </Section>

        {/* Balcar */}
        <Section aria-labelledby="balcar-title">
          <SectionImage
            src="/imagens/Logo_Balcar.png"
            alt="Logo Balcar"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          <div>
            <SectionTitle id="balcar-title">Balcar</SectionTitle>
            <MemberInfo>
              O Balcar é focado em medições manuais de parâmetros limnológicos em pontos de
              coletas pontuais e em curtos períodos. Ele complementa as bases de dados com
              amostras específicas para avaliação de qualidade da água e estudos locais.
            </MemberInfo>

            <MemberInfo>
              Na seção Balcar você encontra dados por campanha, filtros por parâmetro e ferramentas
              para exportar amostras para análises externas.
            </MemberInfo>

            <Actions>
              <ActionButton to="/balcar">Ir para Balcar</ActionButton>
            </Actions>
          </div>
        </Section>

      </Container>
    </Page>
  );
}

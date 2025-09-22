# 🌊 Devflow Analytics - Plataforma de Dados Limnológicos

**Uma plataforma web intuitiva e de alto desempenho para visualização e análise de dados de balanço de carbono em reservatórios, desenvolvida para Furnas Centrais Elétricas S.A. e instituições parceiras (INPE, UFRJ, UFJF, IIE).**

[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://choosealicense.com/licenses/mit/)
[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node.js%20%2B%20PostgreSQL-blue)](https://github.com/seu-usuario/prj_2dsm)

## 📋 Tabela de Conteúdos

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Product Backlog](#-product-backlog)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🚀 Sobre o Projeto

O **Devflow Analytics** é uma plataforma desenvolvida para centralizar, visualizar e disponibilizar dados limnológicos e meteorológicos coletados pelos projetos de pesquisa sobre o **Balanço de Carbono nos Reservatórios de Furnas Centrais Elétricas S.A.**, em cooperação com **INPE, UFRJ, UFJF e IIE**.

A plataforma integra dados de duas fontes principais:
- **Campanhas de Campo:** Parâmetros limnológicos coletados manualmente em diversos locais dos reservatórios
- **Monitoramento SIMA:** Dados coletados automaticamente pelo Sistema Integrado de Monitoração Ambiental do INPE

## ✨ Funcionalidades

- **📊 Painel Interativo:** Visualize e filtre dados por instituição, reservatório e período
- **📋 Tabelas Dinâmicas:** Consulte dados brutos com paginação e ordenação
- **📥 Exportação CSV:** Exporte conjuntos de dados filtrados
- **🗺️ Mapa Interativo:** Visualize a localização geográfica dos pontos de coleta
- **📈 Gráficos Temporais:** Analise tendências em dados do SIMA

## 🛠 Tecnologias Utilizadas

### Front-End
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

### Back-End
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### Banco de Dados
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Infraestrutura
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📝 Product Backlog

<details>
<summary><b>RF01 — Painel interativo de parâmetros</b></summary>

**Como** Pesquisador / Analista de Dados  
**Quero** visualizar todos os parâmetros armazenados em um painel interativo e filtrá-los por instituição, reservatório e período de tempo  
**Para que** eu possa explorar rapidamente os dados coletados e identificar padrões e anomalias sem precisar consultar arquivos brutos.

**Critérios de Aceitação**
- O painel exibe a lista/grade dos parâmetros disponíveis (por ex.: temperatura, oxigênio, pH, etc.).  
- Existem controles de filtro para **Instituição**, **Reservatório** e **Período (data inicial / data final)**.  
- Filtros podem ser combinados e o painel atualiza os widgets imediatamente ao aplicar os filtros.  
- O painel apresenta sumarizações (contadores, média, mínimo, máximo) para o conjunto filtrado.  
- É possível selecionar um parâmetro para abrir detalhes (tabela, gráfico, localização).  
- Botão "Limpar filtros" disponível para resetar o estado.  
- Interface responsiva (desktop e tablet).
</details>

<details>
<summary><b>RF02 — Visualização em tabelas</b></summary>

**Como** Técnico de Campo / Analista de Dados  
**Quero** consultar e visualizar os dados em formato de tabela  
**Para que** possa inspecionar registros individuais, verificar metadados e preparar subconjuntos para análise.

**Critérios de Aceitação**
- A tabela mostra: *timestamp*, *parâmetro*, *valor*, *unidade*, *latitude*, *longitude*, *instituição*, *método de coleta (manual/SIMA)*, *ponto de coleta / campanha*.  
- A tabela respeita os filtros aplicados no painel (instituição, reservatório, período).  
- Ordenação por qualquer coluna (asc/desc).  
- Paginação e opção de tamanho de página (10/25/50/100).  
- Busca/filtragem de texto livre dentro da tabela.  
- Possibilidade de ocultar/mostrar colunas.  
- Clique em linha abre detalhe do registro (modal ou painel lateral) com metadados completos.
</details>

<details>
<summary><b>RF03 — Exportar CSV</b></summary>

**Como** Analista de Dados / Pesquisador  
**Quero** exportar os dados consultados para CSV  
**Para que** possa realizar análises offline, integrar com scripts e compartilhar com colaboradores.

**Critérios de Aceitação**
- Botão "Exportar CSV" visível quando há resultados na tabela ou painel.  
- CSV contém cabeçalho com nomes das colunas e todos os registros resultantes dos filtros aplicados.  
- CSV inclui metadados essenciais (instituição, reservatório, método de coleta, timestamp em ISO 8601).  
- Opções de exportação: (a) registros da página atual; (b) todos os registros do resultado.  
- Notificação ao usuário quando a exportação for concluída e download imediato do arquivo.  
- Para exportações grandes, o sistema fornece feedback claro sobre procesamento (por ex.: aviso de geração/espera).
</details>

<details>
<summary><b>RF04 — Mapa interativo de localização</b></summary>

**Como** Técnico de Campo / Pesquisador / Gestor  
**Quero** consultar e visualizar a localização dos pontos de coleta em um mapa interativo  
**Para que** eu possa entender a distribuição espacial das amostras, localizar pontos de interesse e planejar campanhas de campo.

**Critérios de Aceitação**
- O mapa mostra marcadores para cada ponto de coleta (latitude/longitude).  
- Marcadores respeitam filtros aplicados (instituição, reservatório, período, parâmetros).  
- Clique no marcador abre popup com resumo: identificação, instituição, tipos de amostra, últimos valores, link para registros em tabela/detalhe.  
- Clusterização de marcadores quando há muitos pontos próximos, com expansão ao dar zoom.  
- Controles de navegação (zoom, arrastar) e reset de vista.  
- Camadas/ícones distintos para pontos **manuais (campanhas)** e **SIMA (automático)**.  
- Opção de exportar pontos filtrados como KML/GeoJSON (opcional).
</details>

<details>
<summary><b>RF05 — Séries temporais (gráficos)</b></summary>

**Como** Pesquisador / Analista de Séries Temporais  
**Quero** exibir os dados de séries temporais (parâmetros coletados pelo SIMA) em gráficos  
**Para que** possa analisar tendências, sazonalidades e eventos ao longo do tempo.

**Critérios de Aceitação**
- Usuário pode selecionar um ou mais parâmetros para plotar no gráfico.  
- Eixo X = tempo (timestamps), eixo Y = valores; unidades claramente indicadas.  
- Gráfico respeita filtros de período e ponto de coleta (SIMA).  
- Zoom por seleção (drag-to-zoom) e reset do zoom disponível.  
- Opções de agregação temporal (raw, média diária, média mensal) ou indicação de que não houve agregação.  
- Possibilidade de sobrepor múltiplas séries e ativar/desativar séries via legenda.  
- Exportar gráfico como imagem (PNG/SVG) e exportar dados do gráfico (CSV).  
- Tooltips mostram timestamp e valor exato ao passar o cursor.
</details>

<details>
<summary><b>RF06 — Diagrama: Casos de Uso</b></summary>

**Como** X  
**Quero** Y  
**Para que** Z

**Critérios de Aceitação**
- Escrever
</details>

<details>
<summary><b>RF07 — Diagrama: Classe</b></summary>

**Como** X  
**Quero** Y  
**Para que** Z

**Critérios de Aceitação**
- Escrever
</details>

<details>
<summary><b>RF08 — Diagrama: Sequência</b></summary>

**Como** X  
**Quero** Y  
**Para que** Z

**Critérios de Aceitação**
- Escrever
</details>

<details>
<summary><b>RF09 — Testes unitários</b></summary>

**Como** X  
**Quero** Y  
**Para que** Z

**Critérios de Aceitação**
- Escrever
</details>

<details>
<summary><b>RF10 — Junção de Tabelas</b></summary>

**Como** analista de dados do INPE  
**Quero** aplicar junções entre tabelas do banco limnologia_db (parâmetros, reservatórios, instituições e campanhas)  
**Para que** seja possível gerar relatórios que combinem informações relevantes e respondam perguntas práticas sobre as coletas.

**Critérios de Aceitação**
- Criar 5 consultas SQL utilizando JOIN entre as tabelas do banco.
- Cada consulta deve responder a uma questão prática do INPE, incluindo:
  - Relacionar parâmetros coletados com seus respectivos reservatórios.
  - Relacionar campanhas realizadas e as instituições responsáveis.
  - Relacionar séries temporais do SIMA com parâmetros correspondentes.
  - Relacionar localizações de coleta (georreferenciadas) com dados coletados.
  - Listar todos os parâmetros coletados por cada instituição.
- Cada consulta deve ser validada, retornando dados consistentes e prontos para uso em relatórios.
</details>

<details>
<summary><b>RF11 — Funções Agrupadoras</b></summary>

**Como** X  
**Quero** Y  
**Para que** Z

**Critérios de Aceitação**
- Escrever
</details>

<details>
<summary><b>RF12 — Stored Procedure</b></summary>

**Como** X  
**Quero** Y  
**Para que** Z

**Critérios de Aceitação**
- Escrever
</details>

<details>
<summary><b>RF12 — Triggers</b></summary>

**Como** X  
**Quero** Y  
**Para que** Z

**Critérios de Aceitação**
- Escrever
</details>

# 📊 Burndown Chart

## Sprint 1 — Planejamento (Poker Planning)

### Estimativa de Tarefas e Story Points

| Código | Tarefa | Story Points |
|--------|--------|--------------|
| **T1.1** | Inicializar repositórios e pipeline CI | **2** |
| **T1.2** | Modelagem de dados (migrations + seeds) | **3** |
| **T1.3** | API: listagem de parâmetros com filtros | **5** |
| **T1.4** | Frontend: layout base do painel | **3** |
| **T1.5** | Frontend: componente de filtros integrado à API | **3** |
| **T2.1** | Endpoint tabelado paginado e ordenável (`GET /api/coletas`) | **5** |
| **T2.2** | Frontend: tabela com paginação e ordenação | **5** |
| **T3.1** | Endpoint export CSV (síncrono, pequenos volumes) | **3** |
| **T3.3** | Frontend: botão **Exportar CSV** (opção page/all) | **1** |
| **TS.1** | Autenticação & autorização básica | **5** |
| **TS.4** | Documentação mínima da API (OpenAPI) | **2** |
| **T1.7** | Auditoria de consultas (logs de filtros / usuário) | **3** |

🔹 **Total de Story Points (Sprint 1): 40**

### Burndown Chart
<img width="487" height="299" alt="Burndown Chart Sprint 1" src="https://github.com/user-attachments/assets/e40ed652-a60d-4447-bc6c-0cb4f6fffec5" />

---

# 📝 UML

## Diagrama de Casos de Uso
<img width="487" height="299" alt="Diagrama de Casos de Uso" src="https://github.com/prjDevflow/prj_2dsm/blob/main/docs/Imagens/DevflowAnalytics.png" />

---

# 🎨 Design

## Protótipo do Painel
<img width="487" height="299" alt="Protótipo do Painel" src="https://github.com/prjDevflow/prj_2dsm/blob/main/docs/Imagens/imagem_2025-09-18_211738787.png" />



import { Request, Response } from "express";
import { Parser } from "json2csv";
import { logger } from "../../configs/logger";

/**
 * Exporta CSV com os principais dados (mock) em UTF-8 com BOM
 */
export const exportPrincipaisComCampos = async (req: Request, res: Response): Promise<void> => {
  try {
    // Mock de dados
    const resultRows = [
      {
        idfluxoinpe: 1,
        datamedida: "2025-09-18",
        ch4: 0.1,
        batimetria: 2.5,
        tempar: 25,
        tempcupula: 24,
        tempaguasubsuperficie: 23,
        tempaguameio: 22,
        tempaguafundo: 21,
        phsubsuperficie: 7,
        phmeio: 7.2,
        phfundo: 7.1,
        odsubsuperficie: 8,
        odmeio: 8.1,
        odfundo: 8.2,
        idsitio: 1,
        sitio_nome: "Sítio Mock",
        sitio_lat: -20,
        sitio_lng: -40,
        sitio_descricao: "Descrição teste",
        idcampanha: 1,
        nroCampanha: "001",
        datainicio: "2025-09-01",
        datafim: "2025-09-10",
        idreservatorio: 1,
        reservatorio_nome: "Reservatório Mock",
        reservatorio_lat: -20,
        reservatorio_lng: -40,
        idinstituicao: 1,
        instituicao_nome: "Instituição Mock",
        tabela_nome: "Tabela Mock",
        campo_nome: "Campo Mock",
        campo_descricao: "Descrição Campo Mock",
      },
      // Você pode adicionar mais linhas de mock se quiser testar múltiplas linhas
    ];

    // Gerar CSV
    const parser = new Parser();
    const csv = parser.parse(resultRows);

    // Adiciona BOM UTF-8
    const csvUtf8 = "\uFEFF" + csv;

    res.header("Content-Type", "text/csv; charset=utf-8");
    res.attachment("dados_completos.csv");
    res.send(csvUtf8);
  } catch (error: any) {
    logger.error(`Erro ao exportar CSV: ${error.message || error}`);
    res.status(500).json({ error: "Erro ao exportar CSV", detail: error.message });
  }
};

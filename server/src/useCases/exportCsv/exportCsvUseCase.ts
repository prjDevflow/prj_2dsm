import { Parser } from "json2csv";
import { IBalcarRepository } from "../../repositories/IBalcarRepository";

export class ExportCsvUseCase {
  constructor(private balcarRepository: IBalcarRepository) {}

  execute() {
    const resultRows = this.balcarRepository.getFullData();

    // Gerar CSV
    const parser = new Parser();
    const csv = parser.parse(resultRows);

    // Adiciona BOM UTF-8
    const csvUtf8 = "\uFEFF" + csv;

    return csvUtf8;
  }
}

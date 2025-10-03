import { Parser } from "json2csv";

export class ExportCsvUseCase {
  async execute<T>(data: T[]): Promise<string> {
    if (!data || data.length === 0) {
      return "";
    }

    const parser = new Parser();
    const csv = parser.parse(data);
    return csv;
  }
}

import { ExportCsvUseCase } from "./exportCsvUseCase";
import { ExportCsvController } from "./exportCsvController";
import { SimaRepository } from "../../repositories/implementations/PostgresSimaRepository";
import { GetDataByIdSimaUseCase } from "../getDataByIdSima/GetDataByIdSimaUseCase";

// Instancia Repositórios - Mocks
const simaRepository = new SimaRepository();
// const balcarRepository = new MockBalcarRepository();
// const furnasRepository = new MockFurnasRepository();

// Instancia UseCase
const exportCsvUseCase = new ExportCsvUseCase();
const getDataByIdSimaUseCase = new GetDataByIdSimaUseCase(simaRepository);
// Instancia Controller
const exportCsvController = new ExportCsvController(exportCsvUseCase, getDataByIdSimaUseCase);

export { exportCsvController, exportCsvUseCase };

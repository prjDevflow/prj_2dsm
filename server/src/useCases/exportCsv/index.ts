import { MockBalcarRepository } from "../../repositories/implementations/MockBalcarRepository";
import { ExportCsvUseCase } from "./exportCsvUseCase";
import { ExportCsvController } from "./exportCsvController";

// Instancia Repositórios - Mocks
const balcarRepository = new MockBalcarRepository();
// const simaRepository = new MockSimaRepository();
// const furnasRepository = new MockFurnasRepository();

// Instancia UseCase
const exportCsvUseCase = new ExportCsvUseCase(
  balcarRepository,
  // simaRepository,
  // furnasRepository
);
// Instancia Controller
const exportCsvController = new ExportCsvController(exportCsvUseCase);

export { exportCsvController, exportCsvUseCase };

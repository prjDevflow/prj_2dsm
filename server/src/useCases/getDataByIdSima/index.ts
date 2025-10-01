import { MockSimaRepository } from "../../repositories/implementations/MockSimaRepository";
import { GetDataByIdSimaController } from "./GetDataByIdSimaController";
import { GetDataByIdSimaUseCase } from "./GetDataByIdSimaUseCase";

// Instancia Repositórios - Mocks
const simaRepository = new MockSimaRepository();

// Instancia UseCase
const getDataByIdSimaUseCase = new GetDataByIdSimaUseCase(simaRepository);
// Instancia Controller
const getDataByIdSimaController = new GetDataByIdSimaController(getDataByIdSimaUseCase);

export { getDataByIdSimaController, getDataByIdSimaUseCase };

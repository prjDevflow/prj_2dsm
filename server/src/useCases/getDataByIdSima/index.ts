// import { MockSimaRepository } from "../../repositories/implementations/MockSimaRepository";
import { SimaRepository } from "../../repositories/implementations/PostgresSimaRepository";
import { GetDataByIdSimaController } from "./GetDataByIdSimaController";
import { GetDataByIdSimaUseCase } from "./GetDataByIdSimaUseCase";

// Instancia Repositórios - Mocks
const simaRepository = new SimaRepository();

// Instancia UseCase
const getDataByIdSimaUseCase = new GetDataByIdSimaUseCase(simaRepository);
// Instancia Controller
const getDataByIdSimaController = new GetDataByIdSimaController(getDataByIdSimaUseCase);

export { getDataByIdSimaController, getDataByIdSimaUseCase };

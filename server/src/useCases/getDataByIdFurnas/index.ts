import { MockFurnasRepository } from "../../repositories/implementations/MockFurnasRepository";
import { GetDataByIdFurnasController } from "./getDataByIdFurnasController";
import { GetDataByIdFurnasUseCase } from "./getDataByIdFurnasUseCase";

// Instancia Repositórios - Mocks
const furnasRepository = new MockFurnasRepository();

// Instancia UseCase
const getDataByIdFurnasUseCase = new GetDataByIdFurnasUseCase(furnasRepository);
// Instancia Controller
const getDataByIdFurnasController = new GetDataByIdFurnasController(getDataByIdFurnasUseCase);

export { getDataByIdFurnasController, getDataByIdFurnasUseCase };

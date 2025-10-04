import { PostgresFurnasRepository } from "../../repositories/implementations/PostgresFurnasRepository";
import { GetDataByIdFurnasController } from "./getDataByIdFurnasController";
import { GetDataByIdFurnasUseCase } from "./getDataByIdFurnasUseCase";

// Instancia Repositórios - Mocks
const furnasRepository = new PostgresFurnasRepository();

// Instancia UseCase
const getDataByIdFurnasUseCase = new GetDataByIdFurnasUseCase(furnasRepository);
// Instancia Controller
const getDataByIdFurnasController = new GetDataByIdFurnasController(getDataByIdFurnasUseCase);

export { getDataByIdFurnasController, getDataByIdFurnasUseCase };

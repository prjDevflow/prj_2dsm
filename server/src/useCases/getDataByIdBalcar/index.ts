import { MockBalcarRepository } from "../../repositories/implementations/MockBalcarRepository";
import { GetDataByIdBalcarController } from "./getDataByIdBalcarController";
import { GetDataByIdBalcarUseCase } from "./getDataByIdBalcarUseCase";

// Instancia Repositórios - Mocks
const balcarRepository = new MockBalcarRepository();

// Instancia UseCase
const getDataByIdBalcarUseCase = new GetDataByIdBalcarUseCase(balcarRepository);
// Instancia Controller
const getDataByIdBalcarController = new GetDataByIdBalcarController(getDataByIdBalcarUseCase);

export { getDataByIdBalcarController, getDataByIdBalcarUseCase };

import { PostgresBalcarRepository } from "../../repositories/implementations/PostgresBalcarRepository";
import { GetDataByIdBalcarController } from "./getDataByIdBalcarController";
import { GetDataByIdBalcarUseCase } from "./getDataByIdBalcarUseCase";

// Instancia Repositórios - Mocks
const balcarRepository = new PostgresBalcarRepository();

// Instancia UseCase
const getDataByIdBalcarUseCase = new GetDataByIdBalcarUseCase(balcarRepository);
// Instancia Controller
const getDataByIdBalcarController = new GetDataByIdBalcarController(getDataByIdBalcarUseCase);

export { getDataByIdBalcarController, getDataByIdBalcarUseCase };

import { MockSimaRepository } from "../../repositories/implementations/MockSimaRepository";
import { GetAllSimaController } from "./GetAllSimaController";
import { GetAllSimaUseCase } from "./GetAllSimaUseCase";

// Instancia Repositórios - Mocks
const simaRepository = new MockSimaRepository();

// Instancia UseCase
const getAllSimaUseCase = new GetAllSimaUseCase(simaRepository);
// Instancia Controller
const getAllSimaController = new GetAllSimaController(getAllSimaUseCase);

export { getAllSimaController, getAllSimaUseCase };

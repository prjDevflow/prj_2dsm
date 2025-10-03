import { GetCoordinatesController } from "./GetCoordinatesController";
import { GetCoordinatesUseCase } from "./GetCoordinatesUseCase";
import { MockBalcarRepository } from "../../repositories/implementations/MockBalcarRepository";
import { MockFurnasRepository } from "../../repositories/implementations/MockFurnasRepository";
// import { MockSimaRepository } from "../../repositories/implementations/MockSimaRepository";
import { SimaRepository } from "../../repositories/implementations/PostgresSimaRepository";

// Instancia Repositórios - Mocks
const simaRepository = new SimaRepository();
const balcarRepository = new MockBalcarRepository();
const furnasRepository = new MockFurnasRepository();

// Instancia UseCase
const getCoordinatesUseCase = new GetCoordinatesUseCase(
  simaRepository,
  balcarRepository,
  furnasRepository,
);
// Instancia Controller
const getCoordinatesController = new GetCoordinatesController(getCoordinatesUseCase);

export { getCoordinatesController, getCoordinatesUseCase };

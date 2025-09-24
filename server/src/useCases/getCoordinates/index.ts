import { GetCoordinatesController } from "./GetCoordinatesController";
import { GetCoordinatesUseCase } from "./GetCoordinatesUseCase";
import { MockBalcarRepository } from "../../repositories/implementations/MockBalcarRepository";
import { MockFurnasRepository } from "../../repositories/implementations/MockFurnasRepository";
import { MockSimaRepository } from "../../repositories/implementations/MockSimaRepository";

// Instancia Repositórios - Mocks
const simaRepository = new MockSimaRepository();
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

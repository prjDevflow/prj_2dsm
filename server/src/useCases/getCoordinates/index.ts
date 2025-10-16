import { GetCoordinatesController } from "./GetCoordinatesController";
import { GetCoordinatesUseCase } from "./GetCoordinatesUseCase";
import { PostgresBalcarRepository } from "../../repositories/implementations/PostgresBalcarRepository";
import { PostgresFurnasRepository } from "../../repositories/implementations/PostgresFurnasRepository";
import { PostgresSimaRepository } from "../../repositories/implementations/PostgresSimaRepository";
// import { SimaRepository } from "../../repositories/implementations/PostgresSimaRepository";


// Instancia Repositórios - Mocks
// const simaRepository = new SimaRepository();
const simaRepository = new PostgresSimaRepository();
const balcarRepository = new PostgresBalcarRepository();
const furnasRepository = new PostgresFurnasRepository();

// Instancia UseCase
const getCoordinatesUseCase = new GetCoordinatesUseCase(
  simaRepository,
  balcarRepository,
  furnasRepository,
);
// Instancia Controller
const getCoordinatesController = new GetCoordinatesController(getCoordinatesUseCase);

export { getCoordinatesController, getCoordinatesUseCase };

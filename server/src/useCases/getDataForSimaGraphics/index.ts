
import { GetDataForSimaGraphicsSimaUseCase } from "./getDataForSimasGraphicsUseCase";
import { GetDataForSimaGraphicsController } from "./GetDataForSimaGraphicsController";
import { PostgresSimaRepository } from "../../repositories/implementations/PostgresSimaRepository";

const simaRepository = new PostgresSimaRepository();
const getDataForSimaGraphicsSimaUseCase = new GetDataForSimaGraphicsSimaUseCase(simaRepository);
const getDataForSimaGraphicsController = new GetDataForSimaGraphicsController(getDataForSimaGraphicsSimaUseCase);

export { getDataForSimaGraphicsController, getDataForSimaGraphicsSimaUseCase };
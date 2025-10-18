import { PostgresSimaRepository } from "../../repositories/implementations/PostgresSimaRepository";
import { GetDataForGraphicsController } from "./getDataForGraphicsController";
import { GetDataForGraphicsUseCase } from "./getDataForGraphicsUseCase";
const simaRepository = new PostgresSimaRepository()
const getDataForGraphicsUseCase = new GetDataForGraphicsUseCase(simaRepository)

const getDataForGraphicsController = new GetDataForGraphicsController(getDataForGraphicsUseCase)

export {getDataForGraphicsController}